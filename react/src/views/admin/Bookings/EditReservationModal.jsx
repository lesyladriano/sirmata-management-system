import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import axiosClient from "../../../axios-client";
import { Carousel } from "react-responsive-carousel";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useStateContext } from "../../../context/admin/ContextProvider";
export default function EditReservationModal({
 selectedReservation,
 onClose,
 LoadData,
}) {
 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();

 const [inputValue, setInputValue] = useState(""); // Initialize with a default value
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState(null);

 const [selectedAccommodation, setSelectedAccommodation] = useState("");
 const [selectedGuest, setSelectedGuest] = useState("");

 const [status, setStatus] = useState(selectedReservation.status);

 const [guest_id, setGuestId] = useState("");
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [guest_email, setGuestEmail] = useState("");
 const [party_size, setPartySize] = useState("");
 const [contact_number, setContactNumber] = useState("");
 const [address, setAddress] = useState("");
 const [check_in_date, setCheckInDate] = useState("");
 const [check_out_date, setCheckOutDate] = useState("");
 const [publicId, setPublicId] = useState([]);
 const [payments, setPayments] = useState("");
 const [uploadPreset] = useState("sirmata_web_image");
 const [cloudName] = useState("di0nkj5kz");

 async function Load() {
  setLoading(true);
  try {
   const accommodationResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
   );
   const selectedAccommodation = accommodationResponse.data.find(
    (accommodation) =>
     accommodation.accommodation_id === selectedReservation.accommodation_id
   );
   setSelectedAccommodation(selectedAccommodation);

   const webImagesArray = Array.isArray(selectedAccommodation.web_images)
    ? selectedAccommodation.web_images
    : [selectedAccommodation.web_images];
   const webImagesSerialized = webImagesArray;
   const regex = /s:\d+:"([^"]+)";/g;
   let match;
   const imagePaths = [];

   while ((match = regex.exec(webImagesSerialized))) {
    imagePaths.push(match[1]);
   }
   setPublicId(imagePaths);

   const guestResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests`
   );
   const selectedGuest = guestResponse.data.find(
    (guest) => guest.guest_id === selectedReservation.guest_id
   );
   setSelectedGuest(selectedGuest);

   const paymentResponse = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`
   );
   const selectedPayments = paymentResponse.data.find(
    (payments) => payments.payment_id === selectedReservation.payment_id
   );
   setPayments(selectedPayments);

   setFirstName(selectedGuest.first_name);
   setLastName(selectedGuest.last_name);
   setGuestEmail(selectedGuest.guest_email);
   setContactNumber(selectedGuest.contact_number);
   setPartySize(selectedGuest.party_size);
   setAddress(selectedGuest.address);

   setSpecialRequest(selectedReservation.special_requests);
  } catch (err) {
   console.error(err);
   setLoading(false);
  } finally {
   setLoading(false);
  }
 }
 useEffect(() => {
  (async () => await Load())();
 }, []);
 const [special_requests, setSpecialRequest] = useState("");
 const [arrival_time, setArrivalTime] = useState("");
 const handleArrivalTimeChange = (event) => {
  setArrivalTime(event.target.value);
 };

 const formatDateDisplay = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
 };

 const [saveLoading, setSaveLoading] = useState(false);

 async function update(event) {
  setSaveLoading(true);
  event.preventDefault();

  if (status === "Cancelled") {
   const result = await Swal.fire({
    title: "Confirm Cancellation",
    html: "Cancelling will declare payment status as <b>Failed</b>?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Proceed",
    reverseButtons: false,
    confirmButtonColor: "#006400",
    cancelButtonColor: "#808080",
   });
   if (result.isConfirmed) {
    const response = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/cancelled_reservation/${
      selectedReservation.reservation_id
     }`
    );
   }
  }

  const result = await Swal.fire({
   title: "Are you sure?",
   html: "Are you sure you want to save change made?",
   icon: "question",
   showCancelButton: true,
   cancelButtonText: "Cancel",
   confirmButtonText: "Proceed",
   reverseButtons: false,
   confirmButtonColor: "#006400",
   cancelButtonColor: "#808080",
  });

  if (result.dismiss === Swal.DismissReason.cancel) {
   setSaveLoading(false);
   return;
  }
  try {
   await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/guests/update/${
     selectedGuest.guest_id
    }`,
    {
     first_name: first_name,
     last_name: last_name,
     guest_email: guest_email,
     contact_number: contact_number,
     party_size: party_size,
     address: address,
    }
   );

   await axiosClient.put(
    `/reservation/update/${selectedReservation.reservation_id}`,
    {
     special_requests: special_requests,
     status: status,
    }
   );

   Swal.fire({
    icon: "success",
    title: "Update Successful",
    text: "The changes have been successfully updated.",
    confirmButtonColor: "#606060",
    timer: 4000,
    timerProgressBar: true,
   }).then(() => {
    LoadData();
    onClose(); // Close the modal after successful update
    Load();
   });
  } catch (err) {
   setSaveLoading(false);
   const response = err.response;
   setSaveLoading(false); // Reset loading state
   if (response && response.status === 422) {
    setErrors(response.data.errors);
   }
   Swal.fire({
    icon: "error",
    title: "Update Failed",
    text: "An error occurred while updating the reservation.",
    showConfirmButton: false,
    showCloseButton: true,
    focusClose: true,
   });
  }
 }

 async function deleteGuestReservation(reservation_id) {
  setLoading(true);
  if (!isAdmin) {
   const result = await Swal.fire({
    title: "Delete Error",
    text: "User is not permitted",
    icon: "warning",
    confirmButtonText: "I understand",
    reverseButtons: false, // Buttons order: Confirm - Cancel
    confirmButtonColor: "#CC0000",
   });

   if (result.isConfirmed) {
    onClose();
    return;
   }
  }

  const result = await Swal.fire({
   title: "Confirm Deletion",
   text: "Are you sure you want to delete this reservation?",
   icon: "warning",
   showCancelButton: true,
   cancelButtonText: "Cancel",
   confirmButtonText: "Yes, delete it",
   reverseButtons: false, // Buttons order: Confirm - Cancel
   confirmButtonColor: "#CC0000",
   cancelButtonColor: "#808080",
  });

  if (result.isConfirmed) {
   try {
    onClose();
    setLoading(false);

    await axios.delete(
     `${
      import.meta.env.VITE_API_BASE_URL
     }/api/reservation/delete/${reservation_id}`
    );
    await axios.delete(
     `${import.meta.env.VITE_API_BASE_URL}/api/guests/delete/${
      selectedGuest.guest_id
     }`
    );

    Swal.fire({
     title: "Deletion Successful",
     text:
      "The reservation and associated guest information have been successfully deleted.",
     icon: "success",
     confirmButtonColor: "#606060",
     timer: 4000,
     timerProgressBar: true,
    }).then(() => {
     onClose(); // Close the modal after successful deletion
     Load();
    });
   } catch (error) {
    setLoading(false);
    Swal.fire({
     icon: "error",
     title: "Update Error",
     text:
      "An error occurred while updating the reservation and guest information.",
     showConfirmButton: false,
     showCloseButton: true,
    });
   }
  }
 }

 const cld = new Cloudinary({
  cloud: {
   cloudName,
  },
 });

 return (
  <div
   className="bg-black bg-opacity-20 h-screen w-screen fixed top-0 left-0 flex justify-center items-center font-[Poppins]  fixed px-10"
   style={{ zIndex: "10" }}
  >
   {selectedReservation && (
    <div className="w-full flex justify-center h-full items-center ">
     {loading ? (
      <div className="edit-reservatiom-modal fadeInDown w-145 flex items-center ">
       <div className="w-full  flex justify-center items-center pt-4">
        <LoadingCircle />
       </div>
      </div>
     ) : (
      <div className=" fadeInDown min-w-145 w-[80%] h-[80%]     bg-white rounded-md shadow-md">
       <div className="w-full font-semibold tracking-widest  shadow-md sticky bg-forestgreen-100 text-white flex  justify-between  px-4 py-2  rounded-t-md ">
        <span className="text-lg">
         Reservation ID: {selectedReservation.reservation_id}
        </span>
        <span className=" items-center flex justify-end ml-auto ">
         <i
          className="fa fa-close text-xl text-white hover:cursor-pointer exit-icon"
          onClick={onClose}
         />
        </span>
       </div>

       <div className="h-[80%] desktop:h-[90%] win11:h-[90%] item-center flex  overflow-y-auto ">
        <div className="h-auto">
         <div className="">
          {errors && (
           <div className="bg-red-600 px-1 p-1 text-white rounded-md shadow-md">
            {Object.keys(errors).map((key) => (
             <p className="animated fadeInDown" key={key}>
              {errors[key][0]}
             </p>
            ))}
           </div>
          )}
         </div>
         <div className="grid grid-cols-2">
          {/**Column 1 */}
          <div className="p-4">
           <div className=" card-item  h-full shadow-md rounded-md w-full ">
            <div>
             <span className="font-semibold ">BOOKED ROOM</span>
            </div>
            <div className="py-1 ">
             <div className="flex  grid-cols-5 grid">
              <label className="text-md font-semibold col-span-1">Name:</label>
              <div className="pl-4  col-span-4 ">
               {selectedAccommodation.room_name}
              </div>
             </div>
             <div className="   grid-cols-5 grid">
              <label className="text-md font-semibold col-span-1">ID:</label>
              <div className="pl-4  col-span-4 whitespace-nowrap">
               {selectedAccommodation.accommodation_id}
              </div>
             </div>
             <div className=" grid-cols-5 grid">
              <label className="text-md font-semibold col-span-1">
               Capacity:
              </label>
              <div className="pl-4  col-span-4">
               {selectedAccommodation.capacity}
              </div>
             </div>
            </div>

            <Carousel
             showThumbs={false}
             autoPlay={true}
             infiniteLoop={true}
             className=" pt-10"
            >
             {publicId &&
              publicId
               // No need to use slice(1) anymore since we're filtering by content
               .filter((id) => !id.includes("leaf") && !id.includes("banner")) // Filter out ids containing 'leaf' or 'banner'
               .map((id, index) => (
                <div
                 key={index}
                 className="flex-col h-[20rem] win11:h-[30rem] rounded-md shadow-md w-full  relative"
                >
                 <AdvancedImage
                  className="rounded-md"
                  cldImg={cld.image(id)}
                  plugins={[responsive(), placeholder()]}
                 />
                </div>
               ))}
            </Carousel>
           </div>
          </div>
          {/**Column 2 */}
          <div className="p-4">
           <div className="card-item  rounded-md   w-full ">
            <div className="w-full flex items-center">
             <span className="font-semibold">
              Guest Details : {selectedReservation.guest_id}
             </span>

             <div className="flex ml-auto space-x-2">
              {!saveLoading ? (
               <button
                className="ml-auto flex items-center text-end border-2 bg-green-700 hover:bg-green-800 animated text-white rounded-md p-2 text-lg shadow-md "
                title="Save Changes"
                onClick={update}
               >
                <i className="fa-solid fa-save " />
               </button>
              ) : (
               <button
                className="ml-auto flex items-center text-end border-2 bg-green-700 animated text-white rounded-md p-2 text-lg shadow-md "
                title="Save Changes"
               >
                <i className="fa-solid fa-spinner fa-spin " />
               </button>
              )}

              {!loading ? (
               <span>
                {isAdmin && (
                 <button
                  className="ml-auto flex items-center text-end border-2 bg-red-700  hover:bg-red-800animated text-white rounded-md p-2 text-lg shadow-md "
                  title="Delete Reservation"
                  onClick={() =>
                   deleteGuestReservation(selectedReservation.reservation_id)
                  }
                 >
                  <i className="fa fa-trash" />
                 </button>
                )}
               </span>
              ) : (
               <button
                className="ml-auto flex items-center text-end border-2 bg-green-700 text-white rounded-md p-2 text-lg shadow-md "
                title="Save Changes"
                onClick={update}
               >
                <i className="fa-solid fa-spinner fa-spin " />
               </button>
              )}
             </div>
            </div>
            <div className="flex grid grid-cols-2 gap-4 w-full">
             <span>
              <label className="text-xs font-semibold">First Name</label>
              <input
               name="first_name"
               className="input-bookings "
               value={first_name}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder="First Name"
              />
             </span>
             <span>
              <label className="text-xs font-semibold">Last Name</label>
              <input
               name="last_name"
               className="input-bookings"
               value={last_name}
               onChange={(e) => setLastName(e.target.value)}
               placeholder="First Name"
              />
             </span>
            </div>

            <div className="flex space-x-4">
             <span className="w-full">
              <label className="text-xs font-semibold">Contact Number</label>
              <input
               name="contact_number"
               className="input-bookings"
               value={contact_number}
               onChange={(e) => setContactNumber(e.target.value)}
               placeholder="Email"
              />
             </span>
             <span className="w-full">
              <label className="text-xs font-semibold">Email</label>
              <input
               name="email"
               className="input-bookings"
               value={guest_email}
               onChange={(e) => setGuestEmail(e.target.value)}
               placeholder="Email"
              />
             </span>
            </div>

            <div className="flex space-x-4">
             <span className="w-full">
              <label className="text-xs font-semibold">Address</label>
              <input
               name="address"
               className="input-bookings"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               placeholder="Address"
              />
             </span>
             <span className="w-full">
              <label className="text-xs font-semibold">Party size</label>
              <input
               name="email"
               className="input-bookings"
               value={party_size}
               onChange={(e) => setPartySize(e.target.value)}
               placeholder="Email"
              />
             </span>
            </div>

            <div className="flex py-2 ">
             <span className="w-full">
              <label className="text-xs font-semibold">Special Request</label>{" "}
              <br />
              <textarea
               name="special_request row-2 "
               className="border-2 w-full rounded-md p-1 rows-3"
               value={special_requests}
               onChange={(e) => setSpecialRequest(e.target.value)}
               placeholder="Special Request"
              />
             </span>
            </div>

            <div className=" pb-1 rounded-md ">
             <div className="flex space-x-4">
              <span className="w-full">
               <label className="text-xs font-semibold">Check In</label>
               <input
                name="check_in_date"
                className="input-bookings"
                disabled
                value={formatDateDisplay(selectedReservation.check_in_date)}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="check_in_date"
               />
              </span>
              <span className="w-full">
               <label className="text-xs font-semibold">Check Out</label>
               <input
                name="check_out_date"
                className="input-bookings "
                disabled
                value={formatDateDisplay(selectedReservation.check_out_date)}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="check_out_date"
               />
              </span>
              <span className="w-full">
               <label className="text-xs font-semibold">Night/s Spent</label>
               <input
                name="total_nights"
                className="input-bookings "
                disabled
                value={selectedReservation.total_nights}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="total_nights"
               />
              </span>
             </div>
             <div className="flex grid-cols-3 grid gap-4">
              <span className="w-full">
               <label className="text-xs font-semibold">Arrival Time</label>
               <input
                name="arrival_time"
                className="input-bookings"
                disabled
                value={selectedReservation.arrival_time}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Arrival Time"
               />
              </span>
              <span className="w-full">
               <label className="text-xs font-semibold">
                Reservation Made At
               </label>
               <input
                name="created_at"
                className="input-bookings"
                disabled
                value={formatDateDisplay(selectedReservation.created_at)}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Reservation Made At"
               />
              </span>
              {/**Change Status */}
              <span className="w-full flex-col">
               <label className="text-xs font-semibold">Status</label> <br />
               <select
                name="status"
                className="border-2 rounded-md w-full  h-9 bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
               >
                <option value="Scheduled">Scheduled</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Cancelled">Cancelled</option>
               </select>
              </span>
             </div>
             <div className="flex gap-4 grid grid-cols-3">
              <span className="w-full">
               <label className="text-xs font-semibold">Payment Mode</label>
               <input
                name="created_at"
                className="input-bookings"
                disabled
                value={
                 payments && payments.payment_mode
                  ? payments.payment_mode.charAt(0).toUpperCase() +
                    payments.payment_mode.slice(1)
                  : ""
                }
               />
              </span>
              <span className="w-full">
               <label className="text-xs font-semibold">Method</label>
               <input
                name="created_at"
                className="input-bookings"
                disabled
                value={
                 payments && payments.payment_mode_online
                  ? payments.payment_mode_online.charAt(0).toUpperCase() +
                    payments.payment_mode_online.slice(1)
                  : ""
                }
               />
              </span>
              <span className="w-full">
               <label className="text-xs font-semibold">Payment Status </label>
               <input
                name="created_at"
                className="input-bookings"
                disabled
                value={
                 payments && payments.payment_status
                  ? payments.payment_status.charAt(0).toUpperCase() +
                    payments.payment_status.slice(1)
                  : ""
                }
               />
              </span>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     )}
    </div>
   )}
  </div>
 );
}

EditReservationModal.propTypes = {
 selectedReservation: PropTypes.object,
 payments: PropTypes.object, // You can define the exact shape of the object here
 onClose: PropTypes.func.isRequired,
};
