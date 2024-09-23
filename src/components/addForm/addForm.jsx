import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import service from '../../appwrite/service';
import { useNavigate } from "react-router-dom";
import Input from '../input'
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';

export default function AddForm({info}) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
      defaultValues : {
        name: info?.name || "",
        age: info?.age || "",
        gender: info?.gender || "",
        mobile: info?.mobile || null,
        date: info?.date || "",
        disease: info?.disease || "",
        doctor: info?.doctor || "",
        medicine: info?.medicine || "",
        fees: info?.fees || null,
      }
    })
    // const [medicines, setMedicines] = useState([]);
    const [filteredmedi, setFilteredmedi]  = useState([]);
    const [prescribed, setPrescribed] = useState("");
    const [addmedi, setAddmedi] = useState([]);
    const navigate = useNavigate(); 
    const guestStatus = useSelector((state) => state.auth.guest);
    const [isLoading, setIsLoading] = useState(false);
    let medicines
    
     
    //Data from api is fetched
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('https://medicines.free.beeceptor.com/')
        console.log(response.data)
         medicines = response.data;
        (info && info.medicine) && setAddmedi([...info.medicine])
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  // Two input fields are being watched
  useEffect(() => {
      const subscription = watch((value, { name }) => {
          if (name === "dob") {
            calculateAge(value.dob);
          }
          if (name === "medicinee") {
            setPrescribed(value.medicinee);
            getMedi(value.medicinee);
          }
      });

      return () => subscription.unsubscribe();
  }, [watch]);

   
    const [currentAge, setCurrentAge] = useState({ years: 0, months: 0 });
    
    const calculateAge = (calDob) => {
        const today = new Date();
        const birthDate = new Date(calDob);

        // Calculate age in years
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday has not occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            ageYears--;
        }

        // Calculate completed months
        let ageMonths = today.getMonth() - birthDate.getMonth();
        if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
            ageMonths += 12;
        }

        setCurrentAge({ years: ageYears, months: ageMonths });
    };
    useEffect(()=>{
      setValue("age", `${currentAge.years} years and ${currentAge.months} months`)
    }, [currentAge])
    let timeout;

    //Functionality for filtering medicines and displaying 
    const getMedi = (medication) =>{
     if (medication) {
       clearTimeout(timeout);
       timeout = setTimeout(() => {
         let filtered = medicines.filter((t) =>{return(t.medicine.toLowerCase().includes(medication.toLowerCase()))});
           setFilteredmedi(filtered); 
      
       }, 500);
     } else {
      clearTimeout(timeout);
       setFilteredmedi([]);
     }
      
    }
    const setMedication = (e) =>{
      setPrescribed(e.target.textContent);
      
    }
    useEffect(() =>{
      setValue('medicinee', `${prescribed}`)
    }, [prescribed])
    const addMedicine = (e) =>{
      e.preventDefault()
      prescribed && setAddmedi( [...addmedi, prescribed] );
     }
    useEffect(() => {
      prescribed && setPrescribed("")
      console.log(addmedi)
    }, [addmedi]);


    //Form Submission
    const submit = async (data) =>{
      setIsLoading(true)
      if(guestStatus){
        alert("Please Login As Admin To Continue")
      }
      if(info){
        const updtInfo = await service.updateInfo(info.$id, {
          ...data, medicine: [...addmedi]
        });
        if(updtInfo){
          navigate(`/info/${updtInfo.$id}`);
          setIsLoading(false)
        }
      }
      else{
        const newInfo = await service.addPatient(
          {...data, medicine: addmedi}   
        )
        if(newInfo){
          navigate(`/info/${newInfo.$id}`);
          setIsLoading(false)
        }
      }
    }

    //remove particular medicine
    const clearAddmedi = (data, e) => {
      e.preventDefault();
      setAddmedi(addmedi.filter((item) => {return item !== data}))
    }
    
  return (
    <div>
      
      
        <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 bg-slate-50/90 gap-1.5 md:gap-2 lg:gap-5 p-0.5 lg:p-3 rounded-lg m-4 shadow-[rgb(0,0,0)_15px_15px_20px_-10px] text-sm md:text-base font-normal md:font-medium'>
                
                  <div className='col-span-2 md:col-span-1'>
                  <Input label="NAME : "type="text" className="h-7"
                  placeholder="Enter Full Name" 
                  {...register("name", {required: true})}/>
                  <p className="text-xs text-red-500">{errors.name?.type === "required" && "This Field Is Required"}</p>
                  </div>
               
                <div className='col-span-2 md:col-span-1'>
                  <Input label="DOB : " type="date"  className="h-7"
                  {...register("dob", {required: true})}/>
                  <p className="text-xs text-red-500">{errors.dob?.type === "required" && "This Field Is Required"}</p>
                </div>
                
                <div className='col-span-2 md:col-span-1'>
                  <Input label="CURRENT AGE: " type="text" className="h-7"
                  placeholder="Enter DOB "
                  
                  {...register("age", {required: true})}/>
                  <p className="text-xs text-red-500">{errors.age?.type === "required" && "This Field Is Required"}</p>
                </div>
                
            <div className="flex col-span-2 md:col-span-1 w-full" >
                <legend className='w-1/4'>GENDER : <p className="text-xs text-red-500">{errors.gender?.type === "required" && "This Field Is Required"}</p></legend>
                <div className="flex md:flex-col flex-row w-3/4 gap-1 ">
                <div className="flex w-full">
                <label htmlFor="male" className="md:w-1/3 lg:w-1/4">Male &nbsp;</label>         
                <input type="radio"                    
                    id="male"
                    value="Male"
                    {...register('gender', { required: true })}/></div>
                <div className="flex w-full">
                <label htmlFor="female" className="md:w-1/3 lg:w-1/4">Female  &nbsp;</label>  
                <input type="radio"
                    id="female"
                    value="Female"
                    {...register('gender', { required: true })}/>
                    </div>    
                    <div className="flex w-full">           
                <label htmlFor="other" className="md:w-1/3 lg:w-1/4">Other &nbsp; </label>
                <input type="radio"
                    id="other"
                    value="Other"
                    {...register('gender', { required: true})}/>
                    </div>
                    
                </div>  
                
            </div>
            
              <div className='col-span-2 md:col-span-1'>
                <Input label="MOBILE No. : " type="number"  className="h-7"
              placeholder='Enter Mobile Number'
              {...register('mobile', { required: true})}/>
              <p className="text-xs text-red-500">{errors.mobile?.type === "required" && "This Field Is Required"}</p>
              </div>
            
              <div className='col-span-2 md:col-span-1'>
              <Input label="DATE : " type="date" 
              {...register('date', {required: true})}/>
              <p className="text-xs text-red-500">{errors.date?.type === "required" && "This Field Is Required"}</p>
            </div>
            
            <div className='flex items-center col-span-2 md:col-span-1'>
              <label htmlFor="disease" className='w-1/4 md:w-1/3 lg:w-1/4'>DIAGNOSIS: <p className="text-xs text-red-500">{errors.disease?.type === "required" && "This Field Is Required"}</p></label>
              <textarea name="diagnosis" id="diagnosis" 
              placeholder='Describe Medical Condition' className='resize-none w-1/2 ml-0.5 rounded-xl border-2 border-gray-300 scrollbar indent-1 '
              {...register('disease', {required: true})}></textarea>
              
            </div>
            <div className='flex items-center col-span-2 md:col-span-1'>
              <label htmlFor="doctor" className='w-1/4 md:w-1/3 lg:w-1/4'>EXAMINED By: </label>
              <select name="doctor" id="doctor"
               className='resize-none w-1/2 rounded-xl border-2 border-gray-300 h-7 lg:h-9'
              {...register('doctor')}>
                <option value="Doc 01">DOC 01</option>
                <option value="Doc 02">DOC 02</option>
                <option value="Doc 03">DOC 03</option>
                <option value="Doc 04">DOC 04</option>
              </select>
              <p className="text-xs text-red-500">{errors.doctor?.type === "required" && "This Field Is Required"}</p>
            </div>
            <div className="flex max-w-fit col-span-2 md:col-span-1">
              <label htmlFor="medicinee" className="w-1/4">MEDICINE PRESCRIBED: </label>
              <div className="flex flex-col gap-1 w-1/3">
              <input 
              type="text" 
              value={prescribed}
              className="w-full md:max-w-fit xl:w-full bg-white border-2 border-gray-300 rounded-xl indent-1 h-9"
              {...register('medicinee')}/>
              <ul className='h-20 md:h-24 lg:h-28 overflow-auto scrollbar '> 
                {filteredmedi && filteredmedi.map((data) => (
                 
                  <li key={data.id} onClick={(e) =>{setMedication(e)}} className=" bg-yellow-50 border-2 border-gray-300 rounded-md hover:cursor-pointer">{data.medicine}</li>
                ))}             
              </ul>
              </div>
              <button onClick={addMedicine} className='h-9 ml-1 bg-blue-400 px-1 lg:px-3  rounded-xl lg:border-2 border-blue-600 text-white font-medium hover:bg-blue-600'>ADD</button>
              
              <ul className='hidden md:block h-20 md:h-24 lg:h-28 overflow-auto scrollbar ml-1 text-sm lg:text-base font-normal xl:font-medium min-w-fit'>
              {addmedi && addmedi.map((data, index) => (
                  <li key={index} className='bg-yellow-50 rounded-xl border-2 border-gray-300 flex justify-between'>{data}{<button className='bg-gray-300 rounded-md px-0.5' onClick={(e)=>{clearAddmedi(data, e )}}><MdDeleteForever /></button>}</li>
                ))}
                
              </ul>  
            </div>
            <ul className='flex flex-col md:hidden h-20 md:h-24 lg:h-28 overflow-auto scrollbar ml-1 text-sm lg:text-base font-normal xl:font-medium min-w-fit'>
              {addmedi && addmedi.map((data, index) => (
                  <li key={index} className='bg-yellow-50 rounded-xl border-2 border-gray-300 flex justify-between'>{data}{<button className='bg-gray-300 rounded-md px-0.5' onClick={(e)=>{clearAddmedi(data, e )}}><MdDeleteForever /></button>}</li>
                ))}
                
              </ul>  
            
              <div className="md:mx-auto xl:m-0 md:pl-5 xl:p-0 col-span-2  md:col-span-1">
              <Input label="FEES : " type="number"
              placeholder='Enter Fees' 
              {...register("fees", {required: true})}/>
              
              <p className="text-xs text-red-500">{errors.fees?.type === "required" && "This Field Is Required"}</p>
              </div>
            
            <button type='submit' className='p-0.5 md-p-1 lg-p-2 bg-green-400 hover:bg-green-700 text-white col-span-2 place-self-center w-1/2 lg:font-bold md:font-semibold font-medium text-base md:text-lg rounded-2xl h-6 md:h-8'>{isLoading ? (<div className="flex gap-2 justify-center items-center">
                <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	              <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
              </div>):(<span>SUBMIT</span>)}</button>
            </form>
    </div>
  )
}
              