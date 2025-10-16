import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import logo from '../assets/logo-h.png';
import '../styles/AuthForm.css';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await authAPI.forgotPassword({ email });
        setIsLoading(false);
        if (result.success) {
            navigate('/confirm-password', { state: { email } });
        } else {
            alert(result.error || 'Failed to send reset code');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2 style={{ textTransform: 'lowercase', fontSize: '2.2rem' }}>forgot password</h2>
                
                <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '2.5rem' }}>
                    <div className="input-group">
                        <label htmlFor="email">Mail Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@cusat.ac.in"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send reset code'}
                    </button>
                </form>

                <p className="auth-switch-link">
                    <Link to="/login">Back to login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;