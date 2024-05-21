import { createContext, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoPersonSharp as StaffIcon } from "react-icons/io5";
import { PiStudentFill as StudentIcon } from "react-icons/pi";
import { IoIosEye as ShowPass } from "react-icons/io";
import { IoIosEyeOff as HiddenPass } from "react-icons/io";

//Firebase Configuration
import { auth,db } from "../../firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import AuthContext from "../../Context/Auth&DB/Auth&DB.jsx";
import UserContext, { useUserData } from "../../Context/UserData/UserData.jsx";
import AlertPopup from "../../components/AlertPop/AlertPopup.jsx";

// const UserIDContext = createContext();

// export const UserIDContextProvider = ({children}) =>{
//   return(
//     <UserIDContext.Provider>
//       {children}
//     </UserIDContext.Provider>
//   );
// };

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [SignUpType, setSignUpType] = useState("Login");
  const [userType, setUserType] = useState("student");
  const [showPass, setShowPass] = useState(false);
  const [userExist,setUserExist]=useState(false);

  // User Data Managing State
  const [useremail, setUserEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUserName] = useState(null);
  const [dept, setDept] = useState(null);
  const [studRoll, setStudRoll] = useState(null);

  //Context API to checking user is authendicated
  const {isauthendicated,setAuthendicated} =useContext(AuthContext);
  const {user,setUserData} = useUserData();

  useEffect(() => {
    location.pathname === "/login" && setSignUpType("Login");
    location.pathname === "/register" && setSignUpType("Register");

    setUserEmail("");
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

  //Handle user Registeration
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, useremail, password);
      const userCred = userCredential.user;
      const UserID = userCred.uid;

      await setDoc(doc(db,"users",UserID),{
        userType,
        dept,
        username,
        useremail,
        studRoll : userType === "student" ? studRoll : null,
        createdAt: new Date()
      });
      navigate("/feedback");

      setUserData({id:UserID,name:username,email:useremail,department:dept,type:userType});
      console.log("UserData Context : "+user);


    } catch (error) {
      error.message === "Firebase: Error (auth/email-already-in-use)." && setUserExist(true);
      setTimeout(()=>{setUserExist(false)},3000);
      console.log("Error occured : " + error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>

      {
        userExist === true &&  (
          <AlertPopup icon={<StaffIcon/>} data={"User Already Exist"}/>
        )
      }


      <div className=" w-[600px] md:w-[100%] mx-auto bg-gray-100 md:bg-white text-center py-[2%] mt-[3%] rounded-[10px] px-[2%]">
        <h1 className=" text-[20px] font-semibold my-[4%] uppercase">
          {SignUpType}
        </h1>

        <div className=" flex flex-row md:w-[85%] md:mx-auto items-center gap-[4%] justify-center my-[3%]">
          <div
            className={`flex flex-row items-center w-[190px] md:w-[50%] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${
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
            className={`flex flex-row items-center w-[190px] md:w-[50%] text-center justify-center cursor-pointer gap-[5%] px-[15px] py-[10px] rounded-[10px] ${
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
                className={`w-[400px] md:w-[85%] px-2 py-3 rounded-[10px] outline-none my-[2%] md:border md:border-gray-400 md:my-[3%]`}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              {userType === "student" && (
                <input
                  type={"text"}
                  placeholder={"Student RollNO."}
                  className={`w-[400px] md:w-[85%] px-2 py-3 rounded-[10px] outline-none my-[2%] md:border md:border-gray-400 md:my-[3%]`}
                  value={studRoll}
                  onChange={(e) => setStudRoll(e.target.value)}
                  required
                />
              )}

              <select
                className={`w-[400px] md:w-[85%] px-2 py-3 rounded-[10px] outline-none my-[2%] md:border md:border-gray-400 md:my-[3%]`}
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
                className={`w-[400px] md:w-[85%] px-2 py-3 rounded-[10px] outline-none my-[2%] md:border md:border-gray-400 md:my-[3%]`}
                value={useremail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />

              <div className=" relative">
                <input
                  type={showPass === true ? "text" : "password"}
                  placeholder={"Password"}
                  className={`w-[400px] md:w-[85%] px-2 py-3 rounded-[10px] outline-none my-[2%] md:border md:border-gray-400 md:my-[3%]`}
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

          <div className=" flex flex-row gap-[3%] items-center text-[14px] md:w-[80%] w-[400px] mx-auto md:my-[2%]">
            <input type="checkbox" className="w-[15px] h-[15px]" required/>
            <p>Make sure your details are correct!</p>
          </div>

          <button
            className="w-[400px] md:w-[80%] hover:shadow-lg hover:bg-white hover:text-black hover:border hover:border-black duration-200 cursor-pointer px-2 py-3 my-[2%] md:my-[4%] rounded-[10px] text-center mx-auto bg-black text-white"
            type="submit"
          >
            SignUp
          </button>

          <div className=" flex flex-row items-center justify-center gap-[5%] mb-[5%]">
          <p className="text-[14px]">Already have an Account ?</p>
        <Link to={"/login"} className=" hover:underline duration-200">Login</Link>
        </div>
          
        </div>
      </div>
    </form>
  );
};

export default SignUp;


// how to signup by using extra details like name,rollno,department,useremail,password for student and name, department,useremail,password for staff. Each user can have the different role in our application. if user is staff means they nevigate to staff dashboard and if student navigate means they navigate to student dashboard. both are different rights and access. And other thing is if anyone want to navigate to the dashboard by using url means the must need to navigate the user to the login page.

