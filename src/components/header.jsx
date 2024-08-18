import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import LogoutBtn from "./logoutBtn";
import logo from "../logoo.png"
import auth from "../appwrite/auth";
import {user, logout} from '../store/authSlice'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

function Header() {
  const admin = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [ham, setHam] = useState(false)
  const guestStatus = useSelector((state) => state.auth.guest)
  useEffect(()=>{
    auth.getAdmin()
    .then((status) => {
      if (status) {
        dispatch(user())
      } else {
        dispatch(logout())
      }
    })
  })
  console.log(admin)
  return (
    <div className="grid grid-cols-3 justify-around text-white h-[7%] lg:h-[8%] bg-slate-600/[0.3] w-screen">
      
      <div className="flex col-span-2 md:col-span-1 max-h-full overflow-hidden">
        <img src={logo} className="  object-fill max-h-full w-14 md:w-20"/>
      <span className="flex  font-medium lg:font-bold md:text-xl lg:text-2xl self-end ">MEDICAL CARE</span></div>
      
        {(admin || guestStatus )&& <ul className="hidden md:flex gap-10 place-self-center items-center md:font-semibold lg:font-bold md:text-xl lg:text-2xl h-full">
           <li className=" text-black rounded-xl group">
            <Link to="/">HOME</Link>
            <span className="block w-0 group-hover:w-full bg-amber-200 h-0.5 transition-all duration-300"></span>
          </li>
          <li  className="text-black rounded-xl group">
            <Link to="/all-patient">ALL PATIENT</Link>
            <span className="block w-0 group-hover:w-full bg-amber-200 h-0.5 transition-all duration-300"></span>
          </li>
          
          </ul> }
          
          
          {admin && (
            
              <LogoutBtn className="hidden md:block place-self-center h-3/4 md:w-2/5 lg:w-1/3 bg-gradient-to-r from-red-600 to-red-200 hover:from-red-200 hover:to-red-600 md:p-0.5 lg:p-2 md:text-base lg:text-lg  lg:font-medium ml-5"/>
            
          )}
          {(admin || guestStatus)&& <div className="block md:hidden col-start-3 place-self-end self-center mr-4 font-extrabold" onClick={() => {setHam(!ham)} }> {ham?(< RxCross2/>):<RxHamburgerMenu />}</div>}
        <ul className={`z-10 fixed flex  flex-col justify-around top-[7%] right-0 h-1/2 bg-slate-800/55 transition-all duration-300 ${ham ? 'w-1/3' : 'w-0'}`}> 
        <li className=" rounded-xl group text-center h-7" onClick={() =>{setHam(false)}}>
            <Link to="/">HOME</Link>
            <span className="block w-0 group-hover:w-full bg-amber-200 h-0.5 transition-all duration-300" ></span>
          </li>
          <li  className=" rounded-xl group text-center h-7" onClick={() =>{setHam(false)}}>
            <Link to="/all-patient">ALL PATIENT</Link>
            <span className="block w-0 group-hover:w-full bg-amber-200 h-0.5 transition-all duration-300"></span>
          </li>
          <li className="group text-center h-7" onClick={() =>{setHam(false)}}>
            <LogoutBtn className="bg-transparent hover:bg-transparent group text-center" />
            <span className="block w-0 group-hover:w-full bg-amber-200 h-0.5 transition-all duration-300 "></span>
          </li>
        </ul>
     
    </div>
  );
}

export default Header;
