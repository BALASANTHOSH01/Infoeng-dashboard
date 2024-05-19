import { createContext, useState } from "react";

const AuthContext = createContext({
    isauthendicated:false,
    setAuthendicated:()=>{},
});

export const AuthContextProvider = ({children}) =>{
    const [isauthendicated,setAuthendicated]=useState(false);

    console.log("context inner auth :"+ isauthendicated);

    return(
        <AuthContext.Provider 
        value={{
            isauthendicated,
            setAuthendicated,
          }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;