import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import Login from "../components/login";
import LogoutBtn from "../components/logoutBtn";
import  auth  from "../appwrite/auth";
import {user, logout} from '../store/authSlice'

function Home() {
  const adminStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true);
    auth.getAdmin()
    .then((status) => {
      if (status) {
        dispatch(user())
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setIsLoading(false))
  }, [])
  return (
    <div className="h-full">
      {adminStatus? (
        <div className="flex flex-col items-center justify-center gap-4 bg-slate-600/[0.3] text-white h-full">
          <h2 className="font-bold text-2xl md:text-4xl">You Are Already LoggedIn !!</h2>
          <div className="flex w-full justify-center text-xl md:text-2xl font-bold gap-4 place-items-center"><h4>To Logout :</h4> <LogoutBtn /></div>
        </div>
        
      ) : (<div className="h-full">{isLoading ? (<div className="flex justify-center items-center h-full"><div className=" h-16 w-16 rounded-full border-4 border-t-0 border-r-0 mt-[-2px] border-white animate-spin"></div></div>):(<><Login /></>)}
      </div>
        
      )}
    </div>
  );
}

export default Home;
