import {  Helmet } from 'react-helmet-async';
import FeaturedTest from '../FeaturedTest/FeaturedTest';
import Banner from '../Banner/Banner';
import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import Why from '../Why/Why';
import Recommendation from '../Recommendation/Recommendation';

const Home = () => {
    const {user}=useContext(AuthContext);
    return (
        <div>
            <Helmet>

                 <title>ClarityHealth | Home</title>
                 

            </Helmet>
            <Banner></Banner>
            {
                user &&
                <FeaturedTest></FeaturedTest>
            }
            <Recommendation></Recommendation>
            <Why></Why>
            
            
            
        </div>
    );
};

export default Home;