import { Outlet } from "react-router-dom"
import Header from "../../components/Header.jsx"
import Footer from "../../components/Footer.jsx"

function Layout() {
    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] 2xl:px-[11vw]'>
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout