import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/admin/DefaultLayout";
import Dashboard from "./views/admin/Dashboard";
import Login from "./views/admin/Login";
import UserForm from "./views/admin/ProfileHeader/UserForm";
import Users from "./views/admin/ProfileHeader/Users";
import NotFound from "./views/NotFound";
import TestPage from "./views/TestPage";
import TestPage2 from "./views/TestPage2";
import LoginLayout from "./components/admin/LoginLayout";
import Profile from "./views/admin/ProfileHeader/Profile";
import GuestLayout from "./components/website/GuestLayout";
import Home from "./views/website/Home";
import About from "./views/website/About";

import KapePuno from "./views/website/Amenities/KapePuno";
import HirayaSpa from "./views/website/Amenities/HirayaSpa";
import KayoRestaurant from "./views/website/Amenities/KayoRestaurant";



import BookingLayout from "./components/website/BookingLayout";
import Accommodations from "./views/admin/CMS/Accommodations";
import BookingsAccomodation from "./views/website/Accommodations/BookingAccommodation";
import ReservationDetails from "./views/website/Accommodations/ReservationDetails";
import Activities from "./views/website/Amenities/Activities";
import Events from "./views/website/Events";

import Faqs from "./views/website/Faqs";
import Contact from "./views/website/Contact";

import AllBooking from "./views/admin/Bookings/AllBooking";
import AddBooking from "./views/admin/Bookings/AddBooking";
import TestPage3 from "./views/TestPage3";
import Reviews from "./views/admin/CMS/Reviews";


import GeneralSettings from "./views/admin/settings/GeneralSettings";
import Payments from "./views/admin/Payments/Payments";
import OfflineBooking from "./views/admin/Bookings/OfflineBookings";
import TestLayout from "./components/admin/TestLayout";
import Report from "./views/admin/Reports/Report";
import AccommodationBase from "./views/website/Accommodations/Base/AccommodationBase";
import BookingSuccess from "./views/website/Accommodations/BookingSuccess";
import BookingFailed from "./views/website/Accommodations/BookingFailed";

const router = createBrowserRouter([
 {
  path: "/",
  element: <GuestLayout />,
  children: [
   {
    path: "/",
    element: <Navigate to="/home" replace />,
   },
   {
    path: "/home",
    element: <Home />,
   },
   {
    path: "/about",
    element: <About />,
   },
   {
    path: "/accommodation/:room_name",
    element: <AccommodationBase />,
   },
   {
    path: "/kapepuno",
    element: <KapePuno />,
   },
   {
    path: "/kayorestaurant",
    element: <KayoRestaurant />,
   },
   {
    path: "/hirayaspa",
    element: <HirayaSpa />,
   },
   {
    path: "/activities",
    element: <Activities />,
   },
   
   
   {
    path: "/events",
    element: <Events />,
   },
   {
    path: "/faqs",
    element: <Faqs />,
   },
   {
    path: "/contact",
    element: <Contact />,
   },
  ],
 },
 {
  path: "/",
  element: <BookingLayout />,
  children: [
   {
    path: "/bookings/accommodations",
    element: <BookingsAccomodation />,
   },
   {
    path: "/bookings/details",
    element: <ReservationDetails />,
   },
   {
    path: "/booking/success",
    element: <BookingSuccess />,
   },
   {
    path: "/booking/failed",
    element: <BookingFailed />,
   },
  ],
 },
 {
  path: "/",
  element: <DefaultLayout />,
  children: [
   {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
   },
   {
    path: "/users",
    element: <Users />,
   },
   {
    path: "/dashboard",
    element: <Dashboard />,
   },
   {
    path: "/bookings/allbooking",
    element: <AllBooking />,
   },
   {
    path: "/bookings",
    element: <AddBooking />,
   },
   {
    path: "/bookings/add",
    element: <OfflineBooking />,
   },
   {
    path: "/payments",
    element: <Payments />,
   },
   {
    path: "/content-management/accommodations",
    element: <Accommodations />,
   },
   {
    path: "/guest-reviews",
    element: <Reviews />,
   },
   {
    path: "/general-settings",
    element: <GeneralSettings />,
   },
   {
    path: "/users/new",
    element: <UserForm key="userCreate" />,
   },
   {
    path: "/users/:id",
    element: <UserForm key="userUpdate" />,
   },
   {
    path: "/myprofile/:id",
    element: <Profile />,
   },
   {
    path: "/reports",
    element: <Report />,
   },
  ],
 },

 {
  path: "/",
  element: <LoginLayout />,
  children: [
   {
    // path: "/admin-management/login",
    path: "/login",
    element: <Login />,
   },
  ],
 },
 {
  path: "*",
  element: <NotFound />,
 },
 {
  path: "/test",
  element: <TestPage />,
 },
 //  {
 //   path: "/",
 //   element: <TestLayout />,
 //   children: [
 //    {
 //     path: "/test2",
 //     element: <TestPage2 />,
 //    },
 //   ],
 //  },
 //  {
 //   path: "/test3",
 //   element: <TestPage3 />,
 //  },
]);

export default router;
