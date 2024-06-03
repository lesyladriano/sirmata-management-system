import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faChevronRight,
 faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import { useStateContext } from "../../../context/admin/ContextProvider";

export default function Users() {
 const { user: contextUser, setUser: setContextUser } = useStateContext(); // Renaming variables

 const [users, setUsers] = useState([]);
 const [all_users, setAllUsers] = useState([]);
 const [loading, setLoading] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [searchQuery, setSearchQuery] = useState("");

 const fetchData = async () => {
  setLoading(true);
  try {
   // Fetch contextUser

   // Fetch users for the current page
   const usersResponse = await axiosClient.get(
    `/users-all?page=${currentPage}`
   );
   setUsers(usersResponse.data.data);
   setTotalPages(usersResponse.data.meta.last_page);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchData();
 }, [currentPage]);

 // Fetch allUsers data when the component mounts
 const fetchAllUsers = async () => {
  setLoading(true);

  try {
   const allUsersResponse = await axiosClient.get("/users-all");
   setAllUsers(allUsersResponse.data.data);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchAllUsers();
 }, []);

 const filteredUsers = searchQuery
  ? all_users.filter((user) => {
     const userName = `${user.first_name} ${user.last_name}`.toLowerCase();
     const userEmail = user.email.toLowerCase();
     const userAccountType = user.account_type.toLowerCase();
     const userPosition = user.position.toLowerCase();
     const userId = user.id.toString();

     const matchesSearchQuery =
      userName.includes(searchQuery.toLowerCase()) ||
      userEmail.includes(searchQuery.toLowerCase()) ||
      userAccountType.includes(searchQuery.toLowerCase()) ||
      userPosition.includes(searchQuery.toLowerCase()) ||
      userId.includes(searchQuery.toLowerCase());

     return matchesSearchQuery;
    })
  : users;

 const onDelete = (user) => {
  if (user.id === contextUser.id) {
   Swal.fire({
    title: "Caution",
    text: "You can't delete logged in user.",
    icon: "warning",
    confirmButtonText: "I understand.",
    confirmButtonColor: "#990000",
   });
   return;
  }

  Swal.fire({
   title: "Delete User",
   text:
    "Are you sure you want to delete this user? You will not be able to recover it!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#990000",
   cancelButtonColor: "#606060",
   confirmButtonText: "Yes, delete it!",
   cancelButtonText: "Cancel",
  }).then((result) => {
   if (result.isConfirmed) {
    axiosClient.delete(`/users/${user.id}`).then(() => {
     Swal.fire({
      title: "User Deleted",
      text: "The user has been successfully deleted.",
      icon: "success",
      timer: 3000, // 3 seconds
      timerProgressBar: true,
      position: "top-end",
      showConfirmButton: false,
     });
     fetchData();
    });
   }
  });
 };

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

 return (
  <div className=" font-[Poppins] tracking-wider">
   <div className="flex bg-forestgreen-100 text-white">
    <div className=" justify-start">
     <h2 className="tracking-widest font-[Poppins] font-semibold px-12 py-8  text-xl">
      USERS{" "}
     </h2>
    </div>
   </div>
   <hr className="border-t-2 border-gray-300" />
   <div className="p-6">
    <div className="flex justify-end w-full  ">
     {contextUser.account_type === "admin" && (
      <Link to="/users/new">
       <button className="bg-green-500 text-white mx-3 px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        <i className="fas fa-plus"></i>
       </button>
      </Link>
     )}

     <div className=" relative  mb-2 mr-16">
      <input
       className="h-10 px-4 pr-9 border-2 border-gray-900 rounded-full"
       placeholder="Search users"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="absolute right-0.5  top-1/2 transform -translate-y-1/2 ml-7 bg-forestgreen-600 h-9 w-10 rounded-full text-white ">
       <i className="fa-solid fa-magnifying-glass m-auto" />
      </button>
     </div>
    </div>

    <div className="flex flex-col">
     <div className="bg-white mx-6 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
      {loading ? (
       <div className="text-center">Loading...</div>
      ) : filteredUsers.length === 0 ? (
       <div className="text-center">No users match your search criteria.</div>
      ) : (
       filteredUsers.map((user) => (
        <div
         key={user.id}
         className="bg-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
        >
         <div className="flex items-center justify-between mb-4">
          <div className="text-xl uppercase tracking-wider font-semibold">
           {user.first_name} {user.last_name}
          </div>
          <div className="flex items-center space-x-2">
           {contextUser.account_type === "employee" ? (
            ""
           ) : (
            <button
             onClick={(ev) => onDelete(user)}
             className=" text-lg  focus:outline-none bg-red-600 hover:bg-red-800 animated text-white p-1 w-8 h-8 items-center justify-center flex rounded-sm shadow-md transition duration-.5s ease-in-out "
            >
             <i className="fas fa-trash"></i>
            </button>
           )}

           <Link to={`/users/${user.id}`}>
            <button className="text-white text-lg focus:outline-none bg-dark-50 p-1 w-8 h-8 items-center justify-center flex rounded-sm shadow-md transition duration-.5s ease-in-out hover:bg-black animated ">
             <i className="fas fa-ellipsis-vertical"></i>
            </button>
           </Link>
          </div>
         </div>
         <div className="text-gray-600">{user.email}</div>
         <div className="text-gray-600">{user.position}</div>
         <div className="mt-4">
          <span
           className={`px-2 py-1 rounded-full text-white ${
            user.account_type === "admin" ? "bg-gray-800" : "bg-green-700"
           }`}
          >
           {user.account_type === "admin" ? "Admin" : "Employee"}
          </span>
         </div>
        </div>
       ))
      )}
     </div>
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
   </div>
  </div>
 );
}
