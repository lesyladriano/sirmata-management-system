import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function BookingSuccess() {
 const [loading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [countdown, setCountdown] = useState(10);
 const [message, setMessage] = useState("");

 const sendInvoice = async () => {
  try {
   const urlParams = new URLSearchParams(window.location.search);
   const reservationId = urlParams.get("reservation_id");
   const guestId = urlParams.get("guest_id");
   const paymentId = urlParams.get("payment_id");

   const result = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/send_guest_invoice`,
    {
     reservation_id: reservationId,
     guest_id: guestId,
     payment_id: paymentId,
    }
   );
   if (result.data.errors) {
    setIsSuccess(true);
    setMessage(result.data.errors);
   }

   Swal.close();
   setIsLoading(false);

   // Start countdown after sendInvoice is completed
   startCountdown();
  } catch (error) {
   console.error("Error fetching", error);
  }
 };

 const startCountdown = () => {
  const timer = setInterval(() => {
   setCountdown((prevCount) => {
    if (prevCount === 0) {
     clearInterval(timer); // Stop the countdown when it reaches zero
    }
    return prevCount - 1;
   });
  }, 1000);

  return () => clearInterval(timer);
 };

 // Update Payments
 useEffect(() => {
  setIsLoading(true);

  Swal.fire({
   title: "Processing your reservation",
   html:
    "<span style='color: red;'>Kindly await a moment as we finalize your reservation and generate your invoice.</span>",
   icon: "info",
   backdrop: "rgba(0,0,0,0.4)", // Adding backdrop for formal look
   allowOutsideClick: false, // Preventing manual closing
   showConfirmButton: false, // Hiding the confirm button
   allowEscapeKey: false, // Preventing closing via the Escape key
   didOpen: () => {
    Swal.showLoading();
   },
  });
  const update_expire_payments = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_API_BASE_URL}/api/payment_update_expire`
    );
    setIsSuccess(true);
   } catch (error) {
    console.error("Error fetching reservations:", error);
   }
  };
  update_expire_payments();
 }, []);

 useEffect(() => {
  if (isSuccess) {
   sendInvoice();
  }
 }, [isSuccess]);

 useEffect(() => {
  if (countdown === 0) {
   setTimeout(() => {
    // redirectToDocs();
    // window.location.href = "/home";
   }); // Delay of 5 seconds (adjust as needed)
  }
 }, [countdown]);

 const redirectToDocs = () => {
  // Open the specified URL in a new tab
  window.open(
   "https://docs.google.com/forms/d/1BdURsCqtKUrdDJIqyjpJYeE23Wm7OxfKEphBR9jnfkg/edit",
   "_blank"
  );
 };

 return (
  <div className="h-screen w-full flex mt-[2%] justify-center px-10">
   {!loading && (
    <div className="h-fit flex-col fadeInDown bg-white rounded-md shadow-md md:min-w-[30rem] md:w-[50%] w-full max-w-[35rem]">
     <div className="bg-brown-300 flex justify-center rounded-t-md py-2 shadow-md items-center">
      <img
       src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1693441880/Sirmata%20Images/Logo/yzbmqf8rp6lcwain2bea.png"
       className="w-[70%] md:w-[300px]"
       alt="Logo"
      />
     </div>

     <div className="font-[Poppins] space-y-10 p-4">
      <div className="font-semibold text-lg text-center pt-5">
       {!message
        ? "Your transaction has been successfully completed!"
        : "Transaction already completed."}
      </div>

      <div className="flex items-center justify-center w-full">
       <a href="/home" className="w-full">
        <button className="bg-forestgreen-500 py-2 px-4 w-full rounded-md shadow-md text-white font-semibold transition duration-300 hover:shadow-lg hover:bg-forestgreen-100">
         Return to Homepage
        </button>
       </a>
      </div>

      {/* <div className="flex items-center justify-center w-full">
       <a
        href="https://docs.google.com/forms/d/1BdURsCqtKUrdDJIqyjpJYeE23Wm7OxfKEphBR9jnfkg/edit"
        className="w-full"
        target="_blank"
        rel="noreferrer"
       >
        <button className="bg-forestgreen-600 py-2 px-4 w-full rounded-md shadow-md text-white font-semibold transition duration-300 hover:shadow-lg hover:bg-forestgreen-100">
         Take a Survey
        </button>
       </a>
      </div> */}
      <div className="text-center">
       In{" "}
       <span className="px-1 text-semibold">
        {!countdown <= 0 && countdown}
       </span>
       You will be redirected back home
      </div>
      <div className="w-full text-center text-md">
       {!message
        ? "An email containing the invoice for your transaction will be dispatched shortly. We appreciate your business and look forward to serving you again soon!"
        : "Your invoice has been dispatched to your email address. Please do not hesitate to reach out if you require further assistance."}
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

export default BookingSuccess;
