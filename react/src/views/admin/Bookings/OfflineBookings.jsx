import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaPerson } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import BookingMoreInfo from "../../website/Accommodations/BookingMoreInfo";
import BookingPackageInfo from "../../website/Accommodations/BookingPackageInfo";
import { differenceInDays } from "date-fns";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";

export default function OfflineBooking() {
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

 const [accommodation, setAccommodation] = useState([]);
 const [accommodationCabin, setAccommodationCabin] = useState([]);
 const [accommodationLakeVilla, setAccommodationLakeVilla] = useState([]);

 const [guestCheckIn, setGuestCheckIn] = useState(null);
 const [guestCheckOut, setGuestCheckOut] = useState(null);

 const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
 const [discountValue, setDiscountValue] = useState("");

 const handleCheckboxChange = (e) => {
  setIsDiscountApplicable(e.target.checked);
  if (isDiscountApplicable) {
   setDiscountValue("");
  }
 };

 useEffect(() => {
  fetchAllAccommodation();
 }, []);

 const fetchAllAccommodation = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );

   const filteredAccommodation = response.data.filter(
    (accommodation) => accommodation.status !== "Maintenance"
   );
   setAccommodation(filteredAccommodation);

   const cabinAccommodation = filteredAccommodation.filter(
    (accommodation) => accommodation.type === "Cabin"
   );
   setAccommodationCabin(cabinAccommodation);

   const lakeVillaAccommodation = filteredAccommodation.filter(
    (accommodation) => accommodation.type === "Lake Villa"
   );
   setAccommodationLakeVilla(lakeVillaAccommodation);
  } catch (error) {
   console.error(error);
  }
 };

 const [selectedAccommodation, setSelectedAccommodation] = useState("");
 const [selectedAccommodationId, setSelectedAccommodationId] = useState("");
 const [accommodationErrorMessage, setAccommodationErrorMessage] =
  useState(false);

 const handleBookAccommodation = () => {
  setAccommodationErrorMessage("");
  setErrors("");
  if (selectedAccommodationId) {
   const selectedAccommodation = accommodation.find(
    (accommodations) =>
     accommodations.accommodation_id === Number(selectedAccommodationId)
   );
   if (selectedAccommodation) {
    setSelectedAccommodation(selectedAccommodation);
   } else {
   }
  } else {
   setAccommodationErrorMessage("Please Select and Accommodation");
  }
 };

 const [reservations, setReservations] = useState([]);
 useEffect(() => {
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
  fetchData();
 }, []);

 const [reservedMarkedGuestDates, setReservedMarkedGuestDates] = useState([]);
 useEffect(() => {
  const guestCheckInDate = new Date(guestCheckIn);
  const guestCheckOutDate = new Date(guestCheckOut);
  guestCheckInDate.setHours(0, 0, 0, 0);
  guestCheckOutDate.setHours(0, 0, 0, 0);

  const reservedCheckInDates = reservedMarkedGuestDates.map((range) => {
   const checkInDate = new Date(range.check_in_date);
   const checkOutDate = new Date(range.check_out_date);
   checkInDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
   checkOutDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
   return { checkInDate, checkOutDate, status: range.status };
  });
  const overlappingStack = reservedCheckInDates.find(({ checkInDate }) => {
   if (guestCheckInDate.getTime() === checkInDate.getTime()) {
    const matchingCheckOut = reservedCheckInDates.find(({ checkOutDate }) => {
     return checkOutDate.getTime() === checkInDate.getTime();
    });
    return matchingCheckOut !== undefined;
   }
   return false;
  });

  const isGuestCheckInOnReservedCheckIn = reservedMarkedGuestDates.some(
   (range) => {
    const reservedCheckInDate = new Date(range.check_in_date);
    reservedCheckInDate.setHours(0, 0, 0, 0);
    return guestCheckInDate.getTime() === reservedCheckInDate.getTime();
   }
  );

  const isWithinReservedRange = reservedMarkedGuestDates.some((range) => {
   const reservedCheckIn = new Date(range.check_in_date).setHours(0, 0, 0, 0);
   const reservedCheckOut = new Date(range.check_out_date).setHours(0, 0, 0, 0);

   // Check if the guest's check-in is before or on the reserved check-in,
   // and the guest's check-out is after or on the reserved check-out
   return (
    guestCheckInDate.getTime() <= reservedCheckIn &&
    guestCheckOutDate.getTime() >= reservedCheckOut
   );
  });

  const isGuestCheckInWithinReservedRange = reservedMarkedGuestDates.some(
   (range) => {
    const reservedCheckIn = new Date(range.check_in_date).setHours(0, 0, 0, 0);
    const reservedCheckOut = new Date(range.check_out_date).setHours(
     0,
     0,
     0,
     0
    );

    // Check if the guest's check-in is after or on the reserved check-in,
    // and before or on the reserved check-out
    return (
     guestCheckInDate.getTime() > reservedCheckIn &&
     guestCheckInDate.getTime() < reservedCheckOut
    );
   }
  );

  if (overlappingStack) {
   setGuestCheckIn(null);
   setGuestCheckOut(null);
  }
  if (isGuestCheckInOnReservedCheckIn) {
   setGuestCheckIn(null);
   setGuestCheckOut(null);
  }
  if (isWithinReservedRange) {
   setGuestCheckIn(null);
   setGuestCheckOut(null);
  }

  if (isGuestCheckInWithinReservedRange) {
   setGuestCheckIn(null);
   setGuestCheckOut(null);
  }

  // chekpoint
 }, [reservedMarkedGuestDates, guestCheckIn, guestCheckOut]);

 const [markedDates, setMarkedDates] = useState("");

 useEffect(() => {
  setAccommodationErrorMessage("");
  if (selectedAccommodationId !== "") {
   setGuestCheckIn("");
   setGuestCheckOut("");
   const parsedAccommodationId = parseInt(selectedAccommodationId, 10);
   const reservationsForAccommodation = reservations.filter(
    (reservation) => reservation.accommodation_id === parsedAccommodationId
   );
   const madeReservationDates = reservationsForAccommodation.map(
    (reservation) => ({
     check_in_date: new Date(reservation.check_in_date),
     check_out_date: new Date(reservation.check_out_date),
     status: reservation.status,
    })
   );

   setReservedMarkedGuestDates(madeReservationDates);
  }
 }, [selectedAccommodationId, reservations]);

 const getTileContent = (date) => {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

  const reservedCheckInDates = reservedMarkedGuestDates.map((range) => {
   const checkInDate = new Date(range.check_in_date);
   const checkOutDate = new Date(range.check_out_date);
   checkInDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
   checkOutDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
   return { checkInDate, checkOutDate, status: range.status };
  });

  let isInsideGuestBookingRange;
  if (guestCheckIn && guestCheckOut) {
   isInsideGuestBookingRange =
    guestCheckIn.setHours(0, 0, 0, 0) &&
    guestCheckOut.setHours(0, 0, 0, 0) &&
    date >= guestCheckIn.setHours(0, 0, 0, 0) &&
    date <= guestCheckOut.setHours(0, 0, 0, 0);
  }

  let isCheckOutDate = false; // Initialize a flag
  let isCheckInDateReserved = false; // Initialize a flag
  let isStackedDate = false; // Initialize the flag outside the loop

  const withinReservedRange = reservedCheckInDates.find(
   ({ checkInDate, checkOutDate }) =>
    dateObj >= checkInDate && dateObj <= checkOutDate
  );
  if (withinReservedRange) {
   const isCheckInDate =
    dateObj.getTime() === withinReservedRange.checkInDate.getTime();
   const isCheckOutDate =
    dateObj.getTime() === withinReservedRange.checkOutDate.getTime();

   // Removed isStackedDate from this block to prevent adding class to check-in and check-out dates
   if (!isCheckInDate && !isCheckOutDate) {
    return <div className="reserved_guest_dates"></div>;
   }
  }
  for (const { checkInDate, checkOutDate } of reservedCheckInDates) {
   if (dateObj >= checkInDate && dateObj <= checkOutDate) {
    if (dateObj.getTime() === checkInDate.getTime()) {
     const isStacked = reservedCheckInDates.some((otherDateRange) => {
      return checkInDate.getTime() === otherDateRange.checkOutDate.getTime();
     });

     isCheckInDateReserved = !isStacked; // Set the flag for check-in date
    }
    if (dateObj.getTime() === checkOutDate.getTime()) {
     const isStacked = reservedCheckInDates.some((otherDateRange) => {
      return checkOutDate.getTime() === otherDateRange.checkInDate.getTime();
     });

     isCheckOutDate = !isStacked;
    }
    isStackedDate = reservedCheckInDates.some((otherDateRange) => {
     const isCheckOutMatchingCheckIn =
      checkOutDate.getTime() === otherDateRange.checkInDate.getTime();
     const isCheckInMatchingCheckOut =
      checkInDate.getTime() === otherDateRange.checkOutDate.getTime();
     return isCheckOutMatchingCheckIn || isCheckInMatchingCheckOut;
    });

    return (
     <div
      disabled={isStackedDate}
      className={
       isCheckInDateReserved
        ? " reserved_guest_check_in_dates"
        : isCheckOutDate
        ? "reserved_guest_check_out_dates"
        : isStackedDate
        ? " reserved_guest_stacked_dates"
        : "reserved_guest_dates"
      }
     ></div>
    );
   }
  }

  if (isInsideGuestBookingRange) {
   const isGuestCheckInOnReservedCheckIn = reservedMarkedGuestDates.some(
    (range) =>
     guestCheckIn.setHours(0, 0, 0, 0) ===
     new Date(range.check_in_date).setHours(0, 0, 0, 0)
   );

   const isGuestCheckOutOnReservedCheckOut = reservedMarkedGuestDates.some(
    (range) =>
     guestCheckOut.setHours(0, 0, 0, 0) ===
     new Date(range.check_in_out).setHours(0, 0, 0, 0)
   );

   const isInvalidBooking = reservedMarkedGuestDates.some((range) => {
    const guestCheckInDate = new Date(guestCheckIn).setHours(0, 0, 0, 0);
    const guestCheckOutDate = new Date(guestCheckOut).setHours(0, 0, 0, 0);
    const reservedCheckInDate = new Date(range.check_in_date).setHours(
     0,
     0,
     0,
     0
    );
    const reservedCheckOutDate = new Date(range.check_out_date).setHours(
     0,
     0,
     0,
     0
    );

    // Check if guest check-in or check-out dates match any reserved check-in or check-out dates
    return (
     guestCheckInDate === reservedCheckInDate ||
     guestCheckOutDate === reservedCheckOutDate
    );
   });

   if (isInvalidBooking) {
    setGuestCheckIn(null);
    setGuestCheckOut(null);
   }

   const isGuestCheckInOnReservedCheckOut = reservedMarkedGuestDates.some(
    (range) => {
     const guestCheckInDate = new Date(guestCheckIn).setHours(0, 0, 0, 0);
     const reservedCheckOutDate = new Date(range.check_out_date).setHours(
      0,
      0,
      0,
      0
     );
     return guestCheckInDate === reservedCheckOutDate;
    }
   );

   if (!isGuestCheckInOnReservedCheckOut) {
    if (isInvalidBooking) {
     setGuestCheckIn(null);
     setGuestCheckOut(null);
    }

    if (isGuestCheckOutOnReservedCheckOut) {
     setGuestCheckIn(null);
     setGuestCheckOut(null);
    }

    if (isGuestCheckInOnReservedCheckIn) {
     setGuestCheckIn(null);
     setGuestCheckOut(null);
    }
   }
   //  if (isOverlapping) {
   //   const hasCheckedOutReservation = reservedMarkedGuestDates.some(
   //    (range) =>
   //     range.status === "Checked Out" &&
   //     ((guestCheckIn >= range.check_in_date &&
   //      guestCheckIn <= range.check_out_date) ||
   //      (guestCheckOut >= range.check_out_date &&
   //       guestCheckOut <= range.check_out_date))
   //   );

   //   if (hasCheckedOutReservation) {
   //    console.log(hasCheckedOutReservation);
   //   }

   //   if (hasCheckedOutReservation) {
   //    console.log("");
   //   } else {
   //    setGuestCheckIn(null);
   //    setGuestCheckOut(null);
   //    return <div className=""></div>;
   //   }
   //  }

   return <div className="new-guest-booking-range "></div>;
  }

  return null;
 };

 // Booking Info
 const [showBookingDetails, setShowBookingDetails] = useState(false);
 const handleToggleMoreInfo = (accommodation) => {
  setShowBookingDetails(true);
 };
 const handleCloseMoreInfo = () => {
  setShowBookingDetails(false);
 };

 // Package Info
 const [showPackageInfo, setShowPackageInfo] = useState(false);
 const handleTogglePackageInfo = () => {
  setShowPackageInfo(!showPackageInfo);
 };
 const handleClosePackageInfo = () => {
  setShowPackageInfo(false);
 };

 {
  /**Select Dates     */
 }
 const [selectedBookingDateRange, setSelectedBookingDateRange] = useState([]);
 const [handleCheckInExist, setSetHandleCheckInExist] = useState(false);

 const handleDayClick = (date) => {
  setDateErrorMessage("");
  setSetHandleCheckInExist(false);
  if (guestCheckIn === null) {
   setGuestCheckIn(date);
   setSetHandleCheckInExist(true);
   setGuestCheckOut(null);
  } else if (guestCheckOut === null && date > guestCheckIn) {
   setGuestCheckOut(date);
  } else {
   setGuestCheckIn(date);
   setSetHandleCheckInExist(true);
   setGuestCheckOut(null);
  }
 };
 {
  /**Guest  */
 }
 const [saveLoading, setIsLoadingSave] = useState(false);
 const [errors, setErrors] = useState(false);
 const [guest_id, setGuestId] = useState("");
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [guest_email, setGuestEmail] = useState("");
 const [contact_number, setContactNumber] = useState("");
 const [party_size, setPartySize] = useState("");
 const [address, setAddress] = useState("");
 const [adults, setAdults] = useState(1); // Default value for adults
 const [kids, setKids] = useState(0); // Default value for kids
 const [total_nights, setTotalNights] = useState(0);

 let totalCost =
  guestCheckIn && guestCheckOut && selectedAccommodation
   ? parseInt(selectedAccommodation.price.replace(/,/g, "")) *
     differenceInDays(guestCheckOut, guestCheckIn)
   : 0;

 const handleAdultsChange = (event) => {
  const selectedAdults = parseInt(event.target.value, 10);
  setAdults(selectedAdults);
 };

 const handleKidsChange = (event) => {
  const selectedKids = parseInt(event.target.value, 10);
  setKids(selectedKids);
 };

 {
  /**Reservation  */
 }
 const [special_requests, setSpecialRequest] = useState("");
 const [arrival_time, setArrivalTime] = useState("");
 const handleArrivalTimeChange = (event) => {
  setArrivalTime(event.target.value);
 };

 function formatDate1(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
 }

 function convertToISO8601(dateString) {
  const [month, day, year] = dateString.split("/");
  const isoDate = `${year}-${month}-${day}`;
  return isoDate;
 }

 const [dateErrorMessage, setDateErrorMessage] = useState(false);
 const [discountErrorMsg, setDiscountErrorMsg] = useState(false);
 const [discountedPrice, setDiscountedPrice] = useState("");

 useEffect(() => {
  if (
   guestCheckIn &&
   guestCheckOut &&
   discountValue &&
   selectedAccommodation &&
   selectedAccommodation.price
  ) {
   if (isNaN(discountValue)) {
    setDiscountErrorMsg("Invalid discount percentage.");
    return;
   }
   if (discountValue <= 0) {
    setDiscountErrorMsg("Invalid discount percentage. ");
    return;
   }
   if (discountValue > 100) {
    setDiscountErrorMsg("Invalid discount percentage. ");
    return;
   }
   const totalCost =
    parseInt(selectedAccommodation.price.replace(/,/g, "")) *
    differenceInDays(guestCheckOut, guestCheckIn);

   const discountAmount = (totalCost * discountValue) / 100;
   const discountedPrice = Math.round(totalCost - discountAmount); // Round to nearest integer

   setDiscountedPrice(discountedPrice);
  }
 }, [discountValue, selectedAccommodation, guestCheckOut, guestCheckIn]);

 async function save(event) {
  setAccommodationErrorMessage("");
  setDateErrorMessage("");
  setDiscountErrorMsg("");
  if (!selectedAccommodation.accommodation_id) {
   setAccommodationErrorMessage("Please Add an Accommodation");
  }

  if (!guestCheckIn || !guestCheckOut) {
   setDateErrorMessage("Please Select a Date");
   return;
  }

  if (discountValue) {
   if (isNaN(discountValue)) {
    setDiscountErrorMsg("Invalid discount percentage. Please provide a number");
    return;
   }

   const discount = (totalCost * discountValue) / 100;
   totalCost = totalCost - discount; // Apply the discount to the total cost
   setDiscountedPrice(totalCost);
  }

  const formattedCheckIn = formatDate1(guestCheckIn);
  const formattedCheckOut = formatDate1(guestCheckOut);

  const convertedCheckInDate = convertToISO8601(formattedCheckIn);
  const convertedCheckOutDate = convertToISO8601(formattedCheckOut);
  const convertedCheckInDateISO = new Date(convertedCheckInDate).toISOString();
  const convertedCheckOutDateISO = new Date(
   convertedCheckOutDate
  ).toISOString();

  const confirmed = await Swal.fire({
   title: "Confirmation",
   text: "Are you sure you want to book this reservation?",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#009900",
   cancelButtonColor: "#808080",
   confirmButtonText: "Yes, book it!",
  });

  if (!confirmed.isConfirmed) {
   return; // If not confirmed, exit the function
  }

  event.preventDefault();
  setIsLoadingSave(true);
  setErrors("");

  let guestId, reservationId, paymentId;

  try {
   // Save Guest Data

   const guestData = {
    first_name: first_name,
    last_name: last_name,
    guest_email: guest_email,
    party_size: adults + kids,
    contact_number: contact_number,
    address: address,
   };
   const guestResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests/save`,
    guestData
   );
   guestId = guestResponse.data.guest_id;
   // Save Reservation Data

   const timeDifference = guestCheckOut.getTime() - guestCheckIn.getTime();
   const totalNightsBook = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
   setTotalNights(totalNightsBook);
   const reservationData = {
    guest_id: guestId,
    accommodation_id: selectedAccommodation.accommodation_id,
    special_requests: special_requests || "None",
    check_in_date: convertedCheckInDateISO,
    check_out_date: convertedCheckOutDateISO,
    arrival_time: arrival_time,
    status: "Scheduled",
    total_nights: totalNightsBook,
   };

   const reservationResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation/save`,
    reservationData
   );
   reservationId = reservationResponse.data.reservation_id;

   // Save Payment Data
   const paymentData = {
    reservation_id: reservationId,
    guest_id: guestId,
    payment_mode: "offline",
    reference_number: "N/A",
    total_amount: totalCost,
    payment_status: "paid",
   };
   const paymentResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments/save`,
    paymentData
   );
   paymentId = paymentResponse.data.payment_id;

   // Update Reservation Data
   const updatedReservationData = {
    guest_id: guestId,
    accommodation_id: selectedAccommodation.accommodation_id,
    special_requests: special_requests || "None",
    check_in_date: convertedCheckInDateISO,
    check_out_date: convertedCheckOutDateISO,
    arrival_time: arrival_time,
    status: "Scheduled",
    payment_id: paymentId,
    total_nights: totalNightsBook,
   };
   await axios.put(
    `${
     import.meta.env.VITE_API_BASE_URL
    }/api/reservation/update/${reservationId}`,
    updatedReservationData
   );

   try {
    const guestEmail = guest_email;
    const firstName = first_name;
    const lastName = last_name;
    const roomName = selectedAccommodation.room_name;
    const totalAmount = totalCost;
    const formattedGuestCheckIn = guestCheckIn.toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
    });
    const formattedGuestCheckOut = guestCheckOut.toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
    });

    let firstPhoneNumber = "";
    const result = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/web`
    );

    const matchedWebInfo = result.data.find(
     (web_info) => web_info.info_id === 1
    );

    if (matchedWebInfo) {
     const contactNumber = matchedWebInfo.contact_number;
     // Now you can use the `contactNumber` variable to access the contact number.

     // Extract the first phone number from the `contactNumber` string
     const phoneNumberPattern = /\d{11}/; // Assuming it's an 11-digit number
     const match = phoneNumberPattern.exec(contactNumber);

     if (match) {
      firstPhoneNumber = match[0];
     } else {
     }
    } else {
    }
    const guestNumber = contact_number;
    const totalGuests = adults + kids;
    const specialRequest = special_requests || "None";

    const timeDifference = guestCheckOut.getTime() - guestCheckIn.getTime();

    const totalNights = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));
    setTotalNights(totalNights);
    const checkInTime = arrival_time;

    await axios.get(
     `${
      import.meta.env.VITE_API_BASE_URL
     }/send-offline-email?email=${encodeURIComponent(
      guestEmail
     )}&firstName=${firstName}&lastName=${lastName}&roomName=${roomName}&totalAmount=${totalAmount}&formattedGuestCheckIn=${formattedGuestCheckIn}&formattedGuestCheckOut=${formattedGuestCheckOut}&firstPhoneNumber=${firstPhoneNumber}&reservationId=${encodeURIComponent(
      reservationId
     )}&guestNumber=${guestNumber}&totalGuests=${totalGuests}&totalNights=${totalNights}&specialRequest=${specialRequest}&checkInTime=${encodeURIComponent(
      checkInTime
     )}}&discountValue=${encodeURIComponent(discountValue)}`
    );
    setSelectedAccommodationId("empty");
    setSelectedAccommodation("");
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setAddress("");
    setGuestEmail("");
    setSpecialRequest("");
    setArrivalTime("");
    setDiscountValue("");
    setIsDiscountApplicable(false);

    setAdults(0);
    setKids(0);
    await Swal.fire({
     title: "Offline Booking Successful, Invoice will now be sent",
     text: "The reservation has been successfully saved.",
     icon: "success",
     confirmButtonColor: "#606060",
     showConfirmButton: false,
     timer: 5000,
     timerProgressBar: true,
     position: "top-end",
    });
   } catch (e) {
    console.log(e.error);
   }
  } catch (error) {
   const response = error.response;
   if (response && response.status === 422) {
    setErrors(response.data.errors);
   }

   if (paymentId) {
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/payments/delete/${paymentId}`
    );
   }
   if (reservationId) {
    await axios.delete(
     `${
      import.meta.env.VITE_API_BASE_URL
     }/api/reservation/delete/${reservationId}`
    );
   }
   if (guestId) {
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/guests/delete/${guestId}`
    );
   }
   setIsLoadingSave(false);
   await Swal.fire({
    title: "Error Notification",
    text: "An error has occurred.",
    icon: "error",
    showConfirmButton: false,
    showCloseButton: true,
    focusClose: true,
   });
  } finally {
   setIsLoadingSave(false);
  }
 }

 const tileDisabled = ({ date }) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison

  return date < currentDate;
 };

 return (
  <div>
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

   <div className="flex justify-between items-center bg-forestgreen-100">
    <h2 className="tracking-widest font-[Poppins] font-semibold px-12 py-8 text-white  text-lg">
     BOOKING <FontAwesomeIcon icon={faAngleRight} className="" /> ADD BOOKING
    </h2>
   </div>
   <hr className="border-t-2 px-14 border-gray-300" />
   <div className="p-4">
    <div className="bg-white shadow-lg p-8 rounded-lg">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="w-full">
       <div className="flex justify-between items-center mb-4">
        <label className="text-lg font-[Poppins] whitespace-nowrap  tracking-wider font-bold">
         Booking Resource :
        </label>
        <div className="flex items-center font-[Poppins]">
         <select
          className="border border-gray-300 rounded px-3 py-1 mr-52"
          onChange={(e) => setSelectedAccommodationId(e.target.value)}
          value={selectedAccommodationId}
         >
          <option value="empty">Select Accommodation</option>
          <optgroup label="Cabin">
           {accommodationCabin.map((cabin) => (
            <option key={cabin.accommodation_id} value={cabin.accommodation_id}>
             {cabin.room_name}
            </option>
           ))}
          </optgroup>
          <optgroup label="Lake Villa">
           {accommodationLakeVilla.map((lakevilla) => (
            <option
             key={lakevilla.accommodation_id}
             value={lakevilla.accommodation_id}
            >
             {lakevilla.room_name}
            </option>
           ))}
          </optgroup>
         </select>
         <button
          className="bg-green-500 whitespace-nowrap rounded-full hover:bg-green-700 text-white px-4 py-2 shadow-md  transition duration-300"
          onClick={handleBookAccommodation}
         >
          <i className="fa-solid fa-plus" /> Add Booking
         </button>
        </div>
       </div>

       <div className="w-full">
        <ReactCalendar
         tileDisabled={tileDisabled}
         className={`addbookings-calendar-design ${
          handleCheckInExist ? "bg-red-900" : ""
         }`}
         view="month"
         value={[guestCheckIn, guestCheckOut]}
         selectRange={false}
         onClickDay={handleDayClick}
         formatShortWeekday={(locale, date) => {
          const dayNames = [
           "Sunday",
           "Monday",
           "Tuesday",
           "Wednesday",
           "Thursday",
           "Friday",
           "Saturday",
          ];
          return dayNames[date.getDay()];
         }}
         tileContent={({ date }) => getTileContent(date)}
        />
       </div>
      </div>

      <div>
       {selectedAccommodation && (
        <div className="bg-gray-200 rounded-t-xl ">
         <div className="bg-forestgreen-600 rounded-t-xl text-white font-[Poppins] tracking-widest text-xl font-semibold py-4 text-center uppercase mb-4">
          {selectedAccommodation
           ? selectedAccommodation.room_name
           : "Accommodation"}
         </div>
         <div className="grid grid-cols-2 bg-gray-200 gap-8  ">
          <div className="col-span-1 flex justify-center items-center">
           <img
            src={selectedAccommodation.booking_image}
            alt={selectedAccommodation.room_name}
            className="h-56 w-96 object-cover "
           />
          </div>

          <div className="col-span-1 grid grid-cols-1 p-6 font-[Poppins]">
           <div className="col-span-1 space-y-4">
            <div className="text-base uppercase tracking-widest text-white  rounded-xl text-center bg-gray-600 w-32 font-semibold">
             {selectedAccommodation.type}
            </div>
            <div className="text-xl font-bold tracking-widest flex items-center">
             <FaPerson className="text-2xl mr-2" />
             {selectedAccommodation.capacity}
            </div>
           </div>

           <div className="col-span-1 pt-8 flex text-center">
            <div className="text-2xl ">₱ {selectedAccommodation.price}</div>
            <div className="text-sm text-center"> &nbsp; per night</div>
           </div>

           <div className="col-span-1 tracking-wider ">
            <div className="text-base pt-4 flex">
             <button
              className="hover:underline"
              onClick={() =>
               handleToggleMoreInfo(selectedAccommodation.accommodation_id)
              }
             >
              More Info &nbsp; |
             </button>
             <button
              className="hover:underline ml-4"
              onClick={() => handleTogglePackageInfo()}
             >
              Package Info
             </button>
            </div>
           </div>
          </div>
         </div>

         {/* Reservation Dates Section */}
         <div className="grid grid-cols-3 p-5 bg-gray-800 text-white items-center justify-center gap-4 mt-4 text-base tracking-wider font-bold">
          <div className="col-span-1 flex items-center justify-center">
           <div className="text-center">
            <div>
             {guestCheckIn ? (
              <div className="font-semibold text-gray-500">Check-in</div>
             ) : (
              <div className="text-gray-500">Select Check-in Date</div>
             )}
            </div>
            {guestCheckIn && (
             <div className="text-2xl">
              {guestCheckIn.toLocaleDateString("en-US", {
               month: "long",
               day: "numeric",
              })}
             </div>
            )}
            {guestCheckIn && (
             <div className="text-base">
              {guestCheckIn.toLocaleDateString("en-US", { weekday: "long" })}
             </div>
            )}
           </div>
           <div className="flex items-center justify-center">
            <FontAwesomeIcon
             icon={faAngleRight}
             className="ml-8 text-brown-50 text-xl"
            />
           </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
           <div className="text-center">
            <div>
             {guestCheckOut ? (
              <div className="font-semibold text-gray-500">Check-out</div>
             ) : (
              <div className="text-gray-500">Select Check-out Date</div>
             )}
            </div>
            {guestCheckOut && (
             <div className="text-2xl">
              {guestCheckOut.toLocaleDateString("en-US", {
               month: "long",
               day: "numeric",
              })}
             </div>
            )}
            {guestCheckOut && (
             <div className="text-base">
              {guestCheckOut.toLocaleDateString("en-US", { weekday: "long" })}
             </div>
            )}
           </div>
           <div className="flex items-center">
            <FontAwesomeIcon
             icon={faAngleRight}
             className="ml-8 text-brown-50 font-bold text-xl"
            />
           </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
           {guestCheckIn && guestCheckOut ? (
            <>
             <div className="text-5xl font-semibold">
              {differenceInDays(guestCheckOut, guestCheckIn)}
             </div>
             <div className="text-base text-gray-500">&nbsp; Night/s</div>
            </>
           ) : (
            <div className="text-gray-500">Night/s</div>
           )}
          </div>
         </div>
         {guestCheckIn && guestCheckOut && selectedAccommodation ? (
          <div className="bg-gray-200 rounded-lg  p-4 text-2xl text-center">
           Total Cost: ₱{" "}
           {(
            parseInt(selectedAccommodation.price.replace(/,/g, "")) *
            differenceInDays(guestCheckOut, guestCheckIn)
           ).toLocaleString()}
          </div>
         ) : null}
        </div>
       )}
       {!selectedAccommodation && (
        <div className="bg-gray-100 tracking-wide text-lg">
         <div className="bg-forestgreen-600 rounded-t-xl text-white text-xl font-semibold tracking-widest py-4 text-center uppercase mb-4">
          Accommodation
         </div>
         <div className="text-center py-4 text-gray-500">
          Choose an Accommodation
         </div>
         <div className="text-center py-4 text-gray-500">
          Select Date Reservations
         </div>
        </div>
       )}
       <div className="bg-gray-200 tracking-wide rounded-b-xl p-5 mt-4">
        {/* Guest Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
           <div>
            <label className="text-sm font-semibold">First Name</label>
            <input
             className={`w-full border border-gray-300 text-base rounded h-10 px-3 py-2 ${
              errors && errors.first_name === "first_name"
               ? "border-red-500"
               : ""
             }`}
             value={first_name}
             onChange={(event) => setFirstName(event.target.value)}
            />
           </div>
           <div>
            <label className="text-sm font-semibold">Last Name</label>
            <input
             className="w-full border border-gray-300 text-base h-10 rounded px-3 py-2"
             value={last_name}
             onChange={(event) => setLastName(event.target.value)}
            />
           </div>
          </div>
          <div>
           <label className="text-sm font-semibold">Contact Number</label>
           <input
            className="w-full border border-gray-300 text-base h-10 rounded px-3 py-1"
            value={contact_number}
            onChange={(event) => setContactNumber(event.target.value)}
           />
          </div>
          <div>
           <label className="text-sm font-semibold">Email</label>
           <input
            className="w-full border border-gray-300 h-10 text-base rounded px-3 py-1"
            value={guest_email}
            onChange={(event) => setGuestEmail(event.target.value)}
           />
          </div>
          <div>
           <label className="text-sm font-semibold">Address</label>
           <input
            className="w-full border border-gray-300 text-base h-10 rounded px-3 py-1"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
           />
          </div>
         </div>
         <div className="w-full">
          <div className="flex">
           <div className="flex-grow mr-4">
            <label className="text-sm font-semibold">Adults</label>
            <select
             className="w-full border border-gray-300 h-10 text-base rounded px-3 py-1"
             onChange={handleAdultsChange}
             value={adults}
            >
             {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={index + 1}>
               {index + 1}
              </option>
             ))}
            </select>
           </div>
           <div className="flex-grow">
            <label className="text-sm font-semibold">Kids</label>
            <select
             id="arrivalTime"
             className="w-full border border-gray-300 text-base rounded h-10 px-3 py-1"
             onChange={handleKidsChange}
             value={kids}
            >
             <option value="0">-</option>
             {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={index + 1}>
               {index + 1}
              </option>
             ))}
            </select>
           </div>
          </div>

          <div>
           <label className="text-sm font-semibold">Arrival Time</label>
           <select
            value={arrival_time}
            onChange={handleArrivalTimeChange}
            className="w-full border border-gray-300 text-base h-10 rounded px-3 py-1"
           >
            <option value="">Select an option</option>
            <option value="2:00 pm">2:00 pm</option>
            <option value="4:00 pm">4:00 pm</option>
            <option value="7:00 pm">7:00 pm</option>
           </select>
          </div>

          <div>
           <label className="text-sm font-semibold">Special Request</label>
           <textarea
            rows="4"
            className="w-full border border-gray-300 text-base rounded px-3 py-1"
            value={special_requests}
            onChange={(event) => setSpecialRequest(event.target.value)}
           />
          </div>
         </div>
        </div>
        <div className="mt-4">
         {errors && (
          <div className="bg-red-900 text-white rounded-md p-2">
           {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
           ))}
          </div>
         )}
         {dateErrorMessage && (
          <div className="bg-red-900 text-white rounded-md p-2 mt-2">
           {dateErrorMessage}
          </div>
         )}
         {discountErrorMsg && (
          <div className="bg-red-900 text-white rounded-md p-2 mt-2">
           {discountErrorMsg}
          </div>
         )}

         {accommodationErrorMessage && (
          <div className="bg-red-900 text-white rounded-md p-2 mt-2">
           {accommodationErrorMessage}
          </div>
         )}
         {/* Checkpoint */}
         <div className="flex w-full mt-2  grid-cols-2 grid justify-center">
          <div className="space-x-2  w-full flex-col">
           <div className=" text-md italic font-semibold whitespace-nowrap flex items-center">
            Is discount applicable?
           </div>
           <div className="flex items-center border-2  ">
            <div className="flex justify-center px-2">
             <input
              id="checkbox"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isDiscountApplicable}
              className="form-checkbox h-5 w-5 text-blue-500"
             />
            </div>

            <div className="flex items-center justify-center col-span-2">
             <input
              type="text"
              value={discountValue}
              onChange={(event) => setDiscountValue(event.target.value)}
              className={`w-full text-base h-10 rounded px-3 py-1 text-center ${
               !isDiscountApplicable
                ? "disabled-input-2 border-[5px] border-red-900  shadow-sm"
                : ""
              }`}
              disabled={!isDiscountApplicable}
             />

             <span className="font-semibold px-3 text-xl">%</span>
            </div>
           </div>
          </div>

          <div className="space-x-2  w-full flex-col">
           {discountValue &&
            isDiscountApplicable &&
            selectedAccommodation &&
            guestCheckOut &&
            guestCheckIn && (
             <div className="flex-col">
              <div className="font-semibold italic">Discounted Price</div>
              <div className="text-2xl text-center flex justify-center items-center ">
               <div>
                {new Intl.NumberFormat("en-PH", {
                 style: "currency",
                 currency: "PHP",
                 minimumFractionDigits: 2,
                }).format(discountedPrice)}
               </div>
              </div>
             </div>
            )}
          </div>
         </div>
         <div className="flex justify-center  mt-8">
          <button
           onClick={save}
           className="bg-green-500 uppercase tracking-widest font-bold rounded-md font-[Poppins] w-full  text-white px-6 py-2  shadow-md hover:bg-green-700 transition duration-300"
           disabled={saveLoading}
          >
           {!saveLoading ? (
            "Book now"
           ) : (
            <i className="fa-solid fa-spinner fa-spin" />
           )}
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
