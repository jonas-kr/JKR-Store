import { Navigate, Outlet } from 'react-router-dom'
import { useCart } from "../context/CartContext"
function AuthRoutes() {
    const { admin } = useCart()
    return (
        admin ? <Outlet /> : <Navigate to="/admin" />
    )
}

export default AuthRoutes