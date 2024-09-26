import { Link } from "react-router-dom"

const Product = ({ props }) => {
    let difference = 100 - ((props.salePrice * 100) / props.basePrice) || null
    return (
        <Link className="text-gray-700 cursor-pointer relative" to={`/item/${props.id}`}>
            {props.salePrice && <p className="absolute top-2 left-2 bg-red-600 px-1 py-[2px] rounded-sm text-white text-sm">-{Math.floor(difference)}%</p>
            }
            <div className="overflow-hidden aspect-square rounded-md border-[0.5px] flexCenter" >
                <img className="hover:scale-110 transition ease-in-out rounded-md" src={props.images} alt={props.name} />
            </div>
            <p className="pt-3 pb-1 text-sm">{props.name}</p>
            <p className=" text-sm font-medium">DA{props.salePrice ? <>{props.salePrice}</> : <>{props.basePrice}</>}</p>
        </Link>
    )
}

export default Product