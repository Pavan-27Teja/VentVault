import React, { useContext } from 'react'
import { UserContext } from '../contexts'
import {Outlet,  Navigate } from 'react-router-dom'

const AuthRoutes = () => {
    const {user} = useContext(UserContext)
  return user.email ? <Outlet/> : <Navigate to="/login"/>;
};

export default AuthRoutes;