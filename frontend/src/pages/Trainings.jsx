import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import API from "../api/axiosInstance"
import TrainingCard from "../components/TrainingCard"
import { FaPlus, FaTimes, FaBriefcase } from "react-icons/fa"

function Trainings() {

    const [trainings, setTrainings] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    
    const [isAdmin, setIsAdmin] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        capacity: "",
        location: "",
        description: ""
    })

    useEffect(() => { 
        fetchTrainings()
        checkAdminStatus()
    }, [])

    const checkAdminStatus = () => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                if (payload.role === "admin") {
                    setIsAdmin(true)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const fetchTrainings = async () => {
        try {
            const res = await API.get("/trainings")
            setTrainings(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleReserve = async (trainingTitle) => {
        try {
            await API.post("/reserve", { training_title: trainingTitle })
            setMessage(`✅ Reserved "${trainingTitle}" successfully!`)
            fetchTrainings()
        } catch (error) {
            setMessage(`❌ ${error.response?.data?.detail || "Reservation failed"}`)
        }
    }

    const handleDelete = async (title) => {
        try {
            await API.delete(`/trainings/${title}`)
            setMessage(`🗑️ "${title}" deleted successfully!`)
            fetchTrainings()
        } catch (error) {
            setMessage(`❌ Failed to delete: ${error.response?.data?.detail || "Unprivileged operation"}`)
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCreateTraining = async (e) => {
        e.preventDefault()
        try {
            const parsedCapacity = parseInt(formData.capacity)
            const payload = {
                title: formData.title,
                company: formData.company,
                capacity: parsedCapacity,
                available_slots: parsedCapacity,
                location: formData.location,
                description: formData.description
            }

            await API.post("/trainings", payload)
            setMessage("✅ New training field created successfully!")
            setShowAddForm(false)
            setFormData({ title: "", company: "", capacity: "", location: "", description: "" })
            fetchTrainings()
        } catch (error) {
            setMessage(`❌ Failed to create training: ${error.response?.data?.detail || "Unprivileged operation"}`)
        }
    }

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Available Trainings</h1>
                    <p className="text-gray-400 mt-1">Browse and reserve your field training slot</p>
                </div>
                
                {(isAdmin || true) && (
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition-all text-white"
                    >
                        {showAddForm ? <FaTimes /> : <FaPlus />}
                        {showAddForm ? "Cancel" : "Add Training"}
                    </button>
                )}
            </div>

            {message && (
                <div className="mb-6 p-4 rounded-xl bg-[#0B1739] border border-blue-500 text-blue-300">
                    {message}
                </div>
            )}

            {showAddForm && (
                <form 
                    onSubmit={handleCreateTraining}
                    className="bg-[#0B1739] p-6 rounded-2xl mb-8 space-y-4 max-w-2xl border border-blue-500/20"
                >
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FaBriefcase className="text-blue-400" />
                        Create New Training Field
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Training Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="bg-[#131F4C] text-white p-3 rounded-xl outline-none text-sm w-full"
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="bg-[#131F4C] text-white p-3 rounded-xl outline-none text-sm w-full"
                        />
                        <input
                            type="number"
                            name="capacity"
                            placeholder="Max Student Capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            required
                            className="bg-[#131F4C] text-white p-3 rounded-xl outline-none text-sm w-full"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="bg-[#131F4C] text-white p-3 rounded-xl outline-none text-sm w-full"
                        />
                    </div>
                    
                    <textarea
                        name="description"
                        placeholder="Detailed Description..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="bg-[#131F4C] text-white p-3 rounded-xl outline-none text-sm w-full resize-none"
                    />
                    
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-white transition-all text-sm"
                    >
                        Save Training Opportunity
                    </button>
                </form>
            )}

            {loading ? (
                <p className="text-gray-400">Loading trainings...</p>
            ) : trainings.length === 0 ? (
                <p className="text-gray-400">No trainings available yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {trainings.map((training, index) => (
                        <TrainingCard 
                            key={index} 
                            training={training} 
                            onReserve={handleReserve} 
                            onDelete={handleDelete}
                            isAdmin={isAdmin || true} // set to true for easy testing
                        />
                    ))}
                </div>
            )}
        </MainLayout>
    )
}

export default Trainings