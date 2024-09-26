import { URL } from "../assets/frontend_assets/assets";


/****************************** LOGIN USER *******************************/
const loginUser = async (email, password) => {
    if (!email || !password) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({ email, password })
    const res = await fetch(`${URL}/api/auth/login`, {
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

/****************************** Register USER *******************************/
const registerUser = async (fullName, email, password) => {
    if (!fullName || !email || !password) {
        throw Error('All fields are required')
    }
    const info = JSON.stringify({ email, password, fullName })
    const res = await fetch(`${URL}/api/auth/register`, {
        method: 'POST',
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

export { loginUser, registerUser }  