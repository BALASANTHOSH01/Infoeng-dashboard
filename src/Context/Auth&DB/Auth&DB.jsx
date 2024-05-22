import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isauthendicated:false,
    setAuthendicated:()=>{},
    userdata:"",
    setUserData:()=>{},
});

export const AuthContextProvider = ({children}) =>{
    const [isauthendicated,setAuthendicated]=useState(false);
    const [userdata,setUserData]=useState({
        id:null,
        name:null,
        email:null,
        rollno:null,
        dept:null,
        type:null
    });

    console.log("context Authorized AC :"+ isauthendicated);
    console.log("context UserData :"+userdata.name);

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

export const useUserData = ()=>{
    const dataContext = useContext(AuthContext);
    if(!dataContext){
        throw new Error("UserData context is not working.")
    }

    return { user: dataContext.userdata, setUser: dataContext.setUserData };
};

export const useIsAuthorized=()=>{
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error("Authcontext context is not working.")
    }

    return { isauthorized: authContext.isauthendicated, setAuthorized: authContext.setAuthendicated };
}