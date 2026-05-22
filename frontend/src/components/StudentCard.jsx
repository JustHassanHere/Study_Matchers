import { FaUserGraduate, FaTrash } from "react-icons/fa"

function StudentCard({ student, onDelete }) {

    return (
        <div className="bg-[#0B1739] rounded-2xl p-6 flex justify-between items-start border border-transparent hover:border-blue-500 transition-all duration-200">

            <div className="flex gap-4">

                <div className="bg-blue-600 bg-opacity-20 p-3 rounded-xl text-blue-400 text-xl">
                    <FaUserGraduate />
                </div>

                <div>
                    <h2 className="font-bold text-lg text-white">{student.name}</h2>
                    <p className="text-blue-400 text-sm font-medium">{student.subjects}</p>
                    <div className="flex gap-3 mt-2">
                        <span className="text-xs bg-[#131F4C] text-gray-300 px-2 py-1 rounded-lg">
                            {student.level}
                        </span>
                        <span className="text-xs bg-[#131F4C] text-gray-300 px-2 py-1 rounded-lg">
                            Age {student.age}
                        </span>
                    </div>
                </div>

            </div>

            <button
                onClick={() => onDelete(student.name)}
                className="text-gray-500 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-10 p-2 rounded-lg transition-all"
            >
                <FaTrash />
            </button>

        </div>
    )
}

export default StudentCard