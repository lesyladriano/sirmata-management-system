import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Carousel } from "react-responsive-carousel";
import LoadingCircle from "../../../../components/misc/LoadingCircle";

function AccommodationBase() {
 const [accom, setAccom] = useState("");
 const [fetchedAccom, setFecthedAccom] = useState("");
 const location = useLocation();
 const [uploadPreset] = useState("sirmata_web_image");
 const [cloudName] = useState("di0nkj5kz");
 const [publicId, setPublicId] = useState([]);
 const [loading, setLoading] = useState(false);
 // Get Accommodation Name from URL
 useEffect(() => {
  const url = location.pathname;
  let accommodationNameFromUrl = url.substring(url.lastIndexOf("/") + 1);
  accommodationNameFromUrl = accommodationNameFromUrl.replace(/%/g, "");
  accommodationNameFromUrl = accommodationNameFromUrl.replace(/20/g, " ");
  setAccom(accommodationNameFromUrl);
 }, [location.pathname]);

 // Fetch data when accom changes
 useEffect(() => {
  setLoading(true);
  const fetchData = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/accommodation/find/${accom}`
    );
    const webImagesArray = Array.isArray(response.data.web_images)
     ? response.data.web_images
     : [response.data.web_images];
    const webImagesSerialized = webImagesArray;
    const regex = /s:\d+:"([^"]+)";/g;
    let match;
    const imagePaths = [];

    while ((match = regex.exec(webImagesSerialized))) {
     imagePaths.push(match[1]);
    }
    setPublicId(imagePaths);
    setLoading(false);

    setFecthedAccom(response.data);
   } catch (error) {
    setLoading(false);
    console.error("Error fetching accommodation data:", error);
   }
  };
  fetchData();
 }, [accom]);
 const cld = new Cloudinary({
  cloud: {
   cloudName,
  },
 });

 const handleButtonClick = () => {
  // Replace the URL with the actual URL you want to open in a new tab
  const tourUrl = "https://tour.panoee.com/sirmatafarm-accommodations";
  window.open(tourUrl, "_blank");
 };

 return (
  <div>
   {fetchedAccom ? (
    <div className="fadeInDown">
     <div className="relative">
      <AdvancedImage
       className="object-cover"
       style={{ height: "300px", width: "100%" }}
       cldImg={cld.image(publicId.find((id) => id.includes("banner")))}
       plugins={[responsive(), placeholder()]}
      />

      <div className="bg-black/25 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
       <h1 className="text-3xl text-white font-[Poppins] uppercase tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">
        {fetchedAccom.room_name}
       </h1>
      </div>
     </div>

     {/* QUOTE  */}
     <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <div className="h-full rounded-lg bg-beige-100 lg:col-span-2">
       <div className="p-10 tablet:p-16 laptop:p-16 desktop:p-20 win11:px-40 win11:py-28">
        <AdvancedImage
         className="w-16 h-8 win11:w-20 win11:h-10 "
         cldImg={cld.image(publicId.find((id) => id.includes("leaf")))}
         plugins={[responsive(), placeholder()]}
        />
        <h2 className="text-3xl win11:text-4xl  py-4 win11:py-6 text-semibold font-playlist-script text-brown-200 tracking-wider ">
         {fetchedAccom.room_name}
        </h2>
        <p className="text-sm  win11:text-lg font-[poppins] leading-loose ">
         <div
          style={{ whiteSpace: "pre-line" }}
          className=" text-sm  win11:text-lg leading-relaxed tracking-wider text-justify"
         >
          {fetchedAccom.web_description}
         </div>
        </p>
       </div>
      </div>
      <div className="h-full rounded-lg bg-beige-100 px-6 pt-2 py-8 win11:pr-32 flex justify-center items-center">
       <div className="w-full max-w-md bg-forestgreen-50 px-4 py-6 gap-6 font-[Poppins] flex flex-col items-center text-center justify-center">
        <a
         href="/bookings/accommodations"
         className=" py-3 w-full bg-beige-100 font-bold text-black hover:bg-forestgreen-300 hover:text-white tracking-widest"
         target="_blank"
         rel="noopener noreferrer"
        >
         BOOK NOW
        </a>

        <button
         className="mb-1 px-24 py-3 w-full bg-forestgreen-300 font-bold text-white hover:text-black hover:bg-beige-100 tracking-widest"
         onClick={handleButtonClick}
        >
         TAKE A TOUR
        </button>

        <p className="text-xs text-gray-400 pb-6">
         *Experience an immersive journey with our 'Take a Tour' button
         featuring a 360-degree interactive view
        </p>
       </div>
      </div>
     </div>

     {/* LAKE VILLA 1 */}
     <section className=" bg-gray-100 py-4">
      <div className="mx-auto max-w-screen-2xl px-8 py-4 sm:px-6 lg:px-2  ">
       <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative z-20 lg:py-10">
         <div className="relative h-full  lg:h-full desktop:h-full win11:h-full flex items-center">
          <Carousel
           showThumbs={false}
           autoPlay={true}
           infiniteLoop={true}
           className=""
          >
           {publicId
            // No need to use slice(1) anymore since we're filtering by content
            .filter((id) => !id.includes("leaf") && !id.includes("banner")) // Filter out ids containing 'leaf' or 'banner'
            .map((id, index) => (
             <div
              key={index}
              className="flex-col w-full h-full relative object-cover"
             >
              <AdvancedImage
               className="rounded object-cover h-full w-full max-h-[700px]"
               cldImg={cld.image(id)}
               plugins={[responsive(), placeholder()]}
              />
             </div>
            ))}
          </Carousel>
         </div>
        </div>

        <div className="relative flex items-center border-8 rounded-md border-forestgreen-200 bg-forestgreen-50  overflow-auto">
         <span className=" "></span>

         <div className="p-8 laptop:p-16 desktop:p-20 win11:p-24 text-brown-50 tracking-wider font-[Poppins]">
          <p className="mb-4 flex xl:justify-start py-4 font-[Poppins] ">
           <i className="fa-solid fa-person mr-5 text-lg text-brown-50"></i>
           <span>{fetchedAccom.capacity} pax</span>
          </p>
          <h6 className="text-sm font-[poppins] tracking-wider win11:text-xl">
           Inclusions & Amenities:{" "}
          </h6>

          <ul className="list-none text-sm">
           {fetchedAccom.feature &&
            fetchedAccom.feature.split(", ").map((feature, index) => (
             <li key={index} className="flex xl:justify-start py-2">
              <i className="fa-solid fa-check mr-2 text-lg text-brown-50"></i>
              {feature}
             </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-4 font-[poppins] text-sm text-brown-50"></ul>

          <a
           href="/bookings/accommodations"
           target="_blank"
           rel="noopener noreferrer"
           className="tracking-widest border-2 border-brown-50 mt-8 inline-block font-semibold rounded px-12 py-3 text-sm text-brown-50 hover:bg-forestgreen-300 hover:text-white transition duration-300 ease-in-out"
          >
           BOOK NOW
          </a>
         </div>
        </div>
       </div>
      </div>
     </section>
    </div>
   ) : (
    <div className="h-screen">
     <LoadingCircle />
    </div>
   )}
  </div>
 );
}

export default AccommodationBase;
