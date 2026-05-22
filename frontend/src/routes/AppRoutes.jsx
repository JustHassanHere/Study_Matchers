import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/DashBoard"
import Students from "../pages/Students"
import Trainings from "../pages/Trainings"
import ProtectedRoute from "./ProtectedRoute"
import Match from "../pages/Match"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />

                <Route path="/students" element={
                    <ProtectedRoute><Students /></ProtectedRoute>
                } />

                <Route path="/trainings" element={
                    <ProtectedRoute><Trainings /></ProtectedRoute>
                } />

                <Route path="/match" element={
                    <ProtectedRoute><Match /></ProtectedRoute>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes