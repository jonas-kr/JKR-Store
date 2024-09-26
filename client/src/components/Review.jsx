import { useEffect, useState } from 'react'
import { URL } from '../assets/frontend_assets/assets'
import { assets } from "../assets/frontend_assets/assets";

const Review = ({ props }) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${URL}/api/auth/10`)
            const data = await res.json()
            setUser(data)
        }
        getData()
    }, [])
    return (
        <div className="gap-4 border px-6 py-4 text-sm mt-2">
            <div className="flex items-center gap-2 mb-3">
                <img src={assets.profile_icon} alt="profile" className="w-5" />
                <h2 >{user && user.fullName}</h2>
                <div className="flexCenter sm:justify-start ">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= props.stars ? " text-orange-500" : "text-gray-600"}
                            >
                                <span className="text-lg">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <p className="text-base">{props.comment}</p>
        </div>
    )
}

export default Review