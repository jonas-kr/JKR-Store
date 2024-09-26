import { assets } from "../assets/admin_assets/assets"
import { useEffect, useState } from "react"
import { updateOrder } from "../controllers/adminController"

const OrderCard = ({ props }) => {
    const [state, setState] = useState(props.state)

    const handleStateUpdate = async () => {
        event.preventDefault()
        try {
            const res = await updateOrder(props._id, state)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        handleStateUpdate()
    }, [state])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img className="w-12" src={assets.parcel_icon} alt="parcel" />
            <div>
                <div>
                    {props.cart.map((p, i) =>
                        (<p className="py-0.5" key={i}> {p.name} x {p.quantity} <span> {p.size} </span> <span> {p.color} </span> ,</p>))}
                </div>
                <p className="mt-3 font-medium">{props.billingInfo.firstName} {props.billingInfo.lastName}</p>
                <div>
                    <p>Phone Number: <span className="font-medium">{props.billingInfo.phone}</span></p>
                    <p className="font-medium">{props.billingInfo.street}, {props.billingInfo.mnplct}, {props.billingInfo.state}</p>
                </div>
            </div>
            <div>
                <p className="text-sm sm:text-[15px]">Items : {props.cart.length}</p>
                <p>Date : {new Date(props.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <p className="text-base font-medium sm:text-lg">DA{props.totalPrice}</p>
            <div className="h-full flexBetween items-end sm:flex-col">
                <select className="p-2 rounded-sm font-semibold" value={state} onChange={(e) => { setState(e.target.value) }}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <h2 className="text-3xl font-bold">{props.billingInfo.state}</h2>
            </div>
        </div>
    )
}

export default OrderCard