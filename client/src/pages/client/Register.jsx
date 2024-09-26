import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../controllers/authController'
import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  document.title = `Register`

  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser(fullName, email, password)
      navigate('/login')
    } catch (error) {
      showErrorAlert(error.message)
    }
  }

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 font-['Cairo']">
      <ToastContainer />
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">تسجيل حساب جديد</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="الاسم الكامل" required
        onChange={(e) => { setFullName(e.target.value) }} value={fullName} />
      <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="البريد الالكتروني" required
        onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} value={email} />
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="كلمة المرور" required
        onChange={(e) => { setPassword(e.target.value) }} value={password} />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <Link to="/login"><p className=" cursor-pointer font-medium">هل لديك حساب؟ قم بتسجيل الدخول هنا</p></Link>
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4"
        onClick={register}>تسجيل</button>
    </form>
  )
}

export default Register