import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { links } from "./Mylinks";
import { LiaAngleDownSolid } from "react-icons/lia";
import "../../../assets/css/website.css";
import axios from "axios";
const NavLinks = ({
 setOpen,
 open,
 setSubHeadingOpen,
 subHeadingOpen,
 heading,
 setHeading,
}) => {
 const location = useLocation();
 const [subHeading, setSubHeading] = useState("");
 const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 const [isAmenities, setAmenities] = useState(false);
 const [isAccommodations, setAccommodations] = useState(false);
 const [isEvents, setEvents] = useState(false);
 useEffect(() => {
  const handleResize = () => {
   setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
  return () => {
   window.removeEventListener("resize", handleResize);
  };
 }, []);

 useEffect(() => {
  setAmenities(location.pathname === "/amenities");
  setAccommodations(location.pathname === "/accommodations");
  setEvents(location.pathname === "/events");
 }, [location]);

 const toggleSubMenu = () => {
  setSubHeadingOpen(!subHeadingOpen);
 };

 return (
  <>
   {links.map((link) => (
    <div key={link.id} className="relative">
     <div className="cursor-pointer  group ">
      <div className="flex">
       {/** Default View Navigation Buttons */}
       <div className="flex-col win11:flex desktop:flex hidden group   ">
        <h1
         className={`w-full justify-between  text-center  group items-center hidden lg:flex h-10 `}
         onClick={() => {
          heading !== link.name ? setHeading(link.name) : setHeading("");
          setSubHeading("");
         }}
        >
         <div
          className={`flex  w-full justify-between items-center list-items  hoverline
              ${
               (isAmenities && link.name === "Amenities") ||
               (isAccommodations && link.name === "Accommodations") ||
               (isEvents && link.name === "Events")
                ? "border-b-2 border-forestgreen-300 transition-colors duration-500"
                : "border-b-2 border-transparent transition-colors duration-500"
              }`}
         >
          <span className="">{link.name}</span>
          <span className="default-icon">
           <LiaAngleDownSolid />
          </span>
          {link.submenu && <div className="w-full" />}
         </div>
        </h1>

        {/* Default View Drop down Menu menus */}

        {link.submenu && (
         <div
          className="absolute hidden group-hover:lg:block font-[550px]  laptop:hidden hover:lg:block animated fadeInDown mt-10 pt-5"
          style={{ zIndex: 9999 }}
         >
          <div className="">
           <div
            className={`bg-white opacity-90 grid   ${
             link.sublinks.length > 1
              ? "grid-cols-2 w-[450px]"
              : "grid-cols-1 w-64"
            }  shadow-md  rounded-sm   `}
            style={{ zIndex: 9999 }}
           >
            {link.sublinks.map((mysublinks) => (
             <div key={link.id} className=" p-4 tracking-widest space-y-2">
              <h1 className="text-lg desktop:text-base font-semibold">
               {mysublinks.Head}
              </h1>
              {mysublinks.sublink.map((slink) => (
               <div key={link.id}>
                <li className="text-[15px] text-gray-700 tracking-wider hovertext whitespace-nowrap">
                 <Link
                  to={slink.link}
                  className="hover:text-primary hover:text-bold"
                 >
                  {slink.name}
                 </Link>
                </li>
               </div>
              ))}
             </div>
            ))}
           </div>
          </div>
         </div>
        )}
       </div>
      </div>

      {/* Mobile Navigation Buttons */}
      <div
       className={`laptop:flex  desktop:hidden win11:hidden  items-center w-full tracking-widest text-center flex mobile-menu`}
       onClick={() => {
        heading !== link.name ? setHeading(link.name) : setHeading("");
        toggleSubMenu();
       }}
      >
       <div className="">
        {link.name}
        {link.submenu && <div className="w-full" />}
       </div>
       <div className="mobile-icon mobile-menu">
        <LiaAngleDownSolid />
       </div>
      </div>
     </div>

     {/* Mobile menus */}
     <div
      className={`cursor-pointer laptop:flex group  text-lg text-center win11:hidden w-full 
              ${heading === link.name ? " fadeInDown" : "fadeOutUp disable"}
            `}
     >
      {/* sublinks */}
      {link.sublinks.map((slinks) => (
       <div key={link.id} className="w-full">
        <div className="space-y-4 text-center  w-full  ">
         <h1
          onClick={() => {
           setSubHeading(slinks.Head);
           setSubHeadingOpen(!subHeadingOpen); // Toggle subHeadingOpen
          }}
          className={`laptop:flex win11:hidden desktop:hidden flex items-center hovertext space-x-8 mobile-menu`}
         >
          {slinks.Head}
         </h1>
         <div
          className={`transition delay-300 ${
           subHeading === slinks.Head
            ? "lg:hidden fadeInDown"
            : "fadeOutUp disable"
          }`}
         >
          {/* sublinks */}
          {slinks.sublink.map((slink) => (
           <div key={slink.link} className="">
            <li className="whitespace-nowrap hovertext text-center ">
             <Link
              to={slink.link}
              onClick={() => {
               setOpen(false); // Close the mobile navbar
              }}
             >
              {slink.name}
             </Link>
            </li>
           </div>
          ))}
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
   ))}
  </>
 );
};

export default NavLinks;
