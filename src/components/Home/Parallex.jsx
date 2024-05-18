import { useEffect } from "react";
import Rellax from "rellax";
import { HeroBg } from "../../assets/index.js";

const Parallex = () => {

    useEffect(() => {
        const rellaxInstance = new Rellax(".rellax", {
          speed: -2,
          center: true,
        });
      }, []);

  return (
    
        <div
          className="absolute opacity-70 overflow-hidden z-0 top-0 left-0 w-screen h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroBg})` }}
        ></div>
  );
};

export default Parallex;
