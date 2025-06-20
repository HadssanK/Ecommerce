import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Products from './Pages/Products'
import CartDetails from './Pages/CartDetails'
import ResetPassword from './Pages/ResetPassword'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ProtectedRoute from './routes/ProtectedRoute'
import About from './Pages/About'
import ContactForm from './Pages/Contact'
import Success from './Pages/Success'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
          <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/Products" element={<Products />} />
        <Route path="/CartDetails/:id" element={<CartDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactform" element={<ContactForm/>} />
        <Route path="/success" element={<Success />} />
{/* <Route path="/cancel" element={<Cancel />} /> */}
        
      </Route>
    </Routes>
  )
}

export default App
