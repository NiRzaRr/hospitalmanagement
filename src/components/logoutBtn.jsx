import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import auth from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useNavigate} from 'react-router-dom'

function LogoutBtn({className}) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false)
    const signOut =() => {
      setIsLoading(true)
        auth.logoutAdmin().then(() => 
            {dispatch(logout());
              setIsLoading(false);
              navigate('/')
            }
    )
    }
  return (
    <button onClick={signOut} className={`h-11 w-1/4 rounded-xl text-center bg-slate-300/70 hover:bg-slate-300/50 ${className}`}>
        {isLoading? (<div className="flex gap-2 justify-center items-center">
                <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
              </div>):(<span> LOGOUT</span>)}    </button>
  )
}

export default LogoutBtn;