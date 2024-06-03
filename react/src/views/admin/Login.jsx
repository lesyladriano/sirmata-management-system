import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sirmataLogo from "../../assets/images/sirmata_logo.png";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/admin/ContextProvider";
import "../../assets/css/layouts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
 const [showforgotPassword, setShowForgotPassword] = useState(false);

 useEffect(() => {
  // Function to get URL parameters
  const getURLParameter = (name) => {
   const params = new URLSearchParams(window.location.search);
   return params.get(name);
  };

  // Check if showForgotPassword parameter is true in the URL
  const isShowForgotPassword = getURLParameter("showForgotPassword") === "true";

  // Set the state based on the URL parameter
  setShowForgotPassword(isShowForgotPassword);
 }, []);

 const handleTogglePassword = () => {
  setShowPassword(!showPassword);
 };

 const [allusers, setAllUsers] = useState("");
 useEffect(() => {
  getAllUsers();
 }, []);

 const getAllUsers = () => {
  axiosClient.get(`/users-all`).then(({ data }) => {
   setAllUsers(data.data);
  });
 };

 const [emailAddress, setEmailAddress] = useState("");
 const [noMatchingEmail, setNoMatchingEmailMessage] = useState(null);

 const [loading, setLoading] = useState(false);

 const [isCaptchaSolvedPassword, setIsCaptchaSolvedPassword] = useState(false);
 const [isCaptchaSolvedPasswordMessage, setIsCaptchaSolvedPasswordMessage] =
  useState(null);

 function onChangePasswordReset(value) {
  setIsCaptchaSolvedPassword(true);
 }

 const sendResetEmail = async () => {
  setLoading(true);
  setNoMatchingEmailMessage(""); // Reset the message

  // Check if reCAPTCHA challenge is solved
  if (!isCaptchaSolvedPassword) {
   setIsCaptchaSolvedPasswordMessage("Please Solve reCAPTCHA");
   setLoading(false); // Reset the loading state
   return;
  }

  const matchedUser = allusers.find((user) => user.email === emailAddress);

  if (matchedUser) {
   const userId = matchedUser.id;
   try {
    await axios.get(
     `${
      import.meta.env.VITE_API_BASE_URL
     }/password-reset?email=${encodeURIComponent(
      emailAddress
     )}&userId=${userId}`
    );
    setLoading(false);
    // Show success alert
    setEmailAddress("");
    Swal.fire({
     icon: "success",
     title: "Password Reset",
     text: "Password reset email has been sent successfully.",
     timer: 5000,
     timerProgressBar: true,
     showConfirmButton: false,
    });

    setShowForgotPassword(false);
   } catch (error) {
    // Show error alert
    setLoading(false);
    Swal.fire({
     icon: "error",
     title: "Email Sending Error",
     text: "An error occurred while sending the password reset email.",
     showConfirmButton: false,
     showCloseButton: true,
    });
   }
  } else {
   setLoading(false);
   setNoMatchingEmailMessage(
    "Cannot find email. Please try again or contact your Admin"
   );
   Swal.fire({
    icon: "warning",
    title: "Email Not Found",
    text:
     "Cannot find the provided email address. Please try again or contact your admin.",
    confirmButtonColor: "#606060",
   });
  }
 };

 const emailRef = useRef();
 const passwordRef = useRef();
 const { setUser, setToken } = useStateContext();

 const [errors, setErrors] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

 const [showPassword, setShowPassword] = useState(false);

 const togglePasswordVisibility = (ev) => {
  ev.preventDefault();
  setShowPassword((prevShowPassword) => !prevShowPassword);
 };

 const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
 const [isCaptchaLoginMessage, setIsCaptchaLoginMessage] = useState("");

 function onChange() {
  setIsCaptchaSolved(true);
 }

 //  axios.get('/sanctum/csrf-cookie')
 //   .then(response => {
 //     console.log(response)
 //   })
 //   .catch(error => {
 //     console.log(error)
 //   });

 const onSubmit = (ev) => {
  ev.preventDefault();
  setIsLoading(true);

  if (!isCaptchaSolved) {
   setIsCaptchaLoginMessage("Please solve the reCAPTCHA");
   setIsLoading(false); // Don't forget to reset isLoading
   return;
  }

  const payload = {
   email: emailRef.current.value,
   password: passwordRef.current.value,
  };

  setErrors(null);

  axiosClient
   .post("/login", payload, {
    headers: {
     Accept: "*/*",
    },
   })
   .then(({ data }) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("TOKEN_EXPIRE", data.tokenExpire);
   })
   .catch((err) => {
    const response = err.response;
    Swal.fire({
     icon: "warning",
     title: "Warning",
     text: response.data.message,
     confirmButtonColor: "#ff0000",
    });
    if (response && response.status === 422) {
     if (response.data.errors) {
      console.log("Validation Errors:", response.data.errors);

      setErrors(response.data.errors);
     } else {
      console.log("Non-validation Error:", response.data.message);
      setErrors({
       email: [response.data.message],
      });
     }
    }
   })
   .finally(() => {
    setIsLoading(false);
   });
 };

 const handleForgotPassword = () => {
  setShowForgotPassword(!showforgotPassword);
  setIsCaptchaSolvedPasswordMessage("");
  setIsCaptchaLoginMessage("");
 };

 return (
  <div className="w-full flex justify-center items-center h-screen tracking-wider  ">
   {!showforgotPassword ? (
    <div className="bg-white shadow-lg rounded-lg p-6 animated fadeInDown">
     <div className="form ">
      <div className="w-full justify-end flex"></div>
      <form onSubmit={onSubmit}>
       <Link to="/home">
        <div className="flex justify-center items-center">
         <img src={sirmataLogo} alt="Sirmata Logo" className="w-52 h-36" />
        </div>
       </Link>

       <p className="title ">Sign in to your Account</p>
       {errors && (
        <div className="bg-red-600 rounded-md shadow-sm p-1 text-white">
         {Object.keys(errors).map((key) => (
          <p className="animated fadeInDown" key={key}>
           {errors[key][0]}
          </p>
         ))}
        </div>
       )}
       {isCaptchaLoginMessage && (
        <div className="bg-red-900 rounded-md p-1 text-white shadow-md fadeInDown my-1 text-xs italic">
         {isCaptchaLoginMessage}
        </div>
       )}

       <div className="mb-6">
        <label
         htmlFor="email"
         className="block text-sm font-medium text-gray-700"
        >
         Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
         <input
          ref={emailRef}
          name="email"
          type="email"
          placeholder="Enter your email"
          id="email"
          className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm focus:outline-none sm:text-sm"
         />
        </div>
       </div>

       <div className="mb-6">
        <label
         htmlFor="password"
         className="block text-sm font-medium text-gray-700"
        >
         Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
         <input
          ref={passwordRef}
          name="password"
          type={showPassword ? "text" : "password"}
          className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm focus:outline-none sm:text-sm"
          placeholder="Enter your password"
         />
         <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
          onClick={togglePasswordVisibility}
         >
          <FontAwesomeIcon
           icon={showPassword ? faEye : faEyeSlash}
           className="h-5 w-5"
          />
         </button>
        </div>
       </div>

       <div className="mt-2 text-right text-sm">
        <div
         href="#"
         className="text-forestgreen-300 hover:underline cursor-pointer"
         onClick={handleForgotPassword}
        >
         Forgot Password?
        </div>
       </div>
       <div className="mt-2">
        <ReCAPTCHA
         className=""
         sitekey={import.meta.env.VITE_REACT_APP_RECAPTCHA_KEY}
         onChange={onChange}
        />
       </div>

       <div className="mt-6">
        <button
         className="w-full py-2 px-4 bg-forestgreen-100 text-white rounded-md hover:bg-forestgreen-600 tracking-wider"
         disabled={isLoading} // Disable the button if isLoading is true or reCAPTCHA is not solved
        >
         {isLoading ? <i className="fa fa-spinner fa-spin" /> : "Login"}
        </button>
       </div>
      </form>
     </div>
    </div>
   ) : (
    <div className="bg-white  p-6 animated fadeInDown  rounded-md shadow-md">
     <div className="form">
      <div className="w-full justify-between flex ">
       <div
        href="#"
        className="text-forestgreen-300 hover:underline  fa-xl"
        onClick={handleForgotPassword}
       >
        <i className="fa-solid fa-arrow-left text-black" />
       </div>
      </div>
      <div className="w-full justify-center flex object-cover">
       <img
        src={sirmataLogo}
        alt="Sirmata Logo"
        className=" w-[200px] h-[120px] object-cover"
       />
      </div>
      <p className="text-lg text-center py-2">Find your account</p>
      {errors && (
       <div className="">
        {Object.keys(errors).map((key) => (
         <p className="animated fadeInDown" key={key}>
          {errors[key][0]}
         </p>
        ))}
       </div>
      )}
      <div className="py-1  ">
       {noMatchingEmail && (
        <div className="bg-red-900 rounded-md p-1 text-white shadow-md fadeInDown my-1 text-xs italic">
         {noMatchingEmail}
        </div>
       )}

       {isCaptchaSolvedPasswordMessage && (
        <div className="bg-red-900 rounded-md p-1 text-white shadow-md fadeInDown my-1 text-xs italic">
         {isCaptchaSolvedPasswordMessage}
        </div>
       )}
       <label htmlFor="email" className="block text-gray-700 font-medium">
        Email
       </label>
       <div className="">
        <input
         name="email"
         type="email"
         onChange={(event) => setEmailAddress(event.target.value)}
         value={emailAddress || ""}
         placeholder="Enter your email"
         id="email"
         className="block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
         required
        />
       </div>
      </div>

      <div className="mt-2">
       <ReCAPTCHA
        className=""
        sitekey={import.meta.env.VITE_REACT_APP_RECAPTCHA_KEY}
        onChange={onChangePasswordReset}
       />
      </div>

      <div className="mt-3">
       <button
        className=" w-full py-2 px-4 bg-forestgreen-100 text-white rounded-md hover:bg-forestgreen-600 tracking-wider"
        onClick={sendResetEmail}
       >
        {loading ? (
         <i className="fa fa-spinner fa-spin" />
        ) : (
         "Send password reset"
        )}
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
