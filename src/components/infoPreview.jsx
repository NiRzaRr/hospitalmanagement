import React from 'react'
import {Link} from 'react-router-dom'

function InfoPreview({name, age, gender, mobile, date, $id}) {
  
  return (                 
    <Link to={`/info/${$id}`} >
    <div className="hidden md:grid grid-cols-12 bg-orange-50 gap-2 h-10 rounded-md place-items-center shadow-[rgb(0,0,0)_0px_10px_15px_-6px] text-xs font-medium lg:text-sm">  
      <div className="col-span-3">{name}</div>
      <div className="col-span-3">{age}</div>
      <div className="col-span-2">{gender}</div>
      <div className="col-span-2">{mobile}</div>
      <div className="col-span-2">{new Date(date).toDateString()}</div> 
    </div>
    {/* Layout for small screen */}
    <div className='flex md:hidden text-sm flex-col bg-yellow-50 h-fit  p-0.5 rounded-lg shadow-[rgb(0,0,0)_10px_10px_15px_-6px]'>
      <div className="flex"><span className="w-[30%] font-medium">Name :</span> {name}</div>
      <div className="flex"><span className='w-[30%] font-medium'>Age :</span> {age}</div>
      <div className="flex"><span className='w-[30%] font-medium'>Gender :</span> {gender}</div>
      <div className="flex"><span className='w-[30%] font-medium'>Mobile No.:</span> {mobile}</div>
      <div className="flex"><span className='w-[30%] font-medium'>Date :</span> {new Date(date).toDateString()}</div> 
    </div>
    </Link>
  )
}

export default InfoPreview