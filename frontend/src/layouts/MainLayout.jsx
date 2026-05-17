import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {

    return (

        <div className="flex bg-[#070F2B] min-h-screen text-white">

            <Sidebar />

            <div className="flex-1 p-6">

                <Navbar />

                <div className="mt-6">

                    {children}

                </div>

            </div>

        </div>
    )
}

export default MainLayout