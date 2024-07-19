import axios from 'axios'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  
    const [user, setUser] = useState({})
    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/api/v2/users/login', 
          {
            email: user.email,
            password: user.password
          }
        ).then((res) => {
          console.log(res.data)
          navigate('/')
        }).catch((error) => {
          console.log(error);
        })
        
    }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form className='flex flex-col bg-black shadow-xl rounded h-1/2 justify-center items-center gap-2' onSubmit={handleClick}>
        <input className='outline-none' type="text"
        placeholder='email'
        onChange={(e) => setUser({...user, email: e.target.value})} />
        
        <input className='outline-none' type="password"
        placeholder='Password'
        onChange={(e) => setUser({...user, password: e.target.value})} />
        <button className='text-white bg-green-400 p-1 rounded px-3' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
