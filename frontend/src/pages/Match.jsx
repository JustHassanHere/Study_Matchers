import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axiosInstance"
import { FaUsers, FaChevronDown, FaChevronUp, FaBrain } from "react-icons/fa"

function Match() {

    const [groups, setGroups] = useState({})
    const [loading, setLoading] = useState(true)
    const [openGroup, setOpenGroup] = useState(null)

    useEffect(() => { fetchMatches() }, [])

    const fetchMatches = async () => {
        try {
            const res = await API.get("/match")
            setGroups(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleGroup = (subject) => {
        setOpenGroup(openGroup === subject ? null : subject)
    }

    const colors = [
        "blue", "purple", "green", "yellow", "pink", "indigo"
    ]

    const colorMap = {
        blue:   "border-blue-500 bg-blue-500",
        purple: "border-purple-500 bg-purple-500",
        green:  "border-green-500 bg-green-500",
        yellow: "border-yellow-500 bg-yellow-500",
        pink:   "border-pink-500 bg-pink-500",
        indigo: "border-indigo-500 bg-indigo-500",
    }

    const subjects = Object.keys(groups)

    return (
        <MainLayout>

            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <div className="bg-blue-600 bg-opacity-20 p-3 rounded-xl text-blue-400 text-2xl">
                    <FaBrain />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Study Matching</h1>
                    <p className="text-gray-400 mt-1">Students grouped by their subject field</p>
                </div>
            </div>

            {/* Summary bar */}
            <div className="flex gap-4 my-6">
                <div className="bg-[#0B1739] px-5 py-3 rounded-xl text-sm">
                    <span className="text-gray-400">Total Groups: </span>
                    <span className="font-bold text-white">{subjects.length}</span>
                </div>
                <div className="bg-[#0B1739] px-5 py-3 rounded-xl text-sm">
                    <span className="text-gray-400">Total Students: </span>
                    <span className="font-bold text-white">
                        {Object.values(groups).reduce((acc, arr) => acc + arr.length, 0)}
                    </span>
                </div>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading matches...</p>
            ) : subjects.length === 0 ? (
                <p className="text-gray-400">No students to match yet. Add some students first!</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {subjects.map((subject, index) => {
                        const color = colors[index % colors.length]
                        const isOpen = openGroup === subject
                        const students = groups[subject]

                        return (
                            <div
                                key={subject}
                                className={`bg-[#0B1739] rounded-2xl border-l-4 ${colorMap[color].split(" ")[0]} overflow-hidden`}
                            >
                                {/* Group Header */}
                                <button
                                    onClick={() => toggleGroup(subject)}
                                    className="w-full flex justify-between items-center p-5 hover:bg-white hover:bg-opacity-5 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`${colorMap[color].split(" ")[1]} bg-opacity-20 p-2 rounded-lg`}>
                                            <FaUsers className={`text-${color}-400`} />
                                        </div>
                                        <div className="text-left">
                                            <h2 className="font-bold text-lg text-white">{subject}</h2>
                                            <p className="text-gray-400 text-sm">{students.length} student{students.length > 1 ? "s" : ""}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400">
                                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </button>

                                {/* Student List */}
                                {isOpen && (
                                    <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {students.map((student, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#131F4C] rounded-xl p-4 flex items-center gap-3"
                                            >
                                                <div className={`w-9 h-9 rounded-full ${colorMap[color].split(" ")[1]} bg-opacity-30 flex items-center justify-center font-bold text-white text-sm`}>
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white text-sm">{student.name}</p>
                                                    <p className="text-gray-400 text-xs">{student.level} · Age {student.age}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        )
                    })}
                </div>
            )}

        </MainLayout>
    )
}

export default Match