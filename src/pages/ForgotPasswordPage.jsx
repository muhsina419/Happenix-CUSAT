import { authAPI } from '../api/auth';


function ForgotPasswordPage({ setPage, setSharedState }) {
    const [studentid, setStudentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification({ message: '', type: '' });

        const result = await authAPI.forgotPassword({ studentid });

        setIsLoading(false);
        if (result.success) {
            setNotification({ message: result.data.message, type: 'success' });
            setSharedState({ studentid: studentid });
            setTimeout(() => setPage('confirmPassword'), 2000);
        } else {
            setNotification({ message: result.error, type: 'error' });
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
            <p className="text-center text-gray-600 mb-4">Enter your Student ID to receive a reset code.</p>
            <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification({ message: '', type: '' })} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="studentid"
                    value={studentid}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Student ID"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:bg-blue-400">
                    {isLoading ? <Spinner /> : 'Send Reset Code'}
                </button>
            </form>
             <p className="text-center text-sm text-gray-600 mt-4">
                Remember your password?{' '}
                <button onClick={() => setPage('login')} className="font-medium text-blue-600 hover:underline">
                    Log In
                </button>
            </p>
        </div>
    );
}

export default ForgotPasswordPage
