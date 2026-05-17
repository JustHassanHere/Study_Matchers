import {
    FaHome,
    FaUserGraduate,
    FaClipboardList,
    FaCog
} from "react-icons/fa"

function Sidebar() {

    return (

        <div className="w-64 bg-[#0B1739] p-6 flex flex-col justify-between">

            <div>

                <h1 className="text-3xl font-bold mb-10">

                    Study Matcher

                </h1>

                <ul className="space-y-6">

                    <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">

                        <FaHome />

                        Dashboard

                    </li>

                    <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">

                        <FaUserGraduate />

                        Students

                    </li>

                    <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">

                        <FaClipboardList />

                        Trainings

                    </li>

                </ul>

            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:text-red-400">

                <FaCog />

                Settings

            </div>

        </div>
    )
}

export default Sidebar