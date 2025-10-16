import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import logo from '../assets/logo-h.png';
import '../styles/AuthForm.css';

function ConfirmAccountPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const email = location.state?.email || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await authAPI.confirm({ email, code: otp });
        setIsLoading(false);
        if (result.success) {
            alert("Account confirmed successfully! Please sign in.");
            navigate('/login');
        } else {
            alert(result.error || 'Confirmation failed.');
        }
    };

    const handleResend = async () => {
        alert("Please use the Forgot Password flow to reset or request a new code if needed.");
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <img src={logo} alt="Happenix Logo" className="auth-logo" />
                <h2>Confirm Your Account</h2>
                <p>Enter the 6-digit code we sent to your email address {email && `( ${email} )`}.</p>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>

                <p className="auth-switch-link">
                    Didn't receive a code?{' '}
                    <button onClick={handleResend} style={{ background: 'none', border: 'none', color: '#63B3ED', cursor: 'pointer', padding: 0 }}>
                        Resend
                    </button>
                </p>
                <p className="auth-switch-link" style={{ marginTop: '0.5rem' }}>
                    <Link to="/login">Back to login</Link>
                </p>
            </div>
        </div>
    );
}

export default ConfirmAccountPage;