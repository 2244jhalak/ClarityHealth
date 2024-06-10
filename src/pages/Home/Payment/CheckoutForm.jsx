/* eslint-disable no-unused-vars */


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useReservation from "../../../hooks/useReservation";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [reservation, refetch] = useReservation();
  const totalPrice = reservation.reduce((total, item) => total + item.discountPrice, 0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error creating payment intent:", err);
          setLoading(false);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous'
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    setError('');

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date().toLocaleDateString(),
        reservationId: reservation.map(item => item._id),
        name: reservation.map(item => item.testName),
        image: reservation.map(item => item.image),
        status: 'pending'
      };

      const res = await axiosSecure.post('/payments', payment);
      refetch();

      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for the payment",
          showConfirmButton: false,
          timer: 1500
        });
        
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!clientSecret || loading}>
          {loading ? 'Loading...' : 'Pay'}
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;




