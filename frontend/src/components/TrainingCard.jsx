import { FaMapMarkerAlt, FaUsers, FaLock, FaTrash } from "react-icons/fa"

function TrainingCard({ training, onReserve, onDelete, isAdmin = true }) {

    const isFull = training.available_slots <= 0

    return (
        <div className="bg-[#0B1739] rounded-2xl p-6 flex flex-col justify-between border border-transparent hover:border-blue-500 transition-all duration-200 relative">

            {/* Trashcan Delete Button in the Top Right Corner */}
            {isAdmin && (
                <button
                    onClick={() => onDelete(training.title)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-10 p-2 rounded-lg transition-all"
                    title="Delete Opportunity"
                >
                    <FaTrash />
                </button>
            )}

            <div>
                <h2 className="text-xl font-bold text-white mb-2 pr-8">{training.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{training.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {training.location || "Location TBA"}
                </div>

                <div className="flex items-center gap-2 text-sm mt-2">
                    <FaUsers className={isFull ? "text-red-400" : "text-green-400"} />
                    <span className={isFull ? "text-red-400" : "text-green-400"}>
                        {isFull ? "No slots available" : `${training.available_slots} slots available`}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onReserve(training.title)}
                disabled={isFull}
                className={`mt-6 w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-all ${
                    isFull
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
                {isFull ? <><FaLock /> Full</> : "Reserve Slot"}
            </button>

        </div>
    )
}

export default TrainingCard