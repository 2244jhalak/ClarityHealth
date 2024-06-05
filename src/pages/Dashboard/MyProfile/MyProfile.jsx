import useReservation from "../../../hooks/useReservation";
import { updateProfile } from "firebase/auth";
import { useContext, useState, useEffect } from "react";

import { getAuth } from "firebase/auth";
import { AuthContext } from "../../../provider/AuthProvider";


const UpdateProfile = () => {
    const [reservation]= useReservation()
    const { user, setUser } = useContext(AuthContext);
    const auth = getAuth();
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    // useEffect to set initial state when user object is available
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
            setEmail(user.email || "");

            
            
            
            
        }
        // localStorage.removeItem('updatedEmail');
    }, [user]);

    // Function to handle form submission and update user profile
    // Function to handle form submission and update user profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(auth.currentUser, {
                displayName,
                email,
                photoURL
            });
            const updatedUser = {
                ...user,
                displayName,
                email,
                photoURL
            };
            setUser(updatedUser);
            console.log('Profile updated successfully');
            setIsEditing(false); // Disable editing mode after saving

            // Update local storage with new email
           
        } catch (error) {
            console.error('Error updating profile:', error.message);
            setError('Failed to update profile. Please try again.');
        }
    };


    return (
        <div className="text-center my-10">
            <h2 className="text-3xl font-bold mb-5">My Profile</h2>
            
            {/*  */}
            <div className="stats shadow mb-5">
  
  
  
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-36 rounded-full">
                      <img src={photoURL}/>
                    </div>
                  </div>
                </div>
                <div className="stat-value">{displayName}</div>
                <div className="stat-title">{email}</div>
                <div className="stat-desc text-secondary">{reservation.length} Upcoming Appointments</div>
              </div>
              
            </div>
            {/*  */}
            
            {/*  */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <div>
            <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Update Profile</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                <div className="mt-5 flex items-center justify-center border-2  py-5 rounded-lg border-black">
                {user && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                className="mb-3 font-semibold"
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                disabled={!isEditing}
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                className="mb-3 font-semibold"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                            />
                        </label>
                        <br />
                        <label>
                            Photo URL:
                            <input
                                className="mb-3 font-semibold bg-gray-200"
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                disabled={!isEditing}
                            />
                        </label>
                        <br />
                        {error && <p className="text-red-500">{error}</p>}
                        {isEditing ? (
                            <>
                                <button className="btn btn-outline" type="submit">Save Changes</button>
                                
                            </>
                        ) : (
                            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        )}
                    </form>
                )}
            </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

            {/*  */}
            
            
        </div>
    );
};

export default UpdateProfile;

              

