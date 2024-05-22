import { useContext, useState } from "react";
import AuthContext, { useIsAuthorized } from "../Context/Auth&DB/Auth&DB.jsx";
import { Navigate, Outlet } from "react-router-dom";


const ProductRoute = ({children}) => {

  const {isauthorized} = useIsAuthorized();

  // const [authorized,setAuthorized] = useState(false);
  // if(isauthorized === true){
  //   setAuthorized(true);
  // }

  // return isauthorized ? <Outlet/> : Navigate({to:"/login"});

  return <Outlet/>
}

export default ProductRoute