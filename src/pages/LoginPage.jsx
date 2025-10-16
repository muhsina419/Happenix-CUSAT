import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import logo from '../assets/logo-h.png';
import '../styles/AuthForm.css';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await authAPI.login(formData);
        setIsLoading(false);

        if (result.success) {
            // Save JWT token
            localStorage.setItem('token', result.data.token);
            navigate('/dashboard'); 
        } else {
            // If user not confirmed, Cognito typically returns a message containing 'User is not confirmed'
            const msg = result.error || '';
            if (msg.toLowerCase().includes('not confirmed')) {
                navigate('/confirm-account', { state: { email: formData.email } });
                return;
            }
            setError(result.error || `Login failed (status ${result.status || 'unknown'})`);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2>Welcome To Happenix</h2>
                <p>Please sign in or sign up below.</p>
                
                {error && <div className="auth-error">{error}</div>}

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
                
                <p className="auth-switch-link" style={{ marginTop: '0.5rem' }}>
                    forgot your password... <Link to="/forgot-password">forgot password</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
