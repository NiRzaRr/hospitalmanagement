import React, {forwardRef} from 'react'

function Input({
    label,
    type = "text",
    placeholder,
    className ="",
    ...props}, ref) {
  return (
    <div className='flex w-full items-center '>
       {label && <label className={`w-1/4 md:w-1/3 lg:w-1/4 self-center ${className}`}> {label} </label>}
       <input type={type} 
       placeholder={placeholder}
       ref={ref}
       className={`md:w-1/2 bg-white border-2 border-gray-300 rounded-xl indent-1 ${className} lg:h-9`}
       {...props}/>
    </div>
  )
}   

export default forwardRef(Input);