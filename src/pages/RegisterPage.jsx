import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import logo from '../assets/logo-h.png';
import '../styles/AuthForm.css';

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
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        const result = await authAPI.register(formData);
        setIsLoading(false);

        if (result.success) {
            navigate('/confirm-account', { state: { email: formData.email } });
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
                
                {error && <p style={{ color: '#F56565', marginBottom: '1.5rem' }}>{error}</p>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Mail Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your mail id" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="department">Department</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Select your department" required />
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