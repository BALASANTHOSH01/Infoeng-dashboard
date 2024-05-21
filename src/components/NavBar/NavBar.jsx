import React, { useEffect, useState } from 'react'
import {InfoLogo} from "../../assets/index.js";
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu as MenuIcon } from "react-icons/rx";
import {motion, useScroll} from "framer-motion";
import { FaArrowRightLong as ArrowIcon} from "react-icons/fa6";

const MobileNav = ({setIsMobileNav})=>{
  return(
    <div>

      <div className=' fixed top-0 right-0 w-[65%] z-30 bg-black text-white py-[3%] h-screen'>

       <motion.div onClick={()=>setIsMobileNav(false)} className='p-3 hover:bg-gray-800 rounded-[50%] w-[50px] h-[50px] my-[10%] cursor-pointer text-[28px] mt-[3%] flex  items-center justify-end float-right mr-[12%]'> 
       <ArrowIcon />
       </motion.div>

        <div className=' flex flex-col  text-[20px] my-[30%]'>
          <Link to={"/"} className=' px-[30px] py-[20px] hover:bg-gray-600'>Home</Link>
          <Link to={"/register"} className=' px-[30px] py-[20px] hover:bg-gray-600'>Register</Link>
          <Link to={"/login"} className=' px-[30px] py-[20px] hover:bg-gray-600'>Login</Link>
          <Link to={"/feedback"} className=' px-[30px] py-[20px] hover:bg-gray-600'>FeedBack</Link>
        </div>

      </div>

    </div>
  )
}

const NavBar = () => {

  const location = useLocation();
  const[ismobileNav,setIsMobileNav]=useState(false);

  useEffect(()=>{
    setIsMobileNav(false);
  },[location.pathname]);

  return (
    <div>
        <div className='z-40 w-full h-[15vh] px-[3%] shadow-lg py-[10px] text-[16px] font-medium flex flex-row items-center justify-between'>

            <Link to={"/"} className='flex-[1.2] cursor-pointer'>
                <img src={InfoLogo} alt='' className='w-[60px] h-[60px]'/>
                
            </Link>

            <div className='md:hidden flex-[0.6] flex flex-row justify-between items-center mr-[5%]'>
                <p className=' rounded-[25px] px-[22px] py-[7px] cursor-pointer hover:bg-gray-200  duration-300 '>About</p>
                <Link to={"/register"} className=' rounded-[25px] px-[22px] py-[7px] cursor-pointer hover:bg-gray-200  duration-300 '>Register</Link>
                <Link to={"/login"} className=' rounded-[25px] px-[22px] py-[7px] hover:shadow-lg bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black  duration-300 '>Login</Link>
            </div>

            <motion.div whileTap={{scale:0.6}} className='md:block cursor-pointer hidden text-[28px] mr-[8%]' onClick={()=>setIsMobileNav(true)}>
              <MenuIcon/>
            </motion.div>

            {
              ismobileNav && <MobileNav setIsMobileNav={setIsMobileNav} />
            }

        </div>
    </div>
  )
}

export default NavBar;