import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faBed,
 faAngleRight,
 faChevronLeft,
 faChevronRight,
 faWifi,
 faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import Swal from "sweetalert2";
import EditReservationModal from "./EditReservationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/admin/ContextProvider";
export default function AllBooking() {
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

 const { isAdmin, setIsAdmin } = useStateContext(); // Renaming variables
 const [filterApplied, setFilterApplied] = useState(false);

 const [reservations, setReservations] = useState([]);
 const [all_reservations, setAllReservations] = useState([]);
 const [loading, setLoading] = useState(false);
 const [guests, setGuests] = useState([]);
 const [accommodations, setAccommodations] = useState([]);
 const [payments, setPayments] = useState([]);

 {
  /**Get Guest Name */
 }
 const memoizedGetGuestName = useMemo(() => {
  const getGuestName = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.first_name} ${guest.last_name}` : "Unknown Guest";
  };
  return getGuestName;
 }, [guests]);

 const memoizedGetGuestPartySize = useMemo(() => {
  const getPartySize = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.party_size}` : "N/A";
  };
  return getPartySize;
 }, [guests]);

 {
  /**Get Payment Mode */
 }
 const memoizedGetPayments = useMemo(() => {
  const getPayments = (paymentId) => {
   const payment = payments.find((payment) => payment.payment_id === paymentId);
   if (payment) {
    if (payment.payment_mode_online) {
     const paymentMode =
      payment.payment_mode_online.charAt(0).toUpperCase() +
      payment.payment_mode_online.slice(1) +
      " | " +
      payment.payment_status.charAt(0).toUpperCase() +
      payment.payment_status.slice(1);
     return `${paymentMode} `;
    } else {
     const paymentMode =
      payment.payment_mode.charAt(0).toUpperCase() +
      payment.payment_mode.slice(1) +
      " | " +
      payment.payment_status.charAt(0).toUpperCase() +
      payment.payment_status.slice(1);
     return `${paymentMode} `;
    }
   }
   return "";
  };
  return getPayments;
 }, [payments]);

 {
  /**Get Accommodation Mode */
 }
 const memoizedGetAccommodation = useMemo(() => {
  const getAccommodation = (accommodationId) => {
   const accommodation = accommodations.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );
   return accommodation ? `${accommodation.room_name}` : "Unknown Room";
  };
  return getAccommodation;
 }, [accommodations]);

 const formatDateDisplay = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
 };

 async function LoadData() {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation/sort`,
    {
     params: {
      page: currentPage, // Assuming currentPage is a state variable
      sortBy: "created_at", // Modify to the desired sorting column
      sortOrder: "desc", // Modify to the desired sorting order ('asc' or 'desc')
     },
    }
   );
   setReservations(response.data.data);
   setTotalPages(response.data.last_page);
  } catch (error) {
   console.error("Error loading data:", error);
  } finally {
   setLoading(false);
  }
 }

 async function loadReservations() {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation/sort`,
    {
     params: {
      page: currentPage,
      sortBy: "created_at",
      sortOrder: "desc",
      status: selectedStatus === "All" ? null : selectedStatus, // Pass the selectedStatus as a filter parameter
     },
    }
   );

   setReservations(response.data.data);
   setTotalPages(response.data.last_page);
  } catch (error) {
   console.error("Error loading reservation data:", error);
  } finally {
   setLoading(false);
  }
 }

 const fetchAllReservations = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation`
   );
   setAllReservations(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 async function loadGuests() {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   setGuests(response.data);
  } catch (error) {
   console.error("Error loading guest data:", error);
  }
 }

 async function loadPayments() {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`
   );
   setPayments(response.data);
  } catch (error) {
   console.error("Error loading guest data:", error);
  }
 }

 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 useEffect(() => {
  fetchAllReservations();
 }, []);

 useEffect(() => {
  loadReservations();
  loadGuests();
  loadAccommodations();
  loadPayments();
  if (filterApplied) {
   setCurrentPage(1);
   setTotalPages(1);
  }
 }, [currentPage, filterApplied]);

 async function deleteReservation(reservation_id) {
  const result = await Swal.fire({
   title: "Confirm Deletion",
   text: "Are you sure you want to delete this reservation?",
   icon: "warning",
   showCancelButton: true,
   cancelButtonText: "Cancel",
   confirmButtonText: "Yes, delete it",
   reverseButtons: false,
   confirmButtonColor: "#CC0000",
   cancelButtonColor: "#808080",
  });

  if (result.isConfirmed) {
   try {
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/reservation/delete/` +
      reservation_id
    );
    Swal.fire({
     title: "Deleted!",
     text: "The reservation has been deleted.",
     icon: "success",
     html: "The reservation has been successfully deleted.",
     confirmButtonColor: "#606060",
     timer: 3000,
     timerProgressBar: true,
    });

    LoadData();
   } catch (error) {
    Swal.fire({
     title: "Error",
     text: "An error occurred while deleting the reservation.",
     icon: "error",
     html:
      "An error occurred while attempting to delete the reservation. Please try again later.",
     showConfirmButton: false,
     showCloseButton: true,
     focusClose: true,
    });
   }
  }
 }

 //  Checkpoint
 const [reload, setReload] = useState("");
 // Empty dependency array means this effect runs once after the initial render

 async function loadAccommodations() {
  try {
   const accommodationResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   setAccommodations(accommodationResponse.data);
  } catch (error) {
   console.error("Error loading accommodations:", error);
  }
 }

 function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
 }

 const handlePageChange = (page) => {
  setCurrentPage(page);
 };

 const handleNextPage = () => {
  if (currentPage < totalPages) {
   setCurrentPage(currentPage + 1);
  }
 };

 const handlePreviousPage = () => {
  if (currentPage > 1) {
   setCurrentPage(currentPage - 1);
  }
 };

 {
  /** Edit reservation */
 }
 const [showReservationModal, setShowReservationModal] = useState(false);
 const [selectedReservation, setSelectedReservation] = useState(null);

 const editReservationModal = (reservation) => {
  setSelectedReservation(reservation);
  setShowReservationModal(true);
 };

 const loadDataAndAccommodations = () => {
  LoadData();
  loadAccommodations(); // Load accommodations data as well
 };

 useEffect(loadDataAndAccommodations, []);

 const handleCloseReservationModal = () => {
  setShowReservationModal(false);
  setSelectedReservation(null);
  loadReservations();
  loadGuests();
  loadAccommodations();
  loadPayments();
 };

 const [selectedTab, setSelectedTab] = useState("All");
 const handleTabClick = (tab) => {
  setSelectedTab(tab);
 };

 {
  /**SORT */
 }
 const [selectedAccommodation, setSelectedAccommodation] = useState("All");
 const [selectedPaymentMode, setSelectedPaymentMode] = useState("All");
 const [selectedStatus, setSelectedStatus] = useState("All");

 const [searchQuery, setSearchQuery] = useState("");
 const handleSearch = (event) => {
  if (event.target.value === "") {
   LoadData();
  }

  setTotalPages(1);
  setCurrentPage(1);
  setSearchQuery(event.target.value);
 };

 const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);

 const handleCheckInDateChange = (date) => {
  setSelectedCheckInDate(date);
 };

 const [selectedCreatedAtDate, setSelectedCreatedAtDate] = useState(null);

 const handleCreatedAtChange = (date) => {
  setSelectedCreatedAtDate(date);
 };

 const parseDatabaseDateTime = (dateTimeString) => {
  if (dateTimeString) {
   const parts = dateTimeString.split(" ");
   if (parts.length === 2) {
    // Split the date and time parts
    const [datePart, timePart] = parts;

    // Extract the date components
    const [year, month, day] = datePart.split("-");

    // Extract the time components
    const [hour, minute, second] = timePart.split(":");

    // Create a JavaScript Date object
    return new Date(year, month - 1, day, hour, minute, second);
   }
  }
  // Return null if dateTimeString is undefined, empty, or in an unexpected format
  return null;
 };

 useEffect(() => {
  loadReservations();
  loadGuests();
  loadAccommodations();
  loadPayments();
  loadDataAndAccommodations();
 }, [
  selectedAccommodation,
  selectedPaymentMode,
  selectedCheckInDate,
  selectedCreatedAtDate,
  selectedStatus,
 ]);
 const areAllFiltersAll = () =>
  selectedAccommodation === "All" &&
  selectedPaymentMode === "All" &&
  selectedCheckInDate === null &&
  selectedCreatedAtDate === null &&
  selectedStatus === "All";

 const handleFilterSwitch = () => {
  if (
   selectedAccommodation === "All" &&
   selectedPaymentMode === "All" &&
   selectedCheckInDate === null &&
   selectedCreatedAtDate === null &&
   selectedStatus === "All"
  ) {
   closeFilter();
   setFilterApplied(false);
  } else {
   setFilterApplied(true);
   closeFilter();
  }
 };

 const handleFilterSwitchOff = () => {
  setFilterApplied(false);
  handleResetFilters();
 };

 const applyFilters = (reservation) => {
  const accommodation = accommodations.find(
   (acc) => acc.accommodation_id === reservation.accommodation_id
  );
  const matchesAccommodation =
   selectedAccommodation === "All" ||
   (accommodation && accommodation.type === selectedAccommodation);

  const payment = payments.find(
   (payment) => payment.payment_id === reservation.payment_id
  );
  const matchesPaymentMode =
   selectedPaymentMode === "All" ||
   (payment && payment.payment_mode === selectedPaymentMode);

  const reservationCheckInDateObj = new Date(reservation.check_in_date);
  const matchesSelectedCheckInDate =
   selectedCheckInDate === null ||
   reservationCheckInDateObj.toDateString() ===
    new Date(selectedCheckInDate).toDateString();

  if (reservation.created_at !== null) {
   const reservationCreatedAtObj = new Date(reservation.created_at);
   const matchesSelectedCreatedAt =
    selectedCreatedAtDate === null ||
    reservationCreatedAtObj.toDateString() ===
     new Date(selectedCreatedAtDate).toDateString();

   return (
    matchesAccommodation &&
    matchesPaymentMode &&
    matchesSelectedCheckInDate &&
    matchesSelectedCreatedAt &&
    (selectedStatus === "All" || reservation.status === selectedStatus)
   );
  }
  // Return false if reservation.created_at is null
  return false;
 };

 const searchMatchesByMonth = (dateString, searchQuery) => {
  const months = [
   "january",
   "february",
   "march",
   "april",
   "may",
   "june",
   "july",
   "august",
   "september",
   "october",
   "november",
   "december",
  ];

  for (const month of months) {
   if (
    dateString.toLowerCase().includes(month) &&
    searchQuery.includes(month)
   ) {
    return true;
   }
  }

  return false;
 };

 //  Checkpoint
 const filteredReservations = searchQuery
  ? all_reservations.filter((reservation) => {
     const formattedCheckInDate = formatDateDisplay(reservation.check_in_date);
     const searchMatches =
      String(reservation.reservation_id)
       .toLowerCase()
       .includes(searchQuery.toLowerCase()) ||
      memoizedGetGuestName(reservation.guest_id)
       .toLowerCase()
       .includes(searchQuery.toLowerCase()) ||
      memoizedGetAccommodation(reservation.accommodation_id)
       .toLowerCase()
       .includes(searchQuery.toLowerCase()) ||
      formattedCheckInDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDateDisplay(reservation.check_out_date).includes(
       searchQuery.toLowerCase()
      ) ||
      reservation.arrival_time.includes(searchQuery.toLowerCase()) ||
      formatDateDisplay(reservation.created_at).includes(
       searchQuery.toLowerCase()
      ) ||
      reservation.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memoizedGetPayments(reservation.payment_id)
       .toLowerCase()
       .includes(searchQuery.toLowerCase()) ||
      String(reservation.accommodation_id)
       .toLowerCase()
       .includes(searchQuery.toLowerCase()) || // Check for accommodation_id
      searchMatchesByMonth(formattedCheckInDate, searchQuery.toLowerCase());

     return applyFilters(reservation) && searchMatches;
    })
  : filterApplied
  ? all_reservations.filter(applyFilters)
  : reservations;

 const handleResetFilters = () => {
  setSelectedAccommodation("All");
  setSelectedPaymentMode("All");
  setSelectedStatus("All");
  setSelectedCheckInDate(null);
  setSelectedCreatedAtDate(null);
 };

 const [showSortFilters, setShowFilters] = useState(false);

 const handleShowFilter = () => {
  setFilterApplied(false);
  setShowFilters(true);
 };

 const closeFilter = () => {
  setShowFilters(false);
 };
 // Checkpoint

 return (
  <div className="">
   {showReservationModal && (
    <EditReservationModal
     selectedReservation={selectedReservation}
     onClose={handleCloseReservationModal}
     LoadData={LoadData}
    />
   )}

   {/**WIP */}
   {showSortFilters && (
    <div
     className="w-full py-auto flex justify-center absolute"
     style={{ zIndex: 9999 }}
    >
     <div className=" h-screen w-screen fixed top-0 left-0 flex justify-center items-center shadow-xl">
      <div className="sticky bg-white  flex-col  top-0 w-[30rem] shadow-md rounded-md  fadeInDown ">
       <div className="justify-between w-full items-center flex rounded-t-md px-4 py-2 shadow-md bg-forestgreen-100">
        <span className="font-semibold  text-white text-lg tracking-widest">
         {" "}
         Filter Options
        </span>
        <i
         onClick={closeFilter}
         className="fa-solid fa-close text-lg text-white cursor-pointer text-end transition duration-0.3s "
        />
       </div>

       <div className="w-full flex justify-center p-8 shadow-lg">
        <div className="flex-col space-y-2">
         {/**Accommodation */}
         <div className="  grid grid-cols-3 gap-5 ">
          <div className="whitespace-nowrap  text-base col-span-1 items-center flex font-bold text-gray-800  w-full">
           Accommodation
          </div>

          <div className="flex  w-full justify-between">
           <div className="flex items-center  w-full">
            <select
             className="hover:cursor-pointer transition duration-300 ease-in-out text-sm text-gray-500 tracking-wider  bg-white py-1 shadow-md border-2 border-gray-400 rounded-md "
             onChange={(event) => setSelectedAccommodation(event.target.value)}
             value={selectedAccommodation}
            >
             <option value="All">Accommodation</option>
             <option value="Cabin">Cabins</option>
             <option value="Lake Villa">Lake Villas</option>
            </select>
           </div>
          </div>

          <div className=" items-center  col-span-1 flex justify-start ">
           {selectedAccommodation !== "All" && (
            <div className="">
             <input
              type="radio"
              id="clearAccommodation"
              value="All"
              className="hidden "
              checked={selectedAccommodation === "All"}
              onChange={() => setSelectedAccommodation("All")}
             />
             <label
              htmlFor="clearAccommodation"
              className="text-red-600 transition hover:cursor-pointer duration-.3s hover:text-red-900"
             >
              <FontAwesomeIcon icon={faTimes} />
             </label>
            </div>
           )}
          </div>
         </div>

         {/**PaymentMode  */}
         <div className=" grid grid-cols-3 gap-4">
          <div className="w-full whitespace-nowrap col-span-1 text-base items-center flex font-bold text-gray-800 ">
           Payment Mode
          </div>

          <div className="flex items-center  ">
           <select
            className="hover:cursor-pointer transition duration-300 ease-in-out text-sm text-gray-500 tracking-wider  bg-white py-1 shadow-md border-2 border-gray-400 rounded-md "
            onChange={(event) => setSelectedPaymentMode(event.target.value)}
            value={selectedPaymentMode}
           >
            <option value="All">Payment Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
           </select>
          </div>

          <div className="items-center w-full  flex justify-start">
           {selectedPaymentMode !== "All" && (
            <div className="">
             <input
              type="radio"
              id="clearPaymentMode"
              value="All"
              className="hidden"
              checked={selectedPaymentMode === "All"}
              onChange={() => setSelectedPaymentMode("All")}
             />
             <label
              htmlFor="clearPaymentMode"
              className="text-red-600 transition hover:cursor-pointer duration-.3s hover:text-red-900"
             >
              <FontAwesomeIcon icon={faTimes} />
             </label>
            </div>
           )}
          </div>
         </div>

         {/**Status  */}
         <div className="grid grid-cols-3 items-center  gap-4">
          <div className="whitespace-nowrap items-center w-full text-base flex font-bold text-gray-800 ">
           Status
          </div>

          <select
           className="thover:cursor-pointer transition duration-300 ease-in-out text-sm text-gray-500 tracking-wider  bg-white py-1 shadow-md border-2 border-gray-400 rounded-md  "
           onChange={(event) => setSelectedStatus(event.target.value)}
           value={selectedStatus}
          >
           <option value="All">Status</option>
           <option value="Checked In">Checked In</option>
           <option value="Checked Out">Checked Out</option>
           <option value="Scheduled">Scheduled</option>
           <option value="Cancelled">Cancelled</option>
          </select>

          <div className="flex justify-start w-full">
           {selectedStatus !== "All" && (
            <div className="">
             <input
              type="radio"
              id="clearStatus"
              value="All"
              className="hidden"
              checked={selectedStatus === "All"}
              onChange={() => setSelectedStatus("All")}
             />
             <label
              htmlFor="clearStatus"
              className="text-red-600 hover:cursor-pointer transition duration-.3s hover:text-red-900"
             >
              <FontAwesomeIcon icon={faTimes} />
             </label>
            </div>
           )}
          </div>
         </div>

         {/**Check In Date */}
         <div className=" grid grid-cols-3 gap-4 items-center">
          <div className="whitespace-nowrap text-base items-center w-full flex font-bold text-gray-800">
           Check In Date
          </div>

          <div className="w-full">
           <DatePicker
            id="checkInDate"
            placeholderText="Check In Date"
            dateFormat="MMMM d y" // Set the date format
            className="transition duration-300 ease-in-out bg-white py-1 shadow-md border-2 border-gray-400 rounded-md w-full text-[.9rem] text-start px-1 cursor-default"
            selected={selectedCheckInDate}
            onSelect={handleCheckInDateChange}
            onChange={handleCheckInDateChange}
            autoComplete="off"
           />
          </div>

          <div className="flex justify-start items-center w-full">
           {selectedCheckInDate && (
            <div className="">
             <input
              type="radio"
              id="clearCheckInDate"
              value="All"
              className="hidden"
              checked={selectedCheckInDate === null}
              onChange={() => setSelectedCheckInDate(null)}
             />
             <label
              htmlFor="clearCheckInDate"
              className="text-red-600 hover:cursor-pointer transition duration-.3s hover:text-red-900"
             >
              <FontAwesomeIcon icon={faTimes} />
             </label>
            </div>
           )}
          </div>
         </div>

         {/**Created */}
         <div className=" grid grid-cols-3 gap-4  items-center">
          <div className="whitespace-nowrap items-center flex text-base font-bold text-gray-800 ">
           Created At
          </div>

          <div className="w-full">
           <DatePicker
            style={{ cursor: "pointer" }}
            id="checkInDate"
            placeholderText="Created At"
            dateFormat="MMMM d y" // Set the date format
            className="transition duration-300 ease-in-out bg-white py-1 shadow-md border-2 border-gray-400 px-1 rounded-md w-full  text-[.9rem] cursor-default" // Adjust the styling as needed
            selected={selectedCreatedAtDate}
            onSelect={handleCreatedAtChange}
            onChange={handleCreatedAtChange}
            autoComplete="off"
            onFocus={(e) => e.target.blur()}
            tabIndex={-1}
           />
          </div>

          <div className="flex justify-start items-center w-full">
           {selectedCreatedAtDate && (
            <div className="">
             <input
              type="radio"
              id="clearCreatedDate"
              value="All"
              className="hidden"
              checked={selectedCreatedAtDate === null}
              onChange={() => setSelectedCreatedAtDate(null)}
             />
             <label
              htmlFor="clearCreatedDate"
              className="text-red-600 hover:cursor-pointer transition ease-in-out  duration-.3s hover:text-red-900"
             >
              <FontAwesomeIcon icon={faTimes} />
             </label>
            </div>
           )}
          </div>
         </div>

         <div className="flex w-full justify-end pt-4 col-span-3">
          {/**Filter button */}
          <div
           className=" hover:cursor-pointer py-1 w-full bg-forestgreen-100 shadow-md transition duration-.3s ease-in-out hover:bg-forestgreen-600 tracking-wider text-center rounded-md  text-white"
           onClick={handleFilterSwitch}
          >
           Submit
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}

   <div className="flex">
    <div className="flex-1 justify-start bg-forestgreen-100">
     <h2 className="tracking-widest font-[Poppins] text-white font-semibold px-12 py-8  text-lg">
      BOOKINGS <FontAwesomeIcon icon={faAngleRight} className="text-white " />{" "}
      ALL BOOKING
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300 " />

   {/** Tabs */}

   <div className={`flex items-center justify-between mt-4 mx-4 px-14 `}>
    <div className="flex items-center">
     <div className="flex  mb-2 h-10 gap-4">
      <div className=" ">
       <i
        className="fas fa-redo fa-flip-horizontal  transition ease-in-out duration-.3s hover:bg-black rounded-full bg-gray-400 p-3 cursor-pointer text-white"
        onClick={handleResetFilters}
       ></i>
      </div>
      <div
       className="whitespace-nowrap cursor-pointer  bg-green-500 mr-8 rounded-full items-center flex px-6 font-[Poppins] tracking-wide text-white text-base border-2"
       onClick={handleShowFilter}
      >
       Sort By:
      </div>
     </div>

     {/**checkpoint */}
     <div className=" flex ">
      {filterApplied && selectedAccommodation !== "All" ? (
       <div className="bg-white px-2 py-1 rounded-md flex items-center border-2 border-gray-300 mx-1">
        <span className="whitespace-nowrap">{selectedAccommodation}</span>
        <button
         className="ml-2 text-red-600 transition duration-.3s ease-in-out hover:text-red-900 whitespace-nowrap"
         onClick={() => setSelectedAccommodation("All")}
        >
         <FontAwesomeIcon icon={faTimes} />
        </button>
       </div>
      ) : null}

      <div className="">
       {filterApplied && selectedPaymentMode !== "All" ? (
        <div className="bg-white px-2 py-1 rounded-md flex items-center border-2 border-gray-300 mx-1">
         <span className="whitespace-nowrap">
          {selectedPaymentMode.charAt(0).toUpperCase() +
           selectedPaymentMode.slice(1)}
         </span>
         <button
          className="ml-2 text-red-600 transition duration-.3s ease-in-out hover:text-red-900"
          onClick={() => setSelectedPaymentMode("All")}
         >
          <FontAwesomeIcon icon={faTimes} />
         </button>
        </div>
       ) : null}
      </div>

      <div className="">
       {filterApplied && selectedStatus !== "All" ? (
        <div className="bg-white px-2 py-1 rounded-md flex items-center border-2 border-gray-300 mx-1">
         <span className="whitespace-nowrap">
          {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
         </span>
         <button
          className="ml-2 text-red-600 transition duration-.3s ease-in-out hover:text-red-900"
          onClick={() => setSelectedStatus("All")}
         >
          <FontAwesomeIcon icon={faTimes} />
         </button>
        </div>
       ) : null}
      </div>

      <div className="">
       {filterApplied && selectedCheckInDate !== null ? (
        <div className="bg-white px-2 py-1 rounded-md flex items-center border-2 border-gray-300 mx-1">
         <span className="whitespace-nowrap">
          {formatDate(selectedCheckInDate)}
         </span>
         <button
          className="ml-2 text-red-600 transition duration-.3s ease-in-out hover:text-red-900"
          onClick={() => setSelectedCheckInDate(null)}
         >
          <FontAwesomeIcon icon={faTimes} />
         </button>
        </div>
       ) : null}
      </div>

      <div className="">
       {filterApplied && selectedCreatedAtDate !== null ? (
        <div className="bg-white px-2 py-1 rounded-md flex items-center border-2 border-gray-300 mx-1">
         <span className="whitespace-nowrap">
          {formatDate(selectedCreatedAtDate)}
         </span>
         <button
          className="ml-2 text-red-600 transition duration-.3s ease-in-out hover:text-red-900"
          onClick={() => setSelectedCreatedAtDate(null)}
         >
          <FontAwesomeIcon icon={faTimes} />
         </button>
        </div>
       ) : null}
      </div>
     </div>
    </div>

    <div className="flex justify-end w-full mr-8">
     <div className="relative mb-2">
      <input
       className=" h-10 px-4 pr-9 border-2 border-gray-900 rounded-full"
       placeholder="Search"
       value={searchQuery}
       onChange={handleSearch}
      />
     </div>

     <button
      className="absolute   bg-forestgreen-600 h-10 w-10 rounded-full text-white"
      onClick={handleSearch}
     >
      <i className="fa-solid fa-magnifying-glass m-auto" />
     </button>
    </div>
   </div>

   <div className="h-full px-14 text-lg">
    <div className="cabin-card fadeInDown">
     <div>
      <table className="min-w-full border-collapse">
       <thead>
        <tr className="text-sm tracking-wider text-white ">
         <th
          className="py-4 px-3 text-left rounded-tl-xl bg-dark-50"
          colSpan="2"
         >
          Reservation Id & Accommodation
         </th>
         <th className="py-2 px-3 text-left bg-dark-50" colSpan="2">
          Guest Name & No. of Guests
         </th>
         <th className="py-2 px-3 text-left bg-dark-50" colSpan="3">
          Check In, Check Out, & Arrival Time
         </th>
         <th className="py-2 px-3 text-left bg-dark-50" colSpan="3">
          Reservation Made, Status, & Payment Mode
         </th>
         <th className="py-2 px-3 text-left bg-dark-50 rounded-tr-xl">
          Options
         </th>
        </tr>
       </thead>

       {loading ? (
        <tbody>
         <tr>
          <td colSpan="11" className="text-center">
           <LoadingCircle />
          </td>
         </tr>
        </tbody>
       ) : (
        <tbody className="text-sm tracking-wider">
         {filteredReservations.length === 0 ? (
          <tr>
           <td colSpan="11" className="text-center">
            <div className="text-gray-500 mt-4">
             No matches found for the given search criteria.
            </div>
           </td>
          </tr>
         ) : (
          // Checkpoint
          filteredReservations.map((reservation, index) => {
           const accommodation = accommodations.find(
            (acc) => acc.accommodation_id === reservation.accommodation_id
           );

           return (
            <tr
             key={index}
             className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
             <td colSpan="2" className="py-3 px-3">
              {reservation.reservation_id} -{" "}
              {memoizedGetAccommodation(reservation.accommodation_id)}
             </td>
             <td colSpan="2" className="py-3 px-3">
              {memoizedGetGuestName(reservation.guest_id)} -{" "}
              {memoizedGetGuestPartySize(reservation.guest_id)}
             </td>
             <td colSpan="3" className="py-3 px-3">
              {formatDateDisplay(reservation.check_in_date)} -{" "}
              {formatDateDisplay(reservation.check_out_date)} -{" "}
              {reservation.arrival_time}
             </td>
             <td colSpan="3" className="py-3 px-3">
              {formatDateDisplay(reservation.created_at)} - {reservation.status}{" "}
              - {memoizedGetPayments(reservation.payment_id)}
             </td>
             <td className="py-3 px-3">
              <button
               className="bg-green-500 my-2 text-sm shadow-md hover:bg-green-700 px-4 py-1 rounded-full text-white"
               onClick={() => editReservationModal(reservation)}
              >
               Edit
              </button>
             </td>
            </tr>
           );
          })
         )}
        </tbody>
       )}
      </table>
     </div>

     <div className="pagination flex items-center justify-center pt-6 space-x-3">
      <button
       onClick={() => handlePageChange(1)}
       disabled={currentPage === 1 || totalPages === 1}
       className={`pagination-button ${
        currentPage === 1 || totalPages === 1 ? "disabled" : ""
       }`}
      >
       <FontAwesomeIcon icon={faChevronLeft} />
       <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
       onClick={handlePreviousPage}
       disabled={currentPage === 1}
       className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
       <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className="current-page">{currentPage}</span>
      <button
       onClick={handleNextPage}
       disabled={currentPage === totalPages}
       className={`pagination-button ${
        currentPage === totalPages ? "disabled" : ""
       }`}
      >
       <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
       onClick={() => handlePageChange(totalPages)}
       disabled={
        currentPage === totalPages || totalPages === 1 || filterApplied
       }
       className={`pagination-button ${
        currentPage === totalPages || totalPages === 1 || filterApplied
         ? "disabled"
         : ""
       }`}
      >
       <FontAwesomeIcon icon={faChevronRight} />
       <FontAwesomeIcon icon={faChevronRight} />
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
