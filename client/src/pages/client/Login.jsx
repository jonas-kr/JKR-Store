import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../controllers/authController'
import { useCart } from '../../context/CartContext';
import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { setUser, setAdmin } = useCart()

  const navigate = useNavigate()

  document.title = `Login`

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(email, password)
      localStorage.clear()
      setAdmin(null)
      localStorage.setItem('User', JSON.stringify({ user: true }))
      setUser(JSON.stringify({ user: true }))
      navigate('/orders')
    } catch (error) {
      showErrorAlert(error.message)
    }
  }

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 font-['Cairo']">
      <ToastContainer />
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className=" text-3xl">تسجيل الدخول</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="البريد الالكتروني" required value={email}
        onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} />
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="كلمة المرور" required value={password}
        onChange={(e) => { setPassword(e.target.value) }} />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <Link to="/register"><p className=" cursor-pointer font-medium">ليس لديك حساب؟ قم بإنشاء حساب</p></Link>
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4"
        onClick={login}>تسجيل الدخول</button>
    </form>
  )
}

export default Login