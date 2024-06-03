import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FiArrowUpRight } from "react-icons/fi";
import SurveyComponent from "/src/components/website/Survey";

import logo from "/src/assets/images/sirmata_logo.png";
import footerimg from "/src/assets/images/website/footerimg.jpg";
import axios from "axios";
import PrivacyModal from "./PrivacyModal";
import Terms from "./Terms";
import TermsList from "../../context/admin/TermsList";
const GuestLayout = () => {
 const location = useLocation();
 const [isHome, setIsHome] = useState(false);

 useEffect(() => {
  setIsHome(location.pathname === "/home");
 }, [location]);

 useEffect(() => {
  (async () => await Load())();
 }, []);
 const [loading, setLoading] = useState("");
 const [errors, setErrors] = useState("");
 const info_id = 1;
 const [selectedInfo, setSelectedInfo] = useState(null);

 async function Load() {
  setLoading(true);

  try {
   const result = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/web`
   );

   const matchedWebInfo = result.data.find(
    (web_info) => web_info.info_id === info_id
   );

   setSelectedInfo(matchedWebInfo || null);
  } catch (error) {
   console.error("Error loading accommodations:", error);
  }

  setLoading(false);
 }

 let formattedContactNumber = null;

 if (selectedInfo) {
  const contactNumbers = selectedInfo.contact_number
   .split(",")
   .map((number) => number.trim());
  if (contactNumbers.length > 0) {
   const firstNumber = contactNumbers[0];
   const withoutLeadingZero = firstNumber.startsWith("0")
    ? firstNumber.substr(1)
    : firstNumber;
   formattedContactNumber = `+63-${withoutLeadingZero.substring(
    0,
    3
   )}-${withoutLeadingZero.substring(3, 6)}-${withoutLeadingZero.substring(6)}`;
  }
 }
 const emailLink = selectedInfo ? `mailto:${selectedInfo.official_email}` : "#";
 const facebookLink = selectedInfo ? `${selectedInfo.facebook_link}` : "#";
 const instagramLink = selectedInfo ? `${selectedInfo.instagram_link}` : "#";
 const tiktokLink = selectedInfo ? `${selectedInfo.tiktok_link}` : "#";
 const logoLink = selectedInfo ? `${selectedInfo.website_logo}` : "#";

 const contactNumberFormat = (numbers) => {
  const formattedNumbers = numbers.split(", ").map((num, index) => {
   const numberWithoutZero = num.replace(/^0/, ""); // Remove leading zero
   const formattedNumber = `0${numberWithoutZero.substring(
    0,
    3
   )}-${numberWithoutZero.substring(3, 6)}-${numberWithoutZero.substring(6)}`;
   return (
    <a
     key={index}
     className="text-forestgreen-50 hover:text-forestgreen-800 animated"
     href={`tel:${numberWithoutZero}`}
    >
     {formattedNumber}
    </a>
   );
  });

  return formattedNumbers.reduce((prev, curr) => [
   prev,
   <br key={Math.random()} />,
   curr,
  ]);
 };

 // Usage example:

 const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
 const viewPrivacyModal = () => {
  setShowPrivacyPolicyModal(true);
 };

 const handlePrivacyModal = () => {
  setShowPrivacyPolicyModal(false);
 };

 const [showTerms, setShowTerms] = useState(false);
 const viewTerms = () => {
  setShowTerms(true);
 };

 const handleTerms = () => {
  setShowTerms(false);
 };

 return (
  <div className="">
   {/* CONTACT DETAILS & SOCIAL MEDIA LINKS */}

   {showPrivacyPolicyModal && <PrivacyModal onClose={handlePrivacyModal} />}
   {showTerms && <Terms onClose={handleTerms} />}
   <div
    className={`desktop:flex win11:flex hidden justify-center items-center bg-forestgreen-50  py-3 w-full  ${
     isHome ? "slideInTop delay-300" : "slideOutTop delay-300"
    }`}
   >
    <div className=" flex justify-between green-navbar mx-10  ">
     <div className="flex text-white font-[Poppins]  space-x-4 items-center  whitespace-nowrap text-base w-auto ">
      <a
       href={`tel:${formattedContactNumber}`}
       className="flex items-center text-white hover:text-forestgreen-300"
      >
       <FontAwesomeIcon
        icon={faPhone}
        size="lg"
        color="white"
        className="pr-2"
       />
       {loading ? (
        <p>Loading...</p>
       ) : formattedContactNumber ? (
        <p>{formattedContactNumber}</p>
       ) : null}
      </a>
      <span>|</span>
      <a
       href={emailLink}
       className="flex items-center text-white hover:text-forestgreen-300"
      >
       <FontAwesomeIcon
        icon={faEnvelope}
        size="lg"
        color="white"
        className="pr-2"
       />
       {loading ? (
        <p>Loading...</p>
       ) : selectedInfo ? (
        <p>{selectedInfo.official_email}</p>
       ) : null}
      </a>
     </div>

     <div className="flex text-white text-xl whitespace-nowrap space-x-4 ">
      <a href={facebookLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-facebook p-1 rounded-md hover:text-forestgreen-50 hover:bg-white"></i>
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-instagram p-1 rounded-md hover:text-forestgreen-50 hover:bg-white"></i>
      </a>
      <a href={tiktokLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-tiktok p-1 rounded-md hover:text-forestgreen-50 hover:bg-white"></i>
      </a>
     </div>
    </div>
   </div>

   {/* SIRMATA LOGO */}
   <div
    className={`  py-3 justify-center win11:flex desktop:flex hidden ${
     isHome ? "transition delay-150" : "transition slideOutTop delay-300 "
    }`}
   >
    {loading ? (
     <img
      src={logo}
      alt=""
      className={`h-20 lg:h-36 ${isHome ? "" : "slideOutTop fadeOut"}`}
     />
    ) : selectedInfo ? (
     <img
      src={logoLink}
      alt=""
      className={`h-20 lg:h-36 ${isHome ? "" : "slideOutTop fadeOut"}`}
     />
    ) : null}

    {/* Black LOGO */}
   </div>

   <div style={{ zIndex: 9999 }}>
    <Navbar />
   </div>

   <div style={{ zIndex: 10 }}>
    <Outlet />
   </div>

   {/* FOOTER */}
   <footer className="tracking-wider bg-white win11:grid win11:grid-cols-5 desktop:grid desktop:grid-cols-5 font-[Poppins] ">
    <div className="relative block h-40 lg:col-span-2 md:h-52 win11:h-full desktop:h-full">
     <img
      src={footerimg}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
     />
    </div>

    <div className=" p-6 win11:py-12  win11:col-span-3 px-10 win11:px-16  desktop:col-span-3 ">
     <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="col-span-[1.5] ">
       <p>
        <span className="text-sm uppercase text-gray-600 ">Call us </span>

        <a className="block text-2xl font-semibold   tablet:text-2xl laptop:text-[28px] win11:text-[28px] flex-col ">
         {loading ? (
          <p>Loading...</p>
         ) : selectedInfo ? (
          <p>{contactNumberFormat(selectedInfo.contact_number)}</p>
         ) : null}
        </a>
       </p>

       <ul className="mt-5 space-y-1 text-base text-gray-700">
        <li>
         Monday to Friday: &nbsp;
         {loading ? (
          <span>Loading...</span>
         ) : selectedInfo ? (
          <span>{selectedInfo.weekday_opening_time}</span>
         ) : null}
        </li>
        <li>
         Weekend: &nbsp;
         {loading ? (
          <span>Loading...</span>
         ) : selectedInfo ? (
          <span>{selectedInfo.weekend_opening_time}</span>
         ) : null}
        </li>
       </ul>

       <ul className="mt-6 text-base flex gap-6">
        <li>
         <a
          href={facebookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-6 text-2xl text-dark-50 hover:text-forestgreen-300"
         >
          <i className="fa-brands fa-facebook-f"></i>
         </a>
         <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-6 text-2xl text-dark-50 hover:text-forestgreen-300"
         >
          <i className="fa-brands fa-instagram"></i>
         </a>
         <a
          href={tiktokLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-6 text-2xl text-dark-50 hover:text-forestgreen-300"
         >
          <i className="h-4 w-4 fa-brands fa-tiktok"></i>
         </a>
        </li>
       </ul>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
       <div>
        <ul className=" space-y-4 text-sm  text-dark-50 tracking-wider ">
         <li>
          <a
           href="/home"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           Home
          </a>
         </li>
         <li>
          <a
           href="/about"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           About
          </a>
         </li>

         <li>
          <a
           href="/kapepuno"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           Amenities
          </a>
         </li>

         <li>
          <a
           href="/accommodation/Alocasia%20Cabin"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           Accommodations
          </a>
         </li>

         <li>
          <a
           href="/events"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           Events
          </a>
         </li>

         <li>
          <a
           href="/faqs"
           className="text-forestgreen-50 transition hover:font-semibold hover:opacity-80"
          >
           Faqs
          </a>
         </li>
        </ul>
       </div>

       <div>
        <p className=" uppercase text-gray-600 mt-2 tracking-wide lg:mt-0 text-sm win11:text-base">
         Contact Info
        </p>

        <ul className="mt-6 space-y-4 text-sm text-gray-600">
         <li>
          <p className="mb-4 flex text-forestgreen-50 transition hover:opacity-80 ">
           <i className="fa-solid fa-location-dot mr-2 hover:font-bold text-lg text-dark-50"></i>
           {loading ? (
            <span>Loading...</span>
           ) : selectedInfo ? (
            <span>{selectedInfo.location}</span>
           ) : null}
          </p>
         </li>

         <li>
          <p className="mb-4 flex text-forestgreen-50 transition hover:opacity-80 ">
           <a href="mailto:sirmatafarm@gmail.com">
            <i className="fa-solid fa-envelope mr-2 text-lg hover:font-bold text-dark-50 whitespace-nowrap"></i>
            {loading ? (
             <span>Loading...</span>
            ) : selectedInfo ? (
             <span>{selectedInfo.official_email}</span>
            ) : null}
           </a>
          </p>
         </li>
        </ul>
       </div>
      </div>
     </div>

     <div className="mt-2 border-t border-gray-300 pt-6">
      <div className="sm:flex sm:items-center  sm:justify-between">
       <ul className="flex flex-wrap gap-4 text-xs">
        <li>
         <button
          onClick={viewTerms}
          className="text-gray-500 transition hover:opacity-75"
         >
          Terms & Conditions
         </button>
        </li>

        <li>
         <button
          onClick={viewPrivacyModal}
          className="text-gray-500 transition hover:opacity-75"
         >
          Privacy Policy
         </button>
        </li>
       </ul>

       <p className=" text-xs text-gray-500 sm:mt-0">
        &copy; 2023. Adriano, Cuchapin, Esguerra. All rights reserved.
       </p>
      </div>
     </div>
    </div>
   </footer>
   {/** 
   <SurveyComponent />
 * 
*/}
  </div>
 );
};

export default GuestLayout;
