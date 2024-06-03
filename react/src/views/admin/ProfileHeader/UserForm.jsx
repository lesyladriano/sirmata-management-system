import {
 faAlignJustify,
 faEye,
 faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Axios from "axios";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";
import { useStateContext } from "../../../context/admin/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderBanner from "../../../components/misc/HeaderBanner";
import { FaCheck } from "react-icons/fa";

export default function UserForm() {
 const {
  user: loggedInUser,
  setUser: setLoggedInUser,
  token,
  setToken,
  isAdmin,
  setIsAdmin,
 } = useStateContext(); // Renaming variables

 const { id } = useParams();
 const [user, setUser] = useState({
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  contact_number: "",
  password: "",
  password_confirmation: "",
  account_type: "",
  position: "",
  profile_pic: null,
 });

 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState(null);
 const navigate = useNavigate();
 const [showPasswordFields, setShowPasswordFields] = useState(!id);
 const [isLoadingSave, setIsLoadingSave] = useState(false);
 const [canEdit, setCanEdit] = useState(false);
 const [makingNewUser, setIsMakingNewUser] = useState(false);
 const [verifedEmail, setVerifiedEmail] = useState("");
 const [cenEditAccountType, setCanEditAccountType] = useState(false);
 const [inputDisabled, setInputDisabled] = useState(true);
 const handleTogglePasswordFields = () => {
  setShowPasswordFields(!showPasswordFields);
 };

 useEffect(() => {
  if (!isAdmin) {
   if (Number(id) === Number(loggedInUser.id)) {
    setCanEdit(true);
   } else {
    setCanEdit(false);
   }
  } else {
   setCanEdit(true);
  }

  if (id) {
   setLoading(true);
   axiosClient
    .get(`/users/${id}`)
    .then(({ data }) => {
     setLoading(false);
     setUser(data);
     setVerifiedEmail(data.email);
     setIsEmailVerifed(true);
    })
    .catch(() => {
     setLoading(false);
    });
  } else {
   setIsMakingNewUser(true);
   setInputDisabled(false);
  }
 }, [id]);

 useEffect(() => {
  if (isAdmin) {
   setCanEditAccountType(true);
  } else {
   if (makingNewUser) {
    setCanEditAccountType(true);
   } else {
    setCanEditAccountType(false);
   }
  }
 }, []);

 const [imageSelected, setImageSelected] = useState("");
 const [originalEmail, setOriginalEmail] = useState("");
 const [imageUrl, setImageUrl] = useState("");
 {
  /**Submit */
 }

 const handleSuccess = async (result) => {
  const url = result.info.secure_url;
  setImageUrl(url);
 };

 const sendNotifyPasswordChange = async () => {
  try {
   const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/notify_change_password`,
    {
     changedUserId: user.id,
     loggedInUserId: loggedInUser.id,
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   return response.data;
  } catch (error) {
   console.error("Error sending notification:", error);
   throw error;
  }
 };

 const onSubmit = (ev) => {
  ev.preventDefault();
  setIsLoadingSave(true);
  setErrors("");

  if (!isEmailVerfied) {
   Swal.fire({
    icon: "warning",
    title: "Warning",
    text: "Please verify your email.",
    confirmButtonColor: "#ff0000",
   });
   setIsLoadingSave(false);
   return;
  }

  if (user.password) {
   if (user.password != user.password_confirmation) {
    Swal.fire({
     icon: "error",
     title: "Error Saving User",
     text: "Password does not match.",
     showCloseButton: true,
     showConfirmButton: false,
    });
    setIsLoadingSave(false);
    return;
   }
  }

  if (imageSelected) {
   const formData = new FormData();
   formData.append("file", imageSelected);
   formData.append("upload_preset", "sirmata_profile_pic");
   formData.append("folder", "Sirmata Images/Profile Pics");
   Axios.post(
    "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
    formData,
    {
     headers: {
      Accept: "*/*",
     },
    }
   )
    .then((response) => {
     const imageUrl = response.data.secure_url;
     const endpoint = user.id ? `/users/${user.id}` : "/users";
     axiosClient
      .request({
       url: endpoint,
       method: user.id ? "PUT" : "POST",
       data: {
        ...user,
        profile_pic: imageUrl,
       },
       headers: {
        Authorization: `Bearer ${token}`,
       },
      })
      .then((response) => {
       let swalOptions;

       if (!user.id) {
        // New User
        swalOptions = {
         icon: "info",
         title: "Success",
         text: "User has been created!",
        };
       } else if (user.email !== originalEmail) {
        swalOptions = {
         icon: "info",
         title: "Success",
         text: "User has been updated!",
        };
       } else {
        swalOptions = {
         icon: "success",
         title: "User Updated",
         confirmButtonColor: "#009900",
         text: "User information has been updated.",
        };
       }
       window.location.reload();
       Swal.fire(swalOptions).then(() => {
        setIsLoadingSave(false);
       });
      })

      .catch((err) => {
       console.log(err);
       const response = err.response;
       setIsLoadingSave(false); // Reset loading state
       if (response && response.status === 422) {
        setErrors(response.data.errors);
       }
      });
    })
    .catch((error) => {
     setIsLoadingSave(false); // Reset loading state
     Swal.fire({
      icon: "error",
      title: "Image Save Failed",
      text: "An error occurred while saving the image.",
      showCloseButton: true,
      showConfirmButton: false,
     });
    });
  } else {
   const endpoint = user.id ? `/users/${user.id}` : "/users";

   axiosClient
    .request({
     url: endpoint,
     method: user.id ? "PUT" : "POST",
     data: {
      ...user,
     },
    })

    .then((response) => {
     let swalOptions;

     if (!user.id) {
      // New User
      swalOptions = {
       icon: "success",
       title: "User Created",
       text: "New user has been created successfully.",
      };
     } else {
      // Existing User, Email Not Changed
      if (user.password) {
       sendNotifyPasswordChange();
      }

      swalOptions = {
       icon: "success",
       title: "User Updated",
       confirmButtonColor: "#009900",
       text: "User information has been updated.",
      };
     }

     Swal.fire(swalOptions).then(() => {
      setIsLoadingSave(false);
      window.location.reload();
     });
    })

    .catch((err) => {
     Swal.fire({
      icon: "error",
      title: "Error Saving User",
      text: "An error occurred while saving the user.",
      showCloseButton: true,
      showConfirmButton: false,
     });

     console.log(err);
     const response = err.response;
     setIsLoadingSave(false); // Reset loading state
     if (response && response.status === 422) {
      setErrors(response.data.errors);
     }
    });
  }
 };

 {
  /**Enable Edit */
 }

 const toggleInputDisabled = () => {
  setInputDisabled((prev) => !prev); // Toggle the state of inputDisabled
 };

 const [showPassword1, setShowPassword1] = useState(false);

 const togglePasswordVisibility1 = (ev) => {
  ev.preventDefault();
  setShowPassword1((prevShowPassword) => !prevShowPassword);
 };

 const [showPassword2, setShowPassword2] = useState(false);

 const togglePasswordVisibility2 = (ev) => {
  ev.preventDefault();
  setShowPassword2((prevShowPassword2) => !prevShowPassword2);
 };

 const [showSendToken, setShowSendToken] = useState(false);
 const [generatedVerifyToken, setGeneratedVerifyToken] = useState("");
 const [isEmailVerfied, setIsEmailVerifed] = useState(false);
 const [inputToken, setInputToken] = useState("");
 const [sendEmailLoading, setSendEmailLoading] = useState(false);
 const [email, setEmail] = useState(false);

 const handleEmailInputChange = (event) => {
  const email = event.target.value;
  if (email !== verifedEmail) {
   setIsEmailVerifed(false);
   setShowSendToken(true);
   setGeneratedVerifyToken("ya");
   setEmail(email);
  } else {
   setIsEmailVerifed(true);
  }
 };

 const handleToken = (event) => {
  const token = event.target.value;
  setInputToken(token);
 };

 //  Checkpoint
 const sendVerifyToken = async (event) => {
  setSendEmailLoading(true);
  const generateRandomToken = () => {
   return Math.floor(100000 + Math.random() * 900000);
  };
  const verificationToken = generateRandomToken(); // Call the function to get the token value
  setGeneratedVerifyToken(verificationToken);

  const isEmailExist = await axios.get(
   `${import.meta.env.VITE_API_BASE_URL}/api/does_email_exist`,
   {
    params: {
     email: email,
    },
   }
  );
  // Checkpoint
  if (isEmailExist.data.user) {
   Swal.fire({
    icon: "warning",
    title: "Warning",
    text: "Email already exists",
    confirmButtonColor: "#ff0000",
   });
   setSendEmailLoading(false);
   return;
  }

  const encodedToken = btoa(verificationToken);

  try {
   await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/send-email?email=${encodeURIComponent(
     email
    )}&verificationTokenEncoded=${encodedToken}`
   );
   Swal.fire({
    icon: "success",
    title: "Email Has been sent!",
    text: "Please check your email and spam folder for the token.",
    confirmButtonColor: "#009900",
   });
   setSendEmailLoading(false);
  } catch (error) {
   console.error("Error sending email:", error);
   setSendEmailLoading(false);
  }
 };

 const verifyToken = async (event) => {
  if (+inputToken === +generatedVerifyToken) {
   setIsEmailVerifed(true);
   setGeneratedVerifyToken(null);
   setVerifiedEmail(email);

   Swal.fire({
    icon: "success",
    title: "Email Has been verifed!",
    text: "You may now proceed.",
    confirmButtonColor: "#009900",
   });
  } else {
   Swal.fire({
    icon: "warning",
    title: "Warning",
    text: "Token does not match",
    confirmButtonColor: "#ff0000",
   });
  }
 };

 const handleGoBack = () => {
  window.history.back(); // Navigate back using the browser's history
 };

 return (
  <div className="w-full uppercase">
   <HeaderBanner banner={"User Profile"} />

   <div className="flex w-full  px-10 py-10 justify-center ">
    <div className="card w-full flex pt-5 justify-center  ">
     {/** Container*/}
     <div className=" w-130 win11:w-7/12">
      <div className="   card-item h-fit rounded-md p-2">
       <div className="flex">
        <span className="text-xl font-[Poppins] items-center flex ">
         <Link to="/users" title="Return to Users ">
          <i className="fa-solid fa-users text-dark-50 hover:text-black text-xl mr-1 items-center text-center" />
         </Link>
         {user.id ? (
          <h1>
           <span className="uppercase tracking-wider font-bold">
            User ID: {user.id}
           </span>
          </h1>
         ) : (
          <h1>
           <b>New User</b>
          </h1>
         )}
        </span>

        <span className="ml-auto flex items-center space-x-5">
         {user.id && (
          <span>
           {loggedInUser.account_type === "admin" ||
           loggedInUser.id === user.id ? (
            <div className="" title="Edit">
             <i
              className="fa-solid fa-pen-to-square text-2xl text-green-500 hover:text-green-700 hover:cursor-pointer transition ease-in-out duration-0.5s"
              onClick={toggleInputDisabled}
             />
            </div>
           ) : null}
          </span>
         )}
         <button onClick={handleGoBack}>
          <i className="fa-solid fa-square-xmark text-dark-50 hover:text-black text-3xl" />
         </button>
        </span>
       </div>

       {loading ? (
        <div className="w-full flex justify-center ">
         <LoadingCircle />
        </div>
       ) : (
        <div className=" flex-col">
         <div className=" px-4 space-y-2  ">
          <div>
           {user.profile_pic ? (
            <div className=" h-50 flex justify-center ">
             {imageSelected ? (
              <img
               src={URL.createObjectURL(imageSelected)}
               alt="Selected Image"
               className=" w-50 h-50 rounded-full border-2 border-gray-900 object-center"
              />
             ) : (
              //May Profile Pic
              <span className="my-4">
               <img
                src={user.profile_pic}
                className="rounded-full border-2 border-gray-900   h-50 w-50 object-cover "
               />
              </span>
             )}
            </div>
           ) : (
            <div className="text-center  h-50   justify-center flex">
             {imageSelected ? (
              <img
               src={URL.createObjectURL(imageSelected)}
               alt="Selected Image"
               className=" w-50 rounded-full border-2 border-gray-900 h-full object-center"
              />
             ) : (
              //If No / New Profile
              <span className="text-center  h-50  justify-center flex">
               <img
                src="https://res.cloudinary.com/di0nkj5kz/image/upload/v1692438363/Sirmata%20Images/Profile%20Pics/user_dldofn.jpg"
                className="rounded-full border-2 border-gray-900 h-full object-center"
               />
              </span>
             )}
            </div>
           )}
          </div>

          <span>
           {/**Upload Image */}
           {user.profile_pic ? (
            <div className="mt-5 flex items-center justify-center ">
             <label
              className={` ${
               inputDisabled
                ? "bg-gray-500 text-gray-300"
                : "bg-dark-50 hover:bg-black text-white"
              } rounded-full whitespace-nowrap px-2 py-1 relative transition duration-.3s ease-in-out  `}
             >
              <input
               type="file"
               onChange={(event) => {
                setImageSelected(event.target.files[0]);
               }}
               className={`absolute inset-0 w-full h-full opacity-0 ${
                inputDisabled ? "text-color-gray-200  " : ""
               }`}
               disabled={inputDisabled}
              />
              <span className="text-white ">Upload File</span>
             </label>
            </div>
           ) : (
            <div className="mt-2 flex items-center justify-center">
             <label
              className={`   ${
               inputDisabled
                ? "bg-gray-500 text-gray-300"
                : "bg-dark-50 hover:bg-black text-white"
              } rounded-full whitespace-nowrap p-2 relative transition duration-.3s ease-in-out  `}
             >
              <input
               type="file"
               disabled={inputDisabled && user.id}
               onChange={(event) => {
                setImageSelected(event.target.files[0]);
               }}
               className="absolute inset-0 w-full h-full opacity-0 "
              />
              <span className="text-white  ">Upload File</span>
             </label>
            </div>
           )}
          </span>

          <div className=" mt-4 py-6  w-full">
           <div className="flex grid-cols-2 text-sm tracking-wide gap-4 w-full">
            <span className="w-full">
             <label className="text-sm font-semibold ">First Name</label>
             <input
              name="first_name"
              className={`input-users ${
               inputDisabled && user.id ? "input-disabled" : ""
              }`}
              disabled={inputDisabled && user.id}
              value={user.first_name}
              onChange={(ev) =>
               setUser({ ...user, first_name: ev.target.value })
              }
              placeholder="First Name"
             />
            </span>

            <span className=" w-full">
             <label className="text-sm font-semibold">Last Name</label>
             <input
              name="last_name"
              className={`input-users ${
               inputDisabled && user.id ? "input-disabled" : ""
              }`}
              disabled={inputDisabled && user.id}
              value={user.last_name}
              onChange={(ev) =>
               setUser({ ...user, last_name: ev.target.value })
              }
              placeholder="Last Name"
             />
            </span>
           </div>

           <div className="flex grid-cols-2 grid gap-4 ">
            <span>
             <label className="text-sm font-semibold">Contact Number</label>
             <input
              className={`input-users ${
               inputDisabled && user.id ? "input-disabled" : ""
              }`}
              disabled={inputDisabled && user.id}
              name="contact_number"
              value={user.contact_number}
              onChange={(ev) =>
               setUser({ ...user, contact_number: ev.target.value })
              }
              placeholder="Contact Number"
             />
            </span>

            <div className="w-full ">
             <label className="text-sm font-semibold ">Email</label>
             {isEmailVerfied && (
              <div className="flex item-center justify-end  w-full">
               <span className="flex absolute  pt-2.5 text-green-700 pr-1">
                <FaCheck />
               </span>
              </div>
             )}

             <input
              style={{ paddingRight: "2rem" }}
              className={`input-users ${
               inputDisabled && user.id ? "input-disabled" : ""
              }`}
              disabled={inputDisabled && user.id}
              name="email"
              value={user.email}
              onChange={(ev) => {
               // Update email field
               setUser({ ...user, email: ev.target.value });
               // Perform additional action
               handleEmailInputChange(ev); // Pass the value if needed
              }}
              placeholder="Email"
             />
            </div>

            {!isEmailVerfied && (
             <div className="col-span-2 grid grid-cols-2 ">
              <div />
              {generatedVerifyToken && (
               <div className=" grid col-span-2 pl-4 grid-cols-2">
                <div></div>
                {generatedVerifyToken && (
                 <div className="">
                  <input
                   className={`input-users `}
                   onChange={(ev) => {
                    handleToken(ev); // Pass the value if needed
                   }}
                   placeholder="Token"
                  />
                 </div>
                )}
                <div></div>
                <div className=" py-2">
                 <div />
                 <div className="w-full flex justify-between">
                  <button
                   disabled={sendEmailLoading}
                   onClick={sendVerifyToken}
                   className={` animated hover:bg-forestgreen-100 bg-green-600 text-white rounded-md px-2 py-1 fadeInDown`}
                  >
                   {sendEmailLoading ? (
                    <i className="fa-solid fa-spinner fa-spin px-8"></i>
                   ) : (
                    "Send Token"
                   )}
                  </button>
                  <button
                   onClick={verifyToken}
                   className={` animated hover:bg-forestgreen-100 bg-green-600 text-white rounded-md px-2 py-1 fadeInDown`}
                  >
                   Verify Token
                  </button>
                 </div>
                </div>
               </div>
              )}
             </div>
            )}
           </div>

           <div className="grid grid-cols-2 gap-4">
            <div className="whitespace-nowrap flex text-sm w-full ">
             <div className=" w-full">
              <label className="text-sm font-semibold ">Account Type</label>
              <select
               value={user.account_type}
               onChange={(ev) =>
                setUser({ ...user, account_type: ev.target.value })
               }
               disabled={!cenEditAccountType || inputDisabled}
               className="input-select w-full"
              >
               <option value="">Select Account Type</option>
               <option value="admin">Admin</option>
               <option value="employee">Employee</option>
              </select>
             </div>
            </div>
            <span className="">
             <label className="text-sm font-semibold ">Position</label>
             <input
              className={`input-users ${
               inputDisabled && user.id ? "input-disabled" : ""
              }`}
              disabled={!cenEditAccountType || inputDisabled}
              name="position"
              value={user.position}
              onChange={(ev) => setUser({ ...user, position: ev.target.value })}
              placeholder="Position"
             />
            </span>
           </div>

           {errors && (
            <div className="alert px-2 py-1 mt-2">
             {Object.keys(errors).map((key) => (
              <p className="animated fadeInDown" key={key}>
               {errors[key][0]}
              </p>
             ))}
            </div>
           )}
          </div>
         </div>

         <div className=" rounded-md px-4">
          <form onSubmit={onSubmit} className=" ">
           <div className="hidden">
            <div className="flex grid-cols-2 grid gap-6 ">
             <span>
              <label className="">First Name</label>
              <input
               name="first_name"
               className={`input-users ${
                inputDisabled && user.id ? "input-disabled" : ""
               }`}
               disabled={inputDisabled && user.id}
               value={user.first_name}
               onChange={(ev) =>
                setUser({ ...user, first_name: ev.target.value })
               }
               placeholder="First Name"
              />
             </span>

             <span>
              <label className="text-xs">Last Name</label>
              <input
               name="last_name"
               className={`input-users ${
                inputDisabled && user.id ? "input-disabled" : ""
               }`}
               disabled={inputDisabled && user.id}
               value={user.last_name}
               onChange={(ev) =>
                setUser({ ...user, last_name: ev.target.value })
               }
               placeholder="Last Name"
              />
             </span>
            </div>
           </div>

           {/* Checkpoint */}
           {showPasswordFields && (
            <div className="flex justify-center grid grid-cols-2 gap-4 ">
             <span className="">
              <label className="text-sm font-semibold">Password</label>

              <div className="flex ">
               <div className=" flex w-full ">
                <input
                 style={{ paddingRight: "2rem" }}
                 className={`border-2 border-black input-users ${
                  inputDisabled && user.id ? "input-disabled" : ""
                 }`}
                 disabled={inputDisabled && user.id}
                 name="password"
                 type={showPassword1 ? "text" : "password"}
                 onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                 }
                 placeholder="Password"
                />
                <div className="flex items-center  justify-center  ">
                 <span className=" absolute  pr-6 ">
                  <FontAwesomeIcon
                   icon={showPassword1 ? faEye : faEyeSlash}
                   className="text-sm hover:cursor-pointer"
                   onClick={togglePasswordVisibility1}
                  />
                 </span>
                </div>
               </div>
              </div>
             </span>

             <span>
              <label className="text-sm font-semibold">Confirm Password</label>
              <div className="flex ">
               <div className="w-full flex">
                <input
                 style={{ paddingRight: "2rem" }}
                 className={`input-users w-full ${
                  inputDisabled && user.id ? "input-disabled" : ""
                 }`}
                 disabled={inputDisabled && user.id}
                 name="password_confirmation"
                 type={showPassword2 ? "text" : "password"}
                 onChange={(ev) =>
                  setUser({ ...user, password_confirmation: ev.target.value })
                 }
                 placeholder="Password Confirmation"
                />
                <div className="flex items-center  justify-center  ">
                 <span className=" absolute pr-8  ">
                  <FontAwesomeIcon
                   icon={showPassword2 ? faEye : faEyeSlash}
                   className="text-sm "
                   onClick={togglePasswordVisibility2}
                  />
                 </span>
                </div>
               </div>
              </div>
             </span>
            </div>
           )}

           <div className="mt-2 flex ">
            <button
             className={` rounded-full text-white btn-block mt-auto  py-1 shadow-md  transition ease-in-out duration-0.5s ${
              !inputDisabled || makingNewUser
               ? "bg-green-500 hover:cursor-pointer hover:bg-green-700"
               : "bg-dark-50 text-white"
             }`}
             disabled={!canEdit || (inputDisabled && !makingNewUser)}
            >
             {isLoadingSave ? (
              <i className="fa fa-spinner fa-spin"></i>
             ) : (
              "Save"
             )}
            </button>

            {makingNewUser ? null : loggedInUser.account_type === "admin" ||
              loggedInUser.id === user.id ? (
             <button
              type="button"
              className="bg-dark-50 text-white btn-block mt-auto rounded-full py-1 shadow-md hover:bg-black ml-2 transition ease-in-out duration-0.5s"
              onClick={handleTogglePasswordFields}
             >
              {showPasswordFields ? "Hide Password" : "Modify Password"}
             </button>
            ) : null}
           </div>
          </form>
         </div>
        </div>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
