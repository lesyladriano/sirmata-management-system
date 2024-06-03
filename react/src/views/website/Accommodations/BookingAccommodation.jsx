import axios from "axios";
import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import { Link } from "react-router-dom";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import BookingMoreInfo from "./BookingMoreInfo";
import BookingPackageInfo from "./BookingPackageInfo";
import ArrowUpButton from "/src/components/website/ArrowUpButton";
import Swal from "sweetalert2";

export default function BookingAccommodation() {
 // Update Payments
 useEffect(() => {
  const update_expire_payments = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/payment_update_expire`
    );
   } catch (error) {
    console.error("Error fetching reservations:", error);
   }
  };
  update_expire_payments();
 }, []);

 const [adults, setAdults] = useState(1);
 const [kids, setKids] = useState(0);
 const [checkInDate, setCheckInDate] = useState(null);
 const [checkOutDate, setCheckOutDate] = useState(null);
 const [handleCheckInExist, setSetHandleCheckInExist] = useState(false);

 const handleAddKids = () => setKids((prevKids) => prevKids + 1);
 const handleRemoveKids = () => kids > 0 && setKids((prevKids) => prevKids - 1);
 const handleAddAdult = () => setAdults((prevAdults) => prevAdults + 1);
 const handleRemoveAdult = () =>
  adults > 1 && setAdults((prevAdults) => prevAdults - 1);

 const handleDateClick = (date) => {
  // Convert date to UTC to ensure consistency
  const utcDate = new Date(date);
  utcDate.setUTCHours(0, 0, 0, 0);

  // If the clicked date overlaps with a reserved range, reset both check-in and check-out dates

  if (checkInDate === null) {
   setCheckInDate(date);
   setSetHandleCheckInExist(true);
   setCheckOutDate(null);
  } else if (checkOutDate === null && date > checkInDate) {
   setCheckOutDate(date);
  } else {
   setCheckInDate(date);
   setSetHandleCheckInExist(true);
   setCheckOutDate(null);
  }

  setDateErrorMessage(false);
 };

 const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
 };

 //  CHECKPOINT
 const tileClassName = ({ date }) => {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

  for (const range of alreadyReserved) {
   range.checkInDate.setHours(0, 0, 0, 0);
   range.checkOutDate.setHours(0, 0, 0, 0);
   const rangeStartDate = new Date(range.checkInDate);
   const rangeEndDate = new Date(range.checkOutDate);

   let isCheckOutDate = false; // Initialize a flag
   let isCheckInDateReserved = false; // Initialize a flag
   let isStackedDate = false; // Initialize the flag outside the loop
   let isRange = false;
   if (date >= rangeStartDate && date <= rangeEndDate) {
    isRange = true;
   }

   if (dateObj.getTime() === rangeStartDate.getTime()) {
    const isStacked = alreadyReserved.some((otherDateRange) => {
     return dateObj.getTime() === otherDateRange.checkOutDate.getTime();
    });

    isCheckInDateReserved = !isStacked; // Set the flag for check-in date
   }
   if (dateObj.getTime() === range.checkOutDate.getTime()) {
    const isStacked = alreadyReserved.some((otherDateRange) => {
     return (
      range.checkOutDate.getTime() === otherDateRange.checkInDate.getTime()
     );
    });

    isCheckOutDate = !isStacked; // Set the flag for check-out date
   }
   if (isCheckInDateReserved) {
    return "reserved_guest_check_in_dates_2";
   }
   if (isCheckOutDate) {
    return "reserved_guest_check_out_dates_2";
   }

   if (isRange) {
    return "reserved-date";
   }
  }

  if (checkInDate && checkOutDate) {
   if (date >= checkInDate && date <= checkOutDate) {
    if (date === checkInDate) {
     return "selected-date-range ";
    }
    return "selected-date-range";
   }
  } else if (date === checkInDate) {
   return "";
  }
  return null;
 };

 const calculateNights = () => {
  if (checkInDate && checkOutDate) {
   const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
   const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
   return numberOfNights;
  }
  return 0;
 };

 //  Checkpoint
 const [reservations, setReservations] = useState("");
 const fetchData = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   setReservations(response.data);
  } catch (error) {
   console.error("Error fetching reservations:", error);
  }
 };
 useEffect(() => {
  fetchData();
 }, []);

 //  const handleCheckAvailability = (date) => {
 //   setIsCheckAvailability(true);
 //   setShowBookingDetails(true);
 //   setDateErrorMessage(false);
 //   const kids_compute = kids / 2;
 //   const requiredMinimumCapacity = adults;

 //   if (!checkInDate || !checkOutDate) {
 //    setDateErrorMessage("Check-in and Check-out dates are required.");
 //    return;
 //   }

 //   const dateObj = new Date(date);

 //   dateObj.setHours(0, 0, 0, 0);

 //   const overlappingReservations = reservations.filter((reservation) => {
 //    const reservationStartDate = new Date(reservation.check_in_date);
 //    let reservationEndDate = new Date(reservation.check_out_date);

 //    // If reservation status is "Checked Out," allow any end date
 //    if (reservation.status === "Checked Out") {
 //     reservationEndDate = new Date(); // Set it to the current date or any other suitable value
 //    }

 //    reservationStartDate.setHours(0, 0, 0, 0);

 //    return (
 //     (checkInDate <= reservationEndDate &&
 //      checkOutDate >= reservationStartDate) ||
 //     checkInDate === reservationEndDate
 //    );
 //   });

 //   let accommodationsWithoutOverlap;

 //   if (overlappingReservations.length > 0) {
 //    console.log("Overlap!");
 //    accommodationsWithoutOverlap = originalAccommodations.filter(
 //     (accommodation_) => {
 //      const hasOverlap = overlappingReservations.some((reservation) => {
 //       return accommodation_.accommodation_id === reservation.accommodation_id;
 //      });
 //      return !hasOverlap;
 //     }
 //    );
 //   } else {
 //    console.log("No Overlap!");
 //    accommodationsWithoutOverlap = originalAccommodations;
 //   }

 //   if (requiredMinimumCapacity > 0) {
 //    const sortedByCapacity = accommodationsWithoutOverlap
 //     .filter((accommodation) => {
 //      const [minCapacity, maxCapacity] = accommodation.capacity.split("-");
 //      const minCapacityNumber = Number(minCapacity);

 //      return (
 //       minCapacityNumber <= requiredMinimumCapacity + 2 &&
 //       requiredMinimumCapacity <= Number(maxCapacity)
 //      );
 //     })
 //     .sort((a, b) => {
 //      const [minCapacityA] = a.capacity.split("-");
 //      const [minCapacityB] = b.capacity.split("-");

 //      if (
 //       Number(minCapacityA) <= requiredMinimumCapacity &&
 //       Number(minCapacityB) > requiredMinimumCapacity
 //      ) {
 //       return -1; // a comes before b
 //      }
 //      if (
 //       Number(minCapacityA) > requiredMinimumCapacity &&
 //       Number(minCapacityB) <= requiredMinimumCapacity
 //      ) {
 //       return 1; // b comes before a
 //      }

 //      return Number(minCapacityA) - Number(minCapacityB);
 //     });

 //    setAccommodation(sortedByCapacity);
 //   } else {
 //    setAccommodation(accommodationsWithoutOverlap);
 //   }
 //  };

 const handleResetFilters = () => {
  setAccommodation(originalAccommodations);
  setSelectedTab("All");
  setSearchQuery("");
  setShowBookingDetails(false);
  setCheckInDate(null);
  setCheckOutDate(null);
  setAdults(1);
  setKids(0);
 };
 // Checkpoint
 const handleTabClick = (tabName) => {
  setSelectedTab(tabName);
  // Implement any additional logic you want when a tab is clicked
 };

 const [accommodation_id, setAccommodationId] = useState(null);
 const [room_name, setName] = useState("");
 const [type, setType] = useState("");
 const [capacity, setCapacity] = useState("");
 const [description, setDescription] = useState("");
 const [feature, setFeature] = useState("");
 const [price, setPrice] = useState("");
 const [status, setStatus] = useState("Available");
 const [images, setImages] = useState("");
 const [accommodation, setAccommodation] = useState([]);
 const [loading, setLoading] = useState(false);

 const [selectedTab, setSelectedTab] = useState("All");
 const [showBookingDetails, setShowBookingDetails] = useState(false);
 const [selectedAccommodation, setSelectedAccommodation] = useState(null);
 const [showPackageInfo, setShowPackageInfo] = useState(false);

 useEffect(() => {
  const update_expire = async () => {
   try {
    const result = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/payment_update_expire`
    );
   } catch (err) {
    console.error(err);
   }
  };
  update_expire();
 }, []);

 useEffect(() => {
  (async () => await Load())();
 }, []);

 const [originalAccommodations, setOriginalAccommodations] = useState([]);

 async function Load() {
  setLoading(true);
  try {
   const result = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   setAccommodation(result.data);
   setOriginalAccommodations(result.data);
  } catch (err) {
   console.error(err);
  } finally {
   setLoading(false);
  }
 }

 function displayFeatures(features) {
  if (!features) {
   return "N/A";
  } else if (Array.isArray(features)) {
   return features.join(", ");
  } else {
   return features;
  }
 }

 function getStatus(status) {
  if (status === "Available") {
   return (
    <div className="bg-green-800 text-white px-2 py-2 text-center rounded-sm">
     Available
    </div>
   );
  } else if (status === "Booked") {
   return (
    <div className="bg-red-800 text-white px-2 py-2 text-center rounded-sm">
     Booked
    </div>
   );
  } else if (status === "Maintenance") {
   return (
    <div className="bg-gray-800 text-white px-2 py-2 text-center rounded-sm">
     Maintenance
    </div>
   );
  } else {
   return <div>{status}</div>;
  }
 }

 const getIcon = (accommodationType) => {
  if (accommodationType === "Cabin") {
   return <i className="fa fa-house mr-1" />;
  } else if (
   accommodationType === "Villa" ||
   accommodationType === "Lake Villa"
  ) {
   return <i className="fa fa-house-chimney  mr-1" />;
  } else {
   return <i className="fa fa-house  mr-1" />;
  }
 };

 {
  /** Selected Tab */
 }

 const handleToggleMoreInfo = (accommodation) => {
  setSelectedAccommodation(accommodation);
  setShowBookingDetails(true);
 };

 const handleCloseMoreInfo = () => {
  setShowBookingDetails(false);
  setSelectedAccommodation(null);
 };

 const handleTogglePackageInfo = () => {
  setShowPackageInfo(!showPackageInfo);
 };
 const handleClosePackageInfo = () => {
  setShowPackageInfo(false);
 };

 const [searchQuery, setSearchQuery] = useState("");

 const filteredAccommodations = accommodation.filter((accommodation) => {
  const matchesType =
   selectedTab === "All" || accommodation.type === selectedTab;
  const accommodationName = accommodation.room_name.toLowerCase();
  const accommodationType = accommodation.type.toLowerCase();
  const accommodationDescription = accommodation.description.toLowerCase();
  const featuresArray = Array.isArray(accommodation.feature)
   ? accommodation.feature
   : [accommodation.feature];
  const matchesSearchQuery =
   accommodationName.includes(searchQuery.toLowerCase()) ||
   accommodationType.includes(searchQuery.toLowerCase()) ||
   accommodationDescription.includes(searchQuery.toLowerCase()) ||
   featuresArray.some((feature) =>
    feature.toLowerCase().includes(searchQuery.toLowerCase())
   );
  const isNotMaintenance = accommodation.status !== "Maintenance";
  return matchesType && matchesSearchQuery && isNotMaintenance;
 });

 const [dateErrorMessage, setDateErrorMessage] = useState("");

 const noBookingPlease = () => {
  Swal.fire({
   title: "Not Available Yet",
   text: "To book a room, please contact us on Facebook.",
   icon: "info",
   iconColor: "#000000",
   confirmButtonText: "OK",
   confirmButtonColor: "#009900",
  });
 };

 //  const handleBookNow = (accommodation) => {
 //   if (!isCheckAvaiability) {
 //    Swal.fire({
 //     icon: "warning",
 //     title: "Oops...",
 //     text: "Please select dates first and check availability.",
 //     confirmButtonColor: "#009900",
 //    });

 //    return;
 //   }

 //   if (!checkInDate || !checkOutDate) {
 //    setDateErrorMessage("Check-in and Check-out dates are required.");
 //    return;
 //   }

 //   setDateErrorMessage("");
 //   const queryParams = new URLSearchParams({
 //    accommodation: accommodation.accommodation_id,
 //    checkInDate: formatDate(checkInDate),
 //    checkOutDate: formatDate(checkOutDate),
 //    adults: adults,
 //    kids: kids,
 //   });
 //   setShowBookingDetails(false);
 //   setCheckInDate(null);
 //   setCheckOutDate(null);
 //   const url = `/bookings/details?${queryParams.toString()}`;
 //   window.open(url, "_blank");
 //  };

 const [alreadyReserved, setAlreadyReserved] = useState([]);
 const [chosen, setChosen] = useState("");
 const [proceed, setProceed] = useState(false);

 const handleBookNow = (accommodation) => {
  fetchData();

  setChosen(accommodation);
  setCheckInDate(null);
  setDateErrorMessage("");
  setCheckOutDate(null);
  setProceed(true);
  const reserved = reservations.filter(
   (reservation) =>
    reservation.accommodation_id === accommodation.accommodation_id &&
    reservation.status !== "Checked Out" &&
    reservation.status !== "Cancelled"
  );
  // Saving the filtered check-in and check-out dates together
  const dateRanges = reserved.map((reservation) => ({
   checkInDate: new Date(reservation.check_in_date),
   checkOutDate: new Date(reservation.check_out_date),
  }));

  setAlreadyReserved(dateRanges);
 };

 //  NULL FACTOR
 useEffect(() => {
  if (checkInDate && checkOutDate) {
   const isCheckInDataInReserved = alreadyReserved.some((range) => {
    const rangeStartDate = new Date(range.checkInDate);
    const rangeEndDate = new Date(range.checkOutDate);
    rangeStartDate.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    rangeEndDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    return (
     rangeStartDate.getTime() === checkInDate.getTime() ||
     rangeEndDate.getTime() === checkOutDate.getTime()
    );
   });

   const ifCheckInRangeHasReservedInside = alreadyReserved.some((range) => {
    const rangeStartDate = new Date(range.checkInDate);
    const rangeEndDate = new Date(range.checkOutDate);
    rangeStartDate.setHours(0, 0, 0, 0);
    rangeEndDate.setHours(0, 0, 0, 0);

    // Check if the range falls within the guest's check-in and check-out dates
    return (
     rangeStartDate.getTime() >= checkInDate.getTime() &&
     rangeEndDate.getTime() <= checkOutDate.getTime()
    );
   });
   if (ifCheckInRangeHasReservedInside) {
    setCheckInDate(null);
    setCheckOutDate(null);
   }
   if (isCheckInDataInReserved) {
    setCheckInDate(null);
    setCheckOutDate(null);
   }
  }
 }, [checkInDate, checkOutDate, alreadyReserved]);

 const proceedToReservation = () => {
  setDateErrorMessage("");

  if (!proceed) {
   Swal.fire({
    icon: "warning",
    title: "Oops...",
    html: "Please choose an Accommodation to <strong>Book Now</strong>",
    confirmButtonColor: "#009900",
   });
   return;
  }

  if (!checkInDate || !checkOutDate) {
   setDateErrorMessage("Check-in and Check-out dates are required.");
   return;
  }

  const totalGuests = parseInt(adults) + parseInt(kids);
  const capacity = parseInt(chosen.capacity);
  const [minCapacity, maxCapacity] = chosen.capacity.split("-").map(Number);

  if (totalGuests > parseInt(maxCapacity)) {
   if (totalGuests === capacity + 1) {
    // Trigger confirmation dialog only if totalGuests exceeds capacity by exactly one
    Swal.fire({
     icon: "warning",
     title: "Oops...",
     html: `This accommodation can only host <strong>${maxCapacity} guests</strong>. <br/>Proceed anyway?`,
     showCancelButton: true,
     confirmButtonColor: "#009900",
     cancelButtonColor: "#dc3545",
     confirmButtonText: "Yes, proceed",
     cancelButtonText: "No, cancel",
    }).then((result) => {
     if (result.isConfirmed) {
      // Proceed with reservation
      proceedWithReservation();
     }
    });
   } else {
    // Don't proceed if totalGuests exceeds capacity by more than one
    Swal.fire({
     icon: "warning",
     title: "Oops...",
     html: `This accommodation can only host <strong>${maxCapacity} guests</strong>.`,
     confirmButtonColor: "#009900",
    });
   }
  } else {
   // Proceed with reservation
   proceedWithReservation();
  }
 };

 const proceedWithReservation = () => {
  const queryParams = new URLSearchParams({
   accommodation: chosen.accommodation_id,
   checkInDate: formatDate(checkInDate),
   checkOutDate: formatDate(checkOutDate),
   adults: adults,
   kids: kids,
  });
  setShowBookingDetails(false);
  setCheckInDate("");
  setCheckOutDate("");
  setChosen("");
  setProceed(false);
  setAlreadyReserved("");
  const url = `/bookings/details?${queryParams.toString()}`;
  window.open(url, "_blank");
  window.location.reload();
 };

 return (
  <div className="main-container  flex-row-reverse laptop:flex-col laptop:flex-wrap desktop:flex-wrap gap-10  w-full lg:flex lg:space-y-0 space-y-4 lg:space-x-4 space-x-0 lg:px-24 px-5">
   {/**Calendar Side */}
   <div className="flex justify-center ">
    <div className="bg-white bg-opacity-30 hover:bg-opacity-100 animated h-fit sticky top-[50px] p-4 rounded-md shadow-md max-w-[350px]">
     <div className="flex-col w-full justify-center flex ">
      <div className="">
       <div
        className="bg-white rounded-md shadow-md border-2 border-gray-400 px-4 py-2 calendar-design 
   
         "
       >
        <ReactCalendar
         minDate={new Date()}
         className="boob"
         view="month"
         onClickDay={handleDateClick}
         value={[checkInDate, checkOutDate]}
         selectRange={true}
         tileClassName={tileClassName}
        />
       </div>
      </div>
      <div className="book-now-container flex-col space-y-3 mt-2">
       <div className="details-container space-y-3">
        {dateErrorMessage && (
         <div className="fadeInDown bg-red-900 text-white px-2 py-1 rounded-md shadow-md">
          {dateErrorMessage}
         </div>
        )}

        {chosen && (
         <div className="">
          <div className=" ">
           {chosen ? (
            <div>
             <div className="font-semibold tracking-wider">Selected Room:</div>
             <div className="border-gray-200 border-2  rounded-md bg-white shadow-md p-1 justify-between fadeInDown flex flex-col tablet:space-x-4 laptop:flex grid grid-cols-2 gap-4">
              <div className="h-full w-full">
               <img
                src={chosen.booking_image}
                className="laptop:w-full tablet:w-full w-full object-cover h-32"
               />
              </div>
              <div className="flex h-full w-full">
               <div className="w-full space-y-2">
                <div className="uppercase font-bold text-forestgreen-100  whitespace-nowrap">
                 {chosen.room_name}
                </div>

                <div className=" text-sm items-center grid grid-cols-2 gap-4 ">
                 <div className="whitespace-nowrap">
                  {getIcon(chosen.type)}
                  {chosen.type}
                 </div>
                 <div className="whitespace-nowrap gap-4">
                  <i className="fa fa-person text-xl  items-center text-center " />
                  {chosen.capacity}
                 </div>
                </div>

                <div className="text-xs flex w-[70%] ">
                 <span className="gap-4 grid grid-cols-3">
                  <button
                   className="info-tiny"
                   onClick={() => handleToggleMoreInfo(chosen)}
                  >
                   More
                  </button>
                  <div className="flex justify-center w-full">
                   <div>| </div>
                  </div>
                  <button
                   className="info-tiny"
                   onClick={() => handleTogglePackageInfo()}
                  >
                   Package
                  </button>
                 </span>
                </div>
               </div>
               <div className="mobile:flex hidden w-full text-center items-center flex justify-center ">
                <div className="">
                 <div className="text-md font-bold">PHP {chosen.price}</div>
                 <div>Per Night</div>
                </div>
               </div>
              </div>
             </div>
            </div>
           ) : (
            <div className="text-white">
             <LoadingCircle />
            </div>
           )}
          </div>
         </div>
        )}

        <div className="flex justify-between">
         {/**Check In Date */}
         <span className="flex">
          Check In:
          <div className="ml-2 w-20 text-center font-semibold">
           {checkInDate && formatDate(checkInDate)}
          </div>
         </span>
         {/**Check Out Date */}
         <span className="flex">
          Check Out:
          <div className="ml-2 w-20 text-center font-semibold">
           {checkOutDate && formatDate(checkOutDate)}
          </div>
         </span>
        </div>

        {/**Adults, Kids, and Nights */}
        <div className="flex justify-between w-full mt-2 ">
         <div className="w-1/2 justify-between">
          <span className="flex justify-between">
           Adults:
           <div className="w-20 add-customer-container space-x-3">
            <i
             className={`fa fa-minus ${
              adults === 1 ? "text-gray-400 cursor-not-allowed" : ""
             }`}
             onClick={adults === 0 ? null : handleRemoveAdult}
            />
            <span className="font-semibold">{adults}</span>
            <i className="fa fa-plus" onClick={handleAddAdult} />
           </div>
          </span>
          <span className="flex justify-between">
           Kids:
           <div className="w-20 add-customer-container space-x-3">
            <i
             className={`fa fa-minus ${
              kids === 0 ? "text-gray-400 cursor-not-allowed" : ""
             }`}
             onClick={kids === 0 ? null : handleRemoveKids}
            />
            <span className="font-semibold">{kids}</span>
            <i className="fa fa-plus" onClick={handleAddKids} />
           </div>
          </span>
         </div>

         {/**Nights */}
         <div className="w-1/2 flex justify-center">
          <div className="px-2 py-1 rounded-md shadow-md bg-forestgreen-50 text-white">
           <div className="justify-center flex text-2xl font-normal">
            {calculateNights()}
           </div>
           <div className="text-xs">Nights</div>
          </div>
         </div>
        </div>
       </div>

       {/**Availability Button */}
       <div className="">
        <button
         onClick={proceedToReservation}
         className={` p-1 text-white  w-full rounded-sm shadow transition ease-in-out duration-.3s  py-2
         ${
          !proceed
           ? "bg-gray-500"
           : "bg-forestgreen-1000 hover:bg-forestgreen-1100 hover:cursor-pointer"
         }`}
        >
         Book Now
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/**Booking Side */}
   <div className="h-[80%] bg-white bg-opacity-50 pb-5 desktop:max-w-[45rem] win11:max-w-[60rem]  ">
    <div className="   flex-col whitespace-nowrap tablet:whitespace-nowrap win11:w-60rem  laptop:w-full tablet:w-full w-full">
     {showBookingDetails && (
      <BookingMoreInfo
       selectedAccommodation={selectedAccommodation}
       onClose={handleCloseMoreInfo}
      />
     )}

     <BookingPackageInfo
      showPackageInfo={showPackageInfo}
      onClose={handleClosePackageInfo}
     />

     <div className="bg-green-900 ">
      <div className=" flex  py-2  px-4 mobile:px-0 tablet:px-0 justify-between">
       <div className=" space-x-0 text-white mobile:space-x-1 tablet:space-x-2 desktop:space-x-2 flex items-center px-2">
        {/* Checkpoint */}
        <div
         className={` rounded-md  px-2 tracking-wider hover:cursor-pointer animated py-1 ${
          selectedTab === "All"
           ? "bg-forestgreen-900 shadow-md hover:bg-forestgreen-600 "
           : "hover:bg-forestgreen-300"
         }`}
         onClick={() => handleResetFilters()}
        >
         All
        </div>
        <span>|</span>
        <div
         className={` rounded-md animated  px-2 tracking-wider py-1   hover:cursor-pointer animated ${
          selectedTab === "Cabin"
           ? "bg-forestgreen-900 shadow-md hover:bg-forestgreen-600"
           : "hover:bg-forestgreen-300"
         }`}
         onClick={() => handleTabClick("Cabin")}
        >
         Cabin
        </div>
        <span>|</span>
        <div
         className={` rounded-md animated px-2 tracking-wider py-1   hover:cursor-pointer animated ${
          selectedTab === "Lake Villa"
           ? "bg-forestgreen-900 shadow-md hover:bg-forestgreen-600"
           : "hover:bg-forestgreen-300"
         }`}
         onClick={() => handleTabClick("Lake Villa")}
        >
         Lake Villa
        </div>
       </div>
       <div className="flex">
        <input
         className="  h-8 rounded-md "
         placeholder="Search"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">
         <i className="fa fa-magnifying-glass" />
        </button>
       </div>
      </div>
     </div>

     {loading && (
      <div className="h-full px-4 py-4 text-white ">
       <LoadingCircle />
      </div>
     )}

     {!loading && (
      <div className="h-full px-4 py-4   w-180 custom-scrollbar space-y-4 font-[Poppins]">
       {filteredAccommodations.length === 0 ? (
        <div className="card text-center font-[Poppins] ">
         No matches found.
        </div>
       ) : (
        filteredAccommodations.map((accommodation) => {
         if (selectedTab === "All" || accommodation.type === selectedTab) {
          return (
           <div key={accommodation.accommodation_id} className="">
            <div
             className={`bg-white rounded-md shadow-md p-2 md:grid md:grid-cols-6  animated${
              chosen.accommodation_id === accommodation.accommodation_id &&
              "bg-gray-900 rounded-md shadow-md p-2 md:grid md:grid-cols-6  animated accommodation-chosen"
             }`}
            >
             {/** IMAGE THUMBNAIL */}
             <div className=" h-full md:col-span-2  ">
              <div className="h-48 win11:h-[15rem]">
               <img
                src={accommodation.booking_image}
                className="object-cover w-full h-full shadow-sm rounded-md "
               />
              </div>
             </div>

             {/** ACCOMMODATION DETAILS */}
             <div
              className={`flex-col space-y-1 flex h-full md:col-span-3 space-y-2 win11:space-y-0 md:px-4 ${
               chosen.accommodation_id === accommodation.accommodation_id &&
               " text-white "
              }`}
             >
              <div className="uppercase font-bold text-lg  text-green-900"></div>
              <div
               className={`uppercase font-bold text-lg win11:text-xl text-green-900 win11:pt-2 tracking-wider ${
                chosen.accommodation_id === accommodation.accommodation_id &&
                " text-white "
               }`}
              >
               {accommodation.room_name}
              </div>
              <div
               className={`accommodation-description win11:pt-2   tracking-wider text-justify `}
              >
               {accommodation.description}
              </div>
              <div className="space-x-10 flex mobile:justify-between mobile:flex  tablet:justify-between tablet:flex win11:pt-2 ">
               <div>
                {getIcon(accommodation.type)}
                {accommodation.type}
               </div>
               <div>
                <i className="fa fa-person text-lg mr-1" />
                Capacity: &nbsp;
                {accommodation.capacity}
               </div>
              </div>
              <div className="mobile:flex mobile:justify-center mobile:pt-4 tablet:flex tablet:justify-center tablet:pt-4 win11:pt-4 ">
               <span className="space-x-2 flex mobile:justify-between  mobile:space-x-4 tablet:justify-between  tablet:space-x-4">
                <button
                 className="info"
                 onClick={() => handleToggleMoreInfo(accommodation)}
                >
                 More Info
                </button>
                <span> | </span>
                <button
                 className="info"
                 onClick={() => handleTogglePackageInfo()}
                >
                 Package Info
                </button>
               </span>
              </div>
             </div>

             {/** PRICE AND BOOK */}
             <div
              className={`flex  mobile:w-full tablet:w-full  w-full  items-center md:col-span-1 ${
               chosen.accommodation_id === accommodation.accommodation_id &&
               " text-white "
              }`}
             >
              <div className="w-full  flex   h-full   items-center">
               <div className="w-full">
                <div className="flex flex-wrap mobile:justify-center tablet:justify-center mobile:flex tablet:flex justify-center mt-4 ">
                 <div className="font-bold text-xl  ">
                  PHP {accommodation.price}
                 </div>
                 <div className="w-full mobile:flex mobile:justify-center tablet:flex tablet:justify-center text-center">
                  <span className="text-sm">per night</span>
                 </div>
                </div>

                <div className="w-full   win11:mt-2 ">
                 <button
                  className={`mobile:mt-3 mobile:w-full  tablet:mt-3 tablet:w-full     rounded-md  p-1 text-white  w-full shadow transition ease-in-out duration-.3s hover:bg-gray-900
         ${
          chosen && chosen.accommodation_id === accommodation.accommodation_id
           ? "bg-black text-white"
           : "bg-forestgreen-50"
         }
         
         `}
                  onClick={() => handleBookNow(accommodation)}
                 >
                  Check Availability
                 </button>

                 {/* <button className=" mobile:mt-3 mobile:w-full  tablet:mt-3 tablet:w-full   bg-forestgreen-50 rounded-md  p-1 text-white  w-45 shadow transition ease-in-out duration-.3s hover:bg-gray-900" onClick={noBookingPlease}>
                               Not Available
                              </button> */}
                </div>
               </div>
              </div>
             </div>
            </div>
           </div>
          );
         }
         return null;
        })
       )}
      </div>
     )}
    </div>
   </div>
   <ArrowUpButton />
  </div>
 );
}
