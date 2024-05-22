import React from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const DownloadSheet = () => {
  return (
    <div>
      <div className=" flex flex-col gap-[20px] justify-center items-center mt-[15%] md:mt-[40%]">
        <p>Click the button and download the FeedBack data</p>
        
        <motion.div whileTap={{scale:0.6}}>
        <Link
          to="https://info-dashboard-backend.onrender.com/download"
          target="_blank"
          rel="noopener noreferrer"
          className=" px-[14px] py-[8px] rounded-[10px] bg-blue-500 text-white cursor-pointer hover:shadow-lg "
        >
          Download Feedback Data
        </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default DownloadSheet;
