import {useContext, useState } from 'react'
import { Alert } from '../../components';
import { loginUser } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  // Use User Context
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate()
   // Error State
  const [error, setError] = useState(null);
  // Form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleLogin =async (e)=>{
      e.preventDefault();
      try{
          // Login the User
          await loginUser(email,password);
          // Update the user state
          setUser({email,posts:[]})
          console.log(user)
          // Navigate to Dashboard
          navigate('/dashboard')
      }catch(error){
        setError(error.message)
      }
  }
  return (
    <section  >
      <div className='flex justify-center  '>
        <div className='card' >
          <h1 className='title'>
            Login to your account
          </h1>
          <form className='flex mt-10 flex-col gap-3' onSubmit={handleLogin} >
            <input type="email" placeholder='Email address' value={email} onChange={(e) => { setEmail(e.target.value) }} className='input' autoFocus />
            <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='input' />
            <button className='btn' type='submit'>
              Login
            </button>

          </form>
          {error && <Alert msg={error} />}
        </div>
      </div>




    </section>
  )
}

export default Login