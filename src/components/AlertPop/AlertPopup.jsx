import React, { useEffect, useState } from 'react'

const AlertPopup = ({icon,data}) => {
    const[count,setcount]=useState(3);

   
    useEffect(()=>{
        for (let i = 3; i >= 0; i--) {
            setTimeout(() => {
              setcount(i); // Display countdown message
            }, (3 - i) * 1000); // Delay based on remaining seconds
          }
    },[]);

  return (
    <div className=" fixed top-[18%] w-[50%] md:w-[80%] bg-red-500 text-white rounded-[10px] px-[14px] py-[17px] text-center flex flex-row items-center gap-[10%] md:justify-center justify-around left-[30%] md:left-[10%]">

        <div className=' text-[20px]'>
        {icon}
        </div>

          <p>{data}</p>
          
          <div className=" rounded-full border border-white p-2 w-[30px] h-[30px] flex items-center justify-center">
          <p className=" font-bold text-[20px]">{count}</p>
          </div>
        </div>
  )
}

export default AlertPopup;