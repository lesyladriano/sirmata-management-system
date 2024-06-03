import { useStateContext } from "../../context/admin/ContextProvider";
import classNames from "classnames";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
 faBars,
 faGaugeHigh,
 faBook,
 faBusinessTime,
 faCog,
 faAngleDown,
 faUsers,
 faUser,
 faSignOut,
 faSearch,
 faComment,
 faMoneyBill,
 faFile,
} from "@fortawesome/free-solid-svg-icons";
import logo from "/src/assets/images/sirmata_logo_black_landscape.png";
import "../../assets/css/layouts.css";
import "../../assets/css/icon-button.css";
import "../../assets/css/animations.css";
import "../../assets/css/users-table.css";
import axios from "axios";
import Swal from "sweetalert2";

const DefaultLayout = () => {
 const location = useLocation();
 const [searchQuery, setSearchQuery] = useState("");
 const handleSearch = (event) => {
  setSearchQuery(event.target.value);
  setCurrentPage(1);
 };
 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();
 const [loggedUser, setLoggedUser] = useState("");
 const [collapsed, setSidebarCollapsed] = useState(true);
 const [showBookingsMenu, setShowBookingsMenu] = useState(false);
 const [showContentMenu, setShowContentMenu] = useState(false);
 const [showWebsiteSettings, setShowWebsiteSettings] = useState(false);
 const [isMovingProfile, setMovingProfile] = useState(false);

 const isActive = (path) => {
  return location.pathname === path;
 };

 const toggleBookingsMenu = () => {
  setSidebarCollapsed(false);
  setMovingProfile(false);
  setShowWebsiteSettings(false);
  setShowContentMenu(false);
  setShowBookingsMenu((prev) => !prev);
 };

 const toggleContentMenu = () => {
  setSidebarCollapsed(false);
  setShowContentMenu((prev) => !prev);
  setMovingProfile(false);
  setShowWebsiteSettings(false);
  setShowBookingsMenu(false);
 };

 const toggleWebsiteSettings = () => {
  setSidebarCollapsed(false);
  setShowWebsiteSettings((prev) => !prev);
  setShowContentMenu(false);
  setMovingProfile(false);
  setShowBookingsMenu(false);
 };

 const [tokenExpired, setTokenExpired] = useState(false);

 // Function to remove the access token
 const removeAccessToken = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  setTokenExpired(true);
 };

 useEffect(() => {
  if (tokenExpired) {
   window.location.reload();
  }
 }, [tokenExpired]);

 // AUTH USER
 useEffect(() => {
  if (token) {
   axiosClient
    .get("/auth/user", {
     headers: {
      Authorization: `Bearer ${token}`,
      "X-Requested-With": "XMLHttpRequest", // Add X-Requested-With header
      Accept: "application/json",
     },
    })
    .then(({ data }) => {
     setLoggedUser(data.user);
     setUser(data.user);
     if (data.user.account_type === "admin") {
      setIsAdmin(true);
     } else {
      setIsAdmin(false);
     }
    })
    .catch((error) => {
     console.error("Error fetching authenticated user:", error);
     // Handle error responses here
    });
  }
 }, [setUser, token]);

 //  If token not mathcing then logout
 useEffect(() => {
  if (user.id) {
   axiosClient
    .get(`/find/user/${user.id}`)
    .then(({ data }) => {
     if (data.refresh_token !== token) {
      axiosClient
       .post(
        "/logout",
        {},
        {
         headers: {
          Authorization: `Bearer ${token}`,
         },
        }
       )
       .then(() => {
        localStorage.clear();
        window.location.href = "/login";
       })
       .catch((error) => {
        console.error("Error occurred during logout:", error);
        // Handle error
       });
     }
    })
    .catch((error) => {
     console.error("Error fetching authenticated user:", error);
     // Handle error
    });
  }
 }, [user, token]);

 const toggleProfile = () => {
  setMovingProfile(!isMovingProfile);
 };

 useEffect(() => {
  if (collapsed) {
   setShowBookingsMenu(false);
   setShowContentMenu(false);
  }
 }, [collapsed]);

 const navigate = useNavigate();

 useEffect(() => {
  // Token check logic
  if (!token) {
   navigate("/login");
  }
 }, [token, navigate]);

 useEffect(() => {
  const accountType = user.account_type;

  const currentUrl = window.location.pathname;
  const isDashboard = currentUrl.includes("/reports");

  if (accountType === "employee" && isDashboard) {
   navigate("/dashboard");
  }
 }, [user, navigate]);

 const onLogout = () => {
  event.preventDefault();
  Swal.fire({
   title: "Confirm Logout",
   text: "Are you sure you want to logout?",
   icon: "question",
   showCancelButton: true,
   confirmButtonText: "Logout",
   cancelButtonText: "Cancel",
   confirmButtonColor: "#009900",
   cancelButtonColor: "#990000",
   width: "30em",
   showCloseButton: true,
  }).then((result) => {
   if (result.isConfirmed) {
    axiosClient
     .post(
      "/logout",
      {},
      {
       headers: {
        Authorization: `Bearer ${token}`,
       },
      }
     )
     .then(() => {
      localStorage.clear();
      window.location.href = "/login";
     })
     .catch((error) => {
      console.error("Error occurred during logout:", error);
      // Handle error
     });
   }
  });
 };

 const [searchValue, setSearchValue] = useState("");
 const [filteredOptions, setFilteredOptions] = useState([]);
 const [isFocused, setIsFocused] = useState(false);

 // Define your options and their corresponding URLs
 const optionsData = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "All Bookings", url: "/bookings/allbooking" },
  { name: "Add Bookings", url: "/bookings/add" },
  { name: "Accommodations", url: "/accommodations" },
  { name: "Payments", url: "/payments" },
  { name: "Reviews", url: "/guest-reviews" },
  { name: "Users", url: "/users" },
  { name: "Reports", url: "/reports" },
  { name: "Settings", url: "/general-settings" },
 ];

 // Function to filter options based on search input
 const filterOptions = () => {
  const filtered = optionsData.filter((option) =>
   option.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilteredOptions(filtered);
 };

 // Handle input change
 const handleInputChange = (e) => {
  setSearchValue(e.target.value);
  filterOptions();
 };

 // Function to clear search and close results
 const clearSearch = () => {
  setSearchValue("");
 };

 const calculateInitialSeconds = (expireTime, currentTime) => {
  const expireDate = new Date(expireTime);
  const currentDate = new Date(currentTime);
  const diffMilliseconds = expireDate - currentDate;
  const diffSeconds = Math.ceil(diffMilliseconds / 1000); // Convert milliseconds to seconds
  return diffSeconds >= 0 ? diffSeconds : 0; // Ensure positive value
 };

 const tokenExpire = localStorage.getItem("TOKEN_EXPIRE");
 const currentTime = new Date().toISOString();
 const initialSeconds = calculateInitialSeconds(tokenExpire, currentTime);

 const [seconds, setSeconds] = useState(Number(initialSeconds));

 useEffect(() => {
  const timer = setInterval(() => {
   setSeconds((prevSeconds) => {
    if (prevSeconds <= 0) {
     clearInterval(timer);
     window.location.reload(); // Reload the page when timer reaches 0
     return 0; // Stop the timer at 0 seconds
    }
    localStorage.setItem("timerSeconds", prevSeconds - 1); // Update local storage
    return prevSeconds - 1;
   });
  }, 1000);

  return () => clearInterval(timer); // Cleanup timer on component unmount
 }, []);

 return (
  <div
   className={classNames({
    "grid min-h-screen": true,
    "grid-cols-sidebar": !collapsed,
    "grid-cols-sidebar-collapsed": collapsed,
    "transition-grid-template-columns duration-300 ease-in-out": true,
   })}
  >
   {/* sidebar */}
   <div className="bg-forestgreen-600 w-300 font-[Poppins] overflow-y-auto text-white sticky tracking-widest top-0 h-screen ">
    <button
     onClick={() => setSidebarCollapsed((prev) => !prev)}
     className="w-16 h-16 hover:text-forestgreen-100"
    >
     <FontAwesomeIcon icon={faBars} size="xl" />
    </button>

    <nav className="mt-4 ">
     <ul className="flex-grow  text-sm space-y-2 font-[Poppins]">
      <li
       className={`flex items-center space-x-2 py-4  ${
        isActive("/dashboard")
         ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
         : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
       }`}
       onClick={() => setSidebarCollapsed((prev) => !prev)}
       title="Dashboard"
      >
       <Link to="/dashboard">
        <FontAwesomeIcon
         className="pl-"
         icon={faGaugeHigh}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm pl-4 tracking-widest">DASHBOARD</span>
        )}
       </Link>
      </li>

      <li
       className={`flex flex-col space-y-1 p-4  ${
        isActive("/bookings/allbooking") || isActive("/bookings/add")
         ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
         : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
       } cursor pointer`}
       onClick={toggleBookingsMenu}
       title="Bookings"
      >
       <button className="flex items-center h-full">
        <FontAwesomeIcon
         className=""
         icon={faBook}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm pl-5 tracking-widest">BOOKINGS</span>
        )}
       </button>
      </li>

      {showBookingsMenu && (
       <ul className="fadeInDown ">
        <Link to="/bookings/allbooking">
         <li
          className="p-4 pl-14  hover:bg-forestgreen-100 rounded-lg  m-2 "
          onClick={() => setSidebarCollapsed((prev) => !prev)}
         >
          {!collapsed && (
           <span className="text-sm pl-4 tracking-widest ">ALL BOOKING</span>
          )}
         </li>
        </Link>
        <Link to="/bookings/add">
         <li
          className="p-4 pl-14 hover:bg-forestgreen-100 rounded-lg m-2"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
         >
          {!collapsed && (
           <span className="text-sm pl-4 tracking-widest">ADD BOOKING</span>
          )}
         </li>
        </Link>
       </ul>
      )}

      <li
       className={`flex flex-col space-y-2 p-2  ${
        isActive("/content-management/accommodations")
         ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
         : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
       } cursor pointer`}
       onClick={toggleContentMenu}
       title="Accommodations"
      >
       <button className="flex items-center space-x-2">
        <FontAwesomeIcon
         className="text-center"
         icon={faBusinessTime}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm pl-1 tracking-widest uppercase">
          Content Management
         </span>
        )}
       </button>
      </li>

      {showContentMenu && (
       <ul className="fadeInDown">
        <li
         className="p-4 pl-14 hover:bg-forestgreen-100 rounded-lg  m-2"
         onClick={() => setSidebarCollapsed((prev) => !prev)}
        >
         <Link to="/content-management/accommodations">
          {!collapsed && (
           <span className="text-sm uppercase pl-4 tracking-widest">
            Accommodations
           </span>
          )}
         </Link>
        </li>
       </ul>
      )}

      <Link to="/guest-reviews">
       <li
        className={`flex items-center space-x-2 p-4 ${
         isActive("/guest-reviews")
          ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
          : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
        }`}
        onClick={() => setSidebarCollapsed(true)}
        title="Reviews"
       >
        <FontAwesomeIcon
         className=""
         icon={faComment}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm pl-2 tracking-widest uppercase">Reviews</span>
        )}
       </li>
      </Link>

      <Link to="/payments">
       <li
        className={`flex items-center animated space-x-2 p-4
        ${collapsed && ""}
        ${
         isActive("/payments")
          ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
          : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
        }`}
        onClick={() => setSidebarCollapsed(true)}
        title="Payments"
       >
        <div className="">
         <FontAwesomeIcon
          className=""
          icon={faMoneyBill}
          size="xl"
          style={{ color: "#ffffff" }}
         />
        </div>
        {!collapsed && (
         <span className="text-sm pl-2 tracking-widest uppercase">
          Payments
         </span>
        )}
       </li>
      </Link>

      {user.account_type === "employee" ? (
       ""
      ) : (
       <Link to="/reports">
        <li
         className={`flex items-center space-x-2 p-4 ${
          isActive("/reports")
           ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
           : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
         }`}
         onClick={() => setSidebarCollapsed(true)}
         title="Reports"
        >
         <FontAwesomeIcon
          className="ml-1"
          icon={faFile}
          size="xl"
          style={{ color: "#ffffff" }}
         />
         {!collapsed && (
          <span className="text-sm pl-4 tracking-widest uppercase">
           Reports
          </span>
         )}
        </li>
       </Link>
      )}

      <Link to="/users" onClick={() => setSidebarCollapsed(true)}>
       <li
        className={`flex items-center space-x-2 p-4 ${
         isActive("/users")
          ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
          : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
        }`}
        title="Users"
       >
        <FontAwesomeIcon
         className="mr-2"
         icon={faUsers}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm -pl-2 tracking-widest uppercase">Users</span>
        )}
       </li>
      </Link>

      <Link to="/general-settings" onClick={() => setSidebarCollapsed(true)}>
       <li
        className={`flex items-center space-x-2 p-4 ${
         isActive("/general-settings")
          ? "bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
          : "hover:bg-forestgreen-100 rounded-lg py-4 pr-4 pl-3 m-2"
        }`}
        title="Settings"
       >
        <FontAwesomeIcon
         className="mr-2"
         icon={faCog}
         size="xl"
         style={{ color: "#ffffff" }}
        />
        {!collapsed && (
         <span className="text-sm pl-1 tracking-widest uppercase">
          Settings
         </span>
        )}
       </li>
      </Link>
     </ul>

     <div className="absolute bottom-0 left-0 right-0 ">
      <button
       onClick={onLogout}
       className="w-full flex items-center space-x-2 hover:bg-forestgreen-100 p-4"
       title="Logout"
      >
       <FontAwesomeIcon
        className="mr-3"
        icon={faSignOut}
        size="xl"
        style={{ color: "#ffffff" }}
       />
       {!collapsed && (
        <span className="text-sm pl-2 tracking-widest uppercase">Logout</span>
       )}
      </button>
     </div>
    </nav>
   </div>

   {/* Content */}
   <div className="">
    <div className="flex items-center justify-between p-4 bg-white border-b">
     <div className="relative">
      <label className="sr-only" htmlFor="search">
       Search
      </label>
      <input
       className={`h-10 w-full rounded-full border-none bg-white pe-20 ps-4 text-sm shadow-sm sm:w-56 ${
        isFocused ? "ring-2 ring-green-500" : "focus:ring-2 focus:ring-gree-500"
       }`}
       id="search"
       placeholder="Search ..."
       value={searchValue}
       onChange={handleInputChange}
       onFocus={() => setIsFocused(true)}
       onBlur={() => setIsFocused(false)}
       autoComplete="off"
      />
      <button
       type="button"
       className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-600 transition hover:text-gray-700"
      >
       <FontAwesomeIcon
        className=""
        icon={faSearch}
        style={{ color: "#000000" }}
       />
      </button>

      {searchValue.length > 0 && (
       <div
        className="absolute mt-1 w-full bg-white shadow-md rounded-md overflow-hidden"
        style={{ zIndex: 9999 }}
       >
        <ul className="divide-y divide-gray-200">
         {filteredOptions.map((option, index) => (
          <li key={index}>
           <Link to={option.url} onClick={clearSearch}>
            <div className="px-4 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200">
             {option.name}
            </div>
           </Link>
          </li>
         ))}
        </ul>
       </div>
      )}
     </div>

     <img src={logo} alt="Logo" className="w-56 h-auto" />

     {/* User Profile Menu */}
     <div className="">
      <div className="user-menu-container tracking-widest font-[Poppins]">
       <div
        className="user-menu-button flex items-center"
        onClick={toggleProfile}
       >
        <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-gray-800 text-base font-semibold">
         {!user.profile_pic ? (
          <span>
           {user?.first_name?.charAt(0)}
           {user?.last_name?.charAt(0)}
          </span>
         ) : (
          <span>
           <img
            src={user.profile_pic}
            className="object-cover w-12 h-12 rounded-full"
           />
          </span>
         )}
        </div>
        <span className="ml-4 text-base font-bold">
         {user.first_name} {user.last_name}
         <FontAwesomeIcon icon={faAngleDown} size="sm" className="mx-2" />
        </span>
       </div>

       <ul
        className={`${isMovingProfile ? "fadeInDown" : "fadeOutUp"} user-menu`}
       >
        <li className="w-full flex justify-center ">
         <Link to={"/users/" + user.id}>
          <span className="">
           <FontAwesomeIcon icon={faUser} className="text-xl" />
          </span>
          <span className=" w-full font-[Poppins] tracking-wider font-semibold">
           My Profile
          </span>
         </Link>
        </li>
        <li className="w-full tracking-widest flex justify-center">
         <button
          className="w-full flex justify-start items-center "
          onClick={onLogout}
         >
          <span className="flex items-center">
           <FontAwesomeIcon icon={faSignOut} className="text-xl" />
          </span>
          <span className="mr-10 w-full font-[Poppins] tracking-wider font-semibold">
           Logout
          </span>
         </button>
        </li>
       </ul>
      </div>
     </div>
    </div>

    <main className="pb-4">
     <Outlet />
    </main>
   </div>
  </div>
 );
};

export default DefaultLayout;
