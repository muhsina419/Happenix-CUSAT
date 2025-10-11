import { authAPI } from '../api/auth';

function ConfirmPage({ setPage, sharedState }) {
    const [formData, setFormData] = useState({
        studentid: sharedState.studentid || '',
        code: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

     useEffect(() => {
        if (sharedState.studentid) {
            setFormData(prev => ({ ...prev, studentid: sharedState.studentid }));
        }
    }, [sharedState.studentid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification({ message: '', type: '' });

        const result = await authAPI.confirm(formData);
        
        setIsLoading(false);
        if (result.success) {
            setNotification({ message: 'Account confirmed successfully! Redirecting to login...', type: 'success' });
            setTimeout(() => setPage('login'), 2000);
        } else {
            setNotification({ message: result.error, type: 'error' });
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Confirm Your Account</h2>
            <p className="text-center text-gray-600 mb-4">Enter the confirmation code sent to your email.</p>
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
                    placeholder="Confirmation Code (OTP)"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:bg-blue-400">
                    {isLoading ? <Spinner /> : 'Confirm'}
                </button>
            </form>
        </div>
    );
}

export default ConfirmPage