import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import { getStudents, createStudent, deleteStudent } from "../services/studentService"
import StudentCard from "../components/StudentCard"
import StudentForm from "../components/StudentForm"
import { FaPlus, FaTimes } from "react-icons/fa"

function Students() {

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => { fetchStudents() }, [])

    const fetchStudents = async () => {
        try {
            const res = await getStudents()
            setStudents(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async (data) => {
        try {
            await createStudent(data)
            setMessage("✅ Student added!")
            setShowForm(false)
            fetchStudents()
        } catch (error) {
            setMessage("❌ Failed to add student")
        }
    }

    const handleDelete = async (name) => {
        try {
            await deleteStudent(name)
            setMessage(`🗑️ "${name}" removed`)
            fetchStudents()
        } catch (error) {
            setMessage("❌ Failed to delete")
        }
    }

    return (
        <MainLayout>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Students</h1>
                    <p className="text-gray-400 mt-1">Manage all registered students</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition-all"
                >
                    {showForm ? <FaTimes /> : <FaPlus />}
                    {showForm ? "Cancel" : "Add Student"}
                </button>
            </div>

            {message && (
                <div className="mb-4 p-4 rounded-xl bg-[#0B1739] border border-blue-500 text-blue-300">
                    {message}
                </div>
            )}

            {showForm && (
                <StudentForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
            )}

            {loading ? (
                <p className="text-gray-400">Loading students...</p>
            ) : students.length === 0 ? (
                <p className="text-gray-400">No students added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {students.map((student, index) => (
                        <StudentCard key={index} student={student} onDelete={handleDelete} />
                    ))}
                </div>
            )}

        </MainLayout>
    )
}

export default Students