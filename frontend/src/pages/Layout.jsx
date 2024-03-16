import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { NavLogo } from '../assets';

const Layout = () => {
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout =()=>{
    setUser({email:null,posts:[]});
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/')

  };
  return (
    <div>
        <header className=' bg-[#FCFCFB] py-3 '>
            <div className="container">
            <nav className='w-full relative text-3xl flex items-center justify-between  text-[#403F44]'>
                <Link to="/" title='Home' className="nav-link flex items-center gap-5 "><img src={NavLogo} width={80} alt="" /><div className='container font-serif text-4xl font-semibold '>
          VentVault
          </div></Link>
                {user.email ?(
                <div className='flex items-center   relative gap-2'>
                  <Link title='Create Post'
                    to="/create"
                    className='fa-solid fa-circle-plus nav-link'>
                  </Link>
                  <Link title='Dashboard'
                    to="/dashboard"
                    className='fa-solid fa-circle-user nav-link'>
                  </Link>
                  <button title='Logout' onClick={handleLogout} className='fa-solid nav-link fa-right-from-bracket'></button>
                </div>): (
                  <div className='flex gap-10'>
                  <Link to="/login" title='Login' className="nav-link  fa-solid fa-right-to-bracket"></Link>
                  <Link to="/register" title='Register' className="nav-link  fa-solid fa-user-plus"></Link>
                  </div>
                )}
                
            </nav>
            </div>
            
        </header>
        <main className='bg-[#CFCFD1] py-10'>
          
            
          
            <Outlet/>
        </main>
        <footer className='flex py-5 bg-[#FCFCFB] justify-center '>
                    <img src={NavLogo} width={100} alt="" />
        </footer>
    </div>
  )
}

export default Layout