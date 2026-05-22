function DashBoardCard({ title, children }) {

    return (
        <div className="bg-[#0B1739] rounded-2xl p-6 border border-transparent hover:border-blue-500 transition-all duration-200">

            {title && (
                <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-3">
                    {title}
                </h2>
            )}

            {children}

        </div>
    )
}

export default DashBoardCard