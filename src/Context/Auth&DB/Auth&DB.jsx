import { createContext, useState } from "react";

const AuthContext = createContext({
    isauthendicated:false,
    setAuthendicated:()=>{},
    userdata:"",
    setUserData:()=>{},
});

export const AuthContextProvider = ({children}) =>{
    const [isauthendicated,setAuthendicated]=useState(false);
    const [userdata,setUserData]=useState([""]);

    console.log("context inner auth :"+ isauthendicated);

    return(
        <AuthContext.Provider 
        value={{
            isauthendicated,
            setAuthendicated,
            userdata,
            setUserData,
          }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;