import React from "react";

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
   <span key={index}>
    {index > 0 && ""} {/* Add a comma and space if it's not the first item */}
    <i className="fa  fa-check text-lg font-bold mr-3 text-forestgreen-100" />
    <span className="">{feature}</span>
   </span>
  ));
 }
}

export default function BookingMoreInfo({ selectedAccommodation, onClose }) {
 return (
  <>
   {selectedAccommodation && (
    <div className="booking-moreinfo-modal fixed">
     <div className="more-info-modal fadeInDown ">
      <span className=" items-center flex justify-end ml-auto ">
       <i
        className="fa fa-close text-xl text-gray-700 exit-icon"
        onClick={onClose}
       />
      </span>

      {selectedAccommodation.full_name}
     </div>
    </div>
   )}
  </>
 );
}
