import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import  auth  from '../appwrite/auth'
import {login as authLogin, guestuser, removeguest} from '../store/authSlice'
import {useNavigate} from 'react-router-dom'


function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const login = async(data) =>{
      setError("");
      setIsLoading(true);
        try {
          const loggedIn = await auth.addminLogin({...data});
              
            if(loggedIn) {
              navigate("/all-patient");
              dispatch(authLogin());
              dispatch(removeguest())
             }
        } catch (error) {
          console.log(error);
            setError(error.message);
        }
    }
    const guestlogin = ()=>{
      navigate("/all-patient");
      dispatch(guestuser());
    }
   return (
      <div className="flex flex-col items-center justify-around h-full">
            <h1 className="h-11 text-3xl pt-8 font-bold text-white">ADMIN LOGIN</h1>
            {error && <h4 className="text-lg text-red-600 font-medium">{error}</h4>}
            <form onSubmit={handleSubmit(login)} className=' flex flex-col gap-7 w-1/2 lg:w-2/5 pb-12 font-medium'>
                
                  <input type="email" className='h-11 w-full rounded-3xl placeholder:indent-3 indent-3'
                  placeholder="Enter Email" 
                  {...register("email", {required: true})}/>
                
                
                  <input type="password" className='h-11 w-full rounded-3xl placeholder:indent-3 indent-3'
                  placeholder="Enter Password"  
                  {...register("password", {required: true})}/>
              
                <button type="submit" className='h-11 w-full rounded-xl text-center bg-slate-300/[0.7] hover:bg-slate-300/[0.5]'>
                 {(isLoading && !error)? (<div className="flex gap-2 justify-center items-center">
                <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	              <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-2 w-2 bg-black rounded-full animate-bounce'></div>
              </div>):(<div className='font-semibold text-lg'>LOGIN</div>)} 
                </button>
                <div className='flex-none hover:cursor-pointer hover:underline text-white text-lg text-center' onClick={guestlogin}>Continue As Guest... </div>
                </form>
                
        </div>
     
  )
}

export default Login;