import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Calculator from '../Pages/Calculator'
import Customers from '../Pages/Customers'
import Databases from '../Pages/Databases'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Calculator />}></Route>
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/databases' element={<Databases />}></Route>
        </Routes>
    )
}

export default AppRoutes