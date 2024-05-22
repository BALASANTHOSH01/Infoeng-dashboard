// src/components/FeedBack.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { MdOutlineDone as TickIcon } from "react-icons/md";
import { IoArrowForward as BackArrowIcon } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import AlertPopup from "../AlertPop/AlertPopup";
import { useUserData } from "../../Context/Auth&DB/Auth&DB";
import axios from "axios";

const FeedBackThanks = () => {
  return (
    <div>
      <div className="flex flex-row gap-[2%] justify-center my-[6%] items-center text-center rounded-[25px] px-[15px] py-[7px] mx-auto">
        <div className="text-[20px] p-1 rounded-[50%] text-center bg-green-500 text-white">
          <TickIcon />
        </div>
        <p className="text-[25px] font-semibold text-center">Thanks for your feedback</p>
      </div>

      <Link
        to={"/"}
        className="w-[200px] duration-200 mx-auto flex flex-row items-center gap-[1%] hover:bg-gray-200 px-[15px] py-[7px] rounded-[25px] justify-center"
      >
        <p className="text-center">Back to Home</p>
        <BackArrowIcon className="text-[18px]" />
      </Link>
    </div>
  );
};

const FeedBack = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({
    q1: null,
    q2: null,
    q3: null,
  });
  const [selectedAll, setSelectedAll] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Using Context API for user's data
  const { user } = useUserData();

  const handleAnswer = (question, answer) => {
    setSelectedOption((prev) => ({
      ...prev,
      [question]: prev[question] === answer ? null : answer,
    }));
  };

  const handleFeedBack = async (event) => {
    event.preventDefault();

    // Feedback data for Firebase
    const feedbackData = {
      userId: user.id,
      userName: user.name,
      userDept: user.dept,
      userRollNo: user.rollno,
      feedback: {
        q1: selectedOption.q1,
        q2: selectedOption.q2,
        q3: selectedOption.q3,
      },
      submittedAt: new Date(),
    };

    // Data for Excel
    const excelData = {
      userId: user.id,
      userName: user.name,
      userDept: user.dept,
      userRollNo: user.rollno,
      q1: selectedOption.q1,
      q2: selectedOption.q2,
      q3: selectedOption.q3,
      submittedAt: new Date(),
    };

    const hasSelectedAll = Object.values(selectedOption).every((answer) => answer !== null);
    if (hasSelectedAll) {
      try {
        // Save to Excel via backend
        await axios.post('https://info-dashboard-backend.onrender.com/save', excelData);

        // Add to Firestore
        await addDoc(collection(db, "feedback"), feedbackData);

        setSelectedOption({ q1: null, q2: null, q3: null }); // Reset form after submitting
        setIsSubmitted(true);
      } catch (error) {
        setIsSubmitted(false);
        console.log("Error occurred: " + error);
      }
    } else {
      setSelectedAll(false);
      setTimeout(() => setSelectedAll(true), 3000);
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
            {[b1, b2, b3, b4].map((option) => (
              <div key={option} className="flex flex-row items-center gap-2 cursor-pointer">
                <input
                  id={`${question}-${option}`}
                  className="w-[20px] h-[17px]"
                  type="checkbox"
                  checked={selectedOption[question] === option}
                  onChange={() => handleAnswer(question, option)}
                  disabled={selectedOption[question] && selectedOption[question] !== option}
                />
                <label htmlFor={`${question}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleFeedBack}>
      {isSubmitted === false ? (
        <div className="text-black w-[400px] md:w-[90%] flex flex-col justify-center mx-auto text-center overflow-x-hidden mb-[10%]">
          {selectedAll === false && <AlertPopup data={"Response to all questions."} />}

          <h1 className="text-[20px] font-semibold my-[10%] md:my-[4%]">Enter your feedback</h1>
          <div>
            <CheckboxInput
              question="q1"
              no="1"
              head="How is your journey during the semester?"
              b1="Super"
              b2="Okay"
              b3="Not Okay"
              b4="Bad"
            />

            <CheckboxInput
              question="q2"
              no="2"
              head="Which course do you like?"
              b1="Web Development"
              b2="DevOps"
              b3="AI & ML"
              b4="Data Science"
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
            <motion.button
              type="submit"
              whileTap={{ scale: 0.6 }}
              className="px-[15px] py-[10px] rounded-[10px] bg-blue-500 text-white font-semibold fixed bottom-[5%] right-[10%] hover:shadow-xl"
            >
              Submit FeedBack
            </motion.button>
          </div>
        </div>
      ) : (
        <FeedBackThanks />
      )}
    </form>
  );
};

export default FeedBack;
