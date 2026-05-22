import { FaUserGraduate, FaClipboardList, FaCheckCircle } from "react-icons/fa"

function StatsCard({ label, value, icon, color }) {

    const colors = {
        blue: "bg-blue-600 text-blue-300",
        purple: "bg-purple-600 text-purple-300",
        green: "bg-green-600 text-green-300",
    }

    return (
        <div className="bg-[#0B1739] p-6 rounded-2xl flex items-center gap-5 hover:scale-105 transition-transform duration-200">

            <div className={`p-4 rounded-xl text-2xl bg-opacity-20 ${colors[color]}`}>
                {icon}
            </div>

            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-4xl font-bold mt-1 text-white">{value}</p>
            </div>

        </div>
    )
}

export default StatsCard