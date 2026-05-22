import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authservices"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({

        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await registerUser(formData)

            alert("Account Created 🔥")

            navigate("/")

        } catch (error) {
    console.log(error.response?.data || error)
    alert("Register Failed")
    }
    }

    return (

        <div className="min-h-screen bg-[#070F2B] flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-[#0B1739] p-10 rounded-2xl w-[400px]"
            >

                <h1 className="text-white text-4xl mb-8 font-bold">

                    Register

                </h1>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="w-full mb-5 p-4 rounded-xl bg-[#131F4C] text-white outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-5 p-4 rounded-xl bg-[#131F4C] text-white outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-5 p-4 rounded-xl bg-[#131F4C] text-white outline-none"
                />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-white font-bold"
                >

                    Register

                </button>

            </form>

        </div>
    )
}

export default Register