import { useContext } from "react";
import AuthContext from "../Context/Auth&DB/Auth&DB.jsx";
import { Navigate, Outlet } from "react-router-dom";


const ProductRoute = ({children}) => {
  const {isauthendicated} = useContext(AuthContext);

  return !isauthendicated ? <Outlet/> : Navigate({to:"/login"});
}

export default ProductRoute