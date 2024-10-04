import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Menu from './components/Menu'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

const Layout = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default Layout