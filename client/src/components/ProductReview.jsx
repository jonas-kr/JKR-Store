import { useEffect, useState } from 'react'
import { getReviews } from '../controllers/userController';

const ProductReview = ({ props }) => {
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const res1 = await getReviews({ productId: props.id })
            setCount(res1.count)
            setRating(res1.mid)
        }
        getData()
    }, [])

    return (
        <div className="flexCenter sm:justify-start gap-1" >
            <span > ({count&&count})</span>
            <div>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= Math.round(rating && rating) ? " text-orange-500" : "text-gray-600"}
                        >
                            <span className="text-lg">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <span className='text-sm font-light text-gray-600'>{rating && rating.toFixed(1)} Out of 5</span>
        </div>
    )
}

export default ProductReview