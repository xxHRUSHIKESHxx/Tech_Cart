import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signup } from '../../apis/authentications'; // Import the signup function
import RegistrationPopup from '../popups/RegistraionPopup'; // Import the popup component
import './auth.css';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [popupMessage, setPopupMessage] = useState(null); // State to control popup message
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        } else {
            setError('');
        }
    
        // Construct the payload for the API
        const payload = {
            username: fullName,
            email: email,
            password_hash: password,
        };
    
        try {
            // Await the signup function and wait for completion
            await signup(payload);
    
            // If no error, then set success message
            setPopupMessage({
                eventtype: true,
                title: 'Registration Successful',
                content: 'Your account has been created. Please login now.',
                buttonText: 'Login'
            });
        } catch (error) {
            // Set the error popup if registration fails
            console.log('entered inside catch')
            setPopupMessage({
                eventtype: false,
                title: 'Registration Failed',
                content: error.response?.data?.message || 'Something went wrong. Please try again.',
                buttonText: 'Close'
            });
        }
    };
    

    // Close modal and go back to the previous page
    const handleClose = () => {
        navigate(-1); // Navigates back to the previous page
    };

    const handlePopupClose = () => {
        setPopupMessage(null); // Close the popup
        if (popupMessage?.title === 'Registration Successful') {
            navigate('/login'); // Redirect to login page after successful registration
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-box">
                <button className="auth-close-btn" onClick={handleClose}>
                    &times;
                </button>
                <h2 className="auth-title">Create an Account</h2>
                <p className="auth-subtitle">Sign up to get started</p>
                {error && <p className="error-message">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?
                    <span className="auth-switch-link" onClick={() => navigate('/login')}>
                        Login
                    </span>
                </p>

                {/* Show the registration popup */}
                {popupMessage && (
                    <RegistrationPopup message={popupMessage} onClose={handlePopupClose} />
                )}
            </div>
        </div>
    );
};

export default Signup;
