import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Carousel } from "react-responsive-carousel";
const getIcon = (selectedAccommodation) => {
 if (selectedAccommodation === "Cabin") {
  return <i className="fa fa-house mr-1" />;
 } else if (
  selectedAccommodation === "Villa" ||
  selectedAccommodation === "Lake Villa"
 ) {
  return <i className="fa fa-house-chimney  mr-1" />;
 } else {
  return <i className="fa fa-house  mr-1" />;
 }
};

function displayFeatures(features) {
 if (!features) {
  return "N/A";
 } else {
  const featuresArray = features.split(","); // Split the string into an array using commas
  return featuresArray.map((feature, index) => (
   <span key={index} className="flex">
    {index > 0 && <span className="comma">, </span>}{" "}
    {/* Add a comma and space if it's not the first item */}
    <i className="fa fa-check text-lg font-bold mr-3 text-forestgreen-100" />
    <span className="truncate-2-lines">{feature}</span>
   </span>
  ));
 }
}

export default function BookingMoreInfo({ selectedAccommodation, onClose }) {
 const [uploadPreset] = useState("sirmata_web_image");
 const [cloudName] = useState("di0nkj5kz");
 const [publicId, setPublicId] = useState([]);
 const cld = new Cloudinary({
  cloud: {
   cloudName,
  },
 });

 useEffect(() => {
  const webImagesArray = Array.isArray(selectedAccommodation.web_images)
   ? selectedAccommodation.web_images
   : [selectedAccommodation.web_images];
  const webImagesSerialized = webImagesArray;
  const regex = /s:\d+:"([^"]+)";/g;
  let match;
  const imagePaths = [];

  while ((match = regex.exec(webImagesSerialized))) {
   imagePaths.push(match[1]);
  }
  setPublicId(imagePaths);
 }, []);

 return (
  <>
   {selectedAccommodation && (
    <div className="booking-moreinfo-modal fixed whitespace-normal">
     <div className="w-[80%] h-[80%] overflow-y-auto bg-white rounded-lg fadeInDown ">
      <div className="lg:space-y-4 space-y-10">
       <div className="w-full   ">
        <div className="flex-col">
         <div className="flex bg-forestgreen-1100 px-6 py-1 text-white">
          <span className="items-center flex ">
           <i className="fa  fa-home text-2xl mr-3 " />
          </span>
          <span className="more-room-name font-[Poppins] p-2 font-bold  uppercase tracking-widest text-white text-lg win11:text-2xl ">
           {selectedAccommodation.room_name}
          </span>
          <span className=" items-center flex justify-end ml-auto ">
           <i
            className="fa fa-close text-2xl text-white exit-icon hover:cursor-pointer"
            onClick={onClose}
           />
          </span>
         </div>

         <div className="more-main-container px-4 py-4 win11:pt-4">
          <div className="more-accommodation-thumbnail-grid">
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
              <div key={index} className="flex-col w-full h-full relative">
               <AdvancedImage
                className="h-[20rem]  rounded-md shadow-md pt-4 object-cover md:h-full"
                cldImg={cld.image(id)}
                plugins={[responsive(), placeholder()]}
               />
              </div>
             ))}
           </Carousel>
          </div>
          <div className="more-description mobile:pt-3 tablet:pt-6  laptop:pt-6 win11:px-8">
           <div className="flex-col ">
            <div className=" space-y-6 pt-5 ">
             <div className="text-sm text-justify tracking-wider leading-relaxed win11:text-base">
              {selectedAccommodation.description}
             </div>

             <div
              className="w-full lg:grid lg:px-0  justify-between flex "
              style={{ gridTemplateColumns: "1fr 1fr" }}
             >
              <span>
               {getIcon(selectedAccommodation.type)}
               {selectedAccommodation.type}
              </span>
              <span>
               <i className="fa fa-person text-xl mr-1 " />
               Capacity: {selectedAccommodation.capacity}
              </span>
             </div>

             <div className="border-2 border-t-0 border-gray-300" />
            </div>

            <div className="">
             <div className="win11:py-6 pt-6 ">
              <span className="font-bold bg-dark-50 rounded-full  text-white px-8 py-1 text-sm uppercase win11:text-lg tracking-widest ">
               Room Amenities{" "}
              </span>
             </div>
             <div className="more-features-info more-info grid grid-cols-4 text-xs whitespace-nowrap win11:text-sm mobile:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3  gap-6">
              {displayFeatures(selectedAccommodation.feature)}
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
