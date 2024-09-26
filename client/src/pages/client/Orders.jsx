import { useEffect, useState } from "react"
import { getUserOrders } from "../../controllers/adminController"
import UserOrderCard from "../../components/UserOrderCard"


const Orders = () => {
    const [orders, setOrders] = useState([])

    document.title = `Orders`
    
    useEffect(() => {
        const getData = async () => {
            const res = await getUserOrders()
            setOrders(res.orders)
        }
        getData()
    }, [])
    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <div className=" flex-row-reverse gap-2 flex items-center  mb-3 font-['Cairo']">
                    <p className="text-gray-500">قائمة <span className="text-gray-700 font-medium">طلبياتي</span></p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                {orders ? <div className="transition-opacity ease-in duration-500 opacity-100">
                    {orders && orders.map((o) => <>
                        {o.cart.map(p => (
                            <UserOrderCard
                                img={p.image}
                                name={p.name}
                                size={p.size}
                                color={p.color}
                                price={p.price}
                                date={o.createdAt}
                                quantity={p.quantity}
                                state={o.state} />
                        ))}
                    </>)}
                </div> : <p className="text-center text-base text-gray-700">No orders yet</p>}
            </div>

        </div>
    )
}

export default Orders