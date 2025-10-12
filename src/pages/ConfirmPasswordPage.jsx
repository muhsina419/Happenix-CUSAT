import { authAPI } from '../api/auth';

function ConfirmPasswordPage({ setPage, sharedState }) {
    const [formData, setFormData] = useState({
        studentid: sharedState.studentid || '',
        code: '',
        newPassword: ''
    });
     const [isLoading, setIsLoading] = useState(false);
     const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification({ message: '', type: '' });

        const result = await authAPI.confirmPassword(formData);

        setIsLoading(false);
        if (result.success) {
            setNotification({ message: 'Password has been reset! Redirecting to login...', type: 'success' });
            setTimeout(() => setPage('login'), 2000);
        } else {
            setNotification({ message: result.error, type: 'error' });
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Confirm New Password</h2>
            <p className="text-center text-gray-600 mb-4">Enter the code from your email and your new password.</p>
             <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification({ message: '', type: '' })} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="studentid"
                    value={formData.studentid}
                    onChange={handleChange}
                    placeholder="Student ID"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Reset Code"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:bg-blue-400">
                    {isLoading ? <Spinner /> : 'Set New Password'}
                </button>
            </form>
        </div>
    );
}

export default ConfirmPasswordPage