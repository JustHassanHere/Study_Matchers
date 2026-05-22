import { useState } from "react"
import { FaTimes, FaUserPlus } from "react-icons/fa"

function StudentForm({ onAdd, onCancel }) {

    const [formData, setFormData] = useState({
        name: "", level: "", subjects: "", age: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({ ...formData, age: parseInt(formData.age) })
        setFormData({ name: "", level: "", subjects: "", age: "" })
    }

    const inputStyle = "bg-[#131F4C] text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#0B1739] rounded-2xl p-6 mb-8 border border-blue-500 border-opacity-30"
        >
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-white">Add New Student</h2>
                <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
                    <FaTimes />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">

                <input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                />

                <input
                    name="level"
                    placeholder="Level (e.g. 3rd Year)"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                />

                <input
                    name="subjects"
                    placeholder="Subject (e.g. Computer Science)"
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                />

                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                />

            </div>

            <button
                type="submit"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-bold transition-all text-white"
            >
                <FaUserPlus /> Save Student
            </button>

        </form>
    )
}

export default StudentForm