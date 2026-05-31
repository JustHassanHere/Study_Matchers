import { Link } from "react-router-dom"
import { 
    FaGraduationCap, FaClipboardCheck, FaBrain, 
    FaUserShield, FaCheckCircle, FaArrowRight 
} from "react-icons/fa"

function Home() {
    return (
        <div className="min-h-screen bg-[#070F2B] text-white">

            {/* ── NAVBAR ── */}
            <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
                <div className="flex items-center gap-2 text-xl font-bold text-blue-400">
                    <FaGraduationCap className="text-2xl" />
                    Study Matcher
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white text-sm font-medium transition-all"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* ── HERO SECTION ── */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-28">
                <span className="bg-blue-600 bg-opacity-20 text-blue-400 border border-blue-500 border-opacity-30 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
                    University Field Training Platform
                </span>

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
                    Find Your Perfect
                    <span className="text-blue-400"> Field Training </span>
                    Opportunity
                </h1>

                <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
                    Study Matcher helps university students discover, reserve, and manage 
                    field training placements — all in one clean, simple platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/register"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all"
                    >
                        Create Free Account <FaArrowRight />
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-[#0B1739] hover:bg-[#131F4C] border border-gray-700 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all"
                    >
                        Sign In to Dashboard
                    </Link>
                </div>
            </section>

            {/* ── FEATURES SECTION ── */}
            <section className="px-10 py-16 border-t border-gray-800">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Everything You Need
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    <div className="bg-[#0B1739] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all">
                        <div className="bg-blue-600 bg-opacity-20 p-4 rounded-xl text-blue-400 text-2xl w-fit mb-5">
                            <FaClipboardCheck />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Easy Reservations</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Browse all available field training slots and reserve your place 
                            in one click. Real-time slot tracking so you never miss a spot.
                        </p>
                    </div>

                    <div className="bg-[#0B1739] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all">
                        <div className="bg-purple-600 bg-opacity-20 p-4 rounded-xl text-purple-400 text-2xl w-fit mb-5">
                            <FaBrain />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our matching engine automatically groups students by subject 
                            and connects them to the most suitable training opportunities.
                        </p>
                    </div>

                    <div className="bg-[#0B1739] p-8 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all">
                        <div className="bg-green-600 bg-opacity-20 p-4 rounded-xl text-green-400 text-2xl w-fit mb-5">
                            <FaUserShield />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Secure & Protected</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            JWT-based authentication with role-based access control keeps 
                            your data private and your account protected at all times.
                        </p>
                    </div>

                </div>
            </section>

            {/* ── HOW IT WORKS SECTION ── */}
            <section className="px-10 py-16 border-t border-gray-800">
                <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                </h2>

                <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">

                    {[
                        { step: "01", title: "Create Your Account", desc: "Register with your university email and set up your student profile in seconds." },
                        { step: "02", title: "Browse Trainings", desc: "Explore available field training opportunities filtered by your subject and location." },
                        { step: "03", title: "Reserve Your Slot", desc: "Click Reserve and your placement is instantly confirmed in the system." },
                    ].map((item) => (
                        <div key={item.step} className="flex-1 bg-[#0B1739] p-6 rounded-2xl border border-gray-800">
                            <span className="text-4xl font-extrabold text-blue-600 text-opacity-40">
                                {item.step}
                            </span>
                            <h3 className="text-lg font-bold mt-3 mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="px-10 py-20 border-t border-gray-800">
                <div className="bg-[#0B1739] border border-blue-500 border-opacity-20 rounded-3xl p-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                        Join hundreds of university students already using Study Matcher 
                        to secure their field training placements.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-bold text-white transition-all text-sm"
                    >
                        Create Free Account <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-gray-800 px-10 py-6 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-2 font-bold text-gray-400">
                    <FaGraduationCap />
                    Study Matcher
                </div>
                <p>Built as a university full-stack software engineering project.</p>
            </footer>

        </div>
    )
}

export default Home