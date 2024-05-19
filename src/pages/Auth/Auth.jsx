import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonSharp as StaffIcon } from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";
import { IoIosEye as ShowPass} from "react-icons/io";
import { IoIosEyeOff as HiddenPass} from "react-icons/io";

//Firebase Configuration
import { auth } from '../../firebase-config.js';
import { signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("Login");
  const [userType,setUserType]=useState("student");
  const [showPass,setShowPass]=useState(false);
  const [loginStatus,setLoginStatus]=useState(false);

  // User Data Managing State
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);

  useEffect(() => {
    location.pathname === "/login" && setAuthType("Login");
    location.pathname === "/register" && setAuthType("Register");

    setEmail("");
    setPassword("");

  }, [location.pathname,userType]);

  const handleUserType =(type)=>{
    setUserType(type);
  };

  const handleShowPass = (pass) =>{
    setShowPass(pass);
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();

    try {
      
      await signInWithEmailAndPassword(auth,email,password);
      setLoginStatus(true);
      loginStatus === true && navigate("/feedback");
      console.log("Login Successfully");
      
    } catch (error) {
      
      console.log("Error occured : "+error);
      setLoginStatus(false);
      
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className=" w-[600px] mx-auto bg-gray-100 text-center py-[2%] mt-[3%] rounded-[10px] px-[2%]">
        <h1 className=" text-[20px] font-semibold my-[4%] uppercase">{authType}</h1>

        <div className=" flex flex-row items-center gap-[4%] justify-center my-[3%]">
          <div className={`flex flex-row items-center w-[190px] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${userType === "staff" ? "bg-black text-white" : "bg-gray-50 border border-black"} text-[15px]`} onClick={()=>handleUserType("staff")}>
            <StaffIcon />
            <p>Staff</p>
          </div>

          <div className={`flex flex-row items-center w-[190px] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${userType === "student" ? "bg-black text-white" : "bg-gray-50 border border-black"} text-[15px]`} onClick={()=>handleUserType("student")}>
            <StudentIcon />
            <p>Student</p>
          </div>
        </div>

        <div>
          {
            <div>

              <input type={"email"} placeholder={userType === "staff" ? "Staff email" : "Student email"} className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `} value={email} onChange={(e)=>setEmail(e.target.value)} required/>

              <div className=" relative">

              <input type={showPass===true ? "text" : "password"} placeholder={"Password"} className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `} value={password} onChange={(e)=>setPassword(e.target.value)} onPaste={(e)=>e.preventDefault()} required/>

              {
                showPass === true ?                
                (
                  <ShowPass className="text-[22px] cursor-pointer absolute top-[37%] right-[16%]" onClick={()=>handleShowPass(false)}/>
                ) :
                (
                  <HiddenPass className="text-[22px] cursor-pointer absolute top-[37%] right-[16%]" onClick={()=>handleShowPass(true)}/>
                ) 
              }
              </div>

            </div>
          }

        <button className="w-[400px] hover:shadow-lg hover:bg-white hover:text-black hover:border hover:border-black duration-200 cursor-pointer px-2 py-3 my-[2%] rounded-[10px] text-center mx-auto bg-black text-white" type="submit">Login</button>
        <p className="text-[14px]">Login by using valid information.</p>
        </div>



      </div>
    </form>
  );
};

export default Auth;
