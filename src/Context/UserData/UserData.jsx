import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    user:null,
    setUserData:()=>{}
});

export const UserContextProvider = ({children}) => {

    const [userdata,setUserData]=useState(null);

    return(
        <UserContext.Provider value={{userdata,setUserData}} >
            {children}
        </UserContext.Provider>
    )
};

export const useUserData = ()=>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error("UserData context is not working.")
    }

    return { user: context.userdata, setUser: context.setUserData };
};

export default UserContext;