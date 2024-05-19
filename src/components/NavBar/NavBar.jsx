import React from 'react'
import {InfoLogo} from "../../assets/index.js";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <div className='z-40 w-full h-[15vh] px-[3%] shadow-lg py-[10px] text-[16px] font-medium flex flex-row items-center justify-between'>

            <Link to={"/"} className='flex-[1.2] cursor-pointer'>
                <img src={InfoLogo} alt='' className='w-[60px] h-[60px]'/>
                
            </Link>

            <div className='flex-[0.6] flex flex-row justify-between items-center mr-[5%]'>
                <p className=' rounded-[25px] px-[22px] py-[7px] cursor-pointer hover:bg-gray-200  duration-300 '>About</p>
                <Link to={"/register"} className=' rounded-[25px] px-[22px] py-[7px] cursor-pointer hover:bg-gray-200  duration-300 '>Register</Link>
                <Link to={"/login"} className=' rounded-[25px] px-[22px] py-[7px] hover:shadow-lg bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black  duration-300 '>Login</Link>
            </div>

        </div>
    </div>
  )
}

export default NavBar;