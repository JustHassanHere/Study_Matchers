import API from "../api/axios"

export const getStudents = async () => {
    return await API.get("/students")
}

export const createStudent = async (studentData) => {
    return await API.post("/students", studentData)
}

export const deleteStudent = async (name) => {
    return await API.delete(`/students/${name}`)
}