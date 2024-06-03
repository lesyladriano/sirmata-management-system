import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";
import "jspdf-autotable";

const BookingBarChart = () => {
 const [selectedFilter, setSelectedFilter] = useState("daily");
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);

 const today = new Date();

 const [selectedCreatedAtDate, setSelectedCreatedAtDate] = useState(today);

 const handleCreatedAtChange = (date) => {
  setSelectedCreatedAtDate(date);
 };

 const handleFilterChange = (filter) => {
  setSelectedFilter(filter);
 };

 const fetchReservations = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`,
    {
     params: { startDate, endDate },
    }
   );
   const reservationResponse = response.data;
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  if (startDate && endDate) {
   fetchReservations();
  }
 }, [startDate, endDate]);

 const chartRef = useRef(null);
 const [matchedReservations, setMatchedReservations] = useState([]);

 const [bookingDaily, setBookingDaily] = useState({});
 const [bookingWeekly, setBookingWeekly] = useState({});
 const [bookingMonthly, setBookingMonthly] = useState({});
 const [bookingYearly, setBookingYearly] = useState({});

 const [bookingTotalDay, setBookingTotalDay] = useState(0);
 const [bookingTotalWeek, setBookingTotalWeek] = useState(0);
 const [bookingTotalMonth, setBookingTotalMonth] = useState(0);
 const [bookingTotalYear, setBookingTotalYear] = useState(0);

 const [loading, setLoading] = useState(false);

 const [accommodations, setAccommodation] = useState([]);
 const [guests, setGuests] = useState([]);

 const [dailyLabels, setDailyLabels] = useState([]);

 const [weeklyLabels, setWeeklyLabels] = useState([]);

 const updateBarChart = async () => {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   const reservationResponse = response.data;

   const responseAccommodation = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   const accommodationResponse = responseAccommodation.data;
   setAccommodation(accommodationResponse);

   const guestsResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   const responseGuests = guestsResponse.data;
   setGuests(responseGuests);

   let startDate, endDate;
   let now;

   if (selectedCreatedAtDate) {
    now = selectedCreatedAtDate;
   } else {
    now = today;
   }

   const generateWeeksArray = (startDate) => {
    const weeks = [];
    let currentDate = new Date(startDate);
    let currentWeek = 1;

    // Generate labels for four weeks
    for (let i = 0; i < 4; i++) {
     const weekStartDate = new Date(currentDate);
     const weekEndDate = new Date(currentDate);

     // Calculate the end of the week (next Saturday)
     weekEndDate.setDate(weekEndDate.getDate() + (6 - weekEndDate.getDay()));

     // Format the dates
     const formattedStartDate = weekStartDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
     });
     const formattedEndDate = weekEndDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
     });

     weeks.push(
      `Week${currentWeek}: ${formattedStartDate}-${formattedEndDate}`
     );

     // Move to the next week
     currentDate = new Date(weekEndDate);
     currentDate.setDate(currentDate.getDate() + 1);
     currentWeek++;
    }

    return weeks;
   };

   {
    /** Filter */
   }
   if (selectedFilter === "daily") {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - ((now.getDay() + 7) % 7)); // Set to Sunday
    endDate = new Date(now);
    endDate.setDate(now.getDate() + (6 - now.getDay())); // End of the week (Saturday);

    const labels = [];
    const currentDate = new Date(startDate);
    const options = { weekday: "short", month: "short", day: "numeric" };

    while (currentDate <= endDate) {
     const formattedDate = currentDate.toLocaleDateString("en-US", options);
     labels.push(formattedDate);
     currentDate.setDate(currentDate.getDate() + 1);
    }

    setDailyLabels(labels);
   } else if (selectedFilter === "weekly") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month

    // Find the first Sunday of the month
    while (startDate.getDay() !== 0) {
     // 0 represents Sunday
     startDate.setDate(startDate.getDate() + 1);
    }

    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of the current month

    // Find the last Saturday of the month
    while (endDate.getDay() !== 6) {
     // 6 represents Saturday
     endDate.setDate(endDate.getDate() - 1);
    }

    // Calculate the number of weeks
    const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week
    const numberOfWeeks = Math.ceil(
     (endDate - startDate) / millisecondsInAWeek
    );

    const weeksArray = generateWeeksArray(startDate, endDate);
    setWeeklyLabels(weeksArray);
   } else if (selectedFilter === "monthly") {
    startDate = new Date(now.getFullYear(), 0, 1); // Start of the current year (January 1)
    endDate = new Date(now.getFullYear(), 11, 31);
   } else if (selectedFilter === "yearly") {
    const currentYear = now.getFullYear();
    startDate = new Date(currentYear - 2, 0, 1); // Two years before the current year
    endDate = new Date(currentYear + 2, 11, 31); // Two years after the current year
   }

   const bookingDaily = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
   };

   const bookingWeekly = {
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
   };

   const bookingMonthly = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
   };

   const bookingYearly = {};

   const currentYear = new Date().getFullYear();

   for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    bookingYearly[year] = 0;
   }

   const getWeekNumber = (date) => {
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil(dayOfMonth / 7);
    return `Week${weekNumber}`;
   };

   const matching = new Set();
   startDate.setHours(0, 0, 0, 0);
   endDate.setHours(0, 0, 0, 0);

   reservationResponse.forEach((reservation) => {
    const reservationCreatedAt = new Date(reservation.created_at);
    const dayOfWeek = getDayName(reservationCreatedAt.getDay());
    const currentWeek = getWeekNumber(reservationCreatedAt);
    const monthFullName = getMonthFullName(reservationCreatedAt.getMonth());
    const year = reservationCreatedAt.getFullYear();

    

    reservationCreatedAt.setHours(0, 0, 0, 0);

    if (selectedFilter === "daily") {
     if (reservationCreatedAt >= startDate && reservationCreatedAt <= endDate) {
      matching.add(reservation);
      bookingDaily[dayOfWeek]++;
     }
    } else if (selectedFilter === "weekly") {
     if (reservationCreatedAt >= startDate && reservationCreatedAt <= endDate) {
      bookingWeekly[currentWeek]++;
      matching.add(reservation);
     }
    } else if (selectedFilter === "monthly") {
     if (reservationCreatedAt >= startDate && reservationCreatedAt <= endDate) {
      bookingMonthly[monthFullName]++;
      matching.add(reservation);
     }
    } else if (selectedFilter === "yearly") {
     if (reservationCreatedAt >= startDate && reservationCreatedAt <= endDate) {
      bookingYearly[year]++;
      matching.add(reservation);
     }
    }
   });

   setMatchedReservations(matching);

   setBookingDaily(bookingDaily);
   setBookingWeekly(bookingWeekly);
   setBookingMonthly(bookingMonthly);
   setBookingYearly(bookingYearly);

   const bookingTotalDay = Object.values(bookingDaily).reduce(
    (total, count) => total + count,
    0
   );
   setBookingTotalDay(bookingTotalDay);
   const bookingTotalWeek = Object.values(bookingWeekly).reduce(
    (total, count) => total + count,
    0
   );
   setBookingTotalWeek(bookingTotalWeek);
   const bookingTotalMonth = Object.values(bookingMonthly).reduce(
    (total, count) => total + count,
    0
   );
   setBookingTotalMonth(bookingTotalMonth);
   const bookingTotalYear = Object.values(bookingYearly).reduce(
    (total, count) => total + count,
    0
   );
   setBookingTotalYear(bookingTotalYear);
  } catch (error) {
   console.error(error);
   setLoading(false);
  }
  setLoading(false);
 };

 useEffect(() => {
  updateBarChart();
 }, [selectedFilter, startDate, endDate, selectedCreatedAtDate]); // Include selectedFilter, startDate, and endDate as dependencies

 const getDayName = (dayOfWeek) => {
  const days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
  ];
  return days[dayOfWeek];
 };

 const getMonthFullName = (month) => {
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
  return months[month];
 };

 const getYearlyLabels = () => {
  const currentYear = new Date().getFullYear();
  const labels = [];

  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
   labels.push(year.toString());
  }

  return labels;
 };
 const totalGuests = (() => {
  if (!loading) {
   if (bookingTotalDay !== 0) {
    return bookingTotalDay;
   }
   if (bookingTotalWeek !== 0) {
    return bookingTotalWeek;
   }
   if (bookingTotalMonth !== 0) {
    return bookingTotalMonth;
   }
   if (bookingTotalYear !== 0) {
    return bookingTotalYear;
   }
  }
  return null;
 })();

 const [totalBookingsThisWeek, setTotalBookingsThisWeek] = useState(0);

 function formatDatetbl(dateString) {
  if (!dateString) {
   return ""; // Handle cases where the date string is empty or undefined
  }

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  // Ensure that day and month have two digits by prepending '0' if necessary
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
 }

 useEffect(() => {
  if (chartRef.current) {
   chartRef.current.destroy();
  }

  const data = {
   labels: (() => {
    if (selectedFilter === "daily") {
     return formatDailyLabels;
    } else if (selectedFilter === "weekly") {
     return formatWeeklyLabels;
    } else if (selectedFilter === "monthly") {
     return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
     ];
    } else if (selectedFilter === "yearly") {
     return getYearlyLabels();
    }
   })(),
   datasets: [
    {
     label: "Total Bookings",
     data: (() => {
      if (selectedFilter === "daily") {
       return Object.values(bookingDaily);
      } else if (selectedFilter === "weekly") {
       return Object.values(bookingWeekly);
      } else if (selectedFilter === "monthly") {
       return Object.values(bookingMonthly);
      } else if (selectedFilter === "yearly") {
       return Object.values(bookingYearly);
      }
     })(),
     backgroundColor: "rgba(128, 162, 118, 0.77)", // Bar fill color
     borderColor: "rgba(122, 193, 78, 0.77)", // Border color
     borderWidth: 1,
    },
   ],
  };

  const config = {
   type: "bar",
   data: data,
   options: {
    devicePixelRatio: 2,
    scales: {
     y: {
      beginAtZero: true,
      ticks: {
       callback: function (value) {
        if (Number.isInteger(value)) {
         return value;
        }
        return "";
       },
      },
     },
    },
   },
  };

  // Get the canvas element and initialize the chart
  const ctx = document.getElementById("bookingBarChart").getContext("2d");
  chartRef.current = new Chart(ctx, config);
 }, [
  bookingDaily,
  bookingWeekly,
  bookingMonthly,
  bookingYearly,
  selectedFilter,
  totalGuests,
 ]); // Update the chart whenever any of these values change

 const handleDownloadPDF = () => {
  if (loading) {
   // Data is still loading, don't generate the PDF
   return;
  }

  const chartName = "BOOKINGS DAILY";
  const reportMadeAt = "Made At";
  const chartSpecifics = "Filter";
  const chartSpecifics2 = "Date";
  const chartSpecifics3 = "Total Bookings";

  const capitalizedFilter =
   selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);
  const createdDate = selectedCreatedAtDate.toLocaleDateString("en-US", {
   year: "numeric",
   month: "long",
   day: "numeric",
  });
  const todayDate = today.toLocaleDateString("en-US", {
   year: "numeric",
   month: "long",
   day: "numeric",
  });
  const totalGuest = totalGuests || "N/A"; // Use 'N/A' if totalGuests is null

  // Create a new PDF document with A4 paper size in millimeters
  const pdf = new jsPDF({
   orientation: "portrait",
   unit: "mm",
   format: "a4",
  });

  pdf.setFontSize(14);
  pdf.text(chartName, 10, 10); // Add the chart name as text to the PDF
  pdf.setFontSize(12);
  pdf.text(`${reportMadeAt}: ${todayDate}`, 140, 10);
  pdf.setFontSize(10);

  // Add the combined label to the PDF
  pdf.text(`${chartSpecifics}: ${capitalizedFilter}`, 10, 20);
  pdf.text(`${chartSpecifics2}: ${createdDate}`, 10, 30);
  pdf.text(`${chartSpecifics3}: ${totalGuest}`, 10, 40);

  // Convert the chart canvas to an image and add it to the PDF
  const chartEl = document.getElementById("bookingBarChart");
  const chartImage = chartEl.toDataURL("image/png");
  pdf.addImage(chartImage, "PNG", 10, 50, 190, 80);

  const tableStartY = 150;

  // Create a table from the HTML table element and add it to the PDF
  const tableEl = document.getElementById("tblReservationGuests");
  // Define custom styles for table headers
  const tableOptions = {
   startY: tableStartY,
   html: tableEl,
   headStyles: {
    fillColor: [79, 115, 68], // Green color for the header background
    textColor: [255, 255, 255], // White color for the header text
   },
  };

  // Add the subsequent table to the PDF
  pdf.autoTable(tableOptions);

  pdf.save("BookingGuestsSummaryReport.pdf");
 };

 const memoizedGetAccommodationName = useMemo(() => {
  const getAccommodationName = (accommodationId) => {
   const matchingAccommodation = accommodations.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );

   return matchingAccommodation
    ? matchingAccommodation.room_name
    : "Unknown Room";
  };

  return getAccommodationName;
 }, [accommodations]);

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

 const formatWeeklyLabels = weeklyLabels.map((label) => {
  const parts = label.split(": "); // Split the label into parts
  const dateRange = parts[1]; // Extract the date range
  const weekNumber = parts[0]; // Extract the week number
  return [dateRange]; // Create the desired format
 });

 const formatDailyLabels = dailyLabels.map((label) => {
  const parts = label.split(", "); // Split the label into parts
  const weekName = parts[1]; // Extract the date range
  const date = parts[0]; // Extract the week number
  return [weekName, date]; // Create the desired format
 });

 return (
  <div className="bg-white p-6">
   <div className="flex justify-between items-center ">
    <h3 className="text-lg font-bold tracking-widest uppercase text-black">
     Total Bookings: &nbsp;
     {!loading ? (
      <>
       {totalGuests !== null ? <span>{totalGuests}</span> : <span>N/A</span>}
      </>
     ) : (
      <i className="fa-spin fa-solid fa-spinner" />
     )}
    </h3>

    <button
     className=" h-10 w-10 rounded-md justify-end bg-forestgreen-100 hover:bg-black text-white transition ease-in-out duration-.3s"
     onClick={handleDownloadPDF}
    >
     <FontAwesomeIcon icon={faDownload} />
    </button>
   </div>

   <div className="flex  bg-white py-6 ">
    <button
     className={`mr-2 rounded-full px-3 ${
      selectedFilter === "daily" ? "bg-green-500 text-white" : "bg-gray-300"
     }`}
     onClick={() => handleFilterChange("daily")}
    >
     Daily
    </button>

    <button
     className={`mr-2 rounded-full px-3 ${
      selectedFilter === "weekly" ? "bg-green-500 text-white" : "bg-gray-300"
     }`}
     onClick={() => handleFilterChange("weekly")}
    >
     Weekly
    </button>
    <button
     className={`mr-2 rounded-full px-3 ${
      selectedFilter === "monthly" ? "bg-green-500 text-white" : "bg-gray-300"
     }`}
     onClick={() => handleFilterChange("monthly")}
    >
     Monthly
    </button>
    <button
     className={`mr-2 rounded-full px-3 ${
      selectedFilter === "yearly" ? "bg-green-500 text-white" : "bg-gray-300"
     }`}
     onClick={() => handleFilterChange("yearly")}
    >
     Yearly
    </button>

    <div className="flex items-end space-x-2 ml-auto">
     <ReactDatePicker
      style={{ cursor: "pointer" }}
      id="checkInDate"
      placeholderText="Created At"
      dateFormat="MMMM d y" // Set the date format
      className="transition duration-300 ease-in-out bg-white py-1 shadow-md border-2 uppercase border-gray-400 rounded-md w-36 text-center  tracking-wide text-sm cursor-default" // Adjust the styling as needed
      selected={selectedCreatedAtDate}
      onSelect={handleCreatedAtChange}
      onChange={handleCreatedAtChange}
      autoComplete="off"
      onFocus={(e) => e.target.blur()}
      tabIndex={-1}
     />
     <div className="flex pl-2 items-center">
      <i
       className="fa-solid fa-redo text-white bg-gray-400 rounded-full cursor-pointer hover:text-forestgreen-600 transition ease-in-out duration-.3s p-2"
       title="Reset Date"
       onClick={() => {
        const today = new Date();
        setSelectedCreatedAtDate(today);
       }}
      />
     </div>
    </div>
   </div>

   <canvas id="bookingBarChart" width="400" height="200"></canvas>

   {/** */}
   <div className="hidden">
    <table className="min-w-full border-collapse" id="tblReservationGuests">
     <thead>
      <tr>
       <th className="py-2 px-3 text-left" colSpan="2">
        Reservation Id and Accommodation
       </th>
       <th className="py-2 px-3 text-left" colSpan="2">
        Guest Name and No. of Guests
       </th>
       <th className="py-2 px-3 text-left" colSpan="3">
        Check In, Check Out
       </th>
       <th className="py-2 px-3 text-left" colSpan="3">
        Created At
       </th>
      </tr>
     </thead>
     <tbody className="text-xs tracking-wider">
      {Array.from(matchedReservations).map((reservation, index) => {
       return (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
         <td colSpan="2" className="py-3 px-3">
          {reservation.reservation_id}{" "}
          {memoizedGetAccommodationName(reservation.accommodation_id)}{" "}
         </td>
         <td colSpan="2" className="py-3 px-3">
          {memoizedGetGuestName(reservation.guest_id)} -{" "}
          {memoizedGetGuestPartySize(reservation.guest_id)}
         </td>
         <td colSpan="3" className="py-3 px-3">
          {formatDatetbl(reservation.check_in_date)} -{" "}
          {formatDatetbl(reservation.check_out_date)}
         </td>

         <td colSpan="3" className="py-3 px-3">
          {formatDatetbl(reservation.created_at)}
         </td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default BookingBarChart;
