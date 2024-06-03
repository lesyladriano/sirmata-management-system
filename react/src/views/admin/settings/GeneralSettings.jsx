import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import ContactModal from "./ContactsModal";
import { useStateContext } from "../../../context/admin/ContextProvider";

export default function GeneralSettings() {
 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();
 const [loading, setLoading] = useState(false);
 const info_id = 1;
 const [selectedInfo, setSelectedInfo] = useState(null);

 useEffect(() => {
  Load();
 }, []);

 async function Load() {
  setLoading(true);
  setErrors();

  try {
   const result = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/web`
   );

   const matchInfo = result.data.find(
    (web_info) => web_info.info_id === info_id
   );

   setSelectedInfo(matchInfo || null);
  } catch (error) {
   console.error("Error loading accommodations:", error);
  }

  setLoading(false);
 }

 useEffect(() => {
  if (selectedInfo) {
   populateFormFields(selectedInfo);
  }
 }, [selectedInfo]);

 const [imageSelected, setImageSelected] = useState("");
 const [imageUrl, setImageUrl] = useState("");
 const [loadingImageUpload, setLoadingImageUpload] = useState(false);

 const uploadImg = async () => {
  setLoadingImageUpload(true);
  if (imageSelected) {
   const formData = new FormData();
   formData.append("file", imageSelected);
   formData.append("upload_preset", "sirmata_profile_pic");
   formData.append("folder", "Sirmata Images/Logo");

   try {
    const cloudinaryResponse = await axios.post(
     "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
     formData,
     {
      headers: {
       Accept: "*/*",
      },
     }
    );
    const newImageUrl = cloudinaryResponse.data.secure_url;
    setImageUrl(newImageUrl);

    const updateData = {
     website_logo: newImageUrl,
     info_id: info_id,
     official_email: official_email,
     contact_number: contact_number,
     weekday_opening_time: weekday_opening_time,
     weekend_opening_time: weekend_opening_time,
     facebook_link: facebook_link,
     tiktok_link: tiktok_link,
     instagram_link: instagram_link,
     website_name: website_name,
     location: location,
     tagline: tagline,
     map_link: map_link,
    };

    const infoId = 1;
    await axios.put(
     `${import.meta.env.VITE_API_BASE_URL}/api/web/update/${infoId}`,
     updateData,
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json", // Adjust content type as needed
      },
     }
    );
    setLoadingImageUpload(false);
    await Swal.fire({
     icon: "success",
     title: "Logo Image Uploaded",
     text: "Your logo image has been successfully uploaded!",
     position: "top-end",
     showConfirmButton: false,
     timer: 4500,
     timerProgressBar: true,
    });

    Load();
    setImageSelected("");
   } catch (error) {
    setLoadingImageUpload(false);
    await Swal.fire({
     icon: "error",
     title: "Logo Update Failed",
     text: "There was an error while updating the logo image.",
     showConfirmButton: false,
     showCloseButton: true,
    });
   }
  }
 };

 const [official_email, setOfficialEmail] = useState("");
 const [website_logo, setWebsiteLogo] = useState("");
 const [contact_number, setContactNumber] = useState("");
 const [weekday_opening_time, setWeekdayOpening] = useState("");
 const [weekend_opening_time, setWeekendOpening] = useState("");
 const [facebook_link, setFacebookLink] = useState("");
 const [tiktok_link, setTiktokLink] = useState("");
 const [instagram_link, setInstagramLink] = useState("");
 const [website_name, setWebsiteName] = useState("");
 const [location, setLocation] = useState("");
 const [web_info, setUsers] = useState([]);
 const [tagline, setTagline] = useState("");
 const [map_link, setMapLink] = useState("");

 async function populateFormFields(selectedInfo) {
  setOfficialEmail(selectedInfo.official_email);
  setContactNumber(selectedInfo.contact_number);
  setWeekdayOpening(selectedInfo.weekday_opening_time);
  setWeekendOpening(selectedInfo.weekend_opening_time);
  setFacebookLink(selectedInfo.facebook_link);
  setTiktokLink(selectedInfo.tiktok_link);
  setInstagramLink(selectedInfo.instagram_link);
  setWebsiteName(selectedInfo.website_name);
  setLocation(selectedInfo.location);
  setTagline(selectedInfo.tagline);
  setMapLink(selectedInfo.map_link);
 }

 {
  /**Enable Edit */
 }
 const [inputDisabled, setInputDisabled] = useState(true);

 const toggleInputDisabled = () => {
  setInputDisabled((prev) => !prev); // Toggle the state of inputDisabled
 };

 const [loadingSave, setLoadingSave] = useState(null);
 const [errors, setErrors] = useState(null);

 async function update(event) {
  setErrors("");
  setLoadingSave(true);

  event.preventDefault();

  try {
   await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/web/update/` + info_id,
    {
     info_id: info_id,
     official_email: official_email,
     contact_number: contact_number,
     weekday_opening_time: weekday_opening_time,
     weekend_opening_time: weekend_opening_time,
     facebook_link: facebook_link,
     tiktok_link: tiktok_link,
     instagram_link: instagram_link,
     website_name: website_name,
     location: location,
     tagline: tagline,
     map_link: map_link,
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type as needed
     },
    }
   );
   setLoadingSave(false);

   Load();
   setInputDisabled(true);
   await Swal.fire({
    icon: "success",
    title: "General Info Updated",
    text: "Information has been successfully updated.",
    showConfirmButton: false,
    timer: 4500, // 3 seconds
    timerProgressBar: true,
    position: "top-end",
   });
  } catch (err) {
   if (err.response && err.response.data && err.response.data.errors) {
    setErrors(err.response.data.errors);
   }

   setLoadingSave(false);

   await Swal.fire({
    icon: "error",
    title: "Update Failed",
    text: "There was an error updating the information.",
    showConfirmButton: false,
    showCloseButton: true,
   });
  }
 }

 {
  /** More Info */
 }
 const [showContactsModal, setShowContactsModal] = useState(false);

 const handleToggleContactModal = () => {
  setShowContactsModal(true);
 };

 const handleCloseContactModal = () => {
  setShowContactsModal(false);
  Load();
 };

 function formatAndRenderContactNumbers(numbers) {
  if (!numbers) {
   return "";
  }

  const numberArray = numbers.split(",");

  return numberArray.map((number, index) => (
   <div key={index} className="flex items-center">
    <i className="fa-solid fa-phone" />
    <span className="pl-2">{formatContactNumber(number)}</span>
   </div>
  ));
 }

 function formatContactNumber(number) {
  return number.replace(/(\d{4})\s?(\d{3})\s?(\d{4})/, "$1 $2 $3");
 }

 return (
  <div className="font-[Poppins] tracking-wider">
   {showContactsModal && <ContactModal onClose={handleCloseContactModal} />}

   <div className="flex  bg-forestgreen-100 text-white">
    <h2 className="font-semibold text-left tracking-widest text-lg py-8 px-12">
     GENERAL WEBSITE SETTINGS
    </h2>
   </div>
   <hr className="border-t-2 border-gray-300" />

   <div className="pl-40 mt-10 grid grid-cols-1  md:grid-cols-2">
    <div>
     <div className="bg-white w-11/12 h-full rounded-lg shadow-lg p-12">
      <div className="flex flex-col items-center">
       <div className="w-60 h-50 rounded-lg shadow-lg border border-black overflow-hidden">
        {imageSelected ? (
         <img
          src={URL.createObjectURL(imageSelected)}
          alt="Selected Accommodation"
          className="w-full h-full object-cover"
         />
        ) : (
         selectedInfo && (
          <img
           src={selectedInfo.website_logo}
           alt="Selected Accommodation"
           className="w-full h-full object-cover"
          />
         )
        )}
       </div>
       {isAdmin && (
        <div className="mt-4">
         {!imageSelected ? (
          <label className="mt-4 bg-green-500 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-green-700 transition duration-300 ease-in-out">
           Upload Image
           <input
            type="file"
            onChange={(event) => {
             setImageSelected(event.target.files[0]);
            }}
            className="hidden"
           />
          </label>
         ) : (
          <button
          disabled={loadingImageUpload}
           className="mt-4 bg-dark-50 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-black transition duration-300 ease-in-out"
           onClick={uploadImg}
          >
           {!loadingImageUpload ? "Save Image" : "Uploading..."}
          </button>
         )}
        </div>
       )}
      </div>
      <div className="mt-6">
       <div className="flex items-center justify-center py-2">
        <h1 className="text-2xl  font-bold">{website_name}</h1>
       </div>
       <div className="mt-5">
        <label className="text-gray-600">Tagline</label>
        <textarea
         type="text"
         disabled={inputDisabled}
         className={`border rounded-md w-full text-lg p-2 mt-2 ${
          inputDisabled ? "bg-gray-200" : ""
         }`}
         value={tagline}
         onChange={(event) => {
          setTagline(event.target.value);
         }}
        />

        {isAdmin && (
         <div>
          {!inputDisabled ? (
           <button
            onClick={update}
            className="bg-dark-50 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-black transition duration-300 ease-in-out mt-2"
           >
            {!loadingSave ? (
             "Save"
            ) : (
             <i className="fa-solid fa-spinner fa-spin text-sm" />
            )}
           </button>
          ) : (
           <button
            onClick={toggleInputDisabled}
            className="bg-green-500 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-green-700 transition duration-300 ease-in-out mt-2"
           >
            <i className="fas fa-edit mr-2"></i>Edit
           </button>
          )}
         </div>
        )}
       </div>
       <div className="mt-4">
        {errors && (
         <div className="bg-red-500 text-white p-2 rounded-md">
          {Object.keys(errors).map((key) => (
           <p key={key}>{errors[key][0]}</p>
          ))}
         </div>
        )}
       </div>
      </div>
     </div>
    </div>

    <div>
     <div className="bg-white p-10 w-4/5 rounded-lg  shadow-md">
      <h2 className="text-xl uppercase font-semibold mb-4">Contact Settings</h2>
      {isAdmin && (
       <button
        onClick={() => handleToggleContactModal()}
        className="bg-green-500 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-green-700 transition duration-300 ease-in-out"
       >
        <i className="fas fa-edit mr-2"></i>Edit Contact
       </button>
      )}
      <div className="grid grid-cols-1  gap-4 mt-4">
       <div>
        <label className="text-gray-600 font-semibold">Address</label>
        <p className="mt-2 text-gray-800">{selectedInfo && location}</p>
       </div>
       <div>
        <label className="text-gray-600 font-semibold">Waze</label>
        <p className="mt-2 text-gray-800">{selectedInfo && map_link}</p>
       </div>
       <div>
        <label className="text-gray-600 font-semibold">Contact Number</label>
        <p className="mt-2 text-gray-800">
         {selectedInfo && formatAndRenderContactNumbers(contact_number)}
        </p>
       </div>
       <div>
        <label className="text-gray-600 font-semibold">Email</label>
        <p className="mt-2 text-gray-800">{selectedInfo && official_email}</p>
       </div>
       <div>
        <label className="text-gray-600 font-semibold">Social Media</label>
        <div className="mt-2 space-y-2">
         {selectedInfo && (
          <>
           <p className="text-green-500 flex items-center">
            <i className="fab fa-facebook-square mr-2"></i>
            {facebook_link}
           </p>
           <p className="text-green-500 flex items-center">
            <i className="fab fa-instagram mr-2"></i>
            {instagram_link}
           </p>
           <p className="text-green-500 flex items-center">
            <i className="fab fa-tiktok mr-2"></i>
            {tiktok_link}
           </p>
          </>
         )}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

//<div className="px-10  flex justify-center ">
//       {!loading ? (
//       <div className="card2 bg-white shadow-sm flex justify-center w-full fadeInDown ">
//            {!loading ?(
//            <div className="border-2 border-gray-500 rounded-md w-140 p-4 space-y-4">
//                 {/**Image */}
//                 <div className="flex justify-center rounded-md space-x-2">
//                   <div className="flex-col">
//                     {imageSelected ? (
//                       <div className="border-2 border-gray-500 w-55 h-50 p-2 rounded-md flex items-center">
//                         <img
//                           src={URL.createObjectURL(imageSelected)}
//                           alt="Selected Accommodation"
//                           className="w-full object-cover"
//                         />
//                       </div>
//                     ) : (
//                       <div>
//                         {selectedInfo && (
//                           <div className="border-2 border-gray-500 w-55 h-50 p-2 rounded-md">
//                             <img
//                               src={selectedInfo.website_logo}
//                               alt="Selected Accommodation"
//                               className="w-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     )}
//                 <div className="w-full flex justify-center mt-1">
//                   {!imageSelected ? (
//                     <label className="btn-upload btn-block relative items-center flex justify-center">
//                       <input
//                         type="file"

//                         onChange={(event) => {
//                           setImageSelected(event.target.files[0]);
//                         }}
//                         className="absolute inset-0 w-full h-full opacity-0"
//                       />
//                       <span className="text-white py-2">Upload File</span>
//                     </label>
//                   ) : (
//                     <div className="btn-block">
//                       <button
//                         className="py-2 hover:bg-green-600 transition ease-in-out duration-.5s bg-green-500 w-full rounded-md justify-center items-center flex w-full text-white"
//                         onClick={uploadImg}>
//                         {!loadingImageUpload ? (
//                           "Save"
//                         ) : (
//                           <i className="fa-solid fa-spinner fa-spin text-sm" />
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="border-2 border-gray-500 w-full px-2 rounded-md space-y-2 font-[Poppins]">
//                 <div className="py-1">
//                   <div className="flex justify-between py-1 items-down">
//                     <label>Website Title</label>
//                     <div className="space-x-2">
//                       {!inputDisabled ? (
//                         <button
//                           onClick={update}
//                           className="ml-auto text-md text-white bg-green-500 px-2 p-1 rounded-md shadow-sm hover:bg-green-700 transition ease-in-out duration-.5s"
//                         >
//                           <i className="fa-save fa-solid pr-1" />
//                           {!loadingSave ? (
//                             "Save"
//                             ):(
//                               <i className="fa-solid fa-spinner fa-spin text-sm" />
//                             )}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={toggleInputDisabled}
//                           className="ml-auto text-md text-white bg-blue-500 px-2 p-1 rounded-md shadow-sm hover:bg-blue-700 transition ease-in-out duration-.5s"
//                         >
//                           <i className="fa-pen fa-solid" /> Edit
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                         <div className="text-xl font-bold pl-4">
//                           {website_name}
//                         </div>

//                 </div>
//                 <div>
//                   <label>Tagline</label> <br/>
//                   <textarea
//                     type="text"
//                     disabled={inputDisabled}
//                     className={`  border-2 border-gray-900 p-2 row-4 w-full rounded-md mt-2 ${
//                       inputDisabled ? "bg-gray-200" : ""
//                     }`}
//                     value={tagline}
//                     onChange={(event) => {
//                       setTagline(event.target.value);
//                     }}
//                   />
//                 </div>

//             <div>
// {errors && (
//     <div className="bg-red-700 px-4 py-1 rounded-md text-white shadow-md m-2  ">
//       {Object.keys(errors).map((key) => (
//         <p className="animated fadeInDown" key={key}>
//           {errors[key][0]}
//         </p>
//       ))}
//     </div>
//   )}
// </div>
//               </div>
//           </div>
//         <div className="border-2 border-gray-500 px-2 rounded-md text-[Poppins] pb-2">
//           <div className="w-full flex pl-2 items-center py-1">
//             <span className="text-xl">
//               Contact Settings
//             </span>
//             <button onClick={() => handleToggleContactModal()} className="ml-auto text-md text-white bg-blue-500 text-md px-2 py-1 rounded-md shadow-sm hover:bg-blue-700 transition ease-in-out duration-.5s">
//               <i className="fa-pen fa-solid" /> Edit
//             </button>
//           </div>
//           <div className="w-full grid grid-cols-2">
//             <div className="flex-col space-y-2">
//               <div className="text-sm">Address</div>
//               {selectedInfo && (
//                 <div className="text-sm whitespace-nowrap pl-2">
//                   <i className="fa-solid fa-map-marker-alt" /> {location}
//                 </div>
//               )}
//                 <div className="text-sm">Waze</div>
//               {selectedInfo && (
//                 <div className="text-sm pl-2">
//                   <i className="fa-solid fa-car" /> {map_link}
//                 </div>
//               )}
// <div className="text-sm">Contact Number</div>
// {selectedInfo && (
//   <div className="text-sm pl-2">
//     {formatAndRenderContactNumbers(contact_number)}
//   </div>
// )}

//             </div>

//             <div className="flex-col space-y-2 py-2">
//               <div className="text-sm">Email</div>
//               {selectedInfo && (
//                 <div className="text-xs pl-2">
//                   <i className="fa-solid fa-envelope" /> {official_email}
//                 </div>
//               )}
//               <div className="text">Social Media</div>
//               {selectedInfo && (
//                 <div className="text-sm pl-2 text-shrink">
//                   <i className="fa-brands fa-facebook" /> {facebook_link}
//                 </div>
//               )}
//               {selectedInfo && (
//                 <div className="text-sm pl-2">
//                   <i className="fa-brands fa-instagram text-md" /> {instagram_link}
//                 </div>
//               )}
//               {selectedInfo && (
//                 <div className="text-sm pl-2">
//                   <i className="fa-brands fa-tiktok" /> {tiktok_link}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//          </div>
//           ) : (
//             <div className="card2 bg-white shadow-sm flex justify-center w-full ">
//               <LoadingCircle className="text-black" />
//             </div>
//           )}
//         </div>):(
//             <div className="card2 bg-white shadow-sm flex justify-center w-full h-50 ">
//                 <LoadingCircle/>
//             </div>
//         )}
//       </div>
