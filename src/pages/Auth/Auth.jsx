import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoPersonSharp as StaffIcon } from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";

const Auth = () => {
  const location = useLocation();
  const [authType, setAuthType] = useState("Login");
  const [userType,setUserType]=useState("student");

  useEffect(() => {
    location.pathname === "/login" && setAuthType("Login");
    location.pathname === "/register" && setAuthType("Register");
  }, [location.pathname]);

  const handleUserType =(type)=>{
    setUserType(type);
  };

  const InputTag = ({inputtype,inputplaceholder}) =>{
    return(
      <div>
        <input type={inputtype} placeholder={inputplaceholder} />
      </div>
    )
  };


  return (
    <div>
      <div>
        <h1>{authType}</h1>

        <div className=" flex flex-row items-center gap-[4%]">
          <div className={`flex flex-row items-center w-[120px] text-center justify-center cursor-pointer gap-[5%] px-[10px] py-[12px] rounded-[5px] ${userType === "staff" ? "bg-black text-white" : "bg-gray-50"} text-[15px]`} onClick={()=>handleUserType("staff")}>
            <StaffIcon />
            <p>Staff</p>
          </div>

          <div className={`flex flex-row items-center w-[120px] text-center justify-center cursor-pointer gap-[5%] px-[10px] py-[12px] rounded-[5px] ${userType === "student" ? "bg-black text-white" : "bg-gray-50"} text-[15px]`} onClick={()=>handleUserType("student")}>
            <StudentIcon />
            <p>Student</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
