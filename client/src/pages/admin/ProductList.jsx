import { useLocation } from 'react-router-dom';
import { getProducts } from "../../controllers/productController";
import { useEffect, useState } from "react";
import AdminProductCard from "../../components/AdminProductCard";
import Pagination from "../../components/Pagination";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProductList = () => {
    const [products, setProducts] = useState([])

    const query = useQuery()
    const page = query.get('page') || 1

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getData = async () => {
            const res = await getProducts({
                category: "", subCategory: "", page,
                limit: 8, title: "", bestSeller: "", lth: false,
                rlvnt: true, htl: false
            })
            setProducts(res.products)
            setTotalPages(res.totalPages)
        }
        getData()
    }, [page])

    return (
        <>
            <p className="mb-2">All Products List</p>
            <div className="flex flex-col gap-2">
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b className="text-center">Action</b>
                </div>
                {products && products.map((p) => (<AdminProductCard key={p.id} props={p} />))}
            </div>
            <Pagination totalPages={totalPages} currentPage={page} link="/admin/list" />
        </>
    )
}

export default ProductList