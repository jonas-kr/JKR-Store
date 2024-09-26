import { Link } from "react-router-dom"
import { assets } from "../../assets/frontend_assets/assets"
const OrderSuccess = () => {
    document.title = `Order Success`
    return (
        <main className="h-[calc(100vh-150px)] flexCenter font-['Cairo']">
            <div className="flex flex-col text-center">
                <img className="w-10 sm:w-14 mx-auto" src={assets.check_icon} alt="check"/>
                <h1 className="text-3xl sm:text-5xl font-semibold text-gray-800 mt-6">شكرا على الطلب</h1>
                <p className="text-gray-600 mt-6 text-sm sm:text-base">لقد تلقينا طلبك وسيتم شحنه في أقل من 48 ساعة.</p>
                <div className="mt-8">
                    <Link to="/collections" className="bg-gray-900 py-2 px-4 text-white rounded-md text-sm sm:text-base">
                        <span aria-hidden="true">←</span> متابعة التسوق</Link>
                </div>
            </div>
        </main>
    )
}

export default OrderSuccess