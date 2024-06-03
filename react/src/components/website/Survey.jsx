import React from "react";
import { FiArrowUpRight } from "react-icons/fi"; // Import arrow icon from react-icons library

const SurveyComponent = () => {
 const [showButton, setShowButton] = React.useState(true);

 React.useEffect(() => {
  // Set showButton to true on component mount
  setShowButton(true);
 }, []);

 return (
  <div className="flex relative" style={{ zIndex: 999999 }}>
   <div className="flex-1">{/* Your content here */}</div>
   <div
    className={`fixed mobile:top-24 tablet:top-24 laptop:top-28 desktop:top-20 win11:top-16 right-0 z-100 transition-opacity duration-300 ${
     showButton ? "opacity-100 animate-shake" : "opacity-0 pointer-events-none"
    }`}
   >
    {/* Sticky rectangle with text and arrow icon */}
    <div className="w-60  md:w-72 bg-forestgreen-300 text-white p-4 rounded-l-xl shadow-lg">
     <p className="text-sm md:text-xl  font-bold">
      TAKE A QUICK SURVEY{" "}
      <span className="text-sm md:text-lg font-normal  ">
       <br />
       to help us improve our website!
      </span>
     </p>
     <a
      href="https://forms.gle/D5x8U8pgucrmmq7L8"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center  mt-1 md:mt-4 text-lg"
     >
      <span>Survey Link</span>
      <FiArrowUpRight className="ml-2" />
     </a>
    </div>
   </div>
  </div>
 );
};

export default SurveyComponent;
