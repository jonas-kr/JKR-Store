import { useState } from "react"
import { assets, URL } from "../assets/frontend_assets/assets"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const Header = () => {
  const { cart, user, setUser, setSearch } = useCart()
  const [isOpened, setIsOpened] = useState(false)
  const [page, setPage] = useState("HOME")

  const logout = async () => {
    try {
      const res = await fetch(`${URL}/api/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      localStorage.removeItem('User')
      setUser(null)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative font-['Cairo']">
      <header className='py-5 flexBetween'>
        <Link to="/">
          <h1><img src={assets.logo} alt="Logo" className='w-32 sm:w-36' /></h1>
        </Link>
        <ul className='hidden md:flexCenter md:flex-row-reverse gap-5 text-[rgb(55,65,81)] text-sm font-semibold tracking-wide '>

          <li className="flex flex-col items-center gap-1">
            <Link onClick={() => { setPage("HOME") }} to="/" >الرئيسية</Link>
            {page === "HOME" && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 "></hr>}
          </li>

          <li className="flex flex-col items-center gap-1">
            <Link onClick={() => { setPage("COLLECTIONS") }} to="/collections">المجموعات</Link>
            {page === "COLLECTIONS" && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 "></hr>}
          </li>

          <li className="flex flex-col items-center gap-1">
            <Link onClick={() => { setPage("ABOUT") }} to="/about">عنا</Link>
            {page === "ABOUT" && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 "></hr>}
          </li>

          <li className="flex flex-col items-center gap-1">
            <Link onClick={() => { setPage("CONTACT") }} to="contact">اتصال</Link>
            {page === "CONTACT" && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 "></hr>}
          </li>
        </ul>
        <div className='flexCenter gap-4 sm:gap-6'>
          <Link to="/collections" onClick={() => { setSearch(prev => !prev) }}>
            <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />
          </Link>
          <div className="group relative">
            <Link to={`${!user ? "/login" : "#"}`}>
              <img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
            </Link>
            {user && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded text-right">
                <Link to="/orders"><p className="cursor-pointer hover:text-black">طلبات</p>
                </Link>
                <p className="cursor-pointer hover:text-black"
                  onClick={logout}>تسجيل الخروج</p>
              </div>
            </div>}
          </div>
          <Link to="/cart">
            <div className="relative">
              <img src={assets.cart_icon} alt="cart" className='w-5 cursor-pointer' />
              {cart.length > 0 && <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4
               bg-black text-white aspect-square rounded-full text-[8.5px]">{cart.length}</p>}
            </div>
          </Link>
          <img src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer md:hidden'
            onClick={() => { setIsOpened(true) }} />
        </div>
      </header>
      <div>

      </div>
      {isOpened && <div className="absolute  top-0 right-0 bottom-0 overflow-hidden bg-white transition-all w-full h-screen">
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => { setIsOpened(false) }}>
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="dropdown" />
            <p>Back</p>
          </div>

          <Link className={`py-2 pl-6 border-t ${page === "HOME" && "bg-black text-white"}`} 
          onClick={() => { setIsOpened(false);setPage("HOME") }} to="/" aria-current="page">HOME</Link>
          <Link className={`py-2 pl-6 border-t ${page === "COLLECTIONS" && "bg-black text-white"}`} 
          onClick={() => { setIsOpened(false);setPage("COLLECTIONS") }} to="/collections">COLLECTIONS</Link>
          <Link className={`py-2 pl-6 border-t ${page === "ABOUT" && "bg-black text-white"}`} 
          onClick={() => { setIsOpened(false);setPage("ABOUT") }} to="/about">ABOUT</Link>
          <Link className={`py-2 pl-6 border-t ${page === "CONTACT" && "bg-black text-white"}`}
           onClick={() => { setIsOpened(false);setPage("CONTACT") }} to="/contact">CONTACT</Link>
          <Link to="/admin" target="_blank" className="py-2 pl-6 border-y">ADMIN PANEL</Link>
        </div>
      </div>}
    </div>

  )
}

export default Header