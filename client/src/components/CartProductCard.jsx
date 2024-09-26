import { assets } from "../assets/frontend_assets/assets"
import { useCart } from "../context/CartContext";

import { useState } from "react"

const CartProductCard = ({ props }) => {
    const { dispatch, cart } = useCart()
    const [quantity, setQuantity] = useState(props.quantity)

    const removeFromCart = () => {
        if (cart.length == 1) {
            return dispatch({
                type: "CLEAR_CART"
            })
        }
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: {
                size: props.size, id: props.id, color: props.color,quantity: props.quantity
            }
        });
    };
    const updateQuantity = (quantity) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: {
                size: props.size, id: props.id, quantity, color: props.color
            }
        });
    }

    return (
        <div>
            <div className="py-3 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[5fr_1.2fr_0.5fr] items-center gap-4">
                <div className=" flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={props.image} alt="product" />
                    <div>
                        <p className="text-xs sm:text-lg font-medium">{props.name}</p>
                        <div className="flex items-center gap-5 mt-2">
                            <p>DA{props.price}</p>
                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{props.size}</p>
                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{props.color}</p>
                        </div>
                    </div>
                </div>
                <input className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min="1" value={quantity}
                    onChange={(e) => {
                        setQuantity(e.target.value)
                        updateQuantity(parseInt(e.target.value))
                    }} />
                <img className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="bin"
                    onClick={removeFromCart} />
            </div>
        </div>)
}

export default CartProductCard