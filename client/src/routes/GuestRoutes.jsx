import { Navigate, Outlet } from 'react-router-dom'
import { useCart } from "../context/CartContext"

function GuestRoutes() {
    const { admin } = useCart()

    return (
        !admin ? <Outlet /> : <Navigate to="/admin/orders" />
    )
}

export default GuestRoutes