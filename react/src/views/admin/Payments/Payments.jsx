import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import PaymentModal from "./PaymentModal";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faChevronLeft,
 faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../context/admin/ContextProvider";

export default function Payments() {
 const update_expire_payments = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payment_update_expire`
   );
  } catch (error) {
   console.error("Error fetching reservations:", error);
  }
 };
 useEffect(() => {
  update_expire_payments();
 }, []);

 const [payment_id, setPaymentId] = useState("");
 const [reservation_id, setReservationId] = useState("");
 const [guest_id, setGuestId] = useState("");
 const [payment_mode, setPaymentMode] = useState("");
 const [payment_mode_online, setPaymentModeOnline] = useState("");
 const [paymongo_payment_id, setReferenceNumber] = useState("");
 const [total_amount, setTotalAmount] = useState("");
 const [payment_status, setPaymentStatus] = useState("");
 const [payments, setPayments] = useState([]);

 const { user } = useStateContext();
 const userAccountType = user.account_type;
 const [loading, setLoading] = useState(false);

 const [paymentsPage, setPaymentsPage] = useState([]);
 const itemsPerPage = 10;
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 async function LoadPage() {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments/sort`,
    {
     params: {
      page: currentPage, // Assuming currentPage is a state variable
      sortBy: "created_at", // Modify to the desired sorting column
      sortOrder: "desc", // Modify to the desired sorting order ('asc' or 'desc')
     },
    }
   );

   setPaymentsPage(response.data.data);
   setTotalPages(response.data.last_page);
  } catch (error) {
   console.error("Error loading data:", error);
  } finally {
   setLoading(false);
  }
 }

 const [all_payments, setAllPayments] = useState([]);

 async function fetchAllPayments() {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`
   );

   setAllPayments(response.data);
  } catch (error) {
   console.error("Error loading data:", error);
  }
 }

 useEffect(() => {
  LoadPage();
  fetchAllPayments();
 }, [currentPage]);

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

 const [allReservations, setAllReservations] = useState([]);
 const [accommodation_id, setAccommodationID] = useState([]);
 const [allGuests, setGuests] = useState([]);

 const [allAccommodation, setAllAccommodation] = useState([]);
 const fetchAllAccommodation = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   setAllAccommodation(response.data);
  } catch (error) {
   console.error(error);
  }
 };

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

 const fetchAllGuests = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   setGuests(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 {
  /**Get Accommodation Mode */
 }
 const memoizedGetAccommodation = useMemo(() => {
  const getAccommodation = (accommodationId) => {
   const accommodation = allAccommodation.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );
   return accommodation ? `${accommodation.room_name}` : "Unknown Room";
  };
  return getAccommodation;
 }, [allAccommodation]);

 const fetchData = async () => {
  try {
   await fetchAllAccommodation();
   await fetchAllReservations();
   await fetchAllGuests();
  } catch (error) {
   console.error(error);
  } finally {
   // Set loading to false when data fetching is complete
   setLoading(false);
  }
 };
 useEffect(() => {
  fetchData();
 }, []);

 useEffect(() => {
  const accommodationIds = allReservations.map(
   (reservation) => reservation.accommodation_id
  );
  setAccommodationID(accommodationIds);
 }, [allReservations]);

 {
  /**Get Payment Mode */
 }
 const memoizedGetGuest = useMemo(() => {
  const getGuest = (guestId) => {
   const guest = allGuests.find(
    (guest) => guest.guest_id === parseInt(guestId)
   );
   return guest ? `${guest.first_name} ${guest.last_name}` : "N/A";
  };
  return getGuest;
 }, [allGuests]);

 // async function save(event) {
 //   event.preventDefault();
 //   try {
 //     await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payments/save`, {
 //       reservation_id: reservation_id,
 //       guest_id: guest_id,
 //       payment_mode: payment_mode,
 //       paymongo_payment_id:paymongo_payment_id,
 //       total_amount:total_amount,
 //       payment_status:payment_status,
 //     });
 //     alert("Employee Registration Successfully");
 //     setPaymentId("");
 //     setReservationId("");
 //     setGuestId("");
 //     setPaymentMode("");
 //     setReferenceNumber("");
 //     setTotalAmount("");
 //     setPaymentStatus("");
 //     Load();
 //   } catch (err) {
 //     alert("Employee Registration Failed");
 //   }
 // }

 const [showPaymentModal, setShowPaymentModal] = useState(false);
 const [selectedPayment, setSelectedPayment] = useState(null);

 const editPayment = (payments) => {
  setSelectedPayment(payments);
  setShowPaymentModal(true);
 };

 const handleClosePaymentModal = () => {
  setShowPaymentModal(false);
  setSelectedPayment(null);
 };

 async function deletePayment(payment) {
  // Show a confirmation dialog using SweetAlert
  const confirmation = await Swal.fire({
   title: "Confirm Deletion",
   html:
    "This action will delete the <b>Reservation</b> and the associated <b>Guest</b> with this payment.",
   icon: "warning",
   showCancelButton: true,
   confirmButtonText: "Continue",
   cancelButtonText: "Cancel",
   confirmButtonColor: "#d33",
  });

  // Check if the user confirmed the deletion
  if (confirmation.isConfirmed) {
   try {
    // Perform the deletion if confirmed
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/payments/delete/` +
      payment.payment_id
    );
    try {
     await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/guests/delete/` +
       payment.guest_id
     );
    } catch (e) {
     Swal.fire({
      title: "Deletion Error",
      text: "An error occurred while deleting the payment.",
      icon: "error",
      showConfirmButton: false,
      showCloseButton: true,
     });
    }
    Swal.fire({
     title: "Payment Deleted",
     text: "Payment has been deleted successfully.",
     icon: "success",
     showConfirmButton: false,
     timer: 3000, // 3 seconds
     timerProgressBar: true,
     position: "top-end",
    });

    LoadPage();
    setSearchQuery("");
   } catch (err) {
    console.error(err);
    Swal.fire({
     title: "Deletion Error",
     text: "An error occurred while deleting the payment.",
     icon: "error",
     showConfirmButton: false,
     showCloseButton: true,
    });
   }
  }
 }

 async function update(event) {
  event.preventDefault();
  try {
   await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments/update/` + payment_id ||
     payment_id,
    {
     payment_id: payment_id,
     reservation_id: reservation_id,
     guest_id: guest_id,
     payment_mode: payment_mode,
     paymongo_payment_id: paymongo_payment_id,
     total_amount: total_amount,
     payment_status: payment_status,
    }
   );
   alert("Registration Updated");
   setPaymentId("");
   setReservationId("");
   setGuestId("");
   setPaymentMode("");
   setReferenceNumber("");
   setTotalAmount("");
   setPaymentStatus("");
  } catch (err) {
   alert("User Registration Failed");
  }
 }

 const getRoomNameFromReservation = (reservationId) => {
  // Find the reservation with the matching reservationId
  const selectedReservation = allReservations.find(
   (reservation) => reservation.reservation_id === reservationId
  );

  if (selectedReservation) {
   // Extract the accommodation_id from the selectedReservation
   const accommodationId = selectedReservation.accommodation_id;

   // Find the accommodation with the matching accommodationId
   const accommodation = allAccommodation.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );

   if (accommodation) {
    // Return the room name
    return accommodation.room_name;
   }
  }

  // If no matching reservation or accommodation is found, return a default value
  return "Unknown Room";
 };

 const noPaymentsFound = payments.length === 0;

 {
  /** Selected Tab */
 }
 const [selectedTab, setSelectedTab] = useState("all");

 const handleTabClick = (tab) => {
  // Convert both the selectedTab and tab label to lowercase for case-insensitive comparison
  setSelectedTab(tab.toLowerCase());
 };

 const [searchQuery, setSearchQuery] = useState("");
 const handleSearch = (event) => {
  setSearchQuery(event.target.value);
 };

 const applyFilters = (payments, selectedTab) => {
  return payments.filter((payment) => {
   const paymentMode = payment.payment_mode.toLowerCase();

   // Check if the selectedTab is "offline," "online," or "all" and filter accordingly
   if (selectedTab === "offline") {
    return paymentMode === "offline";
   } else if (selectedTab === "online") {
    return paymentMode === "online";
   } else if (selectedTab === "all") {
    // For "All" tab, don't apply any additional filtering
    return true;
   }

   return false; // Return false for other cases
  });
 };

 let filterPayments = (searchQuery, selectedTab) => {
  return searchQuery
   ? all_payments.filter((payment) => {
      const searchMatches =
       String(payment.payment_id)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(getRoomNameFromReservation(payment.reservation_id))
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(memoizedGetGuest(payment.guest_id))
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(payment.payment_mode)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(payment.payment_status)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(payment.total_amount)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(payment.paymongo_payment_id)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
       String(payment.payment_intent_id)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return applyFilters(all_payments, selectedTab) && searchMatches;
     })
   : selectedTab === "all"
   ? applyFilters(paymentsPage, selectedTab)
   : applyFilters(all_payments, selectedTab);
 };

 useEffect(() => {
  if (selectedTab != "all") {
   setCurrentPage(1);
   setTotalPages(1);
   setSearchQuery("");
  }

  if (selectedTab === "all") {
   LoadPage();
   setCurrentPage(1);
   fetchAllPayments();
   fetchData();
  }
 }, [selectedTab]);
 useEffect(() => {
  if (searchQuery === "") {
   LoadPage();
   setCurrentPage(1);
   fetchAllPayments();
   fetchData();
  }
  if (searchQuery != "") {
   setSelectedTab("all");
   setCurrentPage(1);
   setTotalPages(1);
  }
 }, [searchQuery]);

 const filtersOn = filterPayments(searchQuery, selectedTab);
 const filteredPayments = filtersOn;

 return (
  <div className="w-full overflow-x-auto">
   {showPaymentModal && (
    <PaymentModal
     selectedPayment={selectedPayment}
     onClose={handleClosePaymentModal}
    />
   )}

   <div className="flex">
    <div className="flex-1 justify-start bg-forestgreen-100 text-white">
     <h2 className="tracking-widest font-[Poppins] font-semibold px-12 py-8 text-lg">
      PAYMENTS
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300 " />

   {/**Tabs */}
   <div className={`flex items-center mx-4 overflow-y-hidden mt-4 px-10`}>
    <div
     onClick={() => handleTabClick("All")}
     className={`cursor-pointer flex items-center rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out ${
      selectedTab === "all"
       ? "border-t-0 border-gray-200 bg-green-500 font-medium text-white"
       : " border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>All</span>
    </div>
    <div
     onClick={() => handleTabClick("Offline")}
     className={`cursor-pointer flex  items-center  rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out ${
      selectedTab === "offline"
       ? "border-t-0 border-gray-200 bg-green-500 font-medium text-white"
       : " border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>Offline</span>
    </div>
    <div
     onClick={() => handleTabClick("Online")}
     className={` cursor-pointer flex items-center rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out ${
      selectedTab === "online"
       ? "border-t-0 border-gray-200 bg-green-500 font-medium text-white"
       : "border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>Online</span>
    </div>

    <div className="flex justify-end w-full">
     <div className="relative  mb-2">
      <input
       className="h-10 px-4 pr-9 border-2 border-gray-900 rounded-full"
       placeholder="Search"
       value={searchQuery}
       onChange={handleSearch}
      />
      <button className="absolute right-0.5  top-1/2 transform -translate-y-1/2 ml-7 bg-forestgreen-600 h-9 w-10 rounded-full text-white ">
       <i className="fa-solid fa-magnifying-glass m-auto" />
      </button>
     </div>
    </div>
   </div>

   <div className="card2 bg-white  mx-10">
    <table className="table table-dark" align="center">
     <thead>
      <tr className="text-white text-sm ">
       <th scope="col" className="py-4 bg-dark-50 rounded-tl-lg">
        Payment Id
       </th>
       <th scope="col" className="bg-dark-50">
        Accommodation & Guest
       </th>

       <th scope="col" className="bg-dark-50">
        Payment Mode & Status & Total Amount
       </th>
       <th scope="col" className="bg-dark-50">
        Made At
       </th>

       <th scope="col" className="bg-dark-50  rounded-tr-lg">
        Options
       </th>
      </tr>
     </thead>

     {loading ? (
      <tbody>
       <tr>
        <td colSpan="8" className="text-center">
         <LoadingCircle />
        </td>
       </tr>
      </tbody>
     ) : filteredPayments.length === 0 ? (
      <tbody>
       <tr>
        <td colSpan="8" className="text-center">
         <div className="text-gray-500 text-center">
          No matches found for the given search criteria.
         </div>
        </td>
       </tr>
      </tbody>
     ) : (
      <tbody className="text-sm font-medium">
       {filteredPayments.map((payment, index) => (
        <tr
         key={payment.payment_id}
         className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
        >
         <th scope="row">{payment.payment_id}</th>
         <td>
          {getRoomNameFromReservation(payment.reservation_id)} |{" "}
          {memoizedGetGuest(payment.guest_id)}
         </td>

         <td>
          {payment.payment_mode.charAt(0).toUpperCase() +
           payment.payment_mode.slice(1)}
          {payment.payment_mode === "online" &&
           payment.payment_mode_online &&
           ` | ${
            payment.payment_mode_online.charAt(0).toUpperCase() +
            payment.payment_mode_online.slice(1)
           }`}{" "}
          |{" "}
          {payment.payment_status.charAt(0).toUpperCase() +
           payment.payment_status.slice(1)}{" "}
          |{" "}
          {parseFloat(payment.total_amount).toLocaleString("en-PH", {
           style: "currency",
           currency: "PHP",
          })}
         </td>

         <td>
          {(() => {
           const rawDate = payment.created_at;
           const date = new Date(rawDate);
           const options = { year: "numeric", month: "long", day: "numeric" };
           return date.toLocaleDateString("en-US", options);
          })()}
         </td>
         <td className="flex space-x-2">
          <button
           className="bg-green-500 rounded-sm text-white shadow-md w-8 h-8  items-center flex justify-center transition ease-in-out duration-.5s hover:bg-green-700"
           onClick={() => editPayment(payment)}
          >
           <i className="fas fa-eye text-lg" />
          </button>

          {userAccountType === "employee" ? (
           ""
          ) : (
           <button
            type="button"
            className="bg-dark-50 p-1 w-8 h-8 items-center justify-center flex rounded-sm shadow-md transition duration-.5s ease-in-out hover:bg-black"
            onClick={() => deletePayment(payment)}
           >
            <i className="fas fa-trash text-white text-lg" />
           </button>
          )}
         </td>
        </tr>
       ))}
      </tbody>
     )}
    </table>

    <div className="pagination pt-6 flex items-center justify-center space-x-3">
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
      disabled={currentPage === totalPages || totalPages === 1}
      className={`pagination-button ${
       currentPage === totalPages || totalPages === 1 ? "disabled" : ""
      }`}
     >
      <FontAwesomeIcon icon={faChevronRight} />
      <FontAwesomeIcon icon={faChevronRight} />
     </button>
    </div>
   </div>
  </div>
 );
}
