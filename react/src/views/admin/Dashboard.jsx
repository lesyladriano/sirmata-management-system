import LineGraph from "../../components/admin/LineGraph";
import { useStateContext } from "../../context/admin/ContextProvider";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faBook,
 faUserFriends,
 faPesoSign,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TableView from "../../components/admin/TableView";
import axiosClient from "../../axios-client";
import { IoChatbubble } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
 const { user } = useStateContext();
 const [dateTime, setDateTime] = useState(new Date());

 const navigate = useNavigate();
 useEffect(() => {
  const interval = setInterval(() => {
   setDateTime(new Date());
  }, 1000);

  return () => {
   clearInterval(interval);
  };
 }, []);

 const formatDate = (date) => {
  const options = {
   year: "numeric",
   month: "long",
   day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
 };

 const formatTime = (date) => {
  const options = {
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
   hour12: true, // Use 12-hour clock with AM/PM
  };
  return date.toLocaleTimeString(undefined, options);
 };

 const [swicthTotalBookings, setSwitchTotalBookings] = useState(false);
 const toggleSwitchTotalBookings = (ev) => {
  ev.preventDefault();
  setSwitchTotalBookings((prevSwitch) => !prevSwitch);
 };
 const gotToReviews = (ev) => {
  ev.preventDefault();
  navigate("/guest-reviews");
 };

 const [reservations, setAllReservations] = useState("");
 const [numberOfReservations, setNumberOfReservations] = useState("");
 const [numberOfReservationsToday, setNumberOfReservationsToday] = useState("");
 const [numberOfReservationsThisMonth, setNumberOfReservationsThisMonth] =
  useState("");
 const [currentMonth, setCurrentMonth] = useState("");

 const [loadingReservations, setLoadingReservations] = useState(false);
 const [loadingGuests, setLoadingGuests] = useState(false);

 function formatDateToYYYYMMDD(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
 }

 const fetchAllReservations = async () => {
  try {
   setLoadingReservations(true);
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   const formattedReservations = response.data.map((reservation) => {
    // Parse the 'created_at' timestamp and convert it to a Date object
    const createdAtDate = new Date(reservation.created_at);

    // Adjust the date for Philippines time zone (UTC+8)
    const localCreatedAt = new Date(
     createdAtDate.getTime() + 8 * 60 * 60 * 1000
    );

    // Format the adjusted date in ISO 8601 format (yyyy-mm-ddTHH:MM:SSZ)
    const formattedCreatedAt = localCreatedAt.toISOString();

    // Update the 'created_at' property in the reservation object with the formatted timestamp
    return { ...reservation, created_at: formattedCreatedAt };
   });

   // Set the formatted reservations data to state
   setAllReservations(formattedReservations);

   const now = new Date();
   now.setHours(0, 0, 0, 0);
   const year = now.getFullYear();
   const month = String(now.getMonth() + 1).padStart(2, "0");
   const day = String(now.getDate()).padStart(2, "0");

   const formattedDate = `${year}-${month}-${day}`;

   const todayDate = formattedDate;
   const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
   )
    .toISOString()
    .split("T")[0];
   const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
   )
    .toISOString()
    .split("T")[0];

   const reservationsToday = response.data.filter((reservation) => {
    const asss = new Date(reservation.created_at);
    const reservationsCreatedAt = formatDateToYYYYMMDD(asss);

    return reservationsCreatedAt === todayDate;
   });

   const reservationsThisMonth = response.data.filter((reservation) => {
    const asss = new Date(reservation.created_at);
    const reservationsCreatedAt = formatDateToYYYYMMDD(asss);

    // Check if the check-in date is within the current month
    return (
     reservationsCreatedAt >= startOfMonth &&
     reservationsCreatedAt <= endOfMonth
    );
   });

   const numberOfReservations = response.data.length;
   setNumberOfReservations(numberOfReservations);

   const numberOfReservationsToday = reservationsToday.length;
   setNumberOfReservationsToday(numberOfReservationsToday);

   const numberOfReservationsThisMonth = reservationsThisMonth.length;
   setNumberOfReservationsThisMonth(numberOfReservationsThisMonth);

   const currentMonth = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
   }).format(now);
   setCurrentMonth(currentMonth);
   setLoadingReservations(false);
  } catch (error) {
   console.error(error);
  }
 };

 const [swicthTotalGuestsPartySize, setSwitchTotalGuestsPartySize] =
  useState(false);
 const toggleSwitchTotalGuestsPartySize = (ev) => {
  ev.preventDefault();
  setSwitchTotalGuestsPartySize((prevSwitch) => !prevSwitch);
 };

 const [guests, setGuests] = useState("");
 const [guestPatrtySizeToday, setGuestPartySizeToday] = useState("");
 const [guestPartySizeMonth, setGuestPartySizeMonth] = useState("");

 const fetchAllGuest = async () => {
  try {
   setLoadingGuests(true);
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   const guests = response.data;

   const reservationResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   const reservationData = reservationResponse.data;

   const now = new Date();
   now.setHours(0, 0, 0, 0); // Set time to midnight in the current timezone

   const year = now.getFullYear();
   const month = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 to the month since it's zero-based
   const day = String(now.getDate()).padStart(2, "0");

   const formattedDate = `${year}-${month}-${day}`;

   const todayDate = formattedDate;

   const reservationsToday = reservationData.filter((reservation) => {
    const checkInDate = new Date(reservation.check_in_date)
     .toISOString()
     .split("T")[0];
    return checkInDate === todayDate;
   });

   const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
   )
    .toISOString()
    .split("T")[0];
   const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
   )
    .toISOString()
    .split("T")[0];

   const reservationsThisMonth = reservationData.filter((reservation) => {
    const checkInDate = new Date(reservation.check_in_date)
     .toISOString()
     .split("T")[0];

    // Check if the check-in date is within the current month
    return checkInDate >= startOfMonth && checkInDate <= endOfMonth;
   });

   // Extract guest_ids from matching reservations
   const guestIdsToday = reservationsToday.map(
    (reservation) => reservation.guest_id
   );

   // Filter guests based on guest_ids for today
   const guestsForToday = guests.filter((guest) =>
    guestIdsToday.includes(guest.guest_id)
   );

   const guestIdsThisMonth = reservationsThisMonth.map(
    (reservation) => reservation.guest_id
   );

   // Filter guests based on guest_ids for today
   const guestsForThisMonth = guests.filter((guest) =>
    guestIdsThisMonth.includes(guest.guest_id)
   );

   // Calculate the total party_size for today's guests
   const totalPartySizeToday = guestsForToday.reduce(
    (total, guest) => total + parseInt(guest.party_size, 10),
    0
   );
   const totalPartySizeThisMonth = guestsForThisMonth.reduce(
    (total, guest) => total + parseInt(guest.party_size, 10),
    0
   );

   setGuestPartySizeToday(totalPartySizeToday);
   setGuestPartySizeMonth(totalPartySizeThisMonth);
   setGuests(guests);
   setLoadingGuests(false);
  } catch (error) {
   setLoadingGuests(false);
   console.error(error);
  }
 };

 const [allPayments, setAllPayments] = useState("");
 const [paymentsToday, setPaymentsToday] = useState("");
 const [paymentsMonth, setPaymentsMonth] = useState("");
 const [paymentsLoading, setPaymentsLoading] = useState("");

 const [swicthPayments, setSwitchPayments] = useState(false);
 const toggleSwitchPayments = (ev) => {
  ev.preventDefault();
  setSwitchPayments((prevSwitch) => !prevSwitch);
 };

 const fetchAllPayments = async () => {
  try {
   setPaymentsLoading(true);
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`
   );

   const payments = response.data.filter(
    (payment) => payment.payment_status !== "failed"
   );

   const now = new Date();
   const todayDate = now.toISOString().split("T")[0]; // Format today's date in YYYY-MM-DD

   const paymentsToday = payments.filter((payment) => {
    const paymentCreatedAt2 = new Date(payment.created_at);
    const paymentCreatedAt = formatDateToYYYYMMDD(paymentCreatedAt2);

    return todayDate === paymentCreatedAt;
   });

   const totalAmountOfMatchedPayments = paymentsToday.reduce(
    (total, payment) => {
     const amount = parseInt(payment.total_amount, 10);
     return total + amount;
    },
    0
   );

   const formattedTotalAmount = totalAmountOfMatchedPayments.toLocaleString(
    "en-PH",
    {
     style: "decimal",
    }
   );

   const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
   )
    .toISOString()
    .split("T")[0];
   const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
   )
    .toISOString()
    .split("T")[0];

   const paymentsThisMonth = payments.filter((payment) => {
    const paymentCreatedAt = payment.created_at.split("T")[0];

    return paymentCreatedAt >= startOfMonth && paymentCreatedAt <= endOfMonth;
   });

   const totalAmountOfMatchedPaymentsMonth = paymentsThisMonth.reduce(
    (total, payment) => {
     const amount = parseInt(payment.total_amount, 10);
     return total + amount;
    },
    0
   );

   const formattedTotalAmountMonth =
    totalAmountOfMatchedPaymentsMonth.toLocaleString("en-PH", {
     style: "decimal",
    });

   setPaymentsToday(formattedTotalAmount);
   setPaymentsMonth(formattedTotalAmountMonth);

   setPaymentsLoading(false);
  } catch (error) {
   console.error(error);
   setPaymentsLoading(false);
  }
 };

 const [unSeenReview, setUnseenReview] = useState("");
 const [unseenLoading, setUnseenLoading] = useState(false);
 const fetchAllReviews = async () => {
  setUnseenLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reviews`
   );

   // Filter out unseen eviews
   const unseenReviews = response.data.filter((review) => review.unseen === 1);

   const unseenReviewCount = unseenReviews.length;
   setUnseenReview(unseenReviewCount);
   setUnseenLoading(false);
  } catch (error) {
   console.error(error);
   setUnseenLoading(false);
  }
 };

 useEffect(() => {
  fetchAllReservations();
  fetchAllGuest();
  fetchAllPayments();
  fetchAllReviews();
  fetchAllReviews;
 }, []);

 return (
  <div className=" w-full font-[Poppins]  ">
   <div className="flex ">
    <div className="flex-1 justify-start bg-forestgreen-100 text-white">
     <h2 className="tracking-widest font-[Poppins] bg-forestgreen-100 font-semibold px-12 py-8  text-xl">
      DASHBOARD
     </h2>
    </div>
   </div>

   <div className="bg-gray-200 text-black border-b flex justify-between ">
    <div className="text-2xl px-8 items-center flex font-semibold tracking-wide font-[Poppins] ">
     {" "}
     <div>Welcome back , {user.first_name}! </div>
    </div>

    <div className="bg-dark-50 px-12 py-4 shadow-lg flex justify-end items-center ">
     <div className="text-xl font-[Poppins] tracking-widest font-medium text-white">
      <p className="text-lg text-white">{formatDate(dateTime)}</p>
      <p className="text-lg text-gray-100">{formatTime(dateTime)}</p>
     </div>
    </div>
   </div>
   <div className="flex px-8 grid-cols-4  gap-4 font-[Poppins] pt-6">
    <div className="flex flex-col rounded-lg w-1/4 bg-white   m-2  shadow-lg relative">
     <div className="flex justify-between p-8">
      <div className="flex items-center justify-center w-16 h-16 bg-forestgreen-600 rounded-lg mr-6">
       <FontAwesomeIcon icon={faBook} size="2x" className="text-white" />
      </div>
      <div className="flex flex-col text-end">
       <p className="text-base font-[poppins tracking-wider text-gray-700 uppercase ">
        Bookings
       </p>
       <p className="text-4xl font-bold tracking-wide text-black">
        {loadingReservations ? (
         <i className="fa-solid fa-spin fa-spinner" />
        ) : (
         <span className="fadeInDown">{numberOfReservationsToday}</span>
        )}
       </p>
      </div>
     </div>
     <div className="flex justify-between"></div>
     <div className="mt-auto">
      <div className=" border-t border-gray-300 "></div>
      <p className="text-base font-[poppins] tracking-wider  p-5 text-gray-700 uppercase ">
       {currentMonth} : {numberOfReservationsThisMonth}
      </p>
     </div>
    </div>

    <div className="flex flex-col rounded-lg w-1/4 bg-white   m-2  shadow-lg relative">
     <div className="flex justify-between p-8">
      <div className="flex items-center justify-center w-16 h-16 bg-forestgreen-600 rounded-lg mr-6">
       <FontAwesomeIcon icon={faPesoSign} size="2x" className="text-white" />
      </div>
      <div className="flex flex-col text-end">
       <p className="text-base font-[poppins tracking-wider text-gray-700 uppercase ">
        Earnings
       </p>
       <p className="text-4xl font-bold tracking-wide text-black">
        {loadingReservations ? (
         <i className="fa-solid fa-spin fa-spinner" />
        ) : (
         <span className="fadeInDown">{paymentsToday}</span>
        )}
       </p>
      </div>
     </div>
     <div className="flex justify-between"></div>
     <div className="mt-auto">
      <div className=" border-t border-gray-300 "></div>
      <p className="text-base font-[poppins] tracking-wider  p-5 text-gray-700 uppercase ">
       {currentMonth} : {paymentsMonth}
      </p>
     </div>
    </div>

    <div className="flex flex-col rounded-lg w-1/4 bg-white   m-2  shadow-lg relative">
     <div className="flex justify-between p-8">
      <div className="flex items-center justify-center w-16 h-16 bg-forestgreen-600 rounded-lg mr-6">
       <FontAwesomeIcon icon={faUserFriends} size="2x" className="text-white" />
      </div>
      <div className="flex flex-col text-end">
       <p className="text-base font-[poppins tracking-wider text-gray-700 uppercase ">
        Guests
       </p>
       <p className="text-4xl font-bold tracking-wide text-black">
        {loadingGuests ? (
         <i className="fa-solid fa-spin fa-spinner" />
        ) : (
         <span className="fadeInDown">{guestPatrtySizeToday}</span>
        )}
       </p>
      </div>
     </div>
     <div className="flex justify-between"></div>
     <div className="mt-auto">
      <div className=" border-t border-gray-300 "></div>
      <p className="text-base font-[poppins] tracking-wider  p-5 text-gray-700 uppercase ">
       {currentMonth} : {guestPartySizeMonth}
      </p>
     </div>
    </div>

    <div
     className="flex flex-col rounded-lg w-1/5 bg-forestgreen-100   m-2 cursor-pointer shadow-lg relative"
     onClick={gotToReviews}
    >
     <div className="flex justify-between p-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white mr-6">
       <IoChatbubble className="text-4xl text-forestgreen-600" />
      </div>
      <div className="flex flex-col text-end">
       <p className="text-base font-[poppins tracking-wider text-white uppercase ">
        NEW REVIEWS
       </p>
       <p className="text-4xl font-bold tracking-wide text-white">
        {loadingReservations ? (
         <i className="fa-solid fa-spin fa-spinner" />
        ) : (
         <span className="fadeInDown">{unSeenReview}</span>
        )}
       </p>
      </div>
     </div>
     <div className="flex justify-between"></div>
     <div className="mt-auto">
      <div className="border-t border-gray-600 flex justify-end">
       <p className="font-bold font-[poppins] tracking-wider p-5 text-white uppercase">
        <FaArrowCircleRight className="text-2xl" />
       </p>
      </div>
     </div>
    </div>
   </div>

   <div className="flex flex-col md:flex-row justify-center items-center px-8 py-4 gap-6 font-[Poppins]   ">
    <div className=" h-full flex w-full p-2 grid grid-cols-2 gap-8">
     {/**table */}
     <div className=" rounded-xl bg-white shadow-md ">
      <TableView />
     </div>
     <div className="rounded-xl bg-white h-full  border-forestgreen-600  shadow-md">
      <LineGraph />
     </div>
    </div>
   </div>
  </div>
 );
}
