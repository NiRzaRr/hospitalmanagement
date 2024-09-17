import React, {useState, useEffect} from 'react'
import service  from "../appwrite/service";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Query } from "appwrite";
// import VisitPreview from "../components/visitPreview"
import Input from './input'
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';

function VisitForm({visitInfo, stateChange, visitChange}) {
    console.log(visitInfo);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        defaultValues : {
          date: visitInfo?.date || null,
          disease: visitInfo?.disease || "",
          doctor: visitInfo?.doctor || "",
          medicine: visitInfo?.medicine || "",
          fees: visitInfo?.fees || null,
        }
      })
  const { patientId } = useParams();
//   const [info, setInfo] = useState([]);
  const navigate = useNavigate();
//   const [visit, setVisit] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [filteredmedi, setFilteredmedi]  = useState([]);
  const [prescribed, setPrescribed] = useState("");
  const [addmedi, setAddmedi] = useState([]);
  const [submitted, setSubmitted] = useState(null);
  const guestStatus = useSelector((state) => state.auth.guest);
  const [isLoading, setIsLoading] = useState(false)
//   const [edivisi, setEdivisi] = useState(null);
   
// if(visitInfo){
//    return setAddmedi([...visitInfo.medicine])
//   }
//   else{
//    return setAddmedi("")
//   }
useEffect(() => {
        axios.get('https://run.mocky.io/v3/4ee9ca1d-3c72-45e2-8d1a-6423a0d1c7f9').then((response) => {
          setMedicines(response.data);
          (visitInfo && visitInfo.medicine) && setAddmedi(visitInfo.medicine);
        })
        .catch(error => console.log(error));
      }, []); 
      useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "medicinee") {
              getMedi(value.medicinee);
              setPrescribed(value.medicinee)
            }
        });
    
        return () => subscription.unsubscribe();
    }, [watch, medicines]);
    
      let timeout;
      const getMedi = (medication) =>{
        
        if (medication) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            const filtered = medicines.filter((t) =>{return(t.medicine.toLowerCase().includes(medication.toLowerCase()))});
            setFilteredmedi(filtered); 
            console.log(filtered);
          }, 500);
        } else {
          clearTimeout(timeout);
          setFilteredmedi([])
        }
      }
      const setMedication = (e) =>{
        // <Info visitInfo={"sda"}/>
        setPrescribed(e.target.textContent);
      }
      useEffect(() => {
        setValue('medicinee', `${prescribed}`)
      },[prescribed])
      const addMedicine = (e) =>{
        e.preventDefault();
        console.log(prescribed)
        prescribed && setAddmedi([...addmedi, prescribed]);
        // setPrescribed("");
        
      }
      useEffect(() => {
        prescribed && setPrescribed("")
        console.log(addmedi)
      }, [addmedi])
      const submit = async (data) =>{
        setIsLoading(true)
        console.log(data)
        if(guestStatus){
          alert("Please Login As Admin To Continue")
          setIsLoading(false)
        }
        if(visitInfo){
            // console.log(visitInfo.medicine);
            // console.log(addmedi);
            // console.log(visitInfo.medicine.concat(addmedi));
          const updtInfo = await service.updateVisit(visitInfo.$id, {
            ...data, medicine:[ ...addmedi]
          });
          if(updtInfo){
            reset();
            navigate(`/info/${updtInfo.userId}`);
            stateChange();
            // visitChange();
            setAddmedi([])
            visitInfo.medicine = []
            setIsLoading(false)
            // setSubmitted(prev => !prev);
            
          }
        }
        else{
          const newInfo = await service.addVisit(
            {...data, userId: patientId, medicine: addmedi}    // medicines: prescribed
          )
          if(newInfo){
            console.log(newInfo.userId)
            navigate(`/info/${newInfo.userId}`);
            reset();
            // setSubmitted(prev => !prev);
            stateChange();
            setAddmedi([])
            setIsLoading(false)
          }
        }
      }
      const clearAddmedi = (data, e) => {
        e.preventDefault();
        setAddmedi(addmedi.filter((item) => {return item !== data}))
      }
  return (
    
    <div>{console.log("form")}
        <form onSubmit={handleSubmit(submit)} className='grid grid-cols-4 md:grid-cols-6 bg-slate-50 gap-0.5 md:gap-2 rounded-lg pt-0.5 pb-0 text-sm lg:text-base lg:font-medium'>
        <div className='flex  items-center col-span-2'>
              <label htmlFor="doctor" className='w-1/2md:w-1/3'>EXAMINED By : <p className="text-xs text-red-500">{errors.doctor?.type === "required" && "This Field Is Required"}</p></label>
              <select name="doctor" id="doctor"
               className='resize-none w-2/5 md:w-1/2 rounded-xl border-2 bg-white border-gray-300 h-7 lg:h-9'
              {...register('doctor', {required: true})}>
                <option value="Doc 01">DOC 01</option>
                <option value="Doc 02">DOC 02</option>
                <option value="Doc 03">DOC 03</option>
                <option value="Doc 04">DOC 04</option>
              </select>
              
               
              </div>
              <div className="col-span-2">
              {/* <label htmlFor="date">DATE: </label> */}
              <Input label="DATE : " type="date" className="text-sm lg:text-base lg:font-medium lg:h-9 md:h-7 font-normal"
              {...register('date', {required: true })}/>
              <p className="text-xs text-red-500">{errors.date?.type === "required" && "This Field Is Required"}</p>
            </div> 
            
            <div className="col-span-2">
              {/* <label htmlFor="fees">FEES: </label> */}
              <Input label="FEES : " className="text-sm lg:text-base lg:font-medium lg:h-9 w-1/2 md:h-7 font-normal"
              type="number" 
              placeholder='Enter Fees' 
              {...register("fees", {required: true})}/>
              <p className="text-xs text-red-500">{errors.fees?.type === "required" && "This Field Is Required"}</p>
            </div>
              <div className='flex  h-2/3 col-span-2'>
               <label htmlFor="disease" className="w-[41%] md:w-1/3">DIAGNOSIS: <p className="text-xs text-red-500">{errors.disease?.type === "required" && "This Field Is Required"}</p></label>
               <textarea  placeholder='Describe medical condition'
               className='resize-none  rounded-xl border-2 border-gray-300 scrollbar ml-2 md:m-0 indent-1 w-1/2 h-16  md:h-auto'
               {...register('disease', {required: true})}> 
               </textarea>
            </div>
            
            <div className="col-span-4">
              <div className="flex w-full h-fit ">
              <label htmlFor="medicinee" className="w-1/4">MEDICINE PRESCRIBED: </label>
              <div className="flex flex-col gap-1 w-1/4  ">
              <input 
              type="text" 
              value={prescribed}
              className="w-full bg-white border-2 border-gray-300 rounded-xl indent-1 h-7 lg:h-9"
              {...register('medicinee')}/>
              <ul className='h-20 w-full lg:h-24 overflow-auto scrollbar '> 
                {filteredmedi && filteredmedi.map((data) => (
                  // {console.log(data)}
                  <li key={data.id} onClick={(e) =>{setMedication(e)}} className=" bg-yellow-50 border-2 border-gray-300 rounded-md hover:cursor-pointer">{data.medicine}</li>
                ))}             
              </ul>
              </div>
              <button onClick={addMedicine} className=' h-7 lg:h-9 m-0.5 md:ml-1 bg-blue-400 md:px-3 text-xs md:text-base rounded-xl border-1 md:border-2 border-blue-600 text-white hover:bg-blue-600 w-10 md:w-auto'>ADD</button>
              {/* <div className='resize-none'> */}
                
                {/* {info.medicine} */}
              {/* </div> */}
              <ul className='h-20 lg:h-24 overflow-auto scrollbar md:ml-1'>
              {addmedi && addmedi.map((data, index) => (
                  <li key={index} className='bg-yellow-50 rounded-xl border-2 border-gray-300 flex justify-between'>{data}{<button className='bg-gray-300 rounded-md px-0.5' onClick={(e)=>{clearAddmedi(data, e )}}><MdDeleteForever /></button>}</li>
                ))}
                </ul>
                {/* {
                    visitInfo && visitInfo.medicine.map((data, index) => (
                        <p key={index}>{data}</p>
                      ))
                } */}
              {/* </textarea> */}</div>
            </div>
            
            <button type='submit' className='bg-green-400 hover:bg-green-700 text-white col-span-4 md:col-span-6 h-6 md:h-7 lg:h-9 rounded-b-md md:font-semibold lg:font-bold lg:text-lg md:text-base text-sm'>{isLoading? (<div className="flex gap-2 justify-center items-center">
                <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
              </div>):(<span>ADD VISIT</span>)}</button>
        </form>
    </div>
  )
}

export default VisitForm