import React, { useState } from 'react'


const Success = ({msg}) => {
    const [show,setShow] = useState(true)
    setTimeout(()=>setShow(false),2000)
  return (
    <div>
        {show && ( <div className='py-3 rounded-lg  mt-2 font-semibold bg-green-600 px-4 text-white '>{msg} <i className="fa-solid fa-circle-check"></i></div>)}
    </div>
   
  )
}

export default Success