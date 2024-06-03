import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import LoadingCircle from "../../../components/misc/LoadingCircle";

export default function PaymentModal({ selectedPayment, onClose }) {
 const [allReservations, setAllReservations] = useState([]);
 const [accommodation_id, setAccommodationID] = useState([]);
 const [allGuests, setGuests] = useState([]);

 const [loading, setLoading] = useState(false);

 const [allAccommodation, setAllAccommodation] = useState([]);
 const fetchAllAccommodation = async () => {
  setLoading(true);

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
  setLoading(true);

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
  setLoading(true);

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

 useEffect(() => {
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

  fetchData();
 }, []);

 useEffect(() => {
  const accommodationIds = allReservations.map(
   (reservation) => reservation.accommodation_id
  );
  setAccommodationID(accommodationIds);
 }, [allReservations]);

 const memoizedGetGuest = useMemo(() => {
  const getGuest = (guestId) => {
   const guest = allGuests.find(
    (guest) => guest.guest_id === parseInt(guestId)
   );
   return guest ? `${guest.first_name} ${guest.last_name}` : "N/A";
  };
  return getGuest;
 }, [allGuests]);

 const memoizedGetGuestEmail = useMemo(() => {
  const getGuest = (guestId) => {
   const guest = allGuests.find(
    (guest) => guest.guest_id === parseInt(guestId)
   );
   return guest ? `${guest.guest_email} ` : "N/A";
  };
  return getGuest;
 }, [allGuests]);

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

 const calculateNightsSpent = (reservationId) => {
  // Find the matching reservation using reservationId
  const matchingReservation = allReservations.find(
   (reservation) => reservation.reservation_id === reservationId
  );

  if (matchingReservation) {
   // Extract check-in and check-out dates from the reservation
   const checkInDate = new Date(matchingReservation.check_in_date);
   const checkOutDate = new Date(matchingReservation.check_out_date);

   // Calculate the number of nights
   const timeDifference = checkOutDate - checkInDate;
   const nightsSpent = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

   return nightsSpent;
  }

  // If no matching reservation is found, return 'N/A' or another default value
  return "N/A";
 };

 return (
  <>
   {selectedPayment && (
    <div className="booking-moreinfo-modal fixed whitespace-normal">
     <div className="rounded-md bg-white  fadeInDown shadow-md border-2  ">
      <div className="lg:space-y-4 space-y-10">
       <div className="w-full">
        <div className="flex-col">
         <div className="shadow-md flex bg-forestgreen-100 h-10% hover:bg-forestgreen-1100 animated block w-full rounded-md py-1 px-2 relative text-center">
          <div className="text-lg text-white font-semibold">
           Payment ID: {selectedPayment.payment_id}
          </div>

          <span className="items-center flex justify-end ml-auto">
           <i
            className="fa fa-close text-xl hover:cursor-pointer text-white exit-icon"
            onClick={onClose}
           />
          </span>
         </div>

         <div className=" px-8 py-5 p-1 flex-col justify-center ">
          <div className="flex justify-center w-full card-item">
           {loading ? (
            <div className="w-120 flex justify-center">
             <LoadingCircle />
            </div>
           ) : (
            <div className="flow-root rounded-lg  py-3 shadow-sm ">
             <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Full Name</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {memoizedGetGuest(selectedPayment.guest_id)}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Email</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {memoizedGetGuestEmail(selectedPayment.guest_id)}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Room Name</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {" "}
                {getRoomNameFromReservation(selectedPayment.reservation_id)}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Night/s Spent</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {" "}
                {calculateNightsSpent(selectedPayment.reservation_id)}
               </dd>
              </div>

              {selectedPayment.paymongo_payment_id && (
               <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                <dt className="font-medium text-gray-900">Paymongo Pay ID</dt>
                <dd className="text-gray-700 font-semibold sm:col-span-1">
                 {selectedPayment.paymongo_payment_id}
                </dd>
               </div>
              )}

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Total Amount</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {parseFloat(selectedPayment.total_amount).toLocaleString(
                 "en-PH",
                 {
                  style: "currency",
                  currency: "PHP",
                 }
                )}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Payment Mode</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {" "}
                {selectedPayment.payment_mode.charAt(0).toUpperCase() +
                 selectedPayment.payment_mode.slice(1)}
                {selectedPayment.payment_mode === "online" &&
                 selectedPayment.payment_mode_online &&
                 ` | ${
                  selectedPayment.payment_mode_online.charAt(0).toUpperCase() +
                  selectedPayment.payment_mode_online.slice(1)
                 }`}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Booking Date:</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {(() => {
                 const rawDate = selectedPayment.created_at;
                 const date = new Date(rawDate);
                 const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                 };
                 return date.toLocaleDateString("en-US", options);
                })()}
               </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
               <dt className="font-medium text-gray-900">Status</dt>
               <dd className="text-gray-700 font-semibold sm:col-span-1">
                {" "}
                {selectedPayment.payment_status.charAt(0).toUpperCase() +
                 selectedPayment.payment_status.slice(1)}
               </dd>
              </div>
             </dl>
            </div>
           )}
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
