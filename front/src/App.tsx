import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout'
import Home from './pages/home'
import Login from './pages/login'
import Products from './pages/products'
import Signup from './pages/signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Layout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
