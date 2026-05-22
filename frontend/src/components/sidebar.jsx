import { NavLink } from "react-router-dom"
import { 
    FaHome, FaUserGraduate, FaClipboardList, 
    FaBrain, FaSignOutAlt, FaCog, FaCompass 
} from "react-icons/fa"

function Sidebar() {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3.5 cursor-pointer px-4 py-3.5 rounded-xl font-medium tracking-wide transition-all duration-200 ${
            isActive 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 border-r-4 border-blue-400" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
        }`

    return (
        <div className="w-64 bg-[#0B1739] p-6 flex flex-col justify-between min-h-screen border-r border-gray-800/40 shrink-0">
            <div>
                {/* Custom Brand Logo */}
                <div className="flex items-center gap-2.5 mb-12 mt-2 px-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <FaCompass className="text-white text-lg animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold text-white tracking-wide leading-none">
                            Study Matcher
                        </h1>
                        <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                            University Portal
                        </span>
                    </div>
                </div>

                <div className="px-2 mb-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Core System
                    </span>
                </div>

                <ul className="space-y-1.5">
                    <li>
                        <NavLink to="/dashboard" className={linkStyle}>
                            <FaHome className="text-lg" /> 
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/students" className={linkStyle}>
                            <FaUserGraduate className="text-lg" /> 
                            <span>Students</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/trainings" className={linkStyle}>
                            <FaClipboardList className="text-lg" /> 
                            <span>Trainings</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/match" className={linkStyle}>
                            <FaBrain className="text-lg" /> 
                            <span>Smart Match</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Bottom Section */}
            <div className="space-y-2.5 border-t border-gray-800/60 pt-6">
                <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <FaCog className="text-lg" /> 
                    <span>Portal Settings</span>
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <FaSignOutAlt className="text-lg" /> 
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar