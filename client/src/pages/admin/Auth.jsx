import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../controllers/authController'
import { useCart } from '../../context/CartContext';
import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { setAdmin, setUser } = useCart()

  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(email, password)
      localStorage.clear()
      setUser(null)
      localStorage.setItem('Admin', JSON.stringify({ admin: true }))
      setAdmin(JSON.stringify({ admin: true }))
      navigate('/admin/orders')
    } catch (error) {
      showErrorAlert(error.message)
    }
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={login}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input className="text-left rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="your@email.com" required
              value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input className="text-left rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Enter your password" required
              value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit"> Login </button>
        </form>
      </div>
    </section>)
}

export default Auth