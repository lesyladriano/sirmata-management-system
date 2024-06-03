import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import LoadingCircle from "../../../components/misc/LoadingCircle";
import { useStateContext } from "../../../context/admin/ContextProvider";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "../../../components/admin/CloudinaryUploadWidget";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
const AccommodationModal = ({
 accommodation,
 showModal,
 onClose,
 modalMode,
 reloadTableData,
}) => {
 const [accommodation_id, setAccommodationId] = useState("");
 const [room_name, setName] = useState("");
 const [type, setType] = useState("Cabin");
 const [capacity, setCapacity] = useState("");
 const [description, setDescription] = useState("");
 const [web_description, setWebDescription] = useState("");
 const [feature, setFeature] = useState("");
 const [price, setPrice] = useState("");
 const [status, setStatus] = useState("Available");
 const [bannerImageSelected, setBannerImageSelected] = useState("");
 const [booking_image, setBookingImage] = useState("");
 const [bookingImageSelected, setBookingImageSelected] = useState("");
 const [web_images, setWebImages] = useState([]);
 const [publicId, setPublicId] = useState([]);
 const modalRef = useRef();
 const [toDelete, setToDelete] = useState([]);
 const [loading, isLoading] = useState(false);

 const { user, token, setUser, setToken, isAdmin, setIsAdmin } =
  useStateContext();
 async function Load() {
  const result = await axios.get(
   `${import.meta.env.VITE_API_BASE_URL}/api/accommodation`
  );
  setAccommodationId(result.data);
 }

 useEffect(() => {
  if (modalMode === "edit") {
   editAccommodation(accommodation);
  }
 }, [modalMode, accommodation]);

 const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

 async function save(event) {
  event.preventDefault();
  setIsLoadingSubmit(true);
  try {
   const formData = new FormData();

   //    if (bannerImageSelected) {
   //     formData.append("file", bannerImageSelected);
   //     formData.append("upload_preset", "sirmata_profile_pic");
   //     formData.append("folder", "Sirmata Images/Accommodations");
   //     const cloudinaryResponse = await axios.post(
   //      "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
   //      formData,
   //      {
   //       headers: {
   //        Accept: "*/*",
   //       },
   //      }
   //     );
   //     const imageUrl = cloudinaryResponse.data.secure_url;
   //     formData.append("banner_image", imageUrl);
   //    }

   if (bookingImageSelected) {
    formData.append("file", bookingImageSelected);
    formData.append("upload_preset", "sirmata_profile_pic");
    formData.append("folder", "Sirmata Images/Accommodations");
    const cloudinaryResponse = await axios.post(
     "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
     formData,
     {
      headers: {
       Accept: "*/*",
      },
     }
    );
    const bookingImageUrl = cloudinaryResponse.data.secure_url;
    formData.append("booking_image", bookingImageUrl);
   }

   formData.append("room_name", room_name);
   formData.append("type", type);
   formData.append("capacity", capacity);
   formData.append("description", description);
   formData.append("web_description", web_description);
   formData.append("feature", feature);
   formData.append("price", price);
   formData.append("status", status);
   formData.append("web_images", web_images);
   await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/save`,
    formData,

    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type as needed
     },
    }
   );

   await Swal.fire({
    icon: "success",
    html: "<h3>Accommodation Added Successfully</h3>",
    confirmButtonColor: "#606060",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    position: "top-end",
   });

   setAccommodationId("");
   setName("");
   setType("");
   setCapacity("");
   setDescription("");
   setWebDescription("");
   setFeature("");
   setPrice("");
   setStatus("");
   setWebImages("");
   setBookingImageSelected("");

   Load();
   onClose();
   reloadTableData();
  } catch (err) {
   setIsLoadingSubmit(false);
   console.log(err);
   const response = err.response;

   if (response && response.status === 422) {
    setErrors(response.data.errors);
   }

   await Swal.fire({
    icon: "error",
    title: "Save Failed",
    text: "An error occurred while saving the accommodation.",
    showCloseButton: true,
    showConfirmButton: false,
   });
  }
 }

 const [errors, setErrors] = useState(null);
 const [display, setDisplay] = useState([]);

 async function editAccommodation(accommodation) {
  const id = accommodation;
  isLoading(true);
  try {
   const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/accommodation/find/id/${id}`
   );

   // Assuming you want to access the data from the response
   const fetchedAccommodation = response.data;

   // Now you can use the fetchedAccommodation object to set your state variables
   setName(fetchedAccommodation.room_name);
   setType(fetchedAccommodation.type);
   setCapacity(fetchedAccommodation.capacity);
   setDescription(fetchedAccommodation.description);
   setWebDescription(fetchedAccommodation.web_description);
   setFeature(fetchedAccommodation.feature);
   setPrice(fetchedAccommodation.price);
   setStatus(fetchedAccommodation.status);
   setBookingImage(fetchedAccommodation.booking_image);
   setAccommodationId(fetchedAccommodation.accommodation_id);
   // Handling web_images
   const webImagesArray = Array.isArray(fetchedAccommodation.web_images)
    ? fetchedAccommodation.web_images
    : [fetchedAccommodation.web_images];
   const webImagesSerialized = webImagesArray;
   const regex = /s:\d+:"([^"]+)";/g;
   let match;
   const imagePaths = [];

   while ((match = regex.exec(webImagesSerialized))) {
    imagePaths.push(match[1]);
   }
   const madeArray = Array.isArray(imagePaths);
   setPublicId(imagePaths);
   setWebImages(imagePaths);
   isLoading(false);
  } catch (error) {
   console.error(error);
   isLoading(false);
  }
 }

 async function update(event) {
  event.preventDefault();
  setIsLoadingSubmit(true);

  if (toDelete) {
   const onlyIds = toDelete.map((id) =>
    id.replace("sirmata_accommodations/", "")
   );
   await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/delete/cloudinary`,
    {
     publicId: onlyIds, // Corrected typo here
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type as needed
     },
    }
   );
  }
  try {
   if (!accommodation_id) {
    alert("Accommodation ID is missing. Cannot update.");
    return;
   }

   const formData = new FormData();

   if (bannerImageSelected) {
    formData.append("file", bannerImageSelected);
    formData.append("upload_preset", "sirmata_profile_pic");
    const cloudinaryResponse = await axios.post(
     "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
     formData,
     {
      headers: {
       Accept: "*/*",
      },
     }
    );
    const imageUrl = cloudinaryResponse.data.secure_url;

    let bookingImageUrl;

    if (bookingImageSelected) {
     const bookingFormData = new FormData();
     bookingFormData.append("file", bookingImageSelected);
     bookingFormData.append("upload_preset", "sirmata_profile_pic");
     bookingFormData.append("folder", "Sirmata Images/Accommodations");
     const bookingCloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
      bookingFormData,
      {
       headers: {
        Accept: "*/*",
       },
      }
     );
     bookingImageUrl = bookingCloudinaryResponse.data.secure_url;
    }

    await axios.put(
     `${import.meta.env.VITE_API_BASE_URL}/api/update/${accommodation_id}`,
     {
      room_name: room_name,
      type: type,
      capacity: capacity,
      description: description,
      web_description: web_description,
      feature: feature,
      price: price,
      status: status,
      banner_image: imageUrl,
      booking_image: bookingImageUrl,
      web_images: web_images,
     },
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json", // Adjust content type as needed
      },
     }
    );
   } else {
    let bookingImageUrl;

    if (bookingImageSelected) {
     const bookingFormData = new FormData();
     bookingFormData.append("file", bookingImageSelected);
     bookingFormData.append("upload_preset", "sirmata_profile_pic");
     bookingFormData.append("folder", "Sirmata Images/Accommodations");
     const bookingCloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/di0nkj5kz/image/upload",
      bookingFormData,
      {
       headers: {
        Accept: "*/*",
       },
      }
     );
     bookingImageUrl = bookingCloudinaryResponse.data.secure_url;
    }
    await axios.put(
     `${import.meta.env.VITE_API_BASE_URL}/api/update/${accommodation_id}`,
     {
      room_name: room_name,
      type: type,
      capacity: capacity,
      description: description,
      web_description: web_description,
      feature: feature,
      price: price,
      status: status,
      booking_image: bookingImageUrl,
      web_images: web_images,
     },
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json", // Adjust content type as needed
      },
     }
    );
   }
   Load();
   onClose();
   reloadTableData();
   await Swal.fire({
    icon: "success",
    html: "<h3>Accommodation Updated Successfully</h3>",
    confirmButtonColor: "#606060",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    position: "top-end",
   });
  } catch (err) {
   setIsLoadingSubmit(false);
   console.log(err);
   const response = err.response;

   if (response && response.status === 422) {
    setErrors(response.data.errors);
   }

   await Swal.fire({
    icon: "error",
    title: "Update Failed",
    text: "An error occurred while updating the accommodation.",
    showCloseButton: true,
    showConfirmButton: false,
   });
  }
 }

 function getStatus(status) {
  if (status === "Available") {
   return (
    <div className="bg-green-800 text-white px-2 py-2 text-center rounded-sm">
     Available
    </div>
   );
  } else if (status === "Booked") {
   return (
    <div className="bg-red-800 text-white px-2 py-2 text-center rounded-sm">
     Booked
    </div>
   );
  } else if (status === "Maintenance") {
   return (
    <div className="bg-gray-800 text-white px-2 py-2 text-center rounded-sm">
     Maintenance
    </div>
   );
  } else {
   return <div>{status}</div>;
  }
 }

 const handleStatusChange = (event) => {
  setStatus(event.target.value);
 };
 const handleTabClick = (tab) => {
  setSelectedTab(tab);
 };

 const [secureUrls, setSecureUrls] = useState([]);
 const [cloudName] = useState("di0nkj5kz");
 const [uploadPreset] = useState("sirmata_web_image");
 const [uwConfig] = useState({
  cloudName,
  uploadPreset,
 });

 const cld = new Cloudinary({
  cloud: {
   cloudName,
  },
 });

 useEffect(() => {
  // Convert the object into an array of values
  const publicIdArray = Object.values(publicId);
  setWebImages(publicIdArray);
 }, [publicId]);

 const deleteImage = async (id) => {
  setToDelete((newToDelete) => [...newToDelete, id]); // <-- Corrected
  const updatedPublicId = publicId.filter((imageId) => imageId !== id);
  setPublicId(updatedPublicId);
 };

 return (
  <div
   className="bg-black bg-opacity-20 h-screen w-screen fixed top-0 left-0 flex justify-center items-center font-[Poppins] "
   style={{ width: "100%", zIndex: "10" }}
  >
   <div
    className={`  sticky fadeInDown h-[90%]  max-w-[65rem] min-w-[80%] bg-white  rounded-md`}
    ref={modalRef}
   >
    <div className="w-full shadow-md sticky bg-forestgreen-100 text-white flex mb-2 justify-between  px-4 py-2 rounded-t-md">
     {!accommodation_id && (
      <span className="text-2xl  font-[Poppins] whitespace-nowrap">
       Add New Accommodation
      </span>
     )}

     {accommodation_id && (
      <span
       className="text-lg font-bold whitespace-nowrap"
       style={{ fontFamily: "Roboto, sans-serif" }}
      >
       Update Accommodation : {accommodation_id}
      </span>
     )}

     <span className=" flex justify-end ml-auto  items-center w-full">
      <i
       className="fa fa-close text-xl text-white exit-icon"
       onClick={onClose}
      />
     </span>
    </div>

    {!loading ? (
     <div className="flex-col overflow-auto h-[88%] px-4 py-2">
      <div className="  space-y-4">
       <div className="w-full  rounded-md p-2 shadow-md card-item">
        <div>
         {errors && (
          <div className="bg-red-700 px-4 py-1 rounded-md text-white shadow-md ">
           {Object.keys(errors).map((key) => (
            <p className="animated fadeInDown" key={key}>
             {errors[key][0]}
            </p>
           ))}
          </div>
         )}
        </div>

        <form className="">
         <div className=" grid grid-cols-2 gap-4">
          <span className="w-full flex-items-center h-full ">
           <label className="text-md font-semibold">Room Name</label>
           <input
            type="text"
            className="mt-1 input-bookings-accommodation"
            id="roomName"
            value={room_name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Room Name"
           />
          </span>
          <span className=" w-full">
           <label className="text-md font-semibold">Type</label>
           <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="input-select w-full"
           >
            <option value="Cabin">Cabin</option>
            <option value="Lake Villa">Lake Villa</option>
           </select>
          </span>
         </div>

         <div className=" grid grid-cols-2 gap-4">
          <span className="w-full">
           <label className="text-md font-semibold">Capacity</label>
           <input
            type="text"
            className="input-bookings-accommodation"
            id="capacity"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            placeholder="Capacity"
           />
          </span>
          <span className=" w-full">
           <label className="text-md font-semibold">Price</label>
           <input
            type="text"
            className="input-bookings-accommodation w-full"
            id="type"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
           />
          </span>
         </div>

         <div className="flex space-x-4">
          <span className="w-full">
           <label className="text-md font-semibold">Features</label>
           <input
            type="text"
            className="mt-1 input-bookings-accommodation"
            id="feature"
            value={feature}
            onChange={(event) => setFeature(event.target.value)}
            placeholder="Feature"
           />
          </span>
          <span className=" w-full">
           <label className="text-md font-semibold">Accommodation Status</label>

           <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="input-select w-full"
           >
            <option value="Available">Available</option>
            <option value="Maintenance">Maintenance</option>
           </select>
          </span>
         </div>
        </form>
       </div>

       {/**Descriptions */}
       <div className="w-full space-y-4  rounded-md  font-[Poppins]">
        <div className="w-full p-2 card-item shadow-md">
         <div className="flex-col w-full">
          <label className="text-lg  font-semibold">Website Description</label>
          <div className="text-xs italic text-gray-600">
           Images and description that will be displayed on the Website.
           <div>
            {" "}
            Name an image being uploaded as `banner` and `leaf` to correctly
            place them to the website. Ex: alocasia_banner.png
           </div>
          </div>
         </div>
         <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex-col w-full h-full space-y-2">
           <div className="border-gray-400 border-dashed border-2 p-2 rounded-md overflow-y-auto h-[18rem] flex items-center whitespace-nowrap flex  grid-cols-1 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {publicId.map((id, index) => (
             <div key={index} className="flex-col w-full h-full relative">
              <div className=" border-2 h-fit relative ">
               <button
                className="absolute top-[-.5rem] text-md p-1 animated hover:text-[1.1rem]  right-[-.5rem]  text-white bg-red-900 rounded-full"
                onClick={() => deleteImage(id)}
                style={{ zIndex: "9999" }}
               >
                <FaTimes />
               </button>
               <AdvancedImage
                className="object-scale-down"
                style={{ height: "10rem" }}
                cldImg={cld.image(id)}
                plugins={[responsive(), placeholder()]}
               />
              </div>
             </div>
            ))}
           </div>
           <CloudinaryUploadWidget
            name={"UPLOAD IMAGE"}
            uwConfig={uwConfig}
            setPublicId={(newPublicId) =>
             setPublicId((prevPublicId) => [...prevPublicId, newPublicId])
            }
           />
          </div>

          <div className="w-full">
           <span className="w-full">
            <textarea
             value={web_description}
             onChange={(event) => setWebDescription(event.target.value)}
             placeholder="Description"
             rows="11"
             className="w-full border-2 border-gray-400 rounded-md p-1"
            ></textarea>
           </span>
          </div>
         </div>
        </div>

        <div className="w-full shadow-md card-item">
         <div className="p-2">
          <div className="w-full flex-col pb-2">
           <label className="text-lg">Booking Details</label>

           <div className="text-xs italic text-gray-600">
            Images and Description will be visible during Booking and
            Reservation of guests.
           </div>
          </div>
          <div className="grid grid-cols-2">
           <div className="w-full">
            {bookingImageSelected && (
             <img
              src={URL.createObjectURL(bookingImageSelected)}
              alt="Selected Accommodation"
              className="border-gray-400 border-2 w-full p-2 object-cover rounded-md overflow-y-auto h-[18rem] flex items-center whitespace-nowrap flex border-dashed"
             />
            )}
            {!bookingImageSelected &&
             booking_image &&
             typeof booking_image === "string" && (
              <img
               src={booking_image}
               alt={`Accommodation`}
               className="border-gray-400 border-2 p-2 object-cover w-full rounded-md overflow-y-auto h-[18rem] flex items-center whitespace-nowrap flex border-dashed"
              />
             )}
            {!bookingImageSelected && !booking_image && (
             <div className="border-gray-400 border-2 p-2  object-cover w-full rounded-md overflow-y-auto h-[18rem] flex items-center whitespace-nowrap  border-dashed text-[8rem]  justify-center">
              <FaFileImage />
             </div>
            )}
            <div className="w-full justify-center flex py-2 ">
             <label className="bg-forestgreen-100 h-10% hover:bg-forestgreen-1100 animated block w-full rounded-md py-1 px-2 relative text-center ">
              <input
               type="file"
               onChange={(event) => {
                setBookingImageSelected(event.target.files[0]);
               }}
               className="absolute inset-0 w-full hover:cursor-pointer h-full opacity-0"
              />
              <span className="text-white  w-full">Upload File</span>
             </label>
            </div>
           </div>
           <div className="px-2">
            <span className="w-full">
             <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
              rows="11"
              className="w-full border-2 border-gray-400 rounded-md p-1"
             ></textarea>
            </span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>

      <div className="font-[Poppins] text-lg pt-4">
       {!accommodation_id && (
        <button
         className="bg-forestgreen-50 hover:bg-forestgreen-100 animated hover:cursor-pointer text-white w-full rounded-md shadow-md py-2 tracking-widest "
         onClick={save}
        >
         {isLoadingSubmit ? <i className="fa fa-spinner fa-spin" /> : "Save"}
        </button>
       )}
       {accommodation_id && (
        <button
         className=" bg-dark-50 hover:bg-black items-center  animated hover:cursor-pointer text-white w-full rounded-md shadow-md py-2 tracking-widest"
         onClick={update}
        >
         {isLoadingSubmit ? <i className="fa fa-spinner fa-spin" /> : "Update"}
        </button>
       )}
      </div>
     </div>
    ) : (
     <div className="flex justify-center item-center overflow-auto h-[88%] px-4 py-2 ">
      <LoadingCircle />
     </div>
    )}
   </div>
  </div>
 );
};

export default AccommodationModal;
