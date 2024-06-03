import ArrowUpButton from "/src/components/website/ArrowUpButton";
import { useEffect, useState } from "react";
import axios from "axios";
import contactbanner from "/src/assets/images/website/contact/contact_banner.jpg";
import leaf from "/src/assets/images/website/contact/leaf_contact.png";
import { FaMapLocationDot, FaPhone } from "react-icons/fa6";

export default function Contact() {
 const [selectedInfo, setSelectedInfo] = useState(null);
 const [loading, setLoading] = useState(true);
 const info_id = 1;

 useEffect(() => {
  async function fetchData() {
   try {
    const result = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/web`
    );
    const matchedWebInfo = result.data.find(
     (web_info) => web_info.info_id === info_id
    );
    setSelectedInfo(matchedWebInfo || null);
    setLoading(false);
   } catch (error) {
    console.error("Error loading accommodations:", error);
    setLoading(false);
   }
  }
  fetchData();
 }, []);

 const wazeLink = selectedInfo ? selectedInfo.map_link : "#";

 return (
  <div className="">
   <div className="relative">
    <img
     src={contactbanner}
     className="w-full h-[300px] object-cover object-center win11:h-auto"
     alt="Contact Banner"
    />
    <div className="bg-black/25 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
     <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">
      CONTACT
     </h1>
    </div>
   </div>

   <section className="py-10 tablet:py-16 laptop:py-16 desktop:py-20 win11:py-24 dark:bg-gray-800 dark:text-gray-50 px-2 tablet:px-10 laptop:px-10 desktop:px-10 win11:px-20">
    <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 win11:grid-cols-3 gap-4 ">
     <div className="px-6 md:py-0 win11:pl-20 win11:py-0 flex flex-col justify-center tracking-wider">
      <img
       src={leaf}
       className="w-16 h-6 win11:w-20 win11:h-8"
       alt="Leaf Contact"
      />
      <h5 className="pt-6 text-base win11:text-lg font-[poppins] text-brown-100 font-bold tracking-wide">
       CONTACT US
      </h5>
      <h1 className="text-3xl pt-8 font-[poppins] text-forestgreen-50 uppercase font-bold tracking-wide">
       Get in touch
      </h1>
      <p className="pt-4 font-[Poppins] text-base leading-relaxed text-gray-700">
       Reach out to us to experience the beauty of our nature park firsthand.
      </p>
     </div>

     <div className=" p-4 win11:p-0 items-center mobile:justify-center tracking-wider">
      <div className="pt-2 md:pt-0 win11:pt-8 win11:pl-10 laptop:pt-20 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-start ">
       <FaMapLocationDot
        className="w-10 h-10 text-center text-forestgreen-600 "
        alt="Location Contact"
       />
       <div>
        <h1 className="text-xl win11:text-2xl font-[poppins] text-forestgreen-50 uppercase font-bold pb-3 tracking-wide">
         ADDRESS
        </h1>
        <p className="pt-2 font-[Poppins] leading-relaxed text-base text-gray-700">
         {loading ? (
          <p>Loading...</p>
         ) : (
          selectedInfo && <p>{selectedInfo.location}</p>
         )}
        </p>
        <a
         href={wazeLink}
         className="pt-2 font-[Poppins] leading-relaxed text-base text-gray-700"
        >
         Waze : Sirmata Ecofarm and Nature Park
        </a>
       </div>
      </div>
     </div>

     <div className=" p-4 win11:p-0 mobile:justify-center laptop:justify-end">
      <div className="pt-2 md:pt-0  win11:pt-8 win11:pl-10 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-start  ">
       <FaPhone
        className="w-10 h-10 text-forestgreen-600"
        alt="Phone Contact"
       />
       <div>
        <h1 className="text-xl win11:text-2xl font-[poppins] text-forestgreen-50 uppercase font-bold pb-3 tracking-wide">
         CONTACT DETAILS
        </h1>
        <a
         href="mailto:sirmatafarm@gmail.com"
         className="pt-2 font-[Poppins] text-base leading-relaxed underline text-gray-700"
        >
         {loading ? (
          <span>Loading...</span>
         ) : (
          selectedInfo && <span>{selectedInfo.official_email}</span>
         )}
        </a>
        <p className="pt-2 font-[Poppins] text-3xl text-forestgreen-50 font-bold">
        <a href="tel:+639171208306" className="">
         {loading ? (
          <span>Loading...</span>
         ) : (
          
          selectedInfo && (
           <div className="flex flex-col space-y-2">
            {selectedInfo.contact_number
             .split(",")
             .map((phoneNumber, index) => (
              <span key={index}>
               {phoneNumber.trim().replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3")}
              </span>
             ))}
           </div>
          )
         )} </a>
        </p>
       </div>
      </div>
     </div>
    </div>
   </section>
   <ArrowUpButton />
  </div>
 );
}
