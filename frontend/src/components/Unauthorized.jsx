const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
                <p className="mb-4">Vous n'avez pas le doit d'accéder à cette page.</p>
                <a href="/" className="text-blue-500 hover:underline">Go to Login</a>
            </div>
        </div>
    );
}

export default Unauthorized;