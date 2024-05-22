import { useState } from "react";
import {motion} from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { MdOutlineDone as TickIcon } from "react-icons/md";
import { IoArrowForward as BackArrowIcon } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import AlertPopup from "../AlertPop/AlertPopup";

const FeedBack = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({
    q1: null,
    q2: null,
    q3: null,
  });
  const [selectedAll,setSelectedAll]=useState(true);
  const [isSubmitted,setIsSubmitted]=useState(false);

  const handleAnswer = (question, answer) => {
    setSelectedOption((prev) => ({
      ...prev,
      [question]: prev[question] === answer ? null : answer,
    }));
  };

  const handleFeedBack = async (event) => {
    event.preventDefault();

    const feedbackData = {
      // Obtained during user signup
      user:"",
      dept:"",
      rollno:"",
      feedback: {
        q1: selectedOption.q1,
        q2: selectedOption.q2,
        q3: selectedOption.q3,
      },
      // Optionally include additional feedback data like timestamp
      submittedAt: new Date(),
    };

    
    const hasSelectedAll = Object.values(selectedOption).some((answer) => answer !== null);
    if(hasSelectedAll){

      try {
        await addDoc(collection(db, "feedback"), feedbackData); //add data to DB
        setSelectedOption({q1:null,q2:null,q3:null}); //Null after submitting
        setIsSubmitted(true);
      } catch (error) {
        setIsSubmitted(false);
        console.log("Error occured : " + error);
      }
      
    } else{
      
      setSelectedAll(false);
      setTimeout(()=>setSelectedAll(true),3000);
    }


  };





  // Reusable question component
  const CheckboxInput = ({ question, no, head, b1, b2, b3, b4 }) => {
    return (
      <div className="text-start my-[10%] md:my-[5%]">
        
        <div className="flex flex-row items-center font-semibold text-[18px]">
          {no}&#160;.&#160;{head}
        </div>

        <div className="flex flex-col items-start gap-[15px] justify-between w-[100%] my-[5%]">
          <div className="flex flex-col items-start gap-[15px] justify-between w-[50%]">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <input
                id={`${question}-${b1}`}
                className="w-[20px] h-[17px]"
                type="checkbox"
                checked={selectedOption[question] === b1}
                onChange={() => handleAnswer(question, b1)}
                disabled={selectedOption[question] && selectedOption[question] !== b1}
              />
              <label htmlFor={`${question}-${b1}`}>{b1}</label>
            </div>

            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <input
                id={`${question}-${b2}`}
                className="w-[20px] h-[17px]"
                type="checkbox"
                checked={selectedOption[question] === b2}
                onChange={() => handleAnswer(question, b2)}
                disabled={selectedOption[question] && selectedOption[question] !== b2}
              />
              <label htmlFor={`${question}-${b2}`}>{b2}</label>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[15px] justify-between w-[50%]">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <input
                id={`${question}-${b3}`}
                className="w-[20px] h-[17px]"
                type="checkbox"
                checked={selectedOption[question] === b3}
                onChange={() => handleAnswer(question, b3)}
                disabled={selectedOption[question] && selectedOption[question] !== b3}
              />
              <label htmlFor={`${question}-${b3}`}>{b3}</label>
            </div>

            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <input
                id={`${question}-${b4}`}
                className="w-[20px] h-[17px]"
                type="checkbox"
                checked={selectedOption[question] === b4}
                onChange={() => handleAnswer(question, b4)}
                disabled={selectedOption[question] && selectedOption[question] !== b4}
              />
              <label htmlFor={`${question}-${b4}`}>{b4}</label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleFeedBack}>
      {
        isSubmitted === false ?
        (
          <div className="text-black w-[400px] md:w-[90%] flex flex-col justify-center mx-auto text-center overflow-x-hidden mb-[10%]">

            
       {
        selectedAll === false && (
          <AlertPopup data={"Response to all questions."}/>
        )
       }

        <h1 className="text-[20px] font-semibold my-[10%] md:my-[4%]">Enter your feedback</h1>
        <div>
          <CheckboxInput
            question="q1"
            no="1"
            head="How is your journey during the semester?"
            b1="Super"
            b2="Okay"
            b3="NotOkay"
            b4="Bad"
          />

          <CheckboxInput
            question="q2"
            no="2"
            head="Which course do you like?"
            b1="WebDevelopment"
            b2="Devops"
            b3="AI&ML"
            b4="DataScience"
          />

          <CheckboxInput
            question="q3"
            no="3"
            head="How long does it take?"
            b1="1 Month"
            b2="2 Months"
            b3="3 Months"
            b4="4 Months"
          />
        </div>

        <div>
          <motion.button type="submit" whileTap={{scale:0.6}} className=" px-[15px] py-[10px] rounded-[10px] bg-blue-500 text-white font-semibold fixed bottom-[5%] right-[10%] hover:shadow-xl">Submit FeedBack</motion.button>
        </div>

      </div>
        ) : (
          <div>
            <div className="flex flex-row gap-[2%] justify-center my-[6%] items-center text-center rounded-[25px] px-[15px] py-[7px] mx-auto">
              <div className="  text-[20px] p-1 rounded-[50%] text-center bg-green-500 text-white">
                <TickIcon/>
              </div>
              <p className=" text-[25px] font-semibold text-center">Thanks for your feedback</p>
            </div>

            <Link to={"/"} className="w-[200px] duration-200 mx-auto flex flex-row items-center gap-[1%] hover:bg-gray-200 px-[15px] py-[7px] rounded-[25px] justify-center">
            <p className=" text-center">Back to Home</p>
            <BackArrowIcon className=" text-[18px]"/>
            </Link>

          </div>
        )
      }
    </form>
  );
};

export default FeedBack;


// selectedOption.q1=null || "";
// selectedOption.q2=null || "";
// selectedOption.q3=null || "";