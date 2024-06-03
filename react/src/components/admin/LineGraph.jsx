import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Chart from "chart.js/auto";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { jsPDF } from "jspdf";

const LineChart = () => {
 const chartRef = useRef(null);
 const [filter, setFilter] = useState("daily");
 const [partySizeByDayOfWeek, setPartySizeByDayOfWeek] = useState({});
 const [partySizeByWeek, setPartySizeByWeek] = useState({});
 const [partySizeByMonth, setPartySizeByMonth] = useState({});
 const [partySizeByYear, setPartySizeByYear] = useState({});

 const [totalGuestsThisDay, setTotalGuestsThisDay] = useState(0);
 const [totalGuestsThisWeek, setTotalGuestsThisWeek] = useState(0);
 const [totalGuestsThisMonth, setTotalGuestsThisMonth] = useState(0);
 const [totalGuestsThisYears, setTotalGuestsThisYears] = useState(0);

 const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
 };

 const today = new Date();

 const [selectedCreatedAtDate, setSelectedCreatedAtDate] = useState(today);

 const handleCreatedAtChange = (date) => {
  setSelectedCreatedAtDate(date);
 };

 const [matchedReservations, setMatchedReservations] = useState([]);
 const [accommodations, setAccommodation] = useState([]);
 const [guests, setGuests] = useState([]);
 const [totalGuestDay, setTotalGuestDay] = useState(0);

 const [dailyLabels, setDailyLabels] = useState([]);
 const [weeklyLabels, setWeeklyLabels] = useState([]);

 const updateChartData = async () => {
  setLoading(true);

  try {
   const reservationResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   const reservations = reservationResponse.data;

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

   if (!guestInfoById) {
    await fetchGuestInfo();
   }

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

   if (filter === "daily") {
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
   } else if (filter === "weekly") {
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
   } else if (filter === "monthly") {
    startDate = new Date(now.getFullYear(), 0, 1); // Start of the current year (January 1)
    endDate = new Date(now.getFullYear(), 11, 31);
   } else if (filter === "yearly") {
    const currentYear = now.getFullYear();
    startDate = new Date(currentYear - 2, 0, 1); // Two years before the current year
    endDate = new Date(currentYear + 2, 11, 31); // Two years after the current year
   }

   const partySizeByDayOfWeek = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
   };

   const partySizeByMonth = {
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

   const partySizeByYear = {};

   const currentYear = new Date().getFullYear();

   for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    partySizeByYear[year] = 0;
   }

   const partySizeByWeek = {
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
   };

   const getWeekNumber = (date) => {
    const dayOfMonth = date.getDate();
    const weekNumber = Math.ceil(dayOfMonth / 7);
    return `Week${weekNumber}`;
   };

   const matching = new Set();
   let uniqueGuestsForDay = new Set();
   reservations.forEach((reservation) => {
    const reservationCreatedCheckInDate = new Date(reservation.check_in_date);
    const reservationCreatedCheckOutDate = new Date(reservation.check_out_date);
    const dayOfWeek = getDayName(reservationCreatedCheckInDate.getDay());
    const monthFullName = getMonthFullName(
     reservationCreatedCheckInDate.getMonth()
    );
    const year = reservationCreatedCheckInDate.getFullYear();
    const currentWeek = getWeekNumber(reservationCreatedCheckInDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    if (filter === "daily") {
     if (
      reservationCreatedCheckInDate < endDate &&
      reservationCreatedCheckOutDate > reservationCreatedCheckInDate
     ) {
      if (guestInfoById.hasOwnProperty(reservation.guest_id)) {
       const partySize = guestInfoById[reservation.guest_id].party_size;
       // Only add to partySizeByDayOfWeek and matching if the guest hasn't been counted for the day
       if (!uniqueGuestsForDay.has(reservation.guest_id)) {
        partySizeByDayOfWeek[dayOfWeek] += partySize;
        matching.add(reservation);
        uniqueGuestsForDay.add(reservation.guest_id);
       }
      }
     }
    } else if (filter === "weekly") {
     if (
      reservationCreatedCheckInDate >= startDate &&
      reservationCreatedCheckInDate <= endDate
     ) {
      if (!partySizeByWeek.hasOwnProperty(currentWeek)) {
       partySizeByWeek[currentWeek] = 0;
      }

      if (guestInfoById.hasOwnProperty(reservation.guest_id)) {
       const partySize = guestInfoById[reservation.guest_id].party_size;
       partySizeByWeek[currentWeek] += partySize;
       matching.add(reservation);
      }
     }
    } else if (filter === "monthly") {
     if (
      reservationCreatedCheckInDate >= startDate &&
      reservationCreatedCheckInDate <= endDate
     ) {
      if (!partySizeByMonth.hasOwnProperty(monthFullName)) {
       partySizeByMonth[monthFullName] = 0;
      }

      if (guestInfoById.hasOwnProperty(reservation.guest_id)) {
       const partySize = guestInfoById[reservation.guest_id].party_size;
       partySizeByMonth[monthFullName] += partySize;
       matching.add(reservation);
      }
     }
    } else if (filter === "yearly") {
     if (
      reservationCreatedCheckInDate >= startDate &&
      reservationCreatedCheckInDate <= endDate
     ) {
      if (!partySizeByYear.hasOwnProperty(year)) {
       partySizeByYear[year] = 0;
      }

      if (guestInfoById.hasOwnProperty(reservation.guest_id)) {
       const partySize = guestInfoById[reservation.guest_id].party_size;
       partySizeByYear[year] += partySize;
       matching.add(reservation);
      }
     }
    }
   });
   setMatchedReservations(matching);

   setPartySizeByDayOfWeek(partySizeByDayOfWeek);
   setPartySizeByWeek(partySizeByWeek);
   setPartySizeByMonth(partySizeByMonth);
   setPartySizeByYear(partySizeByYear);

   const totalGuests = Object.values(partySizeByDayOfWeek).reduce(
    (total, partySize) => total + partySize,
    0
   );
   setTotalGuestsThisDay(totalGuests);
   const totalGuestsMonth = Object.values(partySizeByMonth).reduce(
    (total, partySize) => total + partySize,
    0
   );
   setTotalGuestsThisMonth(totalGuestsMonth);
   const totalGuestYears = Object.values(partySizeByYear).reduce(
    (total, partySize) => total + partySize,
    0
   );
   setTotalGuestsThisYears(totalGuestYears);
   const totalGuestWeek = Object.values(partySizeByWeek).reduce(
    (total, partySize) => total + partySize,
    0
   );
   setTotalGuestsThisWeek(totalGuestWeek);
  } catch (e) {
   console.error("Error fetching guest data:", e);
   setLoading(false);
  }
  setLoading(false);
 };

 useEffect(() => {
  updateChartData();
 }, [filter, selectedCreatedAtDate]);

 let guestInfoById;

 const [loading, setLoading] = useState(false);

 const fetchGuestInfo = async () => {
  setLoading(true);
  try {
   const responseGuests = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   const guests = responseGuests.data;

   guestInfoById = {};

   guests.forEach((guest) => {
    const guestId = guest.guest_id;
    const partySize = parseInt(guest.party_size, 10);
    guestInfoById[guestId] = {
     guest_id: guestId,
     party_size: partySize,
    };
   });
  } catch (e) {
   console.error("Error fetching guest data:", e);
   setLoading(false);
  }
  setLoading(false);
 };

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

 const getWeekNumber = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayDifference = date.getDate() - firstDayOfMonth.getDate();
  const weekNumber = Math.ceil(
   (dayDifference + firstDayOfMonth.getDay() + 1) / 7
  );
  return weekNumber;
 };

 const getYearlyLabels = () => {
  const currentYear = new Date().getFullYear();
  const labels = [];

  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
   labels.push(year.toString());
  }

  return labels;
 };

 const formatDailyLabels = dailyLabels.map((label) => {
  const parts = label.split(", "); // Split the label into parts
  const weekName = parts[1]; // Extract the date range
  const date = parts[0]; // Extract the week number
  return [weekName, date]; // Create the desired format
 });

 const formatWeeklyLabels = weeklyLabels.map((label) => {
  const parts = label.split(": "); // Split the label into parts
  const dateRange = parts[1]; // Extract the date range
  const weekNumber = parts[0]; // Extract the week number
  return [dateRange]; // Create the desired format
 });

 useEffect(() => {
  if (chartRef.current) {
   chartRef.current.destroy();
  }

  const data = {
   labels: (() => {
    if (filter === "daily") {
     return formatDailyLabels;
    } else if (filter === "weekly") {
     return formatWeeklyLabels;
    } else if (filter === "monthly") {
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
    } else if (filter === "yearly") {
     return getYearlyLabels();
    }
   })(),

   datasets: [
    {
     label: "Guests",
     data: (() => {
      if (filter === "daily") {
       return Object.values(partySizeByDayOfWeek);
      } else if (filter === "weekly") {
       return Object.values(partySizeByWeek);
      } else if (filter === "monthly") {
       return Object.values(partySizeByMonth);
      } else if (filter === "yearly") {
       return Object.values(partySizeByYear);
      }
     })(),
     borderColor: "rgba(0, 128, 0, 0.5)",
     borderWidth: 2,
     fill: true,
    },
   ],
  };

  const config = {
   type: "line",
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

  const ctx = document.getElementById("guestLineChart").getContext("2d");
  chartRef.current = new Chart(ctx, config);
 }, [
  partySizeByDayOfWeek,
  partySizeByYear,
  partySizeByWeek,
  partySizeByMonth,
  filter,
 ]);

 const totalGuestsAll =
  totalGuestsThisDay +
  totalGuestsThisWeek +
  totalGuestsThisMonth +
  totalGuestsThisYears;

 const handleDownloadPDF = () => {
  if (loading) {
   return;
  }

  const chartName = "GUEST REPORT";
  const reportMadeAt = "Made At";
  const chartSpecifics = "Filter";
  const chartSpecifics2 = "Date";
  const chartSpecifics3 = "Total Guests";

  const capitalizedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
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
  const totalGuest = totalGuestsAll; // Use 'N/A' if totalGuests is null

  // Create a new PDF document
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
  const chartEl = document.getElementById("guestLineChart");
  const chartImage = chartEl.toDataURL("image/png");
  pdf.addImage(chartImage, "PNG", 10, 50, 190, 80);

  const tableStartY = 150;

  // Create a table from the HTML table element and add it to the PDF
  const tableEl = document.getElementById("tblReservationGuests2");
  // pdf.autoTable({ html: tableEl, startY: tableStartY });
  // Define custom styles for table headers
  const tableOptions = {
   startY: tableStartY,
   html: tableEl,
   headStyles: {
    fillColor: [79, 115, 68], // Green color for the header background
    textColor: [255, 255, 255], // White color for the header text
   },
  };

  pdf.autoTable(tableOptions);
  pdf.save("GuestSizeSummaryReport.pdf");
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

 const memoeizedGuestContactNumber = useMemo(() => {
  const getSpecialRequest = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.contact_number}` : "N/A";
  };
  return getSpecialRequest;
 }, [guests]);

 const memoeizedGuestEmail = useMemo(() => {
  const getSpecialRequest = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.guest_email}` : "N/A";
  };
  return getSpecialRequest;
 }, [guests]);

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

 const currentUrl = window.location.pathname;
 const isDashboard = currentUrl.includes("/dashboard");

 return (
  <div className="bg-white rounded-md p-8">
   <div className=" flex justify-between items-center">
    <div className="flex items-center ">
     <h3 className="text-lg text-black uppercase font-bold tracking-widest">
      Total Guests: &nbsp;
      {!loading ? (
       <>
        {totalGuestsThisDay !== 0 && <span>{totalGuestsThisDay}</span>}
        {totalGuestsThisWeek !== 0 && <span>{totalGuestsThisWeek}</span>}
        {totalGuestsThisMonth !== 0 && <span>{totalGuestsThisMonth}</span>}
        {totalGuestsThisYears !== 0 && <span>{totalGuestsThisYears}</span>}
        {totalGuestsThisDay === 0 &&
         totalGuestsThisWeek === 0 &&
         totalGuestsThisMonth === 0 &&
         totalGuestsThisYears === 0 && <span>N/A</span>}
       </>
      ) : (
       <i className="fa-spin fa-solid fa-spinner" />
      )}
     </h3>
    </div>
    <div className="ml-auto">
     {!isDashboard && (
      <button
       className="h-10 w-10 rounded-md justify-end bg-forestgreen-100 hover:bg-black text-white transition ease-in-out duration-.3s"
       onClick={handleDownloadPDF}
      >
       <FontAwesomeIcon icon={faDownload} />
      </button>
     )}
    </div>
   </div>

   {/* Filter Buttons Section */}
   <div className=" flex  bg-white py-6">
    <button
     className={`mr-2 rounded-full px-3 ${
      filter === "daily" ? "bg-green-500 text-white" : "bg-gray-100"
     }`}
     onClick={() => handleFilterChange("daily")}
    >
     Daily
    </button>
    <button
     className={`mr-2 rounded-full px-3 ${
      filter === "weekly" ? "bg-green-500 text-white" : "bg-gray-100"
     }`}
     onClick={() => handleFilterChange("weekly")}
    >
     Weekly
    </button>
    <button
     className={`mr-2 rounded-full px-3 ${
      filter === "monthly" ? "bg-green-500 text-white" : "bg-gray-100"
     }`}
     onClick={() => handleFilterChange("monthly")}
    >
     Monthly
    </button>
    <button
     className={`mr-2 rounded-full px-3 ${
      filter === "yearly" ? "bg-green-500 text-white" : "bg-gray-100"
     }`}
     onClick={() => handleFilterChange("yearly")}
    >
     Yearly
    </button>
    {/* Date Picker and Redo Icon */}
    <div className="flex items-end space-x-2 ml-auto">
     <ReactDatePicker
      style={{ cursor: "pointer" }}
      id="checkInDate"
      placeholderText="Created At"
      dateFormat="MMMM d y" // Set the date format
      className="transition duration-300 ease-in-out bg-white uppercase py-1 shadow-md border-2 border-black rounded-md w-40 text-center text-sm cursor-default" // Adjust the styling as needed
      selected={selectedCreatedAtDate}
      onSelect={handleCreatedAtChange}
      onChange={handleCreatedAtChange}
      autoComplete="off"
      onFocus={(e) => e.target.blur()}
      tabIndex={-1}
     />
     <i
      className="fa-solid fa-redo cursor-pointer rounded-full p-2 bg-gray-400 text-white hover:text-forestgreen-600 transition ease-in-out duration-.3s pl-2"
      title="Reset Date"
      onClick={() => {
       const today = new Date();
       setSelectedCreatedAtDate(today);
      }}
     />
    </div>
   </div>

   {/* Rest of the Content */}
   <div className="  ">
    <canvas id="guestLineChart" width="400" height="200"></canvas>
   </div>

   {/* Table Section */}
   <div className="hidden">
    <table className="min-w-full border-collapse" id="tblReservationGuests2">
     <thead>
      <tr>
       <th className="py-2 px-3 text-left">Reservation Id and Accommodation</th>
       <th className="py-2 px-3 text-left">Guest Name and No. of Guests</th>
       <th className="py-2 px-3 text-left">Contact Details</th>
       <th className="py-2 px-3 text-left">Check In - Check Out</th>
       <th className="py-2 px-3 text-left">Special Request</th>
       <th className="py-2 px-3 text-left">Created At</th>
      </tr>
     </thead>
     <tbody className="text-xs tracking-wider">
      {Array.from(matchedReservations).map((reservation, index) => {
       return (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
         <td className="py-3 px-3">
          {reservation.reservation_id}{" "}
          {memoizedGetAccommodationName(reservation.accommodation_id)}{" "}
         </td>
         <td className="py-3 px-3">
          {memoizedGetGuestName(reservation.guest_id)} -{" "}
          {memoizedGetGuestPartySize(reservation.guest_id)}
         </td>
         <td className="py-3 px-3">
          {memoeizedGuestContactNumber(reservation.guest_id)} -{" "}
          {memoeizedGuestEmail(reservation.guest_id)}
         </td>
         <td className="py-3 px-3">
          {formatDatetbl(reservation.check_in_date)} -{" "}
          {formatDatetbl(reservation.check_out_date)}
         </td>
         <td>
          {reservation.special_request ? reservation.special_request : "None"}
         </td>
         <td className="py-3 px-3">{formatDatetbl(reservation.created_at)}</td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default LineChart;
