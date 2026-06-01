import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axiosInstance"
import { 
    FaBrain, FaUsers, FaCheckCircle, 
    FaTimesCircle, FaChevronDown, FaChevronUp 
} from "react-icons/fa"

function Match() {

    const [results, setResults]       = useState([])
    const [groups, setGroups]         = useState({})
    const [loading, setLoading]       = useState(true)
    const [activeTab, setActiveTab]   = useState("smart")  // "smart" or "groups"
    const [openGroup, setOpenGroup]   = useState(null)

    useEffect(() => { fetchAll() }, [])

    const fetchAll = async () => {
        try {
            const [smartRes, groupRes] = await Promise.all([
                API.get("/smart-match"),
                API.get("/match")
            ])
            setResults(smartRes.data)
            setGroups(groupRes.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const matchedCount   = results.filter(r => r.match_status === "Matched").length
    const unmatchedCount = results.filter(r => r.match_status === "No Match Found").length

    const colors = ["blue","purple","green","yellow","pink","indigo"]
    const borderColors = {
        blue:   "border-blue-500",
        purple: "border-purple-500",
        green:  "border-green-500",
        yellow: "border-yellow-500",
        pink:   "border-pink-500",
        indigo: "border-indigo-500",
    }

    return (
        <MainLayout>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 bg-opacity-20 p-3 rounded-xl text-blue-400 text-2xl">
                    <FaBrain />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Study Matching</h1>
                    <p className="text-gray-400 mt-1">Smart algorithm matching students to training opportunities</p>
                </div>
            </div>

            {/* Summary Bar */}
            <div className="flex gap-4 mb-6">
                <div className="bg-[#0B1739] px-5 py-3 rounded-xl text-sm">
                    <span className="text-gray-400">Total Students: </span>
                    <span className="font-bold text-white">{results.length}</span>
                </div>
                <div className="bg-[#0B1739] px-5 py-3 rounded-xl text-sm">
                    <span className="text-gray-400">Matched: </span>
                    <span className="font-bold text-green-400">{matchedCount}</span>
                </div>
                <div className="bg-[#0B1739] px-5 py-3 rounded-xl text-sm">
                    <span className="text-gray-400">No Match: </span>
                    <span className="font-bold text-red-400">{unmatchedCount}</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab("smart")}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                        activeTab === "smart"
                            ? "bg-blue-600 text-white"
                            : "bg-[#0B1739] text-gray-400 hover:text-white"
                    }`}
                >
                    🧠 Smart Matches
                </button>
                <button
                    onClick={() => setActiveTab("groups")}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                        activeTab === "groups"
                            ? "bg-blue-600 text-white"
                            : "bg-[#0B1739] text-gray-400 hover:text-white"
                    }`}
                >
                    👥 Subject Groups
                </button>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading matches...</p>
            ) : (

                /* ── SMART MATCH TAB ── */
                activeTab === "smart" ? (
                    <div className="space-y-4">
                        {results.length === 0 ? (
                            <p className="text-gray-400">No students to match yet. Add some students first!</p>
                        ) : (
                            results.map((result, index) => (
                                <div
                                    key={index}
                                    className="bg-[#0B1739] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    {/* Student Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center font-bold text-blue-400 text-lg">
                                            {result.student.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{result.student.name}</p>
                                            <p className="text-gray-400 text-xs">
                                                {result.student.subjects} · {result.student.level}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="text-gray-600 text-xl hidden md:block">→</div>

                                    {/* Matched Training */}
                                    <div className="flex-1">
                                        {result.matched_training ? (
                                            <div className="bg-[#131F4C] rounded-xl p-3 flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-white text-sm">
                                                        {result.matched_training.title}
                                                    </p>
                                                    <p className="text-gray-400 text-xs mt-0.5">
                                                        {result.matched_training.company} · {result.matched_training.location}
                                                    </p>
                                                </div>
                                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg font-semibold">
                                                    Score: {result.match_score}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-[#131F4C] rounded-xl p-3 text-gray-500 text-sm">
                                                No available training matches this student's subject
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <div>
                                        {result.match_status === "Matched" ? (
                                            <span className="flex items-center gap-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-full font-semibold">
                                                <FaCheckCircle /> Matched
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-full font-semibold">
                                                <FaTimesCircle /> No Match
                </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (

                /* ── SUBJECT GROUPS TAB ── */
                    <div className="flex flex-col gap-4">
                        {Object.keys(groups).length === 0 ? (
                            <p className="text-gray-400">No students to group yet.</p>
                        ) : (
                            Object.keys(groups).map((subject, index) => {
                                const color    = colors[index % colors.length]
                                const isOpen   = openGroup === subject
                                const students = groups[subject]

                                return (
                                    <div
                                        key={subject}
                                        className={`bg-[#0B1739] rounded-2xl border-l-4 ${borderColors[color]} overflow-hidden`}
                                    >
                                        <button
                                            onClick={() => setOpenGroup(isOpen ? null : subject)}
                                            className="w-full flex justify-between items-center p-5 hover:bg-white hover:bg-opacity-5 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-[#131F4C] p-2 rounded-lg">
                                                    <FaUsers className="text-gray-300" />
                                                </div>
                                                <div className="text-left">
                                                    <h2 className="font-bold text-lg text-white">{subject}</h2>
                                                    <p className="text-gray-400 text-sm">
                                                        {students.length} student{students.length > 1 ? "s" : ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-gray-400">
                                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                                {students.map((student, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-[#131F4C] rounded-xl p-4 flex items-center gap-3"
                                                    >
                                                        <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center font-bold text-white text-sm">
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
                            })
                        )}
                    </div>
                )
            )}

        </MainLayout>
    )
}

export default Match