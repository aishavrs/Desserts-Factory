import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './Pages/HomePage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import CartProvider from './Context/CartContext'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './Context/AuthContext'

function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/sign-in' element={<SignInPage/>}/>
          <Route path='/sign-up' element={<SignUpPage/>}/>
        </Routes>
        <ToastContainer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
