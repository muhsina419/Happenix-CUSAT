function DashboardPage({ setPage }) {
    return (
        <div className="text-center body">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Login Successful!</h1>
            <p className="text-lg text-gray-700">Welcome to your dashboard.</p>
            <button
                onClick={() => setPage('login')}
                className="mt-6 px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
                Log Out
            </button>
        </div>
    );
}

export default DashboardPage