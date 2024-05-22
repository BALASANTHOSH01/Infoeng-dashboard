import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaArrowRightLong as ArrowIcon } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SectionOne from "../../components/Home/SectionOne";


const Home = () => {
  return (
    <div className=" w-screen overflow-hidden">
      <div>
        <div className="mx-auto text-center text-[50px] font-extrabold my-[3%] md:my-[10%]">
          <h1>
            Get More <span className="text-blue-500">Info</span> By
          </h1>
          <h1>
            Connect with <span className="text-blue-500">Info</span>
          </h1>
        </div>

        <div className="flex flex-row justify-between rounded-[25px] border border-gray-400 p-3 items-center px-[2%] w-[300px] mx-auto my-[1%] md:my-[3%]">
          <h1>What you want to know ?</h1>
          <SearchIcon className=" text-[20px] font-extrabold text-gray-600" />
        </div>

        <div className=" flex flex-row md:flex-col md:gap-[10%] gap-[3%] items-center w-[50%] mx-auto justify-center my-[3%] md:my-[7%]">

          <Link to={"/register"} className="bg-white text-black border border-blue-500 w-[150px] md:w-[200px] px-[15px] py-[12px] rounded-[5px] cursor-pointer text-center md:my-[3%]">
            <p>Register</p>
          </Link>

          <Link to={"/login"} className=" bg-blue-500 hover:shadow-lg text-white w-[150px] md:w-[200px] px-[15px] py-[12px] rounded-[5px] cursor-pointer text-center md:my-[3%]">
            <p>Login</p>
          </Link>

        </div>

      </div>


    </div>
  );
};

export default Home;
