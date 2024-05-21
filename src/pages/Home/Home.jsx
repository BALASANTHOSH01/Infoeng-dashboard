import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaArrowRightLong as ArrowIcon } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Parallex from "../../components/Home/Parallex";
import HeroCorner from "../../components/Home/HeroCorner";

const Home = () => {

  return (
    <div className=' text-black'>
      
        <div >  
            <div className="mx-auto text-center text-[50px] font-extrabold my-[3%] md:my-[6%]">
              <h1>Get More Info By</h1>
              <h1>Connect with Info</h1>
            </div>

            <div className="flex flex-row justify-between rounded-[25px] border border-gray-400 p-3 items-center px-[2%] w-[300px] mx-auto my-[1%] md:my-[3%]">
              <h1>What you want to know ?</h1>
              <SearchIcon className=" text-[20px] font-extrabold text-gray-600"/>
            </div>

            <Link to={"/login"} className=" flex flex-row justify-around items-center mx-auto rounded-[25px] text-white bg-black w-[150px] px-[15px] py-[10px] hover:shadow-lg cursor-pointer my-[3%] md:my-[8%] hover:bg-white hover:text-black hover:border hover:border-black  duration-300">
              <h1>Get Start</h1>
              <ArrowIcon/>
            </Link>
        </div>
    </div>
  )
}

export default Home