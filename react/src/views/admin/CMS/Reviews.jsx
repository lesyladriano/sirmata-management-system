import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import ReviewViewModal from "./ReviewViewModal";
import {
 faChevronLeft,
 faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../context/admin/ContextProvider";
import axiosClient from "../../../axios-client";
import { FaExclamation } from "react-icons/fa";
export default function Reviews() {
 const { user, token } = useStateContext();
 const userAccountType = user.account_type;

 const [review_id, setReviewId] = useState("");
 const [full_name, setFullName] = useState("");
 const [email, setEmail] = useState("");
 const [review, setReview] = useState("");
 const [rating, setRating] = useState(0);
 const [display, setDisplay] = useState(false);
 const [guest_reviews, setGuestReview] = useState([]);
 const [all_guest_reviews, setAllGuestReviews] = useState([]);
 const [loading, setLoading] = useState(false);

 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 const [searchQuery, setSearchQuery] = useState("");

 useEffect(() => {
  Load(currentPage);
 }, [currentPage]);

 useEffect(() => {
  fetchAllReviews();
 }, []);

 const Load = async (page) => {
  setLoading(true);
  try {
   let apiUrl = `${
    import.meta.env.VITE_API_BASE_URL
   }/api/reviews/sort?page=${page}`;

   if (searchQuery) {
    apiUrl += `&search=${searchQuery}`;
   }

   const response = await axios.get(apiUrl);
   setGuestReview(response.data.data);
   setTotalPages(response.data.last_page);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const fetchAllReviews = async () => {
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/reviews`
   );
   setAllGuestReviews(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 const filteredReviews = searchQuery
  ? all_guest_reviews.filter((guest_review) => {
     const lowerSearchQuery = searchQuery.toLowerCase();
     const reviewText = guest_review.review
      ? guest_review.review.toLowerCase()
      : "";
     const fullName = guest_review.full_name
      ? guest_review.full_name.toLowerCase()
      : "";
     const reviewId = guest_review.review_id.toString();

     return (
      reviewText.includes(lowerSearchQuery) ||
      fullName.includes(lowerSearchQuery) ||
      reviewId.includes(lowerSearchQuery) ||
      (guest_review.email &&
       guest_review.email.toLowerCase().includes(lowerSearchQuery))
     );
    })
  : guest_reviews;

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
  /**Delete Reviews */
 }
 async function deleteReviews(review_id) {
  const result = await Swal.fire({
   title: "Are you sure?",
   text: "You won't be able to revert this!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#d33",
   cancelButtonColor: "#3085d6",
   confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
   try {
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/reviews/delete/` + review_id,
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json", // Adjust content type as needed
      },
     }
    );
    setSelectedTab("All");
    Swal.fire({
     title: "Review Deleted",
     text: "The review is has been deleted.",
     icon: "success",
     showConfirmButton: false,
     position: "top-end",
     showCloseButton: true,
     timer: 4500,
     timerProgressBar: true,
    }); // Make sure to define the Load() function appropriately
   } catch (error) {
    // Handle error if needed
    console.error(error);
   }
  }
 }

 {
  /**Update Show Review in Home */
 }
 async function showReview(review_id) {
  const reviewIndex = guest_reviews.findIndex(
   (review) => review.review_id === review_id
  );

  if (reviewIndex !== -1) {
   const swalResult = await Swal.fire({
    title: "Confirm Display",
    text: "Are you sure you want to display this review?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, display it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#009900",
   });

   if (swalResult.isConfirmed) {
    try {
     guest_reviews[reviewIndex].display = 1;
     await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/reviews/update/${review_id}`,
      {
       display: 1,
       unseen: 0,
      },
      {
       headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type as needed
       },
      }
     );

     Swal.fire({
      title: "Review Displayed",
      text: "The review has been successfully displayed.",
      icon: "success",
      showCloseButton: true,
      showConfirmButton: false,
      position: "top-end",
      timer: 4000,
      timerProgressBar: true,
     });
     Load();
    } catch (error) {
     console.error(
      `Error updating display for review with ID ${review_id}:`,
      error
     );
     Swal.fire({
      title: "Update Error",
      text: "An error occurred while updating the display.",
      icon: "error",
      showConfirmButton: false,
      showCloseButton: true,
     });
    }
   } else {
   }
  } else {
  }

  setSelectedTab("All");
 }

 {
  /**Hide Review in Home */
 }
 async function hideReview(review_id) {
  const reviewIndex = guest_reviews.findIndex(
   (review) => review.review_id === review_id
  );

  if (reviewIndex !== -1) {
   const swalResult = await Swal.fire({
    title: "Confirm Hide Review",
    text: "Are you sure you wish to hide this review from the Home section?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#009900", // Adjust color if needed
   });

   if (swalResult.isConfirmed) {
    try {
     guest_reviews[reviewIndex].display = 0;
     await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/reviews/update/${review_id}`,
      {
       display: 0,
      },
      {
       headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type as needed
       },
      }
     );
     Swal.fire({
      title: "Review Archived",
      text: "The review is no longer displayed.",
      icon: "success",
      showConfirmButton: false,
      position: "top-end",
      timer: 4500,
      timerProgressBar: true,
     });

     Load();
    } catch (error) {
     console.error(
      `Error updating display for review with ID ${review_id}:`,
      error
     );
     Swal.fire({
      title: "Update Error",
      text: "An error occurred while updating the display of the review.",
      icon: "error",
      showCloseButton: true,
      showConfirmButton: false,
     });
    }
   } else {
   }
  } else {
  }

  setSelectedTab("All");
 }

 {
  /**View Review All */
 }

 const [showReviewModal, setShowReviewModal] = useState(false);
 const [selectedReview, setSelectedReview] = useState(null);
 const [noResults, setNoResults] = useState("");
 const viewReviewModal = (guest_review) => {
  setSelectedReview(guest_review);
  setShowReviewModal(true);
 };

 const handleCloseReviewModal = () => {
  setShowReviewModal(false);
  setSelectedReview(null);
 };

 const [selectedTab, setSelectedTab] = useState("All");
 const handleTabClick = (tab) => {
  setSelectedTab(tab);
 };

 const [searchResults, setSearchResults] = useState([]);
 useEffect(() => {
  setLoading(true);
  setNoResults("");
  if (selectedTab) {
   const fetchData = async () => {
    if (selectedTab === "All") {
     Load();
    }
    if (selectedTab === "displayed") {
     try {
      const response = await axios.get(
       `${import.meta.env.VITE_API_BASE_URL}/api/reviews/search`,
       {
        params: {
         display: true, // Set the query parameter 'display' to true
        },
       }
      );
      if (response.data.length === 0) {
       setNoResults("NO RESULTS");
      }
      setSearchResults(response.data);
      setCurrentPage(1);
      setTotalPages(1);
      setLoading(false);
     } catch (error) {
      console.error("Error fetching data:", error);
     }
    } else if (selectedTab === "archived") {
     try {
      const response = await axios.get(
       `${import.meta.env.VITE_API_BASE_URL}/api/reviews/search`,
       {
        params: {
         display: false, // Set the query parameter 'display' to false
        },
       }
      );
      if (response.data.length === 0) {
       setNoResults("NO RESULTS");
      }
      setSearchResults(response.data);

      setCurrentPage(1);
      setTotalPages(1);
      setLoading(false);
     } catch (error) {
      console.error("Error fetching data:", error);
     }
    } else if (selectedTab === "unseen") {
     try {
      const response = await axios.get(
       `${import.meta.env.VITE_API_BASE_URL}/api/reviews/search`,
       {
        params: {
         unseen: true, // Set the query parameter 'unseen' to true
        },
       }
      );
      if (response.data.length === 0) {
       setNoResults("NO RESULTS");
      }
      setSearchResults(response.data);
      setCurrentPage(1);
      setTotalPages(1);
      setLoading(false);
      Load;
     } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
     }
    }
   };
   fetchData();
  }
 }, [selectedTab]);

 async function isSeen(review_id) {
  console.log(review_id);
  try {
   await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/reviews/update/${review_id}`,
    {
     unseen: 0,
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type as needed
     },
    }
   );

   Load();
   setSelectedTab("All");
  } catch (error) {
   console.error("Error updating review:", error);
   // Handle error gracefully, e.g., show a message to the user
  }
 }

 return (
  <div className="w-full font-[Poppins]  ">
   {showReviewModal && (
    <ReviewViewModal
     selectedReview={selectedReview}
     onClose={handleCloseReviewModal}
    />
   )}

   <div className="flex">
    <div className="flex-1 justify-start bg-forestgreen-100 text-white">
     <h2 className="tracking-widest font-[Poppins] font-semibold px-12 py-8  text-lg">
      REVIEWS{" "}
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300 " />

   {/* Tabs */}
   <div className="flex items-center mx-4 px-14  overflow-y-hidden py-4">
    <div className="flex item-center">
     <div
      onClick={() => handleTabClick("All")}
      className={`flex items-center  hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
       selectedTab === "All"
        ? "  bg-green-500 font-medium text-white"
        : " border-gray-300 bg-gray-200"
      }  dark:border-gray-400 dark:text-gray-50`}
     >
      <span>All</span>
     </div>

     <div
      onClick={() => handleTabClick("displayed")}
      className={`flex items-center hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
       selectedTab === "displayed"
        ? "  bg-green-500 font-medium text-white"
        : " border-gray-300 bg-gray-200"
      }  dark:border-gray-400 dark:text-gray-50`}
     >
      <span>Displayed</span>
     </div>

     <div
      onClick={() => handleTabClick("archived")}
      className={`flex items-center hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
       selectedTab === "archived"
        ? "  bg-green-500 font-medium text-white"
        : " border-gray-300 bg-gray-200"
      }  dark:border-gray-400 dark:text-gray-50`}
     >
      <span>Hidden</span>
     </div>
     <div
      onClick={() => handleTabClick("unseen")}
      className={`flex items-center hover:cursor-pointer rounded-full px-5 py-1 space-x-2 border mr-1 transition duration-300 ease-in-out  ${
       selectedTab === "unseen"
        ? "  bg-green-500 font-medium text-white"
        : " border-gray-300 bg-gray-200"
      }  dark:border-gray-400 dark:text-gray-50`}
     >
      <span>Unseen</span>
     </div>
    </div>

    <div className="flex justify-end w-full  ">
     <div className="relative">
      <input
       key="search-input" // Add a key to avoid potential issues
       className="h-10 px-4 pr-9 border-2 border-gray-900 rounded-full"
       placeholder="Search"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="absolute right-0.5 top-1/2 transform -translate-y-1/2 ml-7 bg-forestgreen-600 h-9 w-10 rounded-full text-white">
       <i className="fa-solid fa-magnifying-glass m-auto" />
      </button>
     </div>
    </div>
   </div>
   {!loading ? (
    <div className="card2 bg-white gap-4 mx-6">
     {filteredReviews.length === 0 ? (
      <div className="text-gray-500 p-6 text-center">
       No matches found for the given search criteria.
      </div>
     ) : (
      <div className="grid grid-cols-1 p-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
       {noResults && (
        <div className="text-gray-500  items-center  flex  justify-center text-center col-span-3">
         No matches found for the given search criteria.
        </div>
       )}

       {selectedTab === "All"
        ? filteredReviews.map((guest_review) => (
           <div
            key={guest_review.review_id}
            className="bg-gray-200  rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
           >
            {guest_review.unseen ? (
             <div className=" h-[10rem] absolute">
              <div
               onClick={() => isSeen(guest_review.review_id)}
               title="Mark as Seen"
               className="bg-red-900 top-[-1.5rem] left-[-1.2rem] absolute text-white p-1 rounded-full w-fit hover:cursor-pointer hover:text-xl animated"
              >
               <FaExclamation />
              </div>
             </div>
            ) : (
             ""
            )}

            <div className="flex justify-between items-center mb-3">
             <div className="flex items-center space-x-1 border-2">
              {Array.from({ length: guest_review.rating }, (_, index) => (
               <i
                key={index}
                className="fa-star fa-solid text-lg text-yellow-900"
               />
              ))}
             </div>

             <div className="flex items-center space-x-1">
              <span className="flex">
               {guest_review.display === 1 ? (
                <button
                 onClick={
                  userAccountType === "employee"
                   ? null
                   : () => hideReview(guest_review.review_id)
                 }
                 className={`text-white rounded-sm shadow-md w-8 h-8  text-lg  items-center flex justify-center transition ease-in-out duration-.5s  ${
                  guest_review.display === 1
                   ? "bg-green-500 hover:bg-green-700"
                   : "bg-green-500 hover:bg-green-700"
                 } text-${
                  guest_review.display === 1 ? "green-700" : "gray-700"
                 } p-2 rounded-md w-8 h-8  flex justify-center `}
                 disabled={userAccountType === "employee"}
                >
                 <i
                  className={` text-base fa-solid fa-${
                   guest_review.display === 1 ? "eye" : "eye-slash"
                  }`}
                 />
                </button>
               ) : (
                <button
                 onClick={
                  userAccountType === "employee"
                   ? null
                   : () => showReview(guest_review.review_id)
                 }
                 className={`text-white text-md  rounded-sm shadow-md w-8 h-8 animated   items-center flex justify-center transition ease-in-out duration-.5s ${
                  guest_review.display === 1
                   ? " "
                   : " bg-green-500 hover:bg-green-700"
                 } text-${
                  guest_review.display === 1 ? "green-700" : "gray-700"
                 } p-2 rounded-md w-7 h-7 flex text-base justify-center`}
                 disabled={userAccountType === "employee"}
                >
                 <i className=" text-base fa-solid fa-eye-slash" />
                </button>
               )}
              </span>

              {userAccountType === "employee" ? (
               "  "
              ) : (
               <button
                type="button"
                className="bg-red-600 text-md  hover:bg-red-900 aniamted rounded-sm text-white shadow-md w-8 h-8  items-center flex justify-center transition ease-in-out duration-.5s "
                onClick={() => deleteReviews(guest_review.review_id)}
               >
                <i className="fa-solid fa-trash  transition ease-in-out duration-300s" />
               </button>
              )}

              <button
               type="button"
               className="bg-gray-900 text-md  hover:bg-black aniamted rounded-sm text-white shadow-md w-8 h-8  items-center flex justify-center transition ease-in-out duration-.5s"
               onClick={() => viewReviewModal(guest_review)}
              >
               <i className="fa-solid fa-ellipsis-vertical" />
              </button>
             </div>
            </div>

            <div className="line-clamp-3 text-justify px-6 h-review text-sm">
             {guest_review.review}
            </div>

            <div className="w-full text-end pt-2 text-lg tracking-wider">
             {guest_review.full_name}
            </div>
           </div>
          ))
        : searchResults.map((guest_review) => (
           <div
            key={guest_review.review_id}
            className="bg-gray-200 rounded-lg  shadow-lg p-4 hover:shadow-xl transition duration-300"
           >
            {/* Exclamation */}
            {guest_review.unseen ? (
             <div className=" h-[10rem] absolute ">
              <div
               onClick={() => isSeen(guest_review.review_id)}
               className="bg-red-900 top-[-1.5rem]  left-[-1.2rem] absolute text-white p-1 rounded-full w-fit hover:cursor-pointer hover:text-lg animated"
               title="Click to Acknowlegde"
              >
               <FaExclamation />
              </div>
             </div>
            ) : (
             ""
            )}
            {/* Exclamation */}
            <div className="flex justify-between items-center mb-3">
             <div className="flex items-center space-x-1 border-2">
              {Array.from({ length: guest_review.rating }, (_, index) => (
               <i
                key={index}
                className="fa-star fa-solid text-lg text-yellow-900"
               />
              ))}
             </div>

             <div className="flex items-center space-x-1">
              <span className="flex">
               {guest_review.display === 1 ? (
                <button
                 onClick={
                  userAccountType === "employee"
                   ? null
                   : () => hideReview(guest_review.review_id)
                 }
                 className={`text-white rounded-sm shadow-md w-8 h-8  text-lg  items-center flex justify-center transition ease-in-out duration-.5s  ${
                  guest_review.display === 1
                   ? "bg-green-500 hover:bg-green-700"
                   : "bg-green-500 hover:bg-green-700"
                 } text-${
                  guest_review.display === 1 ? "green-700" : "gray-700"
                 } p-2 rounded-md w-8 h-8  flex justify-center `}
                 disabled={userAccountType === "employee"}
                >
                 <i
                  className={` text-base fa-solid fa-${
                   guest_review.display === 1 ? "eye" : "eye-slash"
                  }`}
                 />
                </button>
               ) : (
                <button
                 onClick={
                  userAccountType === "employee"
                   ? null
                   : () => showReview(guest_review.review_id)
                 }
                 className={`text-white text-md  rounded-sm shadow-md w-8 h-8 animated   items-center flex justify-center transition ease-in-out duration-.5s ${
                  guest_review.display === 1
                   ? " "
                   : " bg-green-500 hover:bg-green-700"
                 } text-${
                  guest_review.display === 1 ? "green-700" : "gray-700"
                 } p-2 rounded-md w-7 h-7 flex text-base justify-center`}
                 disabled={userAccountType === "employee"}
                >
                 <i className=" text-base fa-solid fa-eye-slash" />
                </button>
               )}
              </span>

              {userAccountType === "employee" ? (
               "  "
              ) : (
               <button
                type="button"
                className="bg-red-600 text-md  hover:bg-red-900 aniamted rounded-sm text-white shadow-md w-8 h-8  items-center flex justify-center transition ease-in-out duration-.5s "
                onClick={() => deleteReviews(guest_review.review_id)}
               >
                <i className="fa-solid fa-trash  transition ease-in-out duration-300s" />
               </button>
              )}

              <button
               type="button"
               className="bg-gray-900 text-md  hover:bg-black aniamted rounded-sm text-white shadow-md w-8 h-8  items-center flex justify-center transition ease-in-out duration-.5s"
               onClick={() => viewReviewModal(guest_review)}
              >
               <i className="fa-solid fa-ellipsis-vertical" />
              </button>
             </div>
            </div>

            <div className="line-clamp-3 text-justify px-6 h-review text-sm">
             {guest_review.review}
            </div>

            <div className="w-full text-end pt-2 text-lg tracking-wider">
             {guest_review.full_name}
            </div>
           </div>
          ))}
      </div>
     )}
    </div>
   ) : (
    <div className="card2 bg-white mx-6">
     <LoadingCircle />
    </div>
   )}

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
 );
}
