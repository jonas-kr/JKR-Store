import { Link } from "react-router-dom"

const NotFound = () => {
    document.title = `Not Found`
    return (
        <main className="h-[calc(100vh-150px)] flex items-center">
            <div className="flex flex-col">
                <p className="text-gray-800 text-lg font-medium">404</p>
                <h1 className="text-5xl font-semibold text-gray-800 mt-5">Page not found</h1>
                <p className="text-gray-600 mt-6">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-8">
                    <Link to="/" className="bg-gray-900 py-2 px-4 text-white rounded-md ">
                        <span aria-hidden="true">←</span> Back to home</Link>
                </div>
            </div>
        </main>)
}

export default NotFound