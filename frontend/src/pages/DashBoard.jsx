import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axiosInstance"
import StatsCard from "../components/StarstCard"
import { 
    FaUserGraduate, FaClipboardList, FaCheckCircle, 
    FaBookmark, FaTrash 
} from "react-icons/fa"

function Dashboard() {

    const [stats, setStats] = useState({
        students: 0,
        trainings: 0,
        reservations: 0
    })
    const [myReservations, setMyReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [studentsRes, trainingsRes, myRes] = await Promise.all([
                API.get("/students"),
                API.get("/trainings"),
                API.get("/reservations")
            ])

            let reservedCount = 0
            trainingsRes.data.forEach(t => {
                const capacity = t.capacity || 10
                reservedCount += Math.max(0, capacity - t.available_slots)
            })

            setStats({
                students: studentsRes.data.length,
                trainings: trainingsRes.data.length,
                reservations: reservedCount
            })
            setMyReservations(myRes.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async (trainingTitle) => {
        try {
           await API.delete(`/reservations`, { params: { training_title: trainingTitle } })
            setMessage(`🗑️ Cancelled "${trainingTitle}" successfully. Slot returned!`)
            fetchData() // refresh everything
        } catch (error) {
            setMessage(`❌ ${error.response?.data?.detail || "Cancel failed"}`)
        }
    }

    const cards = [
        { label: "Total Students",  value: stats.students,     icon: <FaUserGraduate />, color: "blue"   },
        { label: "Trainings",       value: stats.trainings,    icon: <FaClipboardList />, color: "purple" },
        { label: "Reservations",    value: stats.reservations, icon: <FaCheckCircle />,  color: "green"  },
    ]

    return (
        <MainLayout>
            <div className="space-y-8">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <StatsCard key={i} {...card} />
                    ))}
                </div>

                {/* Feedback message */}
                {message && (
                    <div className="p-4 rounded-xl bg-[#0B1739] border border-blue-500 text-blue-300 text-sm">
                        {message}
                    </div>
                )}

                {/* My Active Reservations */}
                <div className="bg-[#0B1739] rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FaBookmark className="text-blue-400" />
                        My Active Reservations
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">Loading your reservations...</p>
                    ) : myReservations.length === 0 ? (
                        <p className="text-gray-400">
                            You haven't reserved any field training slots yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {myReservations.map((res, index) => (
                                <div
                                    key={index}
                                    className="bg-[#131F4C] p-4 rounded-xl flex justify-between items-center"
                                >
                                    <div>
                                        <h4 className="font-bold text-white">{res.training_title}</h4>
                                        <p className="text-gray-400 text-xs mt-1">Confirmed Placement</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-semibold">
                                            Active
                                        </span>
                                        <button
                                            onClick={() => handleCancel(res.training_title)}
                                            className="text-gray-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-all"
                                            title="Cancel Reservation"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    )
}

export default Dashboard