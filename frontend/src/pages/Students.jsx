import { useEffect, useState } from "react"
import { getStudents } from "../services/studentService"

function Students() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {

        try {

            const response = await getStudents()

            setStudents(response.data)

        } catch (error) {

            console.log(error)

        }
    }

    return (

        <div>

            <h1>Students</h1>

            {
                students.map((student, index) => (

                    <div key={index}>

                        <h2>{student.name}</h2>

                        <p>{student.subject}</p>

                        <hr />

                    </div>

                ))
            }

        </div>
    )
}

export default Students