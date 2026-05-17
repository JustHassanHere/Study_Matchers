import MainLayout from "../layouts/MainLayout"

function Dashboard() {

    return (

        <MainLayout>

            <div>

                <div className="grid grid-cols-3 gap-6">

                    <div className="bg-[#0B1739] p-6 rounded-2xl">

                        <h3 className="text-xl">

                            Total Students

                        </h3>

                        <p className="text-4xl mt-4 font-bold">

                            120

                        </p>

                    </div>

                    <div className="bg-[#0B1739] p-6 rounded-2xl">

                        <h3 className="text-xl">

                            Trainings

                        </h3>

                        <p className="text-4xl mt-4 font-bold">

                            15

                        </p>

                    </div>

                    <div className="bg-[#0B1739] p-6 rounded-2xl">

                        <h3 className="text-xl">

                            Reservations

                        </h3>

                        <p className="text-4xl mt-4 font-bold">

                            83

                        </p>

                    </div>

                </div>

            </div>

        </MainLayout>
    )
}

export default Dashboard