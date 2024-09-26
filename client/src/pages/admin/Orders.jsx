import React, { useEffect, useState } from 'react'
import OrderCard from '../../components/OrderCard'
import { getOrders } from '../../controllers/adminController'

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await getOrders()
            setOrders(res.orders)
        }
        getData()
    }, [])
    return (
        <div>
            <h3>Orders page</h3>
            <div>
                {orders && orders.map((o, i) => (<OrderCard props={o} key={i} />))}
            </div>
        </div>
    )
}

export default Orders