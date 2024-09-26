import { Navigate, Outlet } from 'react-router-dom'
import { useCart } from "../context/CartContext"
function UserAuthRoutes() {
    const { user } = useCart()
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default UserAuthRoutes