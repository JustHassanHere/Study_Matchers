import { useState } from "react"
import { loginUser } from "../services/authService"

function Login() {

    const [formData, setFormData] = useState({

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

            const data = await loginUser(formData)

            localStorage.setItem(
                "token",
                data.access_token
            )

            alert("Login Success 🔥")

        } catch (error) {

            console.log(error)

            alert("Login Failed")
        }
    }

    return (

        <div className="min-h-screen bg-[#070F2B] flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-[#0B1739] p-10 rounded-2xl w-[400px]"
            >

                <h1 className="text-white text-4xl mb-8 font-bold">

                    Login

                </h1>

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

                    Login

                </button>

            </form>

        </div>
    )
}

export default Login