import { useLocation } from "react-router-dom"
import { FaBell, FaUserCircle } from "react-icons/fa"

const pageTitles = {
    "/dashboard": "Dashboard",
    "/students":  "Students",
    "/trainings": "Trainings",
    "/match":     "Study Matching",
}

function Navbar() {

    const location = useLocation()
    const title = pageTitles[location.pathname] || "Study Matcher"

    return (
        <div className="flex justify-between items-center mb-2">

            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="text-gray-400 text-sm mt-1">Welcome back 👋</p>
            </div>

            <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white p-2 rounded-xl bg-[#0B1739] transition-all">
                    <FaBell />
                </button>
                <div className="flex items-center gap-2 bg-[#0B1739] px-4 py-2 rounded-xl text-sm">
                    <FaUserCircle className="text-blue-400 text-lg" />
                    <span className="text-white font-medium">Admin</span>
                </div>
            </div>

        </div>
    )
}

export default Navbar