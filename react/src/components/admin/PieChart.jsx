import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";

const PieChart = () => {
 const [selectedFilter, setSelectedFilter] = useState("all");
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);

 const handleFilterChange = (filter) => {
  setSelectedFilter(filter);
 };

 const [accommodations, setAccommodation] = useState([]);
 const [reservation, setReservations] = useState({});

 const [accommodationName, setAccommodationName] = useState([]);
 const [mostBooked, setMostBooked] = useState({
  accommodationId: null,
  bookingCount: 0,
 });

 const [leastBook, setLeastBooked] = useState({
  accommodationId: null,
  bookingCount: 0,
 });

 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const [selectedCreatedAtDate, setSelectedCreatedAtDate] = useState(today);

 const handleCreatedAtChange = (date) => {
  setSelectedCreatedAtDate(date);
 };

 const fetchAllAccommodation = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   return response;
  } catch (error) {
   console.error(error);
   // If there's an error, you can choose to return null or handle it differently
   return null;
  }
 };

 useEffect(() => {
  const fetchData = async () => {
   const response = await fetchAllAccommodation();
   if (response) {
    const accommodationResponse = response.data;
    // Extract and store room_name and accommodation_id in the accommodationName state
    const accommodationNames = accommodationResponse.map((accommodation) => {
     return {
      room_name: accommodation.room_name,
      accommodation_id: accommodation.accommodation_id,
     };
    });
    setAccommodation(accommodationNames);
    setAccommodationName(accommodationNames);

    // Log the room names
    accommodationNames.forEach((accommodation) => {});
   }
  };

  fetchData();
 }, []);

 const [reservations, setAllReservations] = useState([]);
 const [reservationBookCount, setReservationBookCount] = useState({});
 const [loading, setLoading] = useState(false);
 const fetchReservations = async () => {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/filter_failed`
   );
   setAllReservations(response.data);
   const reservations = response.data;
   let now;

   if (response.data) {
    const bookingCounts = {};
    accommodationName.forEach((accommodation) => {
     bookingCounts[accommodation.accommodation_id] = 0;
    });

    let maxBookingCount = 0;
    let mostBookedAccommodationId = null;

    reservations.forEach((reservation) => {
     const reservationCreatedAt = new Date(reservation.created_at);
     const accommodationId = reservation.accommodation_id;

     if (reservationCreatedAt) {
      bookingCounts[accommodationId] += 1;
     }
    });

    Object.entries(bookingCounts).forEach(([accommodationId, count]) => {
     if (count > maxBookingCount) {
      maxBookingCount = count;
      mostBookedAccommodationId = accommodationId;
     }
    });
    let minBookingCount = Infinity;
    let leastBookedAccommodationId = null;

    setReservationBookCount(bookingCounts);
    Object.entries(bookingCounts).forEach(([accommodationId, count]) => {
     if (count < minBookingCount) {
      minBookingCount = count;
      leastBookedAccommodationId = accommodationId;
     }
    });
    setLeastBooked({
     accommodationId: leastBookedAccommodationId,
     bookingCount: minBookingCount,
    });

    setMostBooked({
     accommodationId: mostBookedAccommodationId,
     bookingCount: maxBookingCount,
    });
   }
  } catch (error) {
   console.error(error);
   setLoading(false);
  }
  setLoading(false);
 };

 useEffect(() => {
  fetchReservations();
 }, [reservationBookCount, reservations]);

 useEffect(() => {}, []);
 // Define a palette with 5 pastel brown and 5 pastel green shades
 const pastelBrownShades = [
  "#D4A5A5",
  "#C7B29B",
  "#BBA392",
  "#AEA689",
  "#A19A80",
 ];

 const pastelGreenShades = [
  "#ACD8AA",
  "#B5D1AE",
  "#BEDBAD",
  "#C7D4B1",
  "#CFDCB5",
 ];

 // Combine the two palettes to create a 10-color palette
 const bohoPalette = [...pastelBrownShades, ...pastelGreenShades];

 const labels = accommodationName.map(
  (accommodation) => accommodation.room_name
 );

 const dataValues = Object.values(reservationBookCount);
 // Dummy data for the pie chart
 const data = {
  labels: labels,
  datasets: [
   {
    data: dataValues, // Example data values for each label
    backgroundColor: bohoPalette, // Use the 10-color palette
    borderRadius: 5, // Make the pie chart circular
   },
  ],
 };

 const options = {
  devicePixelRatio: 2,
  legend: {
   display: false,
  },
  title: {
   display: true,
   text: "Occupancy Report",
   fontSize: 16,
   padding: 10,
  },
  scales: {
   x: {
    display: false,
   },
   y: {
    display: false,
   },
  },
  maintainAspectRatio: false,
  plugins: {
   legend: {
    position: "left",
   },
   datalabels: {
    color: "#333",
    anchor: "end",
    align: "end",
    offset: 10,
    font: {
     size: 12,
    },
    formatter: (value, context) => {
     return `${context.chart.data.labels[context.dataIndex]}: ${value}%`;
    },
   },
  },
 };

 // Define the CSS style for the div element
 const chartStyle = {
  margin: "0",
  height: "600px",
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

 const pdfAccommodationNameMost = memoizedGetAccommodationName(
  parseInt(mostBooked.accommodationId)
 );
 const pdfAccommodationNameLeast = memoizedGetAccommodationName(
  parseInt(leastBook.accommodationId)
 );

 const handleDownloadPDF = () => {
  if (loading) {
   return;
  }

  const chartName = "Accommodation Occupany Report";
  const reportMadeAt = "Made At";
  const chartSpecifics = "Filter";
  const chartSpecifics2 = "Date";
  const chartSpecifics3 = "Most Booked Room";
  const chartSpecifics4 = "Least Booked Room";

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

  const mostBooked2 = mostBooked.bookingCount || "0"; // Use 'N/A' if formattedTotalPayment is falsy
  const leastBooked = leastBook.bookingCount || "0";

  const most = pdfAccommodationNameMost;
  const least = pdfAccommodationNameLeast;

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
  pdf.text(`${chartSpecifics2}: ${createdDate}`, 10, 25);
  pdf.text(`${chartSpecifics3}: ${mostBooked2} ${most}`, 10, 30);
  pdf.text(`${chartSpecifics4}: ${leastBooked} ${least}`, 10, 35);

  // Convert the chart canvas to an image and add it to the PDF
  const chartEl = document.getElementById("pieChartMostBooked");
  const chartImage = chartEl.toDataURL("image/png");
  const chartWidth = 180; // Adjust as needed
  const chartHeight = (chartEl.clientHeight / chartEl.clientWidth) * chartWidth;

  pdf.addImage(chartImage, "PNG", 20, 35, chartWidth, chartHeight);

  const tableStartY = 170;

  // Create a table from the HTML table element and add it to the PDF
  // Create a table from the HTML table element and add it to the PDF
  const tableEl = document.getElementById("tblPieChart");

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
  pdf.save("OccupancyReport.pdf");
 };

 return (
  <div className="bg-white h-130 p-8">
   <div className="flex justify-between">
    <div>
     <div className=" text-lg font-bold tracking-widest uppercase text-black ">
      Top Booked:{" "}
      {memoizedGetAccommodationName(parseInt(mostBooked.accommodationId))}{" "}
      <span className="text-white bg-forestgreen-50 rounded-md px-2 ">
       {mostBooked.bookingCount}
      </span>
     </div>

     <div className=" text-lg font-bold tracking-widest uppercase text-black ">
      Bottom Booked:{" "}
      {memoizedGetAccommodationName(parseInt(leastBook.accommodationId))}{" "}
      <span className="text-white bg-forestgreen-50 rounded-md px-2 ">
       {" "}
       {leastBook.bookingCount}{" "}
      </span>
     </div>
    </div>

    <div className="hidden ">
     <table className="min-w-full  border-collapse" id="tblPieChart">
      <thead>
       <tr>
        <th className="py-2 px-3 text-left">Accommodation Name</th>
        <th className="py-2 px-3 text-left">No. of times Booked</th>
       </tr>
      </thead>
      <tbody className="text-sm tracking-wider">
       {Object.entries(reservationBookCount).map(
        ([accommodationId, bookingCount], index) => (
         <tr
          key={index}
          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
         >
          <td>{memoizedGetAccommodationName(parseInt(accommodationId))}</td>
          <td>{bookingCount}</td>
         </tr>
        )
       )}
      </tbody>
     </table>
    </div>

    <button
     className=" h-10 w-10 rounded-md justify-end bg-forestgreen-100 hover:bg-black text-white transition ease-in-out duration-.3s"
     onClick={handleDownloadPDF}
    >
     <FontAwesomeIcon icon={faDownload} />
    </button>
   </div>

   {/* <div className="flex  bg-white pt-3">
      <button
          className={`mr-2 rounded-full px-3 ${selectedFilter === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilterChange('daily')}
        >
          Today
        </button>

        <button
          className={`mr-2 rounded-full px-3 ${selectedFilter === 'weekly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilterChange('weekly')}
        >
          Weekly
        </button>
        <button
          className={`mr-2 rounded-full px-3 ${selectedFilter === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilterChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`mr-2 rounded-full px-3 ${selectedFilter === 'yearly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilterChange('yearly')}
        >
          Yearly
        </button>
        <button
          className={`mr-2 rounded-full px-3 ${selectedFilter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
      </div>

      <div>
                <ReactDatePicker
                  style={{ cursor: 'pointer' }}
                  id="checkInDate"
                  placeholderText='Created At'
                  dateFormat="MMMM d y" // Set the date format
                  className='transition duration-300 ease-in-out bg-white py-1 shadow-md border-2 border-gray-400 rounded-md w-40 text-center  text-md cursor-default' // Adjust the styling as needed
                  selected={selectedCreatedAtDate}
                  onSelect={handleCreatedAtChange}
                  onChange={handleCreatedAtChange}
                  autoComplete='off'
                  onFocus={(e) => e.target.blur()}
                  tabIndex={-1} 
                />

<i
  className='fa-solid fa-redo text-forestgreen-100 hover:text-forestgreen-600 transition ease-in-out duration-.3s pl-2' title='Reset Date'
  onClick={() => {
    const today = new Date();
    setSelectedFilter('all');
  }}
/>
</div> */}

   <Pie
    data={data}
    options={options}
    id="pieChartMostBooked"
    className="mt-7 max-h-[23rem] win11:max-h-[40rem] "
   />
  </div>
 );
};

export default PieChart;
