import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactDatePicker from "react-datepicker";

const FinancialReport = () => {
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

 const fetchPayments = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`,
    {
     params: { startDate, endDate },
    }
   );
   const payments = response.data;
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  if (startDate && endDate) {
   fetchPayments();
  }
 }, [startDate, endDate, selectedCreatedAtDate]);

 const chartRef = useRef(null);

 const [paymentDaily, setPaymentDaily] = useState({});
 const [paymentWeekly, setPaymentWeekly] = useState({});
 const [paymentMonthly, setPaymentMonthly] = useState({});
 const [paymentYearly, setPaymentYearly] = useState({});

 const [totalDaily, setTotalDaily] = useState(0);
 const [totalWeekly, setTotalWeekly] = useState(0);
 const [totalMonthly, setTotalMonthly] = useState(0);
 const [totalYearly, setTotalYearly] = useState(0);

 const [loading, setLoading] = useState(false);

 const [matchedPayments, setMatchedPayments] = useState([]);
 const [accommodations, setAccommodation] = useState([]);
 const [guests, setGuests] = useState([]);
 const [reservations, setReservation] = useState([]);

 const [dailyLabels, setDailyLabels] = useState([]);
 const [weeklyLabels, setWeeklyLabels] = useState([]);

 const updateBarChart = async () => {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`
   );
   const paymentsFilter = response.data.filter(
    (payment) => payment.payment_status !== "failed"
   );
   const paymentResponse = paymentsFilter;

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

   const reservationResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reservation`
   );
   const responseReservation = reservationResponse.data;
   setReservation(responseReservation);

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

   let startDate, endDate; // Declare with 'let
   {
    /**Filter */
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

   const paymentDaily = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
   };

   const paymentWeekly = {
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

   const paymentMonthly = {
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

   const paymentYearly = {};

   const currentYear = new Date().getFullYear();

   const matching = new Set();

   for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    paymentYearly[year] = 0;
   }

   paymentResponse.forEach((payment) => {
    const paymentCreatedAt = new Date(payment.created_at);
    const dayOfWeek = getDayName(paymentCreatedAt.getDay());
    const monthFullName = getMonthFullName(paymentCreatedAt.getMonth());
    const year = paymentCreatedAt.getFullYear();
    const currentWeek = getWeekNumber(paymentCreatedAt);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    if (
     selectedFilter === "daily" &&
     paymentCreatedAt.setHours(0, 0, 0, 0) >= startDate &&
     paymentCreatedAt.setHours(0, 0, 0, 0) <= endDate
    ) {
     const amount = parseInt(payment.total_amount, 10);
     paymentDaily[dayOfWeek] += amount;
     matching.add(payment);
    } else if (
     selectedFilter === "weekly" &&
     paymentCreatedAt >= startDate &&
     paymentCreatedAt <= endDate
    ) {
     const amount = parseInt(payment.total_amount, 10);
     paymentWeekly[currentWeek] += amount;
     matching.add(payment);
    } else if (
     selectedFilter === "monthly" &&
     paymentCreatedAt >= startDate &&
     paymentCreatedAt <= endDate
    ) {
     const amount = parseInt(payment.total_amount, 10);
     paymentMonthly[monthFullName] += amount;
     matching.add(payment);
    } else if (
     selectedFilter === "yearly" &&
     paymentCreatedAt >= startDate &&
     paymentCreatedAt <= endDate
    ) {
     const amount = parseInt(payment.total_amount, 10);
     paymentYearly[year] += amount;
     matching.add(payment);
    }
   });
   setMatchedPayments(matching);
   // Now, paymentDaily object contains the sum of total_amount for each day within the date range

   {
    /**SEt them Data */
   }
   setPaymentDaily(paymentDaily);
   setPaymentWeekly(paymentWeekly);
   setPaymentMonthly(paymentMonthly);
   setPaymentYearly(paymentYearly);

   const totalDaily = Object.values(paymentDaily).reduce(
    (total, amount) => total + amount,
    0
   );
   const totalWeekly = Object.values(paymentWeekly).reduce(
    (total, amount) => total + amount,
    0
   );
   const totalMonthly = Object.values(paymentMonthly).reduce(
    (total, amount) => total + amount,
    0
   );
   const totalYearly = Object.values(paymentYearly).reduce(
    (total, amount) => total + amount,
    0
   );

   setTotalDaily(totalDaily);
   setTotalWeekly(totalWeekly);
   setTotalMonthly(totalMonthly);
   setTotalYearly(totalYearly);
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

 const [totalBookingsThisWeek, setTotalBookingsThisWeek] = useState(0);

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
     label: "Earnings",
     data: (() => {
      if (selectedFilter === "daily") {
       return Object.values(paymentDaily);
      } else if (selectedFilter === "weekly") {
       return Object.values(paymentWeekly);
      } else if (selectedFilter === "monthly") {
       return Object.values(paymentMonthly);
      } else if (selectedFilter === "yearly") {
       return Object.values(paymentYearly);
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
  const ctx = document.getElementById("financialChart").getContext("2d");
  chartRef.current = new Chart(ctx, config);
 }, [
  paymentDaily,
  paymentWeekly,
  paymentMonthly,
  paymentYearly,
  selectedFilter,
 ]); // Update the chart whenever any of these values change

 const totalPaymentString =
  totalDaily + totalMonthly + totalWeekly + totalYearly;
 const locale = "en-PH";

 const totalPayments = parseFloat(totalPaymentString);

 const formattedTotalPayment = totalPayments.toLocaleString(locale, {
  minimumFractionDigits: 2, // Specify the minimum number of decimal places
  maximumFractionDigits: 2, // Specify the maximum number of decimal places
 });

 const handleDownloadPDF = () => {
  if (loading) {
   return;
  }

  const chartName = "FINANCIAL REPORT";
  const reportMadeAt = "Made At";
  const chartSpecifics = "Filter";
  const chartSpecifics2 = "Date";
  const chartSpecifics3 = "Total Earnings";

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

  const totalPayment = `PHP ${formattedTotalPayment}` || "N/A"; // Use 'N/A' if formattedTotalPayment is falsy

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
  pdf.text(`${chartSpecifics3}: ${totalPayment}`, 10, 40); // Use 'totalPayment' here

  // Convert the chart canvas to an image and add it to the PDF
  const chartEl = document.getElementById("financialChart");
  const chartImage = chartEl.toDataURL("image/png");
  pdf.addImage(chartImage, "PNG", 10, 50, 190, 80);

  const tableStartY = 150;

  // Create a table from the HTML table element and add it to the PDF
  const tableEl = document.getElementById("tblPayments");
  pdf.autoTable({ html: tableEl, startY: tableStartY });
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
  // Save the PDF with both chart and table
  pdf.save("EarningsFinancialReport.pdf");
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
   const guestIdAsInt = parseInt(guestId); // Parse payment.guest_id to an integer here
   const guest = guests.find((guest) => guest.guest_id === guestIdAsInt);
   return guest ? `${guest.first_name} ${guest.last_name}` : "Unknown Guest";
  };
  return getGuestName;
 }, [guests]);

 const memoeizedGuestContactNumber = useMemo(() => {
  const getSpecialRequest = (guestId) => {
   const guest = guests.find((guest) => guest.guest_id === guestId);
   return guest ? `${guest.contact_number}` : "N/A";
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

 const getRoomNameFromReservation = (reservationId) => {
  // Find the reservation with the matching reservationId
  const selectedReservation = reservations.find(
   (reservation) => reservation.reservation_id === reservationId
  );

  if (selectedReservation) {
   // Extract the accommodation_id from the selectedReservation
   const accommodationId = selectedReservation.accommodation_id;

   // Find the accommodation with the matching accommodationId
   const accommodation = accommodations.find(
    (accommodation) => accommodation.accommodation_id === accommodationId
   );

   if (accommodation) {
    return accommodation.room_name;
   }
  }

  // If no matching reservation or accommodation is found, return a default value
  return "Unknown Room";
 };

 return (
  <div className="bg-white p-8">
   <div className="flex justify-between">
    <h3 className="text-lg font-bold tracking-widest uppercase text-black mb-4">
     Total: <i className="fa-solid fa-peso-sign" />
     {!loading ? (
      <>
       {totalDaily !== 0 && (
        <span>
         {totalDaily.toLocaleString("en-PH", {
          style: "decimal",
         })}
        </span>
       )}

       {totalWeekly !== 0 && (
        <span>
         {totalWeekly.toLocaleString("en-PH", {
          style: "decimal",
         })}
        </span>
       )}

       {totalMonthly !== 0 && (
        <span>
         {totalMonthly.toLocaleString("en-PH", {
          style: "decimal",
         })}
        </span>
       )}

       {totalYearly !== 0 && (
        <span>
         {totalYearly.toLocaleString("en-PH", {
          style: "decimal",
         })}
        </span>
       )}

       {totalDaily === 0 &&
        totalWeekly === 0 &&
        totalMonthly === 0 &&
        totalYearly === 0 && <span> N/A </span>}
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

   <div className="flex mb-2 bg-white p-4">
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
      className="transition duration-300 ease-in-out bg-white py-1 shadow-md uppercase border-2 border-gray-400 rounded-md w-40 text-center  text-sm cursor-default" // Adjust the styling as needed
      selected={selectedCreatedAtDate}
      onSelect={handleCreatedAtChange}
      onChange={handleCreatedAtChange}
      autoComplete="off"
      onFocus={(e) => e.target.blur()}
      tabIndex={-1}
     />

     <i
      className="fa-solid fa-redo text-white p-2 rounded-full bg-gray-400 hover:text-forestgreen-600 transition ease-in-out duration-.3s pl-2"
      title="Reset Date"
      onClick={() => {
       const today = new Date();
       setSelectedCreatedAtDate(today);
      }}
     />
    </div>
   </div>

   <canvas id="financialChart" width="400" height="200"></canvas>

   {/**Table */}
   <div className="hidden">
    <table className="min-w-full border-collapse" id="tblPayments">
     <thead>
      <tr>
       <th className="py-2 px-3 text-left">Payment ID</th>
       <th className="py-2 px-3 text-left">Guest Name - Accommodation</th>
       <th className="py-2 px-3 text-left">Payment Mode & Status</th>
       <th className="py-2 px-3 text-left">Amount</th>
       <th className="py-2 px-3 text-left">Created At</th>
      </tr>
     </thead>
     <tbody className="text-xs tracking-wider">
      {Array.from(matchedPayments).map((payment, index) => {
       return (
        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
         <td className="py-3 px-3">{payment.reservation_id} </td>
         <td className="py-3 px-3">
          {memoizedGetGuestName(payment.guest_id)} -{" "}
          {getRoomNameFromReservation(payment.reservation_id)}{" "}
         </td>
         <td className="py-3 px-3">
          {payment.payment_mode.charAt(0).toUpperCase() +
           payment.payment_mode.slice(1)}
          - {payment.payment_status}
         </td>
         <td className="py-3 px-3">
          {" "}
          PHP{" "}
          {parseFloat(payment.total_amount).toLocaleString("en-PH", {
           currency: "PHP",
          })}{" "}
         </td>
         <td className="py-3 px-3">{formatDatetbl(payment.created_at)}</td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default FinancialReport;
