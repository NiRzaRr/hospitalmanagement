import React, { useEffect, useState, useRef } from "react";
import  service  from "../appwrite/service";
import InfoPreview from "../components/infoPreview";
import { useNavigate, Link} from "react-router-dom";


function AllPatient() {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allinf, setAllinf] = useState([]);
  const timeout = useRef(null)
  
  useEffect(() => {
    service.getAllInfo([]).then((inf) => {
          console.log(inf);
      if(inf){
        setAllinf(inf.documents);
      }
      else{
        navigate('/')
      }
  })},[])
  useEffect(() => {
     if(search){
      clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          const filtered = allinf.filter((e) => {return(e.name.toLowerCase().includes(search.toLowerCase()))})
           setInfo(filtered);
        }, 300);
          
      }
      else{
        clearTimeout(timeout.current);
          setInfo(allinf);
        }
    }, [search, allinf ]);
    
   

  return (allinf.length>0 ) ? (
    <div className="flex flex-col items-center justify-around w-full h-full ">
      <div className="flex flex-col md:flex-row w-[90%] md:w-3/4 gap-3 p-3 items-center justify-center">
        <input type="text" className="md:w-3/5 w-full h-8 md:h-10 rounded-md indent-0.5" 
        placeholder="Enter Patient Name To Search"
        onChange={e => setSearch(e.target.value)}/>
        <Link to="/add-info">
          <button className=" h-7 md:h-10 bg-gradient-to-r from-blue-200 to-blue-500 hover:from-blue-400 hover:to-blue-200 rounded-md p-0.5 md:p-2 font-bold text-white">
           ADD PATIENT
          </button>
        </Link>
      </div>
      <div className="hidden md:flex flex-col gap-3 w-[90%] h-4/5">
      <div className="box-border grid grid-cols-12 bg-slate-50 gap-2 h-10 items-center rounded-md text-xs font-bold lg:font-bold lg:text-base place-items-center shadow-[rgba(6,24,44,0.4)_0px_0px_0px_2px,rgba(6,24,44,0.65)_0px_4px_6px_-1px,rgba(255,255,255,0.08)_0px_1px_0px_inset]" >
        <h4 className="col-span-3">NAME</h4>
        <h4 className="col-span-3">AGE</h4>
        <h4 className="col-span-2">GENDER</h4>
        <h4 className="col-span-2">MOBILE No.</h4>
        <h4 className="col-span-2">DATE</h4>
      </div>
      <div className="flex flex-col gap-4 justify-between items-center w-full overflow-auto scrollbar">
        {info.map((data) => (
          
          <div key={data.$id} className="w-full">
            <InfoPreview {...data} />
          </div>
        ))}
      </div>
      </div>
      <div className="flex md:hidden h-4/5 flex-col w-[90%] gap-2 items-center justify-between overflow-auto scrollbar p-1">
      {info.map((data) => (
          
          <div key={data.$id} className="w-full h-full">
            <InfoPreview {...data} />
          </div>
        ))}
      </div>
    </div>
  ):(<div className="m-auto mt-11 rounded-md w-3/4 h-3/4 p-4 bg-black/35">
    <div className="animate-pulse flex flex-col items-center w-full h-full">
         <div className="flex md:flex-row flex-col w-3/4 gap-3 p-4 items-center">
            <div className="bg-white/60 h-6 w-3/4 rounded-lg"></div>
            <div className="bg-white/60 h-6 w-1/4 rounded-lg"></div>
          </div>
          <div className="flex w-4/5 flex-col items-center gap-6 pt-4">
          <div className=" bg-white/50 h-11 md:h-14 w-full rounded-lg flex flex-col items-center  justify-evenly">
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          
          </div>
          <div className=" bg-white/50 h-11 md:h-14 w-full rounded-lg flex flex-col items-center  justify-evenly">
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg "></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          </div>
          <div className=" bg-white/50 h-11 md:h-14 w-full rounded-lg flex flex-col items-center justify-evenly">
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          </div>
          <div className=" bg-white/50 h-11 md:h-14 w-full rounded-lg flex flex-col items-center  justify-evenly">
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          <div className=" bg-black/50 h-2 w-3/4 rounded-lg"></div>
          </div>
          
         </div> 
         
        </div>
      
  
  </div>)
}

export default AllPatient;
