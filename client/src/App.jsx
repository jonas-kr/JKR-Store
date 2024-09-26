import { BrowserRouter, Route, Routes } from 'react-router-dom'


//Admin pages
import Auth from './pages/admin/Auth'
import NewProduct from './pages/admin/NewProduct'
import ProductList from './pages/admin/ProductList'
import Orders from './pages/admin/Orders'

//Client pages
import Home from './pages/client/Home'
import Product from './pages/client/Product'
import Login from './pages/client/Login'
import Register from './pages/client/Register'
import Cart from './pages/client/Cart'
import Collections from './pages/client/Collections'
import Checkout from './pages/client/Checkout'
import Contact from './pages/client/Contact'
import About from './pages/client/About'
import ClientOrders from './pages/client/Orders'
import NotFound from './pages/client/NotFound'
import OrderSuccess from './pages/client/OrderSuccess'

//extra components
import Layout from './pages/client/Layout'
import AdminLayout from './pages/admin/Layout'
import ScrollToTop from './components/ScrollToTop'
import UpdateProduct from './pages/admin/UpdateProduct'
import AuthRoutes from './routes/AuthRoutes'
import GuestRoutes from './routes/GuestRoutes'
import UserAuthRoutes from './routes/UserAuthRoutes'
import UserGuestRoutes from './routes/UserGuestRoutes'



function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/*******     Client pages     ******/}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<UserAuthRoutes />}>
            <Route path='orders' element={<ClientOrders />} />
          </Route>

          <Route element={<UserGuestRoutes />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='cart' element={<Cart />} />
          <Route path='collections' element={<Collections />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='success' element={<OrderSuccess />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='item/:id' element={<Product />} />
        </Route>

        {/*******     Admin pages     ******/}
        <Route element={<GuestRoutes />}>
          <Route path='/admin' element={<Auth />} />
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='add' element={<NewProduct />} />
            <Route path='list' element={<ProductList />} />
            <Route path='list/:id' element={< UpdateProduct />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Route>

        <Route path='*' element={<Layout />}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
