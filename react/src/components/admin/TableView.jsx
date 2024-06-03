import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const TableView = () => {
 const [reservations, setReservations] = useState([]);
 const [currentDate, setCurrentDate] = useState("");
 const [guests, setGuests] = useState([]);
 const [accommodations, setAccommodations] = useState([]);

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

 async function loadAccommodations() {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   setAccommodations(response.data);
  } catch (error) {
   console.error("Error loading guest data:", error);
  }
 }

 useEffect(() => {
  loadGuests();
  loadAccommodations();
 }, []);

 const memoizedGetGuestName = useMemo(() => {
  const getGuestName = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.first_name} ${guest.last_name}` : "Unknown Guest";
  };
  return getGuestName;
 }, [guests]);

 const memoizedGetAccommodation = useMemo(() => {
  const getAccommodation = (accommodationId) => {
   const accommodation = accommodations.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );
   return accommodation ? `${accommodation.room_name}` : "Unknown Room";
  };
  return getAccommodation;
 }, [accommodations]);

 const fetchReservations = async () => {
  try {
   // Get the current date
   const today = new Date();
   const day = String(today.getDate()).padStart(2, "0");
   const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
   const year = today.getFullYear();
   const todayDate = `${year}-${month}-${day}`;

   setCurrentDate(todayDate);

   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   const reservationResponse = response.data;

   // Extract and format relevant data from reservationResponse
   const formattedReservations = reservationResponse.map((reservation) => ({
    reservation_id: reservation.reservation_id,
    guest_id: reservation.guest_id,
    accommodation_id: reservation.accommodation_id,
    arrival_time: reservation.arrival_time,
    check_in_date: new Date(reservation.check_in_date)
     .toISOString()
     .split("T")[0],
   }));

   // Filter reservations based on the current date
   const reservationsToday = formattedReservations.filter((reservation) => {
    return reservation.check_in_date === todayDate;
   });

   setReservations(reservationsToday); // Set the filtered data in state
  } catch (error) {
   console.error(error);
  }
 };

 const memoizedGetGuestPartySize = useMemo(() => {
  const getPartySize = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.party_size}` : "N/A";
  };
  return getPartySize;
 }, [guests]);

 useEffect(() => {
  fetchReservations();
 }, []);

 const formatDateDisplay = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
 };

 return (
  <div className="container rounded-xl overflow-y-auto  h-full w-full ">
   <div className="flex justify-between p-3 bg-forestgreen-100 rounded-t-xl mb-1 items-center">
    <h3 className="text-lg text-white tracking-wider ">
     Reservation Schedule for {formatDateDisplay(currentDate)}
    </h3>
    <div className="flex items-center">
     <a
      href="/bookings/allbooking"
      title="View All Bookings"
      className="text-white hover:text-forestgreen-300 transition ease-in-out duration-300"
     >
      <i className="fa-solid fa-book text-lg mr-1"></i> View All Bookings
     </a>
    </div>
   </div>
   <div className="overflow-x-auto ">
    {reservations.length === 0 ? (
     <div className="w-full py-10 text-center ">No Reservations for today.</div>
    ) : (
     <table className="min-w-full border-collapse">
      <thead>
       <tr>
        <th className="py-2 px-3 text-left">Reservation ID - Accommodation</th>
        <th className="py-2 px-3 text-left">Guest Name - Capacity</th>
        <th className="py-2 px-3 text-left">Arrival Time</th>
       </tr>
      </thead>
      <tbody>
       {reservations.map((reservation) => (
        <tr key={reservation.reservation_id}>
         <td>
          {reservation.reservation_id} -
          {memoizedGetAccommodation(reservation.accommodation_id)}
         </td>
         <td>
          {memoizedGetGuestName(reservation.guest_id)} -{" "}
          {memoizedGetGuestPartySize(reservation.guest_id)}
         </td>
         <td>{reservation.arrival_time}</td>
        </tr>
       ))}
      </tbody>
     </table>
    )}
   </div>
  </div>
 );
};

export default TableView;
