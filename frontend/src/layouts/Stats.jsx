const Stats = ({icon, total, children}) => {
    return (
    <div className="bg-white shadow-md rounded-xl p-6 w-64">
        <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{children}</p>
                <h2 className="text-2xl font-bold">{total}</h2> {/* Valeur dynamique */}
            </div>
        </div>
    </div>
    )
}

export default Stats;