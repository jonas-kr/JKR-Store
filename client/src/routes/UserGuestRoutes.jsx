import { Navigate, Outlet } from 'react-router-dom'
import { useCart } from "../context/CartContext"

function UserGuestRoutes() {
    const { user } = useCart()

    return (
        !user ? <Outlet /> : <Navigate to="/orders" />
    )
}

export default UserGuestRoutes