import { URL } from "../assets/frontend_assets/assets";

const addProduct = async (name, description, images, basePrice, salePrice,
    category, subCategory, sizes, bestSeller, colors) => {

    if (!name || !description || !images || !basePrice
        || !category || !subCategory || !sizes || !colors
    ) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({
        name, description, images, basePrice, salePrice,
        category, subCategory, sizes, bestSeller, colors
    })
    const res = await fetch(`${URL}/api/products/new`, {
        method: 'POST',
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

const updateProduct = async (name, description, images, basePrice, salePrice,
    category, subCategory, sizes, bestSeller, colors, id) => {

    if (!name || !description || !images || !basePrice
        || !category || !subCategory || !sizes || !colors
    ) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({
        name, description, images, basePrice, salePrice,
        category, subCategory, sizes, bestSeller, colors
    })
    const res = await fetch(`${URL}/api/products/${id}`, {
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

const deleteProduct = async (id) => {
    const res = await fetch(`${URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const getProducts = async ({ page, category, limit, title, bestSeller, subCategory, lth, rlvnt, htl }) => {
    const res = await fetch(`${URL}/api/products?title=${title}&page=${page}&limit=${limit}&category=${category}&subCategory=${subCategory}&bestSeller=${bestSeller}&lth=${lth}&htl=${htl}&rlvnt=${rlvnt}`)
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}

const getProduct = async (id) => {
    const res = await fetch(`${URL}/api/products/${id}`)
    const data = await res.json()
    if (!res.ok) {
        throw Error(data.error)
    }
    return data
}


export { addProduct, getProducts, getProduct, updateProduct, deleteProduct }