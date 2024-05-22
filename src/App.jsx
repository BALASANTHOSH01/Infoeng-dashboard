import { Outlet } from 'react-router-dom';
import {NavBar} from "./components/index.js";
import { AuthContextProvider, UserContextProvider } from './Context/index.js';


const App = () => {
  return (
    <AuthContextProvider>
    <UserContextProvider> 
    <div>
      <div className='w-screen font-Poppins overflow-hidden'>
        <NavBar/>
        <Outlet/>
      </div>
    </div>
    </UserContextProvider>
  </AuthContextProvider>
  )
}

export default App;