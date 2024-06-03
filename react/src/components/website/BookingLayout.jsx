import { Outlet } from "react-router-dom";
import bgimg from "../../assets/images/website/accomodations/accommodation1.jpg";
import "../../assets/css/bookings.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import sirmatalogo from "../../assets/images/sirmata_logo_white_landscape.png";
import BookingMoreInfo from "../../views/website/Accommodations/BookingMoreInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const BookingLayout = () => {
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

 const emailLink = selectedInfo ? `mailto:${selectedInfo.official_email}` : "#";
 const facebookLink = selectedInfo ? `${selectedInfo.facebook_link}` : "#";
 const instagramLink = selectedInfo ? `${selectedInfo.instagram_link}` : "#";
 const tiktokLink = selectedInfo ? `${selectedInfo.tiktok_link}` : "#";
 const logoLink = selectedInfo ? `${selectedInfo.website_logo}` : "#";

 let formattedContactNumber = "";
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

 return (
  <div
   id=" "
   className="mobile:w-screen mobile:overflow-hidden h-full  "
   style={{ backgroundImage: `url(${bgimg})` }}
  >
   {/**Header */}
   <div className="booking-header ">
    <div className="booking-header-item text-md whitespace-nowrap">
     <a href="/home" className="">
      <img src={sirmatalogo} className="booking-header-img" />
     </a>
    </div>
    <div className="booking-header-item space-x-6 ">
     <span className="space-x-4 ">
      <a href={facebookLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-facebook"></i>
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-instagram"></i>
      </a>
      <a href={tiktokLink} target="_blank" rel="noopener noreferrer">
       <i className="fab fa-tiktok" ></i>
      </a>
     </span>
    </div>
   </div>

   {/**Outlet*/}
   <div className="booking-outlet py-10 ">
    <Outlet />
   </div>

   {/**Default Footer*/}
   <div className="booking-footer hidden lg:flex justify-end flex ">
    <div className="booking-footer-item">
     <p>Contact Information</p>
     <span className="ml-3 ">
    
      <i className="fa fa-envelope mr-2 " />
      <a href="mailto:sirmatafarm@gmail.com">
      {loading ? (
       <p>Loading...</p>
      ) : selectedInfo ? (
       <p>{selectedInfo.official_email}</p>
      ) : null} </a>
      <i className="fa fa-phone ml-2 mr-2" />
      <a href="tel:+639171208306" className="underline">
      {loading ? (
       <p>Loading...</p>
      ) : formattedContactNumber ? (
       <p>{formattedContactNumber}</p>
      ) : null}</a>
     </span>
    </div>
    <div className="booking-footer-item">
     <p>Address</p>
     <span>
      <i className="fa fa-map-marker ml-2 mr-2" />
      {loading ? (
       <p>Loading...</p>
      ) : selectedInfo ? (
       <p>{selectedInfo.location}</p>
      ) : null}
     </span>
    </div>
    <div className="booking-footer-item">
     <p>Opening Hours</p>
     <span className="ml-3 ">
      <i className="fa fa-clock mr-2 " />
      Monday to Friday:
      {loading ? (
       <p>Loading...</p>
      ) : selectedInfo ? (
       <p>{selectedInfo.weekday_opening_time}</p>
      ) : null}
      <i className="fa fa-clock ml-2 mr-2" /> Weekend:
      {loading ? (
       <p>Loading...</p>
      ) : selectedInfo ? (
       <p>{selectedInfo.weekend_opening_time}</p>
      ) : null}
     </span>
    </div>
   </div>

   {/**Mobile Footer*/}
   <div className="booking-footer-mobile  lg:hidden relative ">
    <div className="booking-footer-grid ">
     <div className="booking-footer-item ">
      <p>Contact Information</p>
      <span className="pl-3 space-x-3 ">
       <span>
       <a href="mailto:sirmatafarm@gmail.com">
        <i className="fa fa-envelope " />  
   
     
      
        {" "}
        {loading ? (
         <p>Loading...</p>
        ) : selectedInfo ? (
         <p>{selectedInfo.official_email}  </p>
        ) : null}
        </a>
     
      </span>
   
      </span>

      <span className="pl-3 space-x-3 ">
       <span>
        <i className="fa fa-phone" />
        
       </span>
       <span>
       <a href="tel:+639171208306" className="underline">
        {" "}
        {loading ? (
         <p>Loading...</p>
        ) : formattedContactNumber ? (
         <p>{formattedContactNumber}</p>
        ) : null}
        </a>
       </span>
      </span>
     </div>

     <div className="booking-footer-item">
      <p>Opening Hours</p>
      <span className="pl-3 space-x-3">
       <span>
        <i className="fa fa-clock " />
       </span>
       <span>
        Monday to Friday:
        {loading ? (
         <p>Loading...</p>
        ) : selectedInfo ? (
         <p>{selectedInfo.weekday_opening_time}</p>
        ) : null}
       </span>
      </span>
      <span className="pl-3 space-x-3">
       <span>
        <i className="fa fa-clock" />
       </span>
       <span>
        Weekend:
        {loading ? (
         <p>Loading...</p>
        ) : selectedInfo ? (
         <p>{selectedInfo.weekend_opening_time}</p>
        ) : null}
       </span>
      </span>
      <p className="pt-4">Address</p>
      <span className="pl-3 space-x-3">
       <span>
        <i className="fa fa-map-marker ml-2 " />
       </span>
       <span>
        {" "}
        {loading ? (
         <p>Loading...</p>
        ) : selectedInfo ? (
         <p>{selectedInfo.location}</p>
        ) : null}
       </span>
      </span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default BookingLayout;
