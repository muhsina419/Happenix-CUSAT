import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import logo from '../assets/logo-h.png';
import '../styles/AuthForm.css';

function ConfirmPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const [formData, setFormData] = useState({
        code: '',
        newPassword: '',
        confirmPassword: ''
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

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        const result = await authAPI.confirmPassword({ email, code: formData.code, newPassword: formData.newPassword });
        setIsLoading(false);
        if (result.success) {
            alert("Password has been reset successfully!");
            navigate('/login');
        } else {
            setError(result.error || 'Password reset failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2 style={{ textTransform: 'lowercase', fontSize: '2.2rem' }}>confirm password</h2>
                {email && <p style={{ marginTop: '0.25rem' }}>Code sent to: {email}</p>}
                
                {error && <p style={{ color: '#F56565', marginTop: '1.5rem', marginBottom: 0 }}>{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '2.5rem' }}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Enter the code from your E-mail"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="enter password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="confirm password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className="auth-switch-link">
                    <Link to="/login">Back to login</Link>
                </p>
            </div>
        </div>
    );
}

export default ConfirmPasswordPage;