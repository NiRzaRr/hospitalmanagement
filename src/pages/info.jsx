import React, { useEffect, useState } from "react";
import service  from "../appwrite/service";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { Query } from "appwrite";
// import VisitPreview from "../components/visitPreview"
import VisitForm from "../components/visitForm";
import { MdDeleteForever, MdEdit } from "react-icons/md";
// import { RxHalf2 } from "react-icons/rx";
import { useSelector } from "react-redux";

function Info({visitInfo}) {
    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues : {
          date: visitInfo?.date || null,
          disease: visitInfo?.disease || "",
          doctor: visitInfo?.doctor || "",
          medicine: visitInfo?.medicine || "",
          fees: visitInfo?.fees || null,
        }
      })
  const { patientId } = useParams();
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const [visit, setVisit] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [getvisi, setGetvisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const guestStatus = useSelector((state) => state.auth.guest)
  
  useEffect(() => {
    console.log("ren")
    if (patientId) {
      service.getInfo(patientId).then((data) => {
        if (data) {
          setInfo(data);
          console.log(data.medicine.map((d) =>{return (<p>{...d}</p>)}))
          console.log(data);
          service.getVisitList([Query.equal("userId", patientId)]).then((vdata) => {
        if (vdata) {
          console.log(vdata);
          setVisit(vdata.documents);
          setIsLoading(false)
          // setSubmitted(null)
        }
      });
        }
        else{
          navigate("/all-patient");
        }
      });
    } else {
      navigate("/all-patient");
    }
  }, [patientId, navigate, submitted]);

  const deleteInfo = () => {
    if(guestStatus){
      alert("Please Login As Admin To Continue")
    }
    service.deleteInfo(info.$id).then((deleted) => {
        if(deleted){
            navigate('/all-patient')
        }
    })
  }
  const editVisitt= (id, e) => {
    e.preventDefault();
   service.getVisit(id).then((d) =>{
    if(d){
   setGetvisi(d);
   console.log(getvisi)
    }
    else{
      setGetvisi(null)
    }
   })
  }   
  const deleteVisitt= (id, e) => {
    if(guestStatus){
      alert("Please Login As Admin To Continue")
    }
    e.preventDefault();
    service.deleteVisit(id).then((d) =>{
      if(d){
         navigate(`/info/${patientId}`);
         setSubmitted(prev => !prev);
      }
    })
   }
   const stateChange= () =>{
    setSubmitted(prev => !prev);
    setGetvisi(null)
   }
  return !isLoading?(
    <div className="p-1 h-full flex flex-col gap-1 md:gap-2 lg:gap-3">
      <div className="flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-50 gap-0.5 lg:gap-1 text-sm lg:text-base lg:font-medium rounded-t-lg">
        <div>Name: &nbsp;{info.name}</div>
        <div className='md:col-span-2'>Gender: &nbsp;{info.gender}</div>
        <div>Age: &nbsp;{info.age}</div>
        <div>Mobile No: &nbsp;{info.mobile}</div>
        <div className='col-span-2'>Diagnosis : &nbsp;{info.disease}</div>
        <div>Fees: &nbsp;{info.fees}</div>
        <div>Date : &nbsp;{`${new Date(info.date).toDateString()} `}</div>
        <div className='col-span-2'>Medcinies: &nbsp; {info.medicine.map((d, index) => {return (<span key={index} >{...d}, </span>)})} </div>
        <div>Doctor:&nbsp; {info.doctor}</div>
      </div>
      <div className="flex justify-around w-full text-sm md:text-base font-medium h-5 md:h-full">
        <Link to={`/edit-info/${patientId}`} className="bg-yellow-300/90 rounded-bl-md pb-0.5 lg:p-1 w-1/2 text-center">
         <button>EDIT</button>
        </Link>
        <button onClick={deleteInfo} className="bg-red-600/90 w-1/2 rounded-br-md pb-0.5 lg:p-1 text-white">DELETE</button>
      </div></div>
      <h1 className="font-semibold lg:font-bold text-white md:text-xl">VISITS :</h1>
      <div className="grid gap-0.5 md:gap-1 lg:gap-2 overflow-auto scrollbar h-1/2"> 
      {visit.length === 0 && <h2 className="text-xl text-center text-white font-semibold">No Visits To Show</h2>}
      {visit.length !==0 && visit.map((list) => (<div key={list.$id} className="flex bg-slate-50 rounded-lg text-sm lg:text-base lg:font-medium h-fit"> 
        <div className= "w-[98%] grid grid-cols-6"> 
        <div className="col-span-3 md:col-span-2">Doctor: {list.doctor}</div>
        <div className="col-span-3 md:col-span-2">Date: {`${new Date(list.date).toDateString()} `}</div>
        <div className="col-span-6 md:col-span-2">Fees: {list.fees}</div> 
        <div className="col-span-6 md:col-span-3">Diagnosis: {list.disease}</div>
        <div className="col-span-6 md:col-span-3">Medicine: {list.medicine.map((d, index) => {return (<span key={index} >{...d}, </span>)})}</div>
        </div>
       <div className="flex flex-col "><button onClick={(e) =>editVisitt(list.$id, e) } className="bg-yellow-300/90 h-full rounded-md px-1 ">< MdEdit /></button>
       <button onClick={(e) =>deleteVisitt(list.$id, e)} className="bg-red-600/90 h-full rounded-md px-1 text-white"><MdDeleteForever /></button> </div> </div>))}
        </div>
      
      
      <div>
        {getvisi ? (<>{console.log("runnnn")}
        {console.log(getvisi)}<VisitForm visitInfo={getvisi} stateChange={stateChange} visitChange={editVisitt}/></>) : (<>{console.log("noorun")}<VisitForm stateChange={stateChange}/></>)}
      </div>
    </div>
  ):(
    <div className="m-auto mt-11 rounded-md w-4/5 h-4/5 p-4 bg-black/35">
    <div className="animate-pulse p-2 h-full flex flex-col gap-5">
    <div className="flex flex-col h-1/4">
      <div className="grid grid-cols-4 bg-slate-600 gap-3 font-medium rounded-t-lg h-full">
        <div className="bg-white/60"></div>
        <div className='col-span-2 bg-white/60'></div>
        <div className="bg-white/60"> </div>
        <div className="bg-white/60"></div>
        <div className='col-span-2 bg-white/60'></div>
        <div className="bg-white/60"></div>
        <div className="bg-white/60"></div>
        <div className='col-span-2 bg-white/60'></div>
        <div className="bg-white/60"></div>
      </div>
      <div className="flex justify-around w-full font-medium bg-slate-600">
        <div className=" rounded-bl-md p-2 w-1/2 bg-white/60">
         
        </div>
        <div className=" w-1/2 rounded-br-md p-1 bg-white/60"></div>
      </div></div>
      <div className="flex w-full h-1/4 gap-2 flex-col items-center bg-slate-600">
      <div className=" bg-white/60 w-full h-10 rounded-lg"></div>
      <div className=" bg-white/60 w-full h-10 rounded-lg"></div>
      </div>
      <div className="bg-slate-600 h-1/4 grid grid-cols-2 gap-2">
      <div className="bg-white/60 rounded-lg"></div>
      <div className="bg-white/60 rounded-lg"></div>
      <div className="bg-white/60 rounded-lg"></div>
      <div className="bg-white/60 rounded-lg"></div>
      </div>
         </div>
        </div>
      
  
  
  )
}

export default Info;
