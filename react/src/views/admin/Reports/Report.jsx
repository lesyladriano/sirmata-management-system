import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import BarChart from "../../../components/admin/BarChart";
import LineChart from "../../../components/admin/LineGraph";
import PieChart from "../../../components/admin/PieChart";
import FinancialChart from "../../../components/admin/FinancialReport";

import { Document, Page, pdfjs } from "react-pdf";

const Report = () => {
 // Sample hotel booking data (replace with your actual data)

 // Financial data for accommodation bookings (replace with your actual data)
 const financialData = [
  {
   date: "2023-09-19",
   revenue: 1000,
  },
  {
   date: "2023-09-20",
   revenue: 1500,
  },
  // Add more financial data entries as needed
 ];

 // State to manage the selected filter (daily, weekly, monthly, yearly)
 const [selectedFilter, setSelectedFilter] = useState("daily");

 // Filter the financial data based on the selected filter
 const filteredFinancialData = () => {
  const today = new Date();
  switch (selectedFilter) {
   case "daily":
    return financialData.filter(
     (entry) => entry.date === today.toISOString().split("T")[0]
    );
   case "weekly":
    // Implement weekly filtering logic here
    return [];
   case "monthly":
    // Implement monthly filtering logic here
    return [];
   case "yearly":
    // Implement yearly filtering logic here
    return [];
   default:
    return financialData;
  }
 };

 // Extract dates and revenue for the bar chart
 const dates = filteredFinancialData().map((entry) => entry.date);
 const revenue = filteredFinancialData().map((entry) => entry.revenue);

 // Prepare data for the bar chart with modified options
 const barChartData = {
  labels: dates,
  datasets: [
   {
    label: "Revenue",
    data: revenue,
    backgroundColor: "rgba(54, 162, 235, 0.6)",
   },
  ],
 };

 // ... (continue with the rest of your component)

 // Render filtering options
 const renderFilterOptions = () => {
  const filters = ["daily", "weekly", "monthly", "yearly"];
  return (
   <div className="mb-4">
    <label className="mr-2">Filter:</label>
    <select
     value={selectedFilter}
     onChange={(e) => setSelectedFilter(e.target.value)}
    >
     {filters.map((filter) => (
      <option key={filter} value={filter}>
       {filter}
      </option>
     ))}
    </select>
   </div>
  );
 };

 const guestData = [
  {
   date: "2023-09-19",
   guests: 50,
  },
  {
   date: "2023-09-20",
   guests: 60,
  },
  // Add more guest data entries as needed
 ];

 // Filter the guest data based on the selected filter
 const filteredGuestData = () => {
  const today = new Date();
  switch (selectedFilter) {
   case "daily":
    return guestData.filter(
     (entry) => entry.date === today.toISOString().split("T")[0]
    );
   case "weekly":
    // Implement weekly filtering logic here
    return [];
   case "monthly":
    // Implement monthly filtering logic here
    return [];
   case "yearly":
    // Implement yearly filtering logic here
    return [];
   default:
    return guestData;
  }
 };

 const lineChartData = {
  labels: filteredGuestData().map((entry) => entry.date),
  datasets: [
   {
    label: "Guests",
    data: filteredGuestData().map((entry) => entry.guests),
    fill: false,
    borderColor: "rgba(75, 192, 192, 0.6)",
    tension: 0.4,
   },
  ],
 };

 const [showPdf, setShowPdf] = useState(false);
 const generatePdf = () => {
  // Create a new instance of jsPDF
  const jsPDF = require("jspdf");
  const doc = new jsPDF();

  // Add content to the PDF, e.g., your report data
  doc.text("Financial Report", 10, 10);
  // Add more content as needed...

  // Save the PDF as a Blob
  const pdfBlob = doc.output("blob");

  // Create a URL for the Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new window
  window.open(pdfUrl);

  // Optional: You can also set the state to show a PDF viewer component
  setShowPdf(true);
 };

 return (
  <div className="font-[Poppins] tracking-wider">
   <div className="flex ">
    <div className="flex-1 justify-start bg-forestgreen-100 text-white">
     <h2 className="tracking-wider font-[Poppins] font-semibold px-12 py-8 text-xl">
      REPORTS
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300" />

   <div className=" h-full">
    <div className="grid grid-cols-2 gap-8  px-10 py-5  h-1/2 ">
     <div className="w-full">
      <div className="w-full bg-gray-50 shadow-lg rounded-t-lg  h-full relative">
       <h1 className="text-xl pl-8 text-left rounded-t-lg text-white p-3 bg-forestgreen-600 tracking-widest uppercase font-bold ">
        Bookings
       </h1>
       <BarChart />
      </div>
     </div>
     <div>
      <div className="w-full h-full bg-white shadow-lg rounded-t-lg  h-fusll relative ">
       <h1 className="text-xl pl-8 text-left rounded-t-lg text-white p-3 bg-forestgreen-600 tracking-widest uppercase font-bold ">
        OCCUPANCY
       </h1>
       <PieChart />
      </div>
     </div>
    </div>

    {/* Add a new row with two columns */}
    <div className="grid grid-cols-2 gap-8  px-10 py-5 h-1/2  ">
     <div className="w-full">
      <div className="w-full h-full bg-white shadow-lg rounded-t-lg   relative">
       <h1 className="text-xl pl-8 text-left rounded-t-lg text-white p-3 bg-forestgreen-600 tracking-widest uppercase font-bold">
        GUEST
       </h1>
       <LineChart />
      </div>
     </div>
     <div className="w-full">
      <div className="w-full h-full bg-white shadow-lg rounded-t-lg   relative ">
       <h1 className="text-xl pl-8 text-left rounded-t-lg text-white p-3 bg-forestgreen-600 tracking-widest uppercase font-bold">
        FINANCIAL
       </h1>
       <FinancialChart />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Report;
