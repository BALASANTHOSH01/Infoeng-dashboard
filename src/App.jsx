import { Outlet } from 'react-router-dom';
import {NavBar} from "./components/index.js";


const App = () => {
  return (
    <div>
      <div className='w-screen font-Poppins'>
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default App;