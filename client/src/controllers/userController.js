import { URL } from "../assets/frontend_assets/assets";

const newOrder = async ({ totalPrice, cart, billingInfo }) => {

    const info = JSON.stringify({ totalPrice, cart, billingInfo })
    const res = await fetch(`${URL}/api/orders/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const newReview = async ({ productId, stars, comment }) => {
    const info = JSON.stringify({ productId, stars, comment })
    const res = await fetch(`${URL}/api/reviews/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: info,
    })
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const getReviews = async ({ productId }) => {
    const res = await fetch(`${URL}/api/reviews/${productId}`)
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}


export { newOrder, newReview,getReviews }