import React, { useEffect, useState } from 'react'
import CartProductCard from '../../components/CartProductCard'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'


const Cart = () => {
    const { cart } = useCart();

    const [total, setTotal] = useState();

    document.title = `Cart`

    useEffect(() => {
        setTotal(cart.reduce((sum, product) =>
            (sum + (product.price * product.quantity)), 0))
    }, [cart]);

    if (cart.length === 0) return <main className="h-[calc(100vh-150px)] flexCenter font-['Cairo']">
        <div className="flex flex-col text-center">
            <h1 className="text-3xl sm:text-5xl font-semibold text-gray-800">لا يوجد منتج في سلة التسوق الخاصة بك</h1>
            <div className="mt-10">
                <Link to="/collections" className="bg-gray-900 py-3 px-5 text-white rounded-md text-sm">
                    <span aria-hidden="true">←</span> اذهب للتسوق</Link>
            </div>
        </div>
    </main>

    return (
        <div className="border-t pt-8 md:pt-14 flex flex-col md:flex-row gap-6 font-['Cairo']">
            <div className="w-full sm:w-2/3 ">
                <div className='text-end'>
                    <div className="inline-flex flex-row-reverse gap-2 items-center mb-4 ">
                        <p className="text-2xl text-gray-500">سلة
                            <span className="text-gray-700 font-medium"> التسوق </span>
                        </p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                </div>

                {cart && cart.map((p, i) => (<CartProductCard props={p} key={i} />))}
            </div>

            <div className="w-full sm:w-1/3">
                <div className="w-full">
                    <div className="text-2xl text-end">
                        <div className="inline-flex flex-row-reverse gap-2 items-center mb-3 text-right">
                            <p className="text-gray-500">مجاميع <span className="text-gray-700 font-medium"> السلة</span>
                            </p>
                            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700">
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-3 text-sm">
                        <div className="flex justify-between flex-row-reverse">
                            <p>المجموع الفرعي</p>
                            <p>DA {total}.00</p>
                        </div>
                        <hr />
                        <div className="flex justify-between flex-row-reverse">
                            <p>رسوم الشحن</p>
                            <p>DA 500.00</p>
                        </div>
                        <hr />
                        <div className="flex justify-between flex-row-reverse">
                            <b>المجموع</b>
                            <b>DA {total + 500}.00</b>
                        </div>
                    </div>
                </div>
                <div className="mt-3 w-full text-end">
                    <Link to='/checkout'>
                        <button className="bg-black text-white text-sm my-8 px-8 py-3">اتمام عملية الشراء</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart