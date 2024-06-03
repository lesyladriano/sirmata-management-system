import React from "react";
import foodImage from "../../../assets/images/website/accomodations/accommodation2.jpg";

export default function BookingPackageInfo({ showPackageInfo, onClose }) {
 return (
  <>
   {showPackageInfo && (
    <div className="booking-packageinfo-modal fixed whitespace-normal">
     <div className="bg-white h-[80%] w-[80%] rounded-lg shadow-md overflow-y-auto space-x-2 fadeInDown  ">
      <div>
       <div className="w-full h-full ">
        <div className="flex-col">
         <div className="flex bg-forestgreen-1100 text-white px-6 py-3">
          <span className="items-center flex ">
           <i className="fa  fa-circle-info text-3xl mr-3" />
          </span>
          <span className="font-[Poppins] uppercase font-bold tracking-widest text-lg win11:text-2xl pt-1">
           Package Info
          </span>
          <span className=" items-center flex justify-end ml-auto">
           <i
            className="fa fa-close text-2xl hover:cursor-pointer exit-icon"
            onClick={onClose}
           />
          </span>
         </div>
         <div className="package-main-container space-y-6 pb-4 px-4 font-[Poppins] win11:px-6">
          <div>
           <div className="p-4 win11:p-8 tracking-wider text-black">
            <p className="font-semibold text-xs win11:text-lg">
             Greetings from Sirmata Ecofarm and Nature Park!{" "}
            </p>
            <p className="pt-4 text-xsm win11:text-sm">
             We're thrilled to outline the following inclusions for you:
            </p>
           </div>
           <div className=" text-sm pl-2 win11:pl-10 space-y-3 win11:tracking-wider text-black">
            <li>Private parking area</li>
            <li>
             10% discount on all outdoor activities (biking, spider web, rope
             course)
            </li>
            <li>Exclusive pool area and clubhouse for the check in guests</li>
            <li>
             Additional P200/person for inclusion of breakfast at Kayo Resto
            </li>
            <li>Kape Puno Treehouse Cafe Reservation</li>
            <li>Kayo Restaurant with View Deck Reservation</li>
            <li>
             Wifi is not yet available in the cabins and villas <br /> but is
             free of use in Kayo Resto and other common areas.
            </li>

            <div className="text-xs  white-nonspace pt-4 win11:pt-10 whitespace-normal ">
             Please present a valid government issued identification card upon
             check-in.
            </div>
            <div className=" text-xs win111:text-xs space-y-2 uppercase text-black">
             <p>
              Standard Check in
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              &nbsp;&nbsp;2:00 PM
             </p>
             <p>
              Standard Check out &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              &nbsp;&nbsp;12:00 NN
             </p>
            </div>
            <div className="flex items-center justify-center pt-6 win11:pt-4 ">
             <div className="border-t  border-black w-full max-w-xs tablet:max-w-2xl laptop:max-w-lg desktop:max-w-5xl win11:max-w-6xl"></div>
            </div>
            <p className="text-xs tracking-wider leading-normal text-justify">
             To initiate a cancellation, please send an email to
             sirmatafarm@gmail.com. Include the subject line "Cancellation
             Request" and provide the relevant booking details, including your
             name, contact information, and booking reference. Our team will
             acknowledge your request and proceed with the cancellation process.{" "}
            </p>
           </div>
          </div>
          <div className=" space-y-6 font-[Poppins] tracking-widest mb-8 win11:pt-8 px-2  win11:px-4 h-full text-black  bg-brown-50  ">
           <div className="text-xs win11:text-base font-bold pt-10 win11:pt-2 text-center ">
            CABIN AND VILLAS GUIDELINES
           </div>
           <div className=" text-xs win11:text-xs space-y-4 px-3 win11:px-6 ">
            <p>
             <span className="text-forestgreen-50 text-sm">PARKING SPACE </span>{" "}
             is within the property near the entrance gate.
            </p>
            <p>
             <span className="text-forestgreen-50 text-sm">QUIET TIME </span> is
             from 10:00 PM to 7:00 AM.
             <li className="test-xs">
              No loud and roudy house parties and only light drinking will be
              allowed.
             </li>
            </p>
            <p>
             <span className="text-forestgreen-50 text-sm">BREAKFAST </span>{" "}
             will be served at Kayo Restaurant from 7:00 AM to 10:00 AM
             <li className="test-xs">200/head for a plated menu.</li>
            </p>

            <p>
             <span className="text-forestgreen-50 text-sm">
              KAYO RESTAURANT{" "}
             </span>{" "}
             is open from 7:00 PM to 9:00 PM
             <li className="test-xs">Last call of order is at 8:00 PM</li>
             <li className="test-xs">Room service is not yet available</li>
            </p>

            <p>
             <span className="text-forestgreen-50 text-sm">KAPE PUNO </span> is
             open from 7:00 AM to 8:00 PM
             <li className="test-xs">Last call of order is at 7:30 PM</li>
             <li className="test-xs">Room service is not yet available</li>
            </p>

            <p>
             <span className="text-forestgreen-50 text-sm">
              HIRAYA WELLNESS AND SPA{" "}
             </span>{" "}
             offers room service and advance bookings.
             <li className="test-xs">
              Message or call us at 0917 110 7910 - 0917 120 8306
             </li>
            </p>
            <p>
             <span className="text-forestgreen-50 text-sm">ACTIVITIES </span>{" "}
             are open from 8:00 AM to 12:00 PM, <br />
             resumes at 1:30 PM-5:00 PM for assistance.
            </p>

            <p>
             <span className="text-forestgreen-50 text-sm">HOUSEKEEPING</span>{" "}
             is available until 9:00 PM only. <br />
             Any requests beyond this time will be entertained the next day.
            </p>
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
