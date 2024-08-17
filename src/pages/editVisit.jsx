import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import  service  from '../appwrite/service';
import Info from './info';



function EditVisit() {
const [visit, setVisit] = useState([])
const navigate = useNavigate();
const patientId = useParams();
useEffect(() =>{
    if(patientId){
        service.getVisit(patientId).then((data) =>{
            setVisit(data);
        })
    }
    else{
        navigate('/all-patient');
    }
}) 
  return (
    <div>
        <Info visitInfo={visit}/>
    </div>
  )
}

export default EditVisit