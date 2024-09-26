import { useState, useEffect } from "react";
import { newReview, getReviews } from "../controllers/userController"
import Review from "./Review";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorAlert } from "../assets/ErrorHandler";

const GiveReview = ({ props }) => {
    const { user } = useCart()
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [comment, setComment] = useState("")

    const [reviews, setReviews] = useState([])

    const handleReview = async (e) => {
        e.preventDefault()
        if (!rating || !comment) {
            return showErrorAlert("من فضلك ضع تقييمك و تعليقك")
        }
        try {
            const res = await newReview({ productId: props.id, stars: rating, comment })
            setRating(0)
            setComment("")
        } catch (error) {
            showErrorAlert(error.message)
        }
    }
    useEffect(() => {
        const getData = async () => {
            const res1 = await getReviews({ productId: props.id })
            setReviews(res1.reviews)
        }
        getData()
    }, [comment])
    return (
        <div className="mt-20 font-['Cairo']">
            <ToastContainer />
            <div className="flex flex-row-reverse">
                <p className="border px-5 py-3 text-sm">قيم هذا المنتج</p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-4 text-sm text-gray-500">
                {user ? <>
                    <div className="flexCenter sm:justify-end">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? " text-orange-500" : "text-gray-600"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span className="text-3xl">&#9733;</span>
                                </button>
                            );
                        })}
                                                <span className="ml-2"> : تقييمك </span>

                    </div>
                    <textarea placeholder="...اكتب تعليقك هنا" rows={3} value={comment}
                        onChange={(e) => setComment(e.target.value)} className="w-full px-3 py-2"></textarea>
                    <div className="flexCenter sm:justify-end">
                        <button onClick={handleReview} className="bg-black text-white w-full sm:w-auto px-8 py-3 text-sm active:bg-gray-700"
                        >ارسال</button>
                    </div>
                </> : <div className="flexCenter flex-col text-gray-900 gap-2"> <p>يجب عليك تسجيل الدخول أولاً</p>
                    <Link to="/login" className="bg-black text-white w-full sm:w-auto px-8 py-3 text-sm active:bg-gray-700"
                    >تسجيل الدخول</Link>
                </div>}
            </div>
            {reviews && reviews.map((r, i) => (<Review key={i} props={{ userId: r.userId, stars: r.stars, comment: r.comment }} />
            ))}

        </div>
    )
}

export default GiveReview