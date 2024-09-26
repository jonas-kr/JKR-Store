import { Link } from "react-router-dom"
import { assets } from "../assets/frontend_assets/assets"
import { deleteProduct } from "../controllers/productController"


const AdminProductCard = ({ props }) => {
    const handleProductDelete = async (e) => {
        e.preventDefault()
        if (!confirm("Are you sure to delete!")) return 0
        try {
            const res = deleteProduct(props._id)
        } catch (error) {
            alert(error.message)
        }

    }

    return (

        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
            <img className="w-12" src={props.images[0]} alt="image" />
            <p>{props.name}</p>
            <p>{props.category}</p>
            <p>DA{props.salePrice ? props.salePrice : props.basePrice}</p>
            <p className="flexCenter gap-4">
                <Link to={`/admin/list/${props.id}`}>
                    <img src={assets.edit_icon} alt="edit" className="w-6" />
                </Link>
                <img src={assets.bin_icon} alt="bin" className="w-5 cursor-pointer" onClick={handleProductDelete} />
            </p>
        </div>

    )
}

export default AdminProductCard