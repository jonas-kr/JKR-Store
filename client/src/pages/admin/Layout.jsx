import { Outlet, useNavigate } from "react-router-dom"
import { assets } from '../../assets/frontend_assets/assets'
import  {assets as Assets }  from "../../assets/admin_assets/assets"
import { Link } from "react-router-dom"
import { URL } from "../../assets/frontend_assets/assets"
import { useCart } from "../../context/CartContext"

function Layout() {
    const { setAdmin } = useCart()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const res = await fetch(`${URL}/api/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            localStorage.removeItem('Admin')
            setAdmin(null)
            navigate('/admin')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <section className="bg-gray-50">
            <div className="flex items-center py-2 px-[4%] justify-between">
                <img className="w-[max(10%,80px)]" src={assets.logo} alt="logo" />
                <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm" onClick={logout}>Logout</button>
            </div>
            <main className="flex border-t-2">
                <div className="w-[18%] min-h-screen border-r-2">
                    <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                        <Link className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/admin/add">
                            <img className="w-5 h-5" src={Assets.add_icon} alt="add" />
                            <p className="hidden md:block">Add Items</p>
                        </Link>
                        <Link className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/admin/list">
                            <img className="w-5 h-5" src={Assets.order_icon} alt="order" />
                            <p className="hidden md:block">List Items</p>
                        </Link>
                        <Link className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to="/admin/orders">
                            <img className="w-5 h-5" src={Assets.order_icon} alt="order" />
                            <p className="hidden md:block">Orders</p>
                        </Link>
                    </div>
                </div>
                <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <Outlet />
                </div>
            </main>
        </section>
    )
}

export default Layout
