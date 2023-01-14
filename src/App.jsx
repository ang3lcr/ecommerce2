
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Purchases from "./pages/Purchases"
import NavBar from "./components/NavBar"
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductsThunk } from './store/slices/products.slice'
import ProtectedRoutes from './components/ProtectedRoutes'
import { getCartThunk } from './store/slices/cart.slice'





function App() {

  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<ProductDetail />}/>
          <Route path="/login" element={<Login />}/>
      <Route element={<ProtectedRoutes />}>
         <Route path="/purchases" element={<Purchases />}/>
      </Route>
      </Routes>
    </HashRouter>



      
  )
}

export default App
