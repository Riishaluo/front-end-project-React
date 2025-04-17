import { Navigate } from "react-router-dom"



const ProtectedRoute = ({children})=>{
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    console.log(isLoggedIn)
    return isLoggedIn ? children : <Navigate to="/admin/login" replace />
}


export default ProtectedRoute