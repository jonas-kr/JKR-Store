import React from 'react'

const UserOrderCard = ({ img,price,quantity,size,color ,name,date,state}) => {
    return (
        <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={img} alt="product" />
                <div>
                    <p className="sm:text-base font-medium">{name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                        <p>DA{price}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Size: {size}</p>
                        <p>Color: {color}</p>
                    </div>
                    <p className="mt-1">Date: <span className=" text-gray-400">{new Date(date).toDateString()}</span></p>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500">
                    </p>
                    <p className="text-sm md:text-base">{state}</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
            </div>
        </div>
    )
}

export default UserOrderCard