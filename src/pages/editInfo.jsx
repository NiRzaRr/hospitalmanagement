import React, { useEffect, useState } from 'react'
import AddForm from '../components/addForm/addForm'
import {useParams, useNavigate} from 'react-router-dom'
import  service  from '../appwrite/service'

function EditInfo() {
    const {patientId} = useParams();
    const [info, setInfo] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (patientId) {
            service.getInfo(patientId).then((inf) => {
               if(inf) {
                setInfo(inf);
                setIsLoading(false)}
                else{
                    navigate('/all-patient');
                }
            })
        } else {
            navigate('/all-patient');
        }
    },[patientId])
    
  return !isLoading? (<AddForm info={info}/> ) : (
    <div className="m-auto mt-11 rounded-md w-3/4 h-3/4 p-4 bg-black/35">
    <div className="animate-pulse flex items-center w-full h-full">
         <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className="flex justify-around">
                <div className="w-1/4 h-8 rounded-lg bg-white/60"></div>
                <div className="w-1/2 h-8 rounded-lg bg-white/60"></div>
            </div>
            <div className='col-span-2 place-self-center w-1/2 rounded-2xl h-9 bg-white/60'></div>
         </div>
        </div>
      
  
  </div>
  )
}

export default EditInfo