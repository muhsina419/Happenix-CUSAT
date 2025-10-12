// src/pages/LoginPage.jsx - CORRECTED & COMPLETE
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import Notification from '../components/Notification';
import Spinner from '../components/Spinner';
import logo from '../assets/logo-h.png'; // Use the 'H' logo
import '../styles/AuthForm.css';

// The {setPage} prop is removed from here
function LoginPage() {
    const navigate = useNavigate();
    // The design uses email, so we change from 'studentid' to 'email'
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    // const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // setNotification({ message: '', type: '' });
        
        // This is a placeholder for your actual API call
        // const result = await authAPI.login(formData);
        
        // --- MOCK API CALL FOR DEMO ---
        console.log("Logging in with:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const result = { success: true }; 
        // --- END MOCK ---

        setIsLoading(false);
        if (result.success) {
            // setNotification({ message: 'Login successful!', type: 'success' });
            navigate('/dashboard'); 
        } else {
            // setNotification({ message: result.error, type: 'error' });
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2>Welcome To Happenix</h2>
                <p>Please sign in or sign up below.</p>
                
                {/* <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification({ message: '', type: '' })} /> */}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="email">Mail Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@cusat.ac.in"
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'sign in'}
                    </button>
                </form>

                <p className="auth-switch-link">
                    don't have an account... <Link to="/register">sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;