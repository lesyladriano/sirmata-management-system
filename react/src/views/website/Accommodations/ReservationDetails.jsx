import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faIdCard,
 faCreditCard,
 faAngleRight,
 faPen,
 faAngleLeft,
 faHouse,
 faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import BookingMoreInfo from "./BookingMoreInfo";
import BookingPackageInfo from "./BookingPackageInfo";
import TermsAndConditions from "./TermsAndConditions";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import Terms from "../../../components/website/Terms";

export default function ReservationDetails() {
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

 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const accommodation_id = queryParams.get("accommodation");
 const checkInDate = queryParams.get("checkInDate");
 const checkOutDate = queryParams.get("checkOutDate");
 const adults = parseInt(queryParams.get("adults"), 10); // Convert to integer
 const kids = parseInt(queryParams.get("kids"), 10); // Convert to integer

 useEffect(() => {}, [
  accommodation_id,
  checkInDate,
  checkOutDate,
  adults,
  kids,
 ]);

 const [room_name, setName] = useState("");
 const [type, setType] = useState("");
 const [capacity, setCapacity] = useState("");
 const [description, setDescription] = useState("");
 const [feature, setFeature] = useState("");
 const [price, setPrice] = useState("");
 const [booking_image, setBookingImage] = useState("");
 const [accommodation, setAccommodation] = useState([]);

 const [selectedAccommodation, setSelectedAccommodation] = useState(null);

 useEffect(() => {
  async function fetchSelectedAccommodation() {
   try {
    const result = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
    );
    const accommodations = result.data;

    const selectedAccommodation = accommodations.find(
     (accommodation) =>
      accommodation.accommodation_id === Number(accommodation_id)
    );

    setSelectedAccommodation(selectedAccommodation);
   } catch (err) {
    console.error(err);
   }
  }
  fetchSelectedAccommodation();
 }, [accommodation_id]);

 // Number of Nights
 const [numberOfNights, setNumberOfNights] = useState(0);

 function convertDateFormat(dateString) {
  const [day, month, year] = dateString.split("-");
  return `${month}/${day}/${year}`;
 }

 useEffect(() => {
  if (checkInDate && checkOutDate) {
   const convertedCheckInDate = convertDateFormat(checkInDate);
   const convertedCheckOutDate = convertDateFormat(checkOutDate);
   const checkIn = new Date(convertedCheckInDate);
   const checkOut = new Date(convertedCheckOutDate);
   const timeDifference = checkOut - checkIn;
   const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
   setNumberOfNights(nights);
  }
 }, [checkInDate, checkOutDate]);

 // Format Date
 function formatDate(dateString) {
  const options = {
   weekday: "long",
   month: "short",
   day: "numeric",
   year: "numeric",
  };
  const [day, month, year] = dateString.split("-");
  const parsedDate = new Date(`${month}/${day}/${year}`);
  const formattedDate = parsedDate.toLocaleDateString(undefined, options);
  return (
   <div>
    <div>{formattedDate.split(",")[0]}</div>
    <div>{formattedDate.split(",")[1]}</div>
    <div>{formattedDate.split(",")[2]}</div>
   </div>
  );
 }

 // Get Villa/Cabin Icon
 const getIcon = (accommodationType) => {
  if (accommodationType === "Cabin") {
   return <FontAwesomeIcon icon={faHouse} className="fa mr-1" />;
  } else if (accommodationType === "Lake Villa") {
   return <FontAwesomeIcon icon={faHouseChimney} className="fa mr-1" />;
  } else {
   return <FontAwesomeIcon icon={faHouse} className="fa mr-1" />;
  }
 };

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

 // Total Amount
 const [totalAmount, setTotalAmount] = useState(0);

 const parsePrice = (priceString) => {
  return parseFloat(priceString.replace(/,/g, ""));
 };

 useEffect(() => {
  const calculateTotalAmount = () => {
   if (selectedAccommodation) {
    const numericPrice = parsePrice(selectedAccommodation.price);
    return numberOfNights * numericPrice;
   }
   return 0;
  };

  setTotalAmount(calculateTotalAmount());
 }, [selectedAccommodation, numberOfNights]);

 // Change Details Tabs
 const [switchTab, setSwitchTab] = useState(true);

 // Continue Button Tabs
 const [currentStep, setCurrentStep] = useState("details");
 const [error, setError] = useState(false);

 const areDetailsValid = () => {
  const isValidPhoneNumber = /^09\d{9}$/; // Regex for an 11-digit number starting with '09'

  return (
   first_name.trim() !== "" &&
   last_name.trim() !== "" &&
   guest_email.trim() !== "" &&
   isValidPhoneNumber.test(contact_number.trim()) && // Validate contact number with regex
   address.trim() !== "" &&
   arrival_time.trim() !== ""
  );
 };

 const [pleaseVerifyEmailAddress, setPleaseVerifyEmailAddress] = useState("");
 const handleContinueClick = () => {
  setPleaseVerifyEmailAddress("");
  {
   /**FREE ME */
  }
  if (!isGuestEmailVerified) {
   setPleaseVerifyEmailAddress("Please Verify Your Email.");
   return;
  }

  if (!areDetailsValid()) {
   setError(true);
  } else {
   setError(false);
   setSwitchTab(!switchTab);
  }
 };

 // Package Info
 const [showTerms, setShowTerms] = useState(false);
 const [isChecked, setIsChecked] = useState(false);

 const handleShowTerms = () => {
  setShowTerms(true);
  setIsChecked(!isChecked);
  setIsChekedMsg("");
 };

 const handleCloseTerms = () => {
  setShowTerms(false);
 };

 // Guest Details
 const [guest_id, setGuestId] = useState("");
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [guest_email, setGuestEmail] = useState("");
 const [party_size, setPartySize] = useState("");
 const [contact_number, setContactNumber] = useState("");
 const [address, setAddress] = useState("");
 const [special_requests, setSpecialRequest] = useState("");
 const [arrival_time, setArrivalTime] = useState("");

 const handleArrivalTimeChange = (event) => {
  setArrivalTime(event.target.value);
 };

 // Payment Price
 useEffect(() => {
  if (selectedAccommodation) {
   const numericPrice = parsePrice(selectedAccommodation.price);
   const calculatedTotalAmount = numberOfNights * numericPrice;
   setTotalAmount(calculatedTotalAmount);
  }
 }, [selectedAccommodation, numberOfNights]);

 function convertToISO8601(dateString) {
  const [day, month, year] = dateString.split("-");
  const isoDate = `${year}-${month}-${day}`;
  return isoDate;
 }

 const convertedCheckInDate = convertToISO8601(checkInDate);
 const convertedCheckOutDate = convertToISO8601(checkOutDate);

 const [isCaptchaConfirm, setIsCaptchaConfirm] = useState("");
 const [isCaptchaConfirmMsg, setIsCaptchaConfirmMsg] = useState("");

 const [isCheckedMsg, setIsChekedMsg] = useState("");
 function onChangeCaptchaConfirm(value) {
  setIsCaptchaConfirm(true);
  setIsCaptchaConfirmMsg("");
 }

 function formatDateEmail(inputDate) {
  const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
  ];
  const [day, month, year] = inputDate.split("-");
  return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
 }

 const [selectedPaymentId, setSelectedPaymentId] = useState("");

 //  Save Event
 async function save(event) {
  setShowVerifyButton(false);
  event.preventDefault();
  setIsLoadingSave(true);
  {
   /**Free Me */
  }
  if (!isChecked) {
   setIsChekedMsg("Please confirm the terms and conditions");
   setIsLoadingSave(false); // Reset the loading state
   return;
  }

  if (!isCaptchaConfirm) {
   setIsCaptchaConfirmMsg("Please confirm the terms and conditions");
   setIsLoadingSave(false); // Reset the loading state
   return;
  }

  const convertedCheckInDateISO = new Date(convertedCheckInDate).toISOString();
  const convertedCheckOutDateISO = new Date(
   convertedCheckOutDate
  ).toISOString();

  const overlapResponse = await axios.get(
   `${import.meta.env.VITE_API_BASE_URL}/api/is_date_overlapping`,
   {
    params: {
     check_in_date: convertedCheckInDateISO,
     check_out_date: convertedCheckOutDateISO,
     accommodation_id: selectedAccommodation.accommodation_id,
    },
   }
  );

  if (overlapResponse.data.errors) {
   setIsLoadingSave(false);
   const result = await Swal.fire({
    title: "Reservation Date no longer available",
    text: "Return back to Booking accommodation.",
    icon: "question",
    confirmButtonText: "Return",
    confirmButtonColor: "#009900",
    allowOutsideClick: false,
   });
   if (result.isConfirmed) {
    window.location.href = "/bookings/accommodations"; // Redirect to the specified URL
   }

   return;
  }

  const result = await Swal.fire({
   title: "Confirm Reservation",
   text: "Continue with this reservation?",
   icon: "question",
   showCancelButton: true,
   confirmButtonText: "Continue",
   cancelButtonText: "Cancel",
   confirmButtonColor: "#009900",
   cancelButtonColor: "#606060",
  });

  if (result.isConfirmed) {
   //  Saving Guest
   const guestData = {
    first_name: first_name,
    last_name: last_name,
    guest_email: guest_email,
    contact_number: contact_number,
    address: address,
    party_size: adults + kids,
   };

   const guestResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests/save`,
    guestData
   );

   const guestId = guestResponse.data.guest_id;
   // Saving Reservation
   const convertedCheckInDateISO = new Date(convertedCheckInDate).toISOString();
   const convertedCheckOutDateISO = new Date(
    convertedCheckOutDate
   ).toISOString();

   const reservationData = {
    guest_id: guestId,
    accommodation_id: accommodation_id,
    special_requests: special_requests || "None",
    check_in_date: convertedCheckInDateISO,
    check_out_date: convertedCheckOutDateISO,
    arrival_time: arrival_time,
    total_nights: parseInt(numberOfNights), // Make sure you have totalAmount defined
    status: "Scheduled",
   };

   const reservationResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation/save`,
    reservationData
   );
   const reservationId = reservationResponse.data.reservation_id;

   //  Payment
   const paymentData = {
    reservation_id: reservationId, // Use the ID from the guestResponse
    guest_id: guestId,
    payment_mode: "online",
    total_amount: totalAmount,
    payment_status: "Pending",
   };

   const convertedCheckInDateISO2 = new Date(
    convertedCheckInDate
   ).toISOString();
   const convertedCheckOutDateISO2 = new Date(
    convertedCheckOutDate
   ).toISOString();

   const paymentResponse = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments/save`,
    paymentData
   );
   const paymentId = paymentResponse.data.payment_id;
   setSelectedPaymentId(paymentResponse.data.payment_id);

   const updatedReservationData = {
    guest_id: guestId,
    accommodation_id: accommodation_id,
    special_requests: special_requests || "None",
    check_in_date: convertedCheckInDateISO2,
    check_out_date: convertedCheckOutDateISO2,
    arrival_time: arrival_time,
    total_nights: parseInt(numberOfNights),
    status: "Scheduled",
    payment_id: paymentId,
   };

   const updateReservation = await axios.put(
    `${
     import.meta.env.VITE_API_BASE_URL
    }/api/reservation/update/${reservationId}`,
    updatedReservationData
   );

   //  await Swal.fire({
   //   title: "Reservation Successful",
   //   text: "Your reservation has been successfully completed.",
   //   icon: "success",
   //   confirmButtonColor: "#009900",
   //  });

   setIsLoadingSave(false);
   // Sendint to payment Checkout
   Swal.fire({
    title: "Redirecting to Payment Method",
    text: "Please wait while we redirect you to the payment checkout.",
    icon: "info",
    backdrop: "rgba(0,0,0,0.4)", // Adding backdrop for formal look
    allowOutsideClick: false, // Preventing manual closing
    showConfirmButton: false, // Hiding the confirm button
    allowEscapeKey: false, // Preventing closing via the Escape key
    didOpen: () => {
     Swal.showLoading();
    },
   });

   const checkoutResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/create_checkout`,
    {
     params: {
      name: selectedAccommodation.room_name,
      amount: totalAmount,
      reservation_id: reservationId,
      guest_id: guestId,
      payment_id: paymentId,
     },
     headers: {
      "Content-Type": "application/json",
      accept: "application/json",
     },
    }
   );
   //  checkpoint
   const payment_intent_id = checkoutResponse.data.attributes.payment_intent.id;
   const checkout_session_id = checkoutResponse.data.id;

   try {
    const updatePayments = await axios.put(
     `${import.meta.env.VITE_API_BASE_URL}/api/payments/update/${paymentId}`,
     {
      payment_intent_id: payment_intent_id,
      checkout_session_id: checkout_session_id,
     }
    );
   } catch (error) {
    console.error("Error updating payment:", error);
   }

   window.location.href = checkoutResponse.data.attributes.checkout_url;
  } else {
   setIsLoadingSave(false);
  }
 }

 const [save_error, setSaveError] = useState(false);
 const [isLoadingSave, setIsLoadingSave] = useState(false);

 // Constants
 const [generatedVerifyToken, setGeneratedVerifyToken] = useState("");
 const [showVerifyTokenButton, setShowVerifyTokenButton] = useState(false);
 const [guestTokenInput, setGuestTokenInput] = useState("");
 const [showVerifyButton, setShowVerifyButton] = useState("");
 const [verifyGuestMsg, setVerifyGuestMsg] = useState("");
 const [emailVerificationLoading, setEmailVerificationLoading] =
  useState(false);
 const [isGuestEmailVerified, setIsGuestEmailVerified] = useState(false);

 // Generate a random 6-digit token
 const generateRandomToken = () => {
  return Math.floor(100000 + Math.random() * 900000);
 };

 // Handle email input change
 const handleEmailInputChange = (event) => {
  const emailValue = event.target.value;
  setGuestEmail(emailValue);
  setShowVerifyButton(emailValue.trim() !== ""); // Show the button if email is not empty
  setShowVerifyTokenButton(false);
  setIsGuestEmailVerified(false);
 };
 const [countdown, setCountdown] = useState(10);
 const [disableButton, setDisableButton] = useState(false);

 // Send verification token
 const sendVerifyToken = async (event) => {
  setIsGuestEmailVerified(false);
  setPleaseVerifyEmailAddress("");
  setGuestTokenInput("");
  setVerifyGuestMsg(null);
  setEmailVerificationLoading(true);
  event.preventDefault();

  if (!isValidEmail(guest_email)) {
   setVerifyGuestMsg("Please enter a valid email address");
   setShowVerifyTokenButton(false);
   setEmailVerificationLoading(false);
   return;
  }

  setShowVerifyTokenButton(true);
  const token = generateRandomToken();
  const guestEmail = guest_email;
  setGeneratedVerifyToken(token);
  const verificationToken = token;

  const encodedToken = btoa(verificationToken);

  try {
   await axios.get(
    `${
     import.meta.env.VITE_API_BASE_URL
    }/send-email-guest-token?email=${encodeURIComponent(
     guestEmail
    )}&verificationTokenEncoded=${encodedToken}`
   );
  } catch (error) {
   console.error("Error sending email:", error);
   setEmailVerificationLoading(false);
  }
  setEmailVerificationLoading(false);
  Swal.fire({
   icon: "success",
   title: "Email Sent",
   text: "Verification email sent. Check your inbox in 2-3 minutes.",
   confirmButtonColor: "#009900",
  });

  setDisableButton(true);

  // Start a countdown timer
  let timer = 15;
  setCountdown(timer);
  const countdownInterval = setInterval(() => {
   timer -= 1;
   setCountdown(timer);
  }, 1000);

  setTimeout(async () => {
   setDisableButton(false);
   clearInterval(countdownInterval);
  }, 10000);
 };

 // Verify guest token
 const verifyGuestToken = async (event) => {
  event.preventDefault();

  if (guestTokenInput != generatedVerifyToken) {
   Swal.fire({
    icon: "error",
    title: "Invalid Token",
    text: "Please try again.",
    showConfirmButton: false,
    showCloseButton: true,
   });

   return;
  }
  setShowVerifyButton(false);
  setShowVerifyTokenButton(false);
  setIsGuestEmailVerified(true);
  Swal.fire({
   icon: "success",
   title: "Email Verified",
   text: "You can now proceed with your reservation.",
   showConfirmButton: true,
   timer: 5000,
   timerProgressBar: true,
   confirmButtonColor: "#009900",
  });
 };

 const isValidEmail = (email) => {
  // Use a regular expression for email validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
 };

 const viewTerms = () => {
  setShowTerms(true);
 };

 const handleTerms = () => {
  setShowTerms(false);
 };

 return (
  <div className="flex justify-center w-full px-5 py-4 tablet:px-8 mb-10`desktop:px-12 font-[Poppins]">
   {showBookingDetails && (
    <BookingMoreInfo
     selectedAccommodation={selectedAccommodation}
     onClose={handleCloseMoreInfo}
    />
   )}
   {/* {showTerms && <Terms onClose={handleTerms} />} */}
   {showTerms && <TermsAndConditions onClose={handleTerms} />}

   <BookingPackageInfo
    showPackageInfo={showPackageInfo}
    onClose={handleClosePackageInfo}
   />

   <div className="w-full flex justify-center win11:h-screen">
    <div className="flex mobile:space-y-4 mobile:flex-col tablet:space-y-4 tablet:flex-col laptop:space-y-4 laptop:flex-col desktop:space-x-6 win11:space-x-10 desktop:max-w-5xl win11:max-w-7xl">
     {/* Reserved Accommodation Details */}
     <div className="reservation-container bg-forestgreen-25  mobile:mx-auto mobile:max-w-sm tablet: tablet:max-w-sm laptop:mx-auto laptop:max-w-sm desktop:sticky desktop:max-w-sm win11:sticky win11:max-w-md">
      <div className="bg-white   px-4 py-1 flex ">
       <div className="win11:text-xl win11:py-2  text-forestgreen-50 text-center w-full uppercase   font-semibold flex">
        <div className="text-start">
         <Link to="/bookings/accommodations">
          <FontAwesomeIcon icon={faAngleLeft} />
         </Link>
        </div>
        <span className="text-center font-semibold tracking-wider w-full">
         Reservation Details
        </span>
       </div>
      </div>

      <div className="tracking-wide">
       <div className="reservation-date-container px-4 py-2 justify-between flex bg-opacity-80 bg-forestgreen-50  ">
        <div className="text-black flex-col w-full">
         <div className="w-full flex space-x-2 items-center tracking-wider font-bold text-sm win11:text-lg text-white">
          <div className="w-full text-center">
           <div className="flex">
            <div className="w-full text-white">
             <span className="text-sm">Check-in</span>
             {formatDate(checkInDate)}
            </div>
           </div>
          </div>
          <div className="items-center flex">
           <FontAwesomeIcon icon={faAngleRight} />
          </div>
          <div className="w-full text-center">
           <div className="flex">
            <div className="w-full">
             <span className="text-sm">Check-out</span>
             {formatDate(checkOutDate)}
            </div>
           </div>
          </div>
          <div className="items-center flex">
           <FontAwesomeIcon icon={faAngleRight} />
          </div>
          <div className="w-full text-center items-center h-full">
           <div className="flex-col items-center">
            <div className="text-2xl">{numberOfNights}</div>
            <div>Night/s</div>
           </div>
          </div>
         </div>
        </div>
       </div>

       <div className="px-2 pt-2 bg-opacity-80 bg-forestgreen-50  ">
        <div className="text-sm win11:text-base tracking-wider text-white py-3 px-3">
         Selected Rooms/ Rates
        </div>
        <div className=" ">
         {selectedAccommodation ? (
          <div>
           <div className="border-gray-200 border-2  rounded-md bg-white shadow-md p-1 justify-between fadeInDown flex flex-col tablet:space-x-4 laptop:flex laptop:grid-cols-3 laptop:gap-3  desktop:grid desktop:grid-cols-3 desktop:gap-3  win11:grid win11:grid-cols-3 win11:gap-3">
            <div className="h-full w-full">
             <img
              src={selectedAccommodation.booking_image}
              className="laptop:w-full tablet:w-full w-full object-cover h-32"
             />
            </div>
            <div className="flex h-full   w-full">
             <div className="w-full tablet:justify-center tablet:text-center tablet:items-center laptop:justify-center laptop:text-center laptop:items-center space-y-2">
              <div className="uppercase font-bold text-forestgreen-100  tracking-wider text-lg whitespace-nowrap">
               {selectedAccommodation.room_name}
              </div>

              <div className="whitespace-nowrap space-x-4">
               {getIcon(selectedAccommodation.type)}
               {selectedAccommodation.type}
              </div>
              <div className="whitespace-nowrap space-x-4">
               <i className="fa fa-person text-xl  items-center text-center " />
               {selectedAccommodation.capacity}
              </div>

              <div className="text-sm">
               <span className="">
                <button
                 className="info-tiny"
                 onClick={() => handleToggleMoreInfo(accommodation)}
                >
                 More
                </button>
                <span> | </span>
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
               <div className="text-md font-bold">
                PHP {selectedAccommodation.price}
               </div>
               <div>Per Night</div>
              </div>
             </div>
            </div>
            <div className="mobile:hidden w-full text-center items-center flex justify-center">
             <div className="">
              <div className="text-base font-bold">
               PHP {selectedAccommodation.price}
              </div>
              <div>Per Night</div>
             </div>
            </div>
           </div>
           <div className="grid grid-cols-2 text-white uppercase tracking-wider py-8 text-base px-4">
            <div>Total Amount</div>
            <div className="text-end font-bold tracking-wider text-xl">
             PHP {totalAmount.toLocaleString()}{" "}
             {/* Displaying the total amount with commas */}
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
      </div>
     </div>

     {/* Personal Data/ Payment Details */}
     <div className="bg-white mobile:w-full tablet:w-full h-fit w-140 tracking-wide text-sm ">
      <div className="bg-white ">
       <div>
        {/* Details and Payments Tabs */}
        <ol className="flex w-full">
         <li
          className={`hover:cursor-pointer flex items-center justify-center w-full gap-2 p-4 ${
           switchTab ? "" : "bg-gray-100"
          }`}
          onClick={() => setSwitchTab(true)}
         >
          <FontAwesomeIcon
           icon={faIdCard}
           size="xl"
           style={{ color: "#b0b0b5" }}
          />
          <p className="leading-none">
           <strong className="block tracking-wider font-bold win11:text-base">
            {" "}
            Details{" "}
           </strong>
           <small className="mt-1"> Some info about you. </small>
          </p>
         </li>
         <li
          className={`hover:cursor-pointer flex items-center justify-center w-full gap-2 p-4 ${
           switchTab ? "bg-gray-100" : ""
          }`}
          onClick={handleContinueClick}
         >
          <FontAwesomeIcon
           icon={faCreditCard}
           size="xl"
           style={{ color: "#b0b0b5" }}
          />
          <p className="leading-none">
           <strong className="block tracking-wider font-bold win11:text-base">
            {" "}
            Payment{" "}
           </strong>
           <small className="mt-1"> Your payment details. </small>
          </p>
         </li>
        </ol>
       </div>

       <section className="  m-9 text-black">
        {/**Enter Personal Details */}
        {switchTab ? (
         <div className="container py-2">
          <h2 className="text-sm win11:text-base w-80 py-1  text-white text-center rounded-r-full bg-dark-50 tracking-widest font-semiboldfont-semibold mb-6">
           Provide your information
          </h2>
          <hr className="border-t-2 " />
          <form action="" className="flex flex-col">
           {pleaseVerifyEmailAddress && (
            <div className="px-5 py-2 bg-red-900 text-white mx-1 rounded-md shadow-md fadeInDown">
             <p className="">{pleaseVerifyEmailAddress}</p>
            </div>
           )}
           {error && (
            <div className="px-5 py-2 bg-red-900 text-white  rounded-md shadow-md fadeInDown">
             <p className="">
              Please fill out all required fields with vaild inputs.
             </p>
            </div>
           )}

           {save_error && (
            <div className="px-5 py-2 bg-red-900 text-white p-1 rounded-md shadow-md fadeInDown m-1">
             {Object.keys(save_error).map((key) => (
              <p className="" key={key}>
               {save_error[key][0]}
              </p>
             ))}
            </div>
           )}

           <fieldset className="rounded-md shadow-sm dark:bg-gray-900 justify-center desktop:px-10 win11:px-16 laptop:px-20 py-8">
            <form action="#" className=" grid grid-cols-6 gap-6 tracking-wider">
             <div className="col-span-6 sm:col-span-3">
              <label
               htmlFor="FirstName"
               className="block text-sm font-bold text-black"
              >
               First Name
              </label>

              <input
               id="firstname"
               type="text"
               placeholder="First name"
               required
               value={first_name}
               onChange={(event) => {
                setFirstName(event.target.value);
               }}
               name="first_name"
               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
             </div>

             <div className="col-span-6 sm:col-span-3">
              <label
               htmlFor="LastName"
               className="block text-sm font-bold text-black"
              >
               Last Name
              </label>
              <input
               id="lastname"
               type="text"
               placeholder="Last name"
               value={last_name}
               onChange={(event) => {
                setLastName(event.target.value);
               }}
               name="last_name"
               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
             </div>

             <div className="col-span-6 sm:col-span-3  ">
              {verifyGuestMsg && (
               <div className="italic text-red-600 fadeInDown">
                {verifyGuestMsg}
               </div>
              )}

              <label htmlFor="email" className="text-sm font-bold text-black">
               Email
               {isGuestEmailVerified && (
                <i className="fa-solid fa-check text-green-600 ml-3" />
               )}
              </label>
              <input
               id="email"
               type="email"
               placeholder="Email"
               value={guest_email}
               onChange={handleEmailInputChange}
               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />

              {showVerifyButton && (
               <div className="py-1 text-center fadeInDown">
                {showVerifyTokenButton && (
                 <input
                  className="mt-1 w-full fadeInDown rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-10 mb-2"
                  value={guestTokenInput}
                  onChange={(event) => setGuestTokenInput(event.target.value)} // Track input value
                 />
                )}
                <div className="  flex justify-between">
                 <button
                  className={`${
                   disableButton ? "bg-gray-700" : "bg-green-600"
                  } text-white rounded-md p-2 fadeInDown`}
                  onClick={sendVerifyToken}
                  disabled={disableButton}
                 >
                  {emailVerificationLoading ? (
                   <i className="fa-solid fa-spinner fa-spin px-8"></i>
                  ) : (
                   `Send Token${disableButton ? ` (${countdown})` : ""}`
                  )}
                 </button>

                 {showVerifyTokenButton && (
                  <button
                   className="ml-2 bg-forestgreen-50 text-white rounded-md p-2 fadeInDown"
                   onClick={verifyGuestToken}
                  >
                   Verify Email
                  </button>
                 )}
                </div>
               </div>
              )}
             </div>

             <div className="col-span-6 sm:col-span-3">
              <label
               htmlFor="contactNo"
               className="text-sm font-bold text-black"
              >
               Contact number
              </label>
              <input
               id="contactNo"
               type="text"
               placeholder="Contact no."
               value={contact_number}
               onChange={(event) => {
                setContactNumber(event.target.value);
               }}
               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
             </div>

             <div className="col-span-6">
              <label htmlFor="address" className="text-sm font-bold text-black">
               Address
              </label>
              <input
               id="address"
               type="text"
               placeholder="Address"
               value={address}
               onChange={(event) => {
                setAddress(event.target.value);
               }}
               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
             </div>
            </form>
           </fieldset>

           {/**Special Request */}
           <hr className="border-t-2 pt-4" />
           <form
            action=""
            className="flex flex-col md:px-10  md:space-y-12 win11:px-16 w-full"
           >
            <div className=" w-full md:grid gap-4  md:grid-cols-3">
             {/* Special Request Field */}
             <div className="col-span-2">
              <label
               htmlFor="specialRequest"
               className="text-sm pb-3 font-bold text-black  "
              >
               Special Request
              </label>
              <textarea
               id="specialRequest"
               placeholder="Enter your special request"
               rows="3"
               value={special_requests}
               onChange={(event) => {
                setSpecialRequest(event.target.value);
               }}
               className="w-full  win11:h-16 mt-1 rounded-md p-1 border-2 p-2 border-gray-600 focus:ring dark:border-gray-700 dark:text-gray-900 "
              ></textarea>
             </div>
             {/* Expected Arrival Time Field with Dropdown */}
             <div className=" col-span-1">
              <label
               htmlFor="arrivalTime"
               className="text-sm font-bold whitespace-nowrap text-black"
              >
               Estimated Arrival Time
              </label>
              <select
               id="arrivalTime"
               className="w-full mt-1 rounded-md focus:ring dark:border-gray-700 dark:text-gray-900 win11:w-56 h-16 border-2 "
               value={arrival_time}
               onChange={handleArrivalTimeChange}
              >
               <option value="">Select an option</option>
               <option value="2:00 pm" className="option-custom-height">
                2:00 pm
               </option>
               <option value="4:00 pm" className="option-custom-height">
                4:00 pm
               </option>
               <option value="7:00 pm" className="option-custom-height">
                7:00 pm
               </option>
              </select>
             </div>
            </div>
           </form>
          </form>
         </div>
        ) : (
         <div className="container mx-auto">
          {/** Payment Section */}
          <h2 className="text-sm win11:text-base w-72 py-1  text-white text-center rounded-r-full bg-dark-50 tracking-widest font-semiboldfont-semibold mb-6">
           Payment Details
          </h2>
          <hr className="border-t-2 " />

          <form action="" className="">
           <fieldset className=" mobile:p-2 ">
            {/**Reservation Summary */}
            <div className="h-full space-y-2 px-16 py-8 laptop:px-10 tablet:px-6 mobile:px-0 text-sm">
             <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm tracking-wider">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Full Name</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {first_name} {last_name}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {guest_email}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Room Name</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {selectedAccommodation && selectedAccommodation.room_name}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Price Per Night</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {selectedAccommodation && selectedAccommodation.price}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Night/s Spent</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {numberOfNights}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Special Request</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {special_requests ? special_requests : "None"}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Arrival Date</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {checkInDate}{" "}
                 {arrival_time.charAt(0).toUpperCase() + arrival_time.slice(1)}
                </dd>
               </div>

               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Total Guests</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-2">
                 {adults + kids}
                </dd>
               </div>
              </dl>
             </div>
            </div>

            {/**Payment Method */}
            <div className="border-t-2 pt-6 laptop:px-10 desktop:px-20 win11:px-16 text-sm tracking-wider">
             <div className="grid grid-cols-2 mt-2">
              <div className="text-base uppercase">Total Amount:</div>
              <div className="text-end font-bold win11:text-lg">
               PHP {totalAmount.toLocaleString()}
              </div>
             </div>

             <div className=" flex justify-start mt-6  pb-4 text-xs text-gray-700">
              <label className="hover:cursor-pointer hover:underline  flex-col">
               <div className="text-center ">
                {isCheckedMsg && (
                 <div className="italic text-red-600 fadeInDown">
                  {isCheckedMsg}
                 </div>
                )}
               </div>
               <div className="flex">
                <div>
                 <input
                  type="checkbox"
                  onChange={handleShowTerms}
                  checked={isChecked}
                  className="mr-3"
                 />
                </div>
                <a onClick={handleTerms} className="text-xs">
                 I accept the terms and conditions and hereby confirm my
                 booking.
                </a>
               </div>
              </label>
             </div>

             <div className="">
              <div className=" w-full pb-4">
               <div className="flex-col ">
                <div className="text-center  ">
                 {isCaptchaConfirmMsg && (
                  <div className="italic text-red-600 fadeInDown">
                   {isCaptchaConfirmMsg}
                  </div>
                 )}
                </div>
                <div className="w-full flex jjustify-center">
                 <ReCAPTCHA
                  className=""
                  sitekey={import.meta.env.VITE_REACT_APP_RECAPTCHA_KEY}
                  onChange={onChangeCaptchaConfirm}
                 />
                </div>
               </div>
              </div>
             </div>
            </div>
           </fieldset>
          </form>
         </div>
        )}

        <div className="items-center justify-center pt-5 mx-16">
         {switchTab ? (
          <button
           className="bg-forestgreen-50 hover:bg-black justify-items-center text-base w-full  tracking-widest font-medium text-white py-3 rounded-md shadow-lg  "
           onClick={handleContinueClick}
          >
           CONTINUE
          </button>
         ) : (
          <button
           disabled={isLoadingSave}
           type="submit"
           className="bg-forestgreen-50 hover:bg-black justify-items-center text-base w-full tracking-widest font-medium text-white py-3 rounded-md shadow-lg  "
           onClick={save}
          >
           {isLoadingSave ? (
            <i className="fa fa-spinner fa-spin"></i>
           ) : (
            "PROCEED"
           )}
          </button>
         )}
        </div>
       </section>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
