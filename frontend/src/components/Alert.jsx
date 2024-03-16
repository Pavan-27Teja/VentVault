import React from 'react'

const Alert = ({msg}) => {
  return (
    <div className='py-3 rounded-lg  mt-2 font-semibold bg-red-600 px-4 text-white '>{msg} <i className="fa-solid fa-circle-exclamation"></i></div>
  )
}

export default Alert