import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth'; // You'll need to create this API logic
import logo from '../assets/logo-h.png'; // Use the 'H' logo
import '../styles/AuthForm.css'; // Import the shared CSS

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); // For password mismatch, etc.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on new submission

        // Basic client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        // --- MOCK API CALL FOR DEMO ---
        console.log("Registering with:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const result = { success: true }; 
        // --- END MOCK ---

        setIsLoading(false);
        if (result.success) {
            // On successful registration, you might navigate to the login page
            // or a page that says "Please confirm your email"
            navigate('/login'); 
        } else {
            setError(result.error || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2>Welcome To Happenix</h2>
                <p>Create your account to get started</p>
                
                {/* Display error messages here */}
                {error && <p style={{ color: '#F56565', marginBottom: '1.5rem' }}>{error}</p>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="fullname">Fullname</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Mail Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your mail id"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Select your department"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;