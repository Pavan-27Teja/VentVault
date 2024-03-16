import React, { useContext } from 'react'
import { UserContext } from '../contexts';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoutes = () => {
    const {user} = useContext(UserContext)
    return !user.email ? <Outlet/> : <Navigate to="/dashboard"/>;
}

export default GuestRoutes