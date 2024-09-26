import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, link }) => {

    const pages = [...Array(totalPages).keys()].map(num => num + 1)

    return (
        <div className="flexCenter gap-2 mt-6">
            {pages.map(page => (
                <Link key={page} to={`${link}/?page=${page}`}>
                    <div className={`${page === parseInt(currentPage) ?
                        'bg-gray-700 w-9 h-9 text-white flexCenter rounded-full' :
                        'bg-gray-500 w-9 h-9 text-white flexCenter rounded-full'}`}>
                        {page}
                    </div>
                </Link>
            ))}
        </div>


    )
}

export default Pagination