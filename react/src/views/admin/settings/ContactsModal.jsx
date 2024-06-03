import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import { useStateContext } from "../../../context/admin/ContextProvider";

export default function ContactModal({ onClose }) {
 const [loading, setLoading] = useState(false);
 const info_id = 1;
 const [selectedInfo, setSelectedInfo] = useState(null);

 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();

 useEffect(() => {
  Load();
 }, []);

 async function Load() {
  setLoading(true);

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
   formData.append("upload_preset", "on266mmu");
   formData.append("folder", "Sirmata Images/Logo");

   try {
    const cloudinaryResponse = await axios.post(
     "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
     formData
    );
    const newImageUrl = cloudinaryResponse.data.secure_url;
    setImageUrl(newImageUrl);

    // Prepare data for update
    const updateData = {
     website_logo: newImageUrl,
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
     title: "Image Uploaded",
     text: "Your image has been successfully uploaded!",
     showConfirmButton: false,
     timer: 4500, // 4.5 seconds
     timerProgressBar: true,
     position: "top-end",
    });

    Load();
    setImageSelected("");
   } catch (error) {
    setLoadingImageUpload(false);
    await Swal.fire({
     icon: "error",
     title: "Update Failed",
     text: "There was an error while updating the image.",
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

 const [loadingSave, setLoadingSave] = useState(null);
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
   await Swal.fire({
    icon: "success",
    title: "Update Successful",
    text: "Your information has been updated.",
    showConfirmButton: false,
    timer: 45000, // 3 seconds
    timerProgressBar: true,
    position: "top-end",
   });

   onClose();
  } catch (err) {
   setLoadingSave(false);

   if (err.response && err.response.data && err.response.data.errors) {
    setErrors(err.response.data.errors);
   }
   console.log(err.response);

   await Swal.fire({
    icon: "error",
    title: "Update Failed",
    text: "There was an error while updating your information.",
    showCloseButton: true,
    showConfirmButton: false,
   });
  }
 }

 const [errors, setErrors] = useState(null);

 return (
  <>
   <div className="booking-moreinfo-modal fixed">
    {!loading ? (
     <div className="general-settings-modal w-140 fadeInDown">
      <div className="flex justify-between  bg-dark-50 shadow-sm  mb-5 px-4 ">
       <span className="text-lg p-2 text-white font-bold tracking-widest uppercase text-[Poppins]">
        Contact Settings
       </span>
       <span className=" items-center flex justify-end ml-auto ">
        <i
         className="fa fa-close text-xl text-white cursor-pointer "
         onClick={onClose}
        />
       </span>
      </div>

      <div className="border-2 border-gray-400  rounded-md text-[Poppins]  flex-col items-center ">
       <div>
        {errors && (
         <div className="bg-red-700 px-4 py-1 rounded-md text-white shadow-md m-2  ">
          {Object.keys(errors).map((key) => (
           <p className="animated fadeInDown" key={key}>
            {errors[key][0]}
           </p>
          ))}
         </div>
        )}
       </div>

       <div className="w-full grid grid-cols-2 gap-10">
        <div className=" px-4 space-y-2 py-2">
         <div>
          <div className="flex justify-between">
           <label className="text-sm">Location</label>
          </div>
          <div className="text-sm whitespace-nowrap flex">
           <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm w-10 ">
            <i className="fas fa-map-marker-alt " />
           </div>
           <input
            type="text"
            className="input-contact-settings-icon"
            value={location}
            onChange={(event) => {
             setLocation(event.target.value);
            }}
           />
          </div>
         </div>

         <div>
          <div className="flex justify-between">
           <label className="text-sm">Waze</label>
          </div>
          <div className="text-sm whitespace-nowrap flex">
           <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm  w-10">
            <i className="fas fa-car " />
           </div>
           <input
            type="text"
            className="input-contact-settings-icon"
            value={map_link}
            onChange={(event) => {
             setMapLink(event.target.value);
            }}
           />
          </div>
         </div>

         <div>
          <div className="flex justify-between">
           <label className="text-sm">Contact Number</label>
          </div>
          <div className="text-sm whitespace-nowrap flex">
           <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm  w-10">
            <i className="fas fa-phone " />
           </div>
           <input
            type="text"
            className="input-contact-settings-icon"
            value={contact_number}
            onChange={(event) => {
             setContactNumber(event.target.value);
            }}
           />
          </div>
         </div>
         <label className="italic-label">
          To add more phone numbers, separate them with commas.
         </label>
        </div>

        <div className=" px-4 space-y-2 py-2  ">
         <div>
          <div className="flex justify-between">
           <label className="text-sm">Email</label>
          </div>
          <div className="text-sm whitespace-nowrap flex">
           <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm w-10 ">
            <i className="fas fa-envelope" />
           </div>
           <input
            type="text"
            className="input-contact-settings-icon"
            value={official_email}
            onChange={(event) => {
             setOfficialEmail(event.target.value);
            }}
           />
          </div>
         </div>

         <div>
          <div className="flex justify-between">
           <label className="text-sm">Social Media</label>
          </div>
          <div className="space-y-2">
           <div className="text-sm whitespace-nowrap flex">
            <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm w-10 ">
             <i className="fa-brands fa-facebook " />
            </div>
            <input
             type="text"
             className="input-contact-settings-icon"
             value={facebook_link}
             onChange={(event) => {
              setFacebookLink(event.target.value);
             }}
            />
           </div>
           <div className="text-sm whitespace-nowrap flex">
            <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm w-10 ">
             <i className="fa-brands fa-instagram " />
            </div>
            <input
             type="text"
             className="input-contact-settings-icon"
             value={instagram_link}
             onChange={(event) => {
              setInstagramLink(event.target.value);
             }}
            />
           </div>
           <div className="text-sm whitespace-nowrap flex">
            <div className="items-center flex justify-center bg-forestgreen-50 text-white rounded-l-sm w-10 ">
             <i className="fa-brands fa-tiktok" />
            </div>
            <input
             type="text"
             className="input-contact-settings-icon"
             value={tiktok_link}
             onChange={(event) => {
              setTiktokLink(event.target.value);
             }}
            />
           </div>
          </div>

          <div className="w-full flex justify-end mt-2">
           <div className="space-x-4">
            <button
             onClick={onClose}
             className="shadow-sm transition hover:bg-red-900 duration-.3s ease-in-out bg-red-600 px-2 py-1 border-red-800 rounded-sm text-white"
            >
             Close
            </button>
            <button
             onClick={update}
             className=" shadow-sm yransition hover:bg-green-700 duration-.3s ease-in-out bg-green-600 px-2 py-1 border-gray-400 rounded-sm text-white"
            >
             {!loadingSave ? (
              "Save"
             ) : (
              <i className="fa-spinner fa-spin fa-solid px-2" />
             )}
            </button>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    ) : (
     <div className="general-settings-modal w-130 fadeInDown  items-center pt-10">
      <div className="flex justify-between border-gray-400 shadown-sm border-b-2 mb-5 pt-2">
       <span className="text-lg font-bold text-[Poppins]">
        Contact Settings
       </span>
       <span className=" items-center flex justify-end ml-auto ">
        <i
         className="fa fa-close text-xl text-gray-700 exit-icon"
         onClick={onClose}
        />
       </span>
      </div>

      <LoadingCircle />
     </div>
    )}
   </div>
  </>
 );
}
