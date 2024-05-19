import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonSharp as StaffIcon } from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";
import { IoIosEye as ShowPass } from "react-icons/io";
import { IoIosEyeOff as HiddenPass } from "react-icons/io";

//Firebase Configuration
import { auth,db } from "../../firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import AuthContext from "../../Context/Auth&DB/Auth&DB.jsx";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [SignUpType, setSignUpType] = useState("Login");
  const [userType, setUserType] = useState("student");
  const [showPass, setShowPass] = useState(false);

  // User Data Managing State
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUserName] = useState(null);
  const [dept, setDept] = useState(null);
  const [studRoll, setStudRoll] = useState(null);

  //Context API to checking user is authendicated
  const {isauthendicated,setAuthendicated} =useContext(AuthContext);

  useEffect(() => {
    location.pathname === "/login" && setSignUpType("Login");
    location.pathname === "/register" && setSignUpType("Register");

    setEmail("");
    setPassword("");
    setDept("");
    setUserName("");
    setStudRoll("");
  }, [location.pathname, userType]);

  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleShowPass = (pass) => {
    setShowPass(pass);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      user && setAuthendicated(true);

      await setDoc(doc(db,"users",user.uid),{
        userType,
        dept,
        username,
        email,
        studRoll : userType === "student" ? studRoll : null,
        createdAt: new Date()
      });

      console.log("isauth in signup :"+isauthendicated);
      isauthendicated && navigate("/feedback");

    } catch (error) {
      console.log("Error occured : " + error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className=" w-[600px] mx-auto bg-gray-100 text-center py-[2%] mt-[3%] rounded-[10px] px-[2%]">
        <h1 className=" text-[20px] font-semibold my-[4%] uppercase">
          {SignUpType}
        </h1>

        <div className=" flex flex-row items-center gap-[4%] justify-center my-[3%]">
          <div
            className={`flex flex-row items-center w-[190px] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${
              userType === "staff"
                ? "bg-black text-white"
                : "bg-gray-50 border border-black"
            } text-[15px]`}
            onClick={() => handleUserType("staff")}
          >
            <StaffIcon />
            <p>Staff</p>
          </div>

          <div
            className={`flex flex-row items-center w-[190px] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${
              userType === "student"
                ? "bg-black text-white"
                : "bg-gray-50 border border-black"
            } text-[15px]`}
            onClick={() => handleUserType("student")}
          >
            <StudentIcon />
            <p>Student</p>
          </div>
        </div>

        <div>
          {
            <div>
              <input
                type={"text"}
                placeholder={
                  userType === "staff" ? "Staff Name" : "Student Name"
                }
                className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              {userType === "student" && (
                <input
                  type={"text"}
                  placeholder={"Student RollNO."}
                  className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                  value={studRoll}
                  onChange={(e) => setStudRoll(e.target.value)}
                  required
                />
              )}

              {/* <input
                type={"text"}
                placeholder={"Department"}
                className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              /> */}

              <select
                className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              >
                <option className=" text-gray-400" value={""}>
                  Choose your department
                </option>
                <option value={"IT"}>BTech IT</option>
                <option value={"CSE"}>B.E CSE</option>
                <option value={"ECE"}>B.E ECE</option>
                <option value={"EEE"}>B.E EEE</option>
                <option value={"MECH"}>B.E MECH</option>
                <option value={"MBA"}>MBA</option>
              </select>

              <input
                type={"email"}
                placeholder={
                  userType === "staff" ? "Staff email" : "Student email"
                }
                className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className=" relative">
                <input
                  type={showPass === true ? "text" : "password"}
                  placeholder={"Password"}
                  className={`w-[400px] px-2 py-3 rounded-[10px] outline-none my-[2%] `}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                  required
                />

                {showPass === true ? (
                  <ShowPass
                    className="text-[22px] cursor-pointer absolute top-[37%] right-[16%]"
                    onClick={() => handleShowPass(false)}
                  />
                ) : (
                  <HiddenPass
                    className="text-[22px] cursor-pointer absolute top-[37%] right-[16%]"
                    onClick={() => handleShowPass(true)}
                  />
                )}
              </div>
            </div>
          }

          <div className=" flex flex-row gap-[3%] items-center text-[14px] w-[400px] mx-auto">
            <input type="checkbox" className="w-[15px] h-[15px]" required/>
            <p>Make sure your details are correct!</p>
          </div>

          <button
            className="w-[400px] hover:shadow-lg hover:bg-white hover:text-black hover:border hover:border-black duration-200 cursor-pointer px-2 py-3 my-[2%] rounded-[10px] text-center mx-auto bg-black text-white"
            type="submit"
          >
            SignUp
          </button>
          <p className="text-[14px]">SignUp by using valid information.</p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;


// how to signup by using extra details like name,rollno,department,email,password for student and name, department,email,password for staff. Each user can have the different role in our application. if user is staff means they nevigate to staff dashboard and if student navigate means they navigate to student dashboard. both are different rights and access. And other thing is if anyone want to navigate to the dashboard by using url means the must need to navigate the user to the login page.

