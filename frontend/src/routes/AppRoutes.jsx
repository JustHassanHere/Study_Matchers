import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Login from "../pages/Login"
<Route
    path="/register"
    element={<Register />}
/>
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<><ProtecetedRoute />
                    <Dashboard /></>
                    
                    }
                />

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes