

import './index.css'
import { Layout } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Dashboard from './pages/users/Dashboard'
import { Home, Create, Update } from './posts'
import AuthRoutes from './Routes/AuthRoutes'
import GuestRoutes from './Routes/GuestRoutes'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<AuthRoutes />}>
              <Route path='create' element={<Create />} />
              <Route path='update' element={<Update />} />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
            <Route element={<GuestRoutes />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />

            </Route>


          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
