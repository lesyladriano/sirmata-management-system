import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import NavLinks from "./NavLinks";
import BarsCross from "../../misc/BarsCross";
import { LiaAngleDownSolid } from "react-icons/lia";
import logo from "/src/assets/images/website/sirmata_logo.png";
import blacklogo from "/src/assets/images/sirmata_logo_black_landscape.png";
import axios from "axios";
import LoadingCircle from "../../misc/LoadingCircle";
const Navbar = () => {
 const location = useLocation();
 const [open, setOpen] = useState(false);
 const [isHome, setIsHome] = useState(false);
 const [isAboutUs, setAboutus] = useState(false);
 const [isEvents, setEvents] = useState(false);
 const [isAccommodation, setIsAccommodation] = useState(false);
 const [isFaqs, setFaqs] = useState(false);
 const [isContact, setContact] = useState(false);
 const [subHeadingOpen, setSubHeadingOpen] = useState(false);
 const [heading, setHeading] = useState("");

 const mobileMenuRef = useRef(null);

 useEffect(() => {
  setIsHome(location.pathname === "/home");
  setAboutus(location.pathname === "/about");
  setEvents(location.pathname === "/events");
  setFaqs(location.pathname === "/faqs");
  setContact(location.pathname === "/contact");
  const pathname = location.pathname;
  setIsAccommodation(pathname.startsWith("/accommodation"));
 }, [location]);

 const [mobAccommodation, setMonAccommodation] = useState(false);
 const [accommodation, setAccommodation] = useState([]);
 const [cabinAccommodation, setCabinAccommodation] = useState([]);
 const [villaAccommodation, setVillaAccommodation] = useState([]);
 const [loading, setLoading] = useState(false);

 const toggleMobAccom = () => {
  setMonAccommodation(!mobAccommodation);
 };

 const fetchAllAccommodation = async () => {
  setLoading(true);

  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   const cabins = response.data.filter((item) => item.type === "Cabin");
   const villas = response.data.filter((item) => item.type === "Lake Villa");
   setVillaAccommodation(villas);
   setCabinAccommodation(cabins);
   setAccommodation(response.data);
   setLoading(false);
  } catch (error) {
   setLoading(false);
   console.error("Error fetching accommodations:", error);
  }
 };

 useEffect(() => {
  fetchAllAccommodation();
 }, []);

 const toggleMobileMenu = () => {
  setOpen((prevOpen) => !prevOpen);
  setSubHeadingOpen(false);
  setMonAccommodation(false);
  setHeading("");
 };

 const handleClose = () => {
  setOpen((prevOpen) => !prevOpen);
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
 };

 return (
  <nav className=" bg-white shadow-md transition justify-center flex  h-20 ">
   {/*LOGO PAGES*/}
   <div
    className={`laptop:hidden hidden desktop:flex win11:flex win11:w-60 flex-shrink-0 items-center desktop:ml-14 win11:ml-28 ${
     isHome ? "fadeOut absolute " : ""
    }`}
   >
    <Link to="/home" className="logo-link">
     <img
      title="Return Home"
      src={blacklogo}
      alt="Black Logo"
      className="desktop:w-40 w-56 logo-img"
     />
    </Link>
   </div>

   <div className=" flex items-center justify-center font-medium w-full  ">
    {/*MOBILE NAVBAR*/}
    <div
     style={{ zIndex: 999999 }}
     className="bg-white fixed h-20 flex w-full justify-between items-center laptop:flex desktop:hidden win11:hidden fadeInDown "
    >
     <div className="pl-6 cursor-pointer">
      <BarsCross open={open} onClick={toggleMobileMenu} />
     </div>
     <div className={` pl-3 justify-center fadeInDown`}>
      <Link to="/home" className="">
       <img
        src={blacklogo}
        alt=""
        className="w-36 tablet:w-40 laptop:w-[180px] pt-2"
       />
      </Link>
     </div>
     <div className=" cursor-pointer h-20 bg-forestgreen-50 mobile:px-4 p-7 tracking-wide tablet:text-lg laptop:text-lg text-sm whitespace-nowrap font-medium  hover:bg-forestgreen-300 transition duration-300">
      <a
       href="/bookings/accommodations"
       target="_blank"
       rel="noopener noreferrer"
       className="font-[Poppins] tracking-wider text-justify justify-center text-white"
      >
       BOOK NOW
      </a>
     </div>
    </div>

    {/*MAIN NAVBAR*/}
    <div className="">
     <ul className="win11:flex text-base tracking-wider desktop:max-w-[796px] desktop:flex hidden transition  space-x-8 delay-300 uppercase items-center justify-between h-10 w-full font-[Poppins] green-navbar">
      <li
       className={`list-items hoverline justify-center flex ${
        isHome
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "fadeOut hidden"
       }`}
      >
       <Link to="/home" className={`${isHome ? "" : " fadeOut hidden "}`}>
        HOME
       </Link>
      </li>

      <li
       className={`list-items hoverline justify-center flex ${
        isAboutUs
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "border-b-2 border-transparent transition-colors duration-500"
       }`}
      >
       <Link to="/about" className="">
        About
       </Link>
      </li>

      <NavLinks />

      <li
       className={`list-items  hoverline justify-center flex group ${
        isAccommodation
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "border-b-2 border-transparent transition-colors duration-500"
       }`}
      >
       <span className="hover:cursor-pointer">Accommodations</span>
       <span className="default-icon">
        <LiaAngleDownSolid />
       </span>
       <div
        className="absolute hidden group-hover:block font-[550px] laptop:hidden animated fadeInDown mt-[19rem] pt-[1rem] ml-[5rem] "
        style={{ zIndex: 9999 }}
       >
        <div className="">
         <div
          className={`bg-white opacity-90 w-[30rem] grid shadow-md rounded-sm`}
          style={{ zIndex: 9999 }}
         >
          {!loading ? (
           <div className="p-4  grid grid-cols-2 space-x-5 tracking-widest">
            <div className="flex-col space-y-2">
             <h1 className="text-lg desktop:text-base font-semibold">Cabins</h1>
             {cabinAccommodation.map((cab) => (
              <div
               key={cab.accommodation_id}
               className=" tracking-widest space-y-2"
              >
               <Link to={`/accommodation/${cab.room_name}`}>
                <li className="text-[15px] text-gray-700 tracking-wider hovertext whitespace-nowrap">
                 {" "}
                 {cab.room_name}
                </li>
               </Link>
              </div>
             ))}
            </div>

            <div className="flex-col space-y-2">
             <h1 className="text-lg desktop:text-base font-semibold">
              Lake Villas
             </h1>
             {villaAccommodation.map((vil) => (
              <div
               key={vil.accommodation_id}
               className=" tracking-widest space-y-2"
              >
               <Link to={`/accommodation/${vil.room_name}`}>
                <li className="text-[15px] text-gray-700 tracking-wider hovertext whitespace-nowrap">
                 {" "}
                 {vil.room_name}
                </li>
               </Link>
              </div>
             ))}
            </div>
           </div>
          ) : (
           <div
            className="absolute hidden group-hover:block font-[550px] laptop:hidden animated fadeInDown mt-[20rem] ml-[5rem] pt-5"
            style={{ zIndex: 9999 }}
           >
            <LoadingCircle />
           </div>
          )}
         </div>
        </div>
       </div>
      </li>

      <li
       className={`list-items hoverline justify-center flex ${
        isEvents
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "border-b-2 border-transparent transition-colors duration-500"
       }`}
      >
       <Link to="/events">Events</Link>
      </li>

      <li
       className={`list-items hoverline justify-center flex ${
        isFaqs
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "border-b-2 border-transparent transition-colors duration-500"
       }`}
      >
       <Link to="/faqs">FAQS</Link>
      </li>

      <li
       className={`list-items hoverline justify-center flex ${
        isContact
         ? "border-b-2 border-forestgreen-50 transition-colors duration-500"
         : "border-b-2 border-transparent transition-colors duration-500"
       }`}
      >
       <Link to="/contact">Contact</Link>
      </li>
     </ul>

     {/* Mobile nav */}
     <ul
      style={{ zIndex: 9999 }}
      ref={mobileMenuRef}
      className={`fixed h-screen w-full  desktop:hidden win11:hidden space-y-2 text-gray-900 font-[550px] uppercase text-lg laptop:text-xl tracking-widest font-[Poppins] p-5 laptop:p-10 bg-gray-100 opacity-90 overflow-y-auto duration-500
          ${open ? "text-base left-[0]" : "-left-[100%]"} shadow-sm `}
     >
      <div className="p-5 flex-col pt-10 ">
       <div className="space-y-4 ">
        <li onClick={handleClose} className="">
         <Link
          to="/home"
          className={`w-full  block hoverline  ${
           isHome
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          Home
         </Link>
        </li>
        <li onClick={handleClose} className="">
         <Link
          to="/about"
          className={`w-full  block hoverline  ${
           isAboutUs
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          About
         </Link>
        </li>

        <NavLinks
         className="text-xl"
         open={open}
         setOpen={handleClose}
         setSubHeadingOpen={setSubHeadingOpen}
         subHeadingOpen={subHeadingOpen}
         setHeading={setHeading}
         heading={heading}
        />

        <li className="" onClick={toggleMobAccom}>
         <div
          className={`w-full flex items-center space-x-1 hover:cursor-pointer block hoverline ${
           isEvents
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          <span>Accommodation</span>
          <div className="mobile-icon mobile-menu">
           <LiaAngleDownSolid />
          </div>
         </div>
        </li>

        {mobAccommodation ? (
         <div className="flex-col w-full fadeInDown flex justify-center">
          <div className="flex-col">
           <h1 className="text-lg desktop:text-base font-semibold text-center ">
            Cabin
           </h1>
           <div className="space-y-1">
            {cabinAccommodation.map((cab) => (
             <div
              key={cab.accommodation_id}
              className=" tracking-widest text-center  "
             >
              <Link
               to={`/accommodation/${cab.room_name}`}
               onClick={handleClose}
              >
               <li className=" tracking-wider hovertext whitespace-nowrap ">
                {cab.room_name}
               </li>
              </Link>
             </div>
            ))}
           </div>

           <h1 className="text-lg desktop:text-base font-semibold text-center pt-3">
            Accommodation
           </h1>
           <div className="space-y-1">
            {" "}
            {villaAccommodation.map((vil) => (
             <div
              key={vil.accommodation_id}
              className=" tracking-widest space-y-2 text-center"
             >
              <Link to={`/accommodation/${vil.room_name}`}>
               <li
                className=" tracking-wider hovertext whitespace-nowrap"
                onClick={handleClose}
               >
                {vil.room_name}
               </li>
              </Link>
             </div>
            ))}
           </div>
          </div>
         </div>
        ) : null}

        <li onClick={handleClose} className="">
         <Link
          to="/events"
          className={`w-full  block hoverline ${
           isEvents
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          Events
         </Link>
        </li>

        <li onClick={handleClose} className="">
         <Link
          to="/faqs"
          className={`w-full  block hoverline ${
           isFaqs
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          Faqs
         </Link>
        </li>
        <li onClick={handleClose} className="">
         <Link
          to="/contact"
          className={`w-full  block hoverline  ${
           isContact
            ? "border-b-2 border-forestgreen-50 transition-colors duration-500 "
            : "border-b-2 border-transparent transition-colors duration-500 "
          }`}
         >
          Contact
         </Link>
        </li>
       </div>
       {/* <div className="w-full justify-center flex mt-4">
            <Button />
          </div> */}
      </div>
     </ul>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
