import { URL } from "../assets/frontend_assets/assets"

const getOrders = async () => {
    const res = await fetch(`${URL}/api/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const updateOrder= async (id,state) => {
    if (!state) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({
        state
    })
    const res = await fetch(`${URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: info
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const getUserOrders = async () => {
    const res = await fetch(`${URL}/api/orders/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}


export { getOrders,getUserOrders ,updateOrder}