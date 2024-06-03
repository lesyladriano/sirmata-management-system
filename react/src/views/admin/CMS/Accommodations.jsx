import {
 faChevronLeft,
 faChevronRight,
 faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import AccommodationModal from "./AccommodationsModal";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/admin/ContextProvider";

function Accommodations() {
 const [accommodation_id, setAccommodationId] = useState(null);
 const [room_name, setName] = useState("");
 const [type, setType] = useState("Cabin");
 const [capacity, setCapacity] = useState("");
 const [description, setDescription] = useState("");
 const [feature, setFeature] = useState("");
 const [price, setPrice] = useState("");
 const [status, setStatus] = useState("Available");
 const [banner_image, setBannerImage] = useState("");
 const [accommodation, setAccommodation] = useState([]);
 const [loading, setLoading] = useState(false);

 const [bannerImageSelected, setBannerImageSelected] = useState("");
 const [booking_image, setBookingImage] = useState("");
 const [bookingImageSelected, setBookingImageSelected] = useState("");
 const handleStatusChange = (event) => {
  setStatus(event.target.value);
 };

 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();

 useEffect(() => {
  Load(currentPage);
 }, [currentPage]);

 const Load = async (page) => {
  setLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation/sort?page=${page}`
   );
   setAccommodation(response.data.data);
   setTotalPages(response.data.last_page);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const [all_accommodation, setAllAccommodation] = useState([]);
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

 useEffect(() => {
  fetchAllAccommodation();
 }, []);

 {
  /** Selected Tab */
 }
 const [selectedTab, setSelectedTab] = useState("All");
 const handleTabClick = (tab) => {
  setSelectedTab(tab);
 };

 const [searchQuery, setSearchQuery] = useState("");
 const handleSearch = (event) => {
  setSearchQuery(event.target.value);
 };

 useEffect(() => {
  if (selectedTab !== "All") {
   setCurrentPage(1); // Set current page to 0 if selectedTab is not "All"
   setTotalPages(1); // Set total pages to 0 if selectedTab is not "All"
  }
  if (selectedTab === "All") {
   Load(currentPage);
  }
 }, [selectedTab]);

 const applyFilters = (accommodationItem) => {
  const accommodationType = accommodationItem.type.toLowerCase();
  const matchesType =
   selectedTab === "All" || accommodationType === selectedTab.toLowerCase();

  if (!searchQuery) {
   return matchesType;
  }

  const accommodationName = accommodationItem.room_name.toLowerCase();
  const accommodationDescription = accommodationItem.description.toLowerCase();
  const featuresArray = Array.isArray(accommodationItem.feature)
   ? accommodationItem.feature
   : [accommodationItem.feature];
  const matchesSearchQuery =
   accommodationName.includes(searchQuery.toLowerCase()) ||
   accommodationType.includes(searchQuery.toLowerCase()) ||
   accommodationDescription.includes(searchQuery.toLowerCase()) ||
   featuresArray.some((feature) =>
    feature.toLowerCase().includes(searchQuery.toLowerCase())
   ) ||
   accommodationItem.accommodation_id.toString().includes(searchQuery); // Check for accommodation_id

  return matchesType && matchesSearchQuery;
 };

 // Filter accommodations based on selected tab and search
 const filteredAccommodations = searchQuery
  ? all_accommodation.filter(applyFilters)
  : selectedTab === "All"
  ? accommodation.filter(applyFilters)
  : all_accommodation.filter(applyFilters);

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

 async function deleteAccommodation(accommodation_id) {
  // Show a custom confirmation dialog using swal
  Swal.fire({
   title: "Are you sure?",
   text: "You will not be able to recover this accommodation!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonText: "Yes, delete it!",
   cancelButtonText: "No, cancel",
   confirmButtonColor: "#990000",
   reverseButtons: false,
  }).then(async (result) => {
   if (result.isConfirmed) {
    try {
     await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/delete/${accommodation_id}`,
      {
       headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type as needed
       },
      }
     );

     Swal.fire({
      title: "Deletion Successful",
      text: "Accommodation successfully deleted.",
      icon: "success",
      showCloseButton: true,
      showConfirmButton: false,
      confirmButtonColor: "#28A745", // Adjust color if needed
     });

     Load();
     setSelectedTab("All");
    } catch (err) {
     console.error(err);
     Swal.fire({
      title: "Deletion Error",
      text: "An error occurred while deleting the accommodation.",
      icon: "error",
      showCloseButton: true,
      showConfirmButton: false,
      confirmButtonColor: "#DC3545", // Adjust color if needed
     });
    }
   }
  });
 }

 function displayFeatures(features) {
  if (!features) {
   return "N/A";
  } else if (Array.isArray(features)) {
   return features.join(", ");
  } else {
   return features;
  }
 }

 function getStatus(status) {
  if (status === "Available") {
   return (
    <div className="bg-green-800 text-white px-1 py-2 text-center rounded-sm  shadow-md">
     Available
    </div>
   );
  } else if (status === "Maintenance") {
   return (
    <div className="bg-gray-800 text-white px-1 py-2 text-center rounded-sm  shadow-md">
     Maintenance
    </div>
   );
  } else {
   return <div>{status}</div>;
  }
 }

 // For Accommodation Modal
 const [showModal, setShowModal] = useState(false);
 const [modalMode, setModalMode] = useState("create");

 const openCreateModal = () => {
  setModalMode("create");
  setShowModal(true);
 };

 async function editAccommodation(accommodation) {
  setName(accommodation.room_name);
  setType(accommodation.type);
  setCapacity(accommodation.capacity);
  setDescription(accommodation.description);
  setFeature(accommodation.feature);
  setPrice(accommodation.price);
  setStatus(accommodation.status);
  setBannerImage(accommodation.banner_image);
  setBookingImage(accommodation.booking_image);
  setAccommodationId(accommodation.accommodation_id);
 }

 const openEditModal = (accommodation) => {
  setModalMode("edit");
  editAccommodation(accommodation);
  setShowModal(true);
 };

 const closeModal = () => {
  setShowModal(false);
  setModalMode("create");
  setAccommodationId("");
  setName("");
  setType("");
  setCapacity("");
  setDescription("");
  setFeature("");
  setPrice("");
  setStatus("");
  setBannerImage("");
  setBookingImage("");
 };
 return (
  <div className="tracking-wider">
   {showModal && (
    <AccommodationModal
     accommodation={accommodation_id}
     showModal={showModal}
     onClose={closeModal}
     modalMode={modalMode}
     reloadTableData={Load}
    />
   )}

   <div className="flex">
    <div className="flex-1 justify-start bg-forestgreen-100 text-white">
     <h2 className="tracking-widest font-[Poppins] font-semibold px-12 py-8 text-lg">
      CONTENT MANAGEMENT <FontAwesomeIcon icon={faAngleRight} /> ACCOMMODATIONS
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300" />

   {/**Tabs */}
   <div className={`flex items-center mx-4 px-14 mt-4 overflow-y-hidden`}>
    <div
     onClick={() => handleTabClick("All")}
     className={`flex items-center hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
      selectedTab === "All"
       ? "  bg-green-500 font-medium text-white"
       : " border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>All</span>
    </div>
    <div
     onClick={() => handleTabClick("Cabin")}
     className={`flex  items-center  hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
      selectedTab === "Cabin"
       ? "border-t-0 bg-green-500 font-medium text-white"
       : " border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>Cabin</span>
    </div>
    <div
     onClick={() => handleTabClick("Lake Villa")}
     className={`flex items-center  hover:cursor-pointer whitespace-nowrap w-36 rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
      selectedTab === "Lake Villa"
       ? "border-t-0 bg-green-500 font-medium text-white"
       : "border-gray-300 bg-gray-200"
     }  dark:border-gray-400 dark:text-gray-50`}
    >
     <span>Lake Villa</span>
    </div>

    <div
     onClick={openCreateModal}
     className={`bg-green-500 text-white mx-3 px-3 py-1 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500`}
    >
     <span>
      <i className="fa fa-plus" />
     </span>
    </div>

    <div className="flex justify-end w-full">
     <div className="relative mb-2">
      <input
       className="h-10 px-4 pr-9 border-2 border-gray-900 rounded-full"
       placeholder="Search"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
       className="absolute right-0.5 top-1/2 transform -translate-y-1/2 ml-7 bg-forestgreen-600 h-9 w-10 rounded-full text-white"
       onClick={handleSearch}
      >
       <i className="fa-solid fa-magnifying-glass m-auto" />
      </button>
     </div>
    </div>
   </div>

   <div className="h-full text-sm">
    <div className="card2 bg-white overflow-auto mx-10">
     <div>
      <table className="" align="" id="accommodation-table">
       <thead>
        <tr className="text-white tracking-widest text-sm ">
         <th scope="col" className="bg-dark-50 py-4 w-40 rounded-tl-xl">
          {" "}
          Id
         </th>
         <th scope="col" className="w-60 bg-dark-50">
          {" "}
          Name
         </th>
         <th scope="col" className=" w-60 bg-dark-50">
          Room Type
         </th>
         <th scope="col" className="w-60 bg-dark-50">
          Capacity
         </th>
         <th scope="col" className="w-60 bg-dark-50">
          Price
         </th>
         <th scope="col" className="w-60 bg-dark-50">
          Status
         </th>
         <th scope="col" className="bg-dark-50 w-80 rounded-tr-xl">
          Action
         </th>
        </tr>
       </thead>
       {loading && (
        <tbody className="">
         <tr>
          <td colSpan="10" className="text-center ">
           <LoadingCircle />
          </td>
         </tr>
        </tbody>
       )}
       {!loading && (
        <tbody className="text-sm">
         {filteredAccommodations.length === 0 ? (
          <tr>
           <td colSpan="7" className="text-center">
            <div className="text-gray-500 mt-4">
             No matches found for the given search criteria.
            </div>
           </td>
          </tr>
         ) : (
          filteredAccommodations.map((accommodation, index) => (
           <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-200" : "bg-white"} // Apply bg-gray-200 to odd rows and bg-white to even rows
           >
            <th scope="row">{accommodation.accommodation_id}</th>
            <td>{accommodation.room_name}</td>
            <td>{accommodation.type}</td>
            <td>{accommodation.capacity}</td>
            <td>
             {accommodation.price.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
             })}
            </td>
            <td>{getStatus(accommodation.status)}</td>
            <td className="space-x-2">
             <button
              className=" bg-green-500 text-sm shadow-md hover:bg-green-700 px-4 py-1 rounded-full text-white"
              onClick={() => openEditModal(accommodation)}
             >
              Edit
             </button>
             <button
              className=" bg-dark-50 text-sm shadow-md hover:bg-black px-4 py-1 rounded-full text-white "
              onClick={() =>
               deleteAccommodation(accommodation.accommodation_id)
              }
             >
              Delete
             </button>
            </td>
           </tr>
          ))
         )}
        </tbody>
       )}
      </table>
     </div>

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
  </div>
 );
}

export default Accommodations;
