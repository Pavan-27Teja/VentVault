import React, { useContext, useState } from 'react'
import { Alert } from '../../components';
import { registerUser } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  // Use user context

  const { setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // Form data
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    passwordConfirm:''
  });
  
  const handleRegister =async (e)=>{
      e.preventDefault();
      try{
          // Register
          await registerUser(formData.email,formData.password,formData.passwordConfirm);
          setUser({email:formData.email,posts:[]});
          navigate('/dashboard')
      }catch(error){
        setError(error.message);
      }
  }
  return (
    <section  >
      <div className='flex justify-center  '>
        <div className='card' >
          <h1 className='title'>
            Create a new Account
          </h1>
          <form className='flex mt-10 flex-col gap-3' onSubmit={handleRegister} >
            <input type="email" placeholder='Email address' value={formData.email} onChange={(e) => { setFormData({...formData, email:e.target.value}) }} className='input' autoFocus />
            <input type="password" placeholder='Password' value={formData.password} onChange={(e) => { setFormData({...formData, password: e.target.value}) }} className='input' />
            <input type="password" placeholder='Confirm Password' value={formData.passwordConfirm} onChange={(e) => { setFormData({...formData, passwordConfirm: e.target.value}) }} className='input' />
            <button className='btn' type='submit'>
              Register
            </button>

          </form>
          {error && <Alert msg={error} />}
        </div>
      </div>




    </section>
  )
}

export default Register