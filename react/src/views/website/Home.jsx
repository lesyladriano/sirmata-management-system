import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowUpButton from "/src/components/website/ArrowUpButton";

import Swal from "sweetalert2";
import axios from "axios";
import {
 FaArrowAltCircleRight,
 FaArrowRight,
 FaCalendarAlt,
} from "react-icons/fa";

import image1 from "/src/assets/images/website/home/kape_puno.jpg";
import image2 from "/src/assets/images/website/home/kayo_resto.jpg";
import image3 from "/src/assets/images/website/home/lake_villas.jpg";
import image4 from "/src/assets/images/website/home/pool.jpg";
import image5 from "/src/assets/images/website/home/glass_chapel.jpg";



import separator from "/src/assets/images/website/separator_OAP.png";
import wineanddine from "/src/assets/images/website/home/wine_dine.jpg";
import relax from "/src/assets/images/website/accomodations/monstera_four.jpg";
import celebrate from "/src/assets/images/website/home/events_1.jpg";
import experience from "/src/assets/images/website/home/kayak.jpg";

const Home = () => {
 {
  /**For Reviews */
 }
 const [review_id, setId] = useState("");
 const [full_name, setFullName] = useState("");
 const [email, setEmail] = useState("");
 const [review, setReview] = useState("");
 const [rating, setRating] = useState(0);
 const [display, setDisplay] = useState(false);
 const [guest_reviews, setUsers] = useState([]);

 const StarRating = ({ value, onChange }) => {
  const maxStars = 5;

  const handleStarClick = (newValue) => {
   onChange(newValue);
  };

  useEffect(() => {
   const pano_iframe_name = "panoee-tour-embeded";
   const handleDeviceMotion = (e) => {
    const iframe = document.getElementById(pano_iframe_name);
    if (iframe) {
     iframe.contentWindow.postMessage(
      {
       type: "devicemotion",
       deviceMotionEvent: {
        acceleration: {
         x: e.acceleration.x,
         y: e.acceleration.y,
         z: e.acceleration.z,
        },
        accelerationIncludingGravity: {
         x: e.accelerationIncludingGravity.x,
         y: e.accelerationIncludingGravity.y,
         z: e.accelerationIncludingGravity.z,
        },
        rotationRate: {
         alpha: e.rotationRate.alpha,
         beta: e.rotationRate.beta,
         gamma: e.rotationRate.gamma,
        },
        interval: e.interval,
        timeStamp: e.timeStamp,
       },
      },
      "*"
     );
    }
   };

   window.addEventListener("devicemotion", handleDeviceMotion);

   return () => {
    window.removeEventListener("devicemotion", handleDeviceMotion);
   };
  }, []);

  return (
   <div className="text-3xl text-orange-500 space-x-[1] md:space-x-2  hover:cursor-pointer animated">
    {[...Array(maxStars)].map((_, index) => {
     const starValue = index + 1;
     return (
      <span
       key={starValue}
       className={`star ${
        value >= starValue ? "filled hover:text-orange-700" : "empty"
       }`}
       onClick={() => handleStarClick(starValue)}
       style={{ cursor: "pointer" }} // Ensure cursor changes on hover
      >
       <i
        className={`fa${
         value >= starValue ? " fa-solid" : " fa-regular"
        } fa-star`}
       ></i>
      </span>
     );
    })}
   </div>
  );
 };

 useEffect(() => {
  (async () => await TagLineLoad())();
 }, []);
 const info_id = 1;
 const [selectedInfo, setSelectedInfo] = useState(null);

 async function TagLineLoad() {
  setLoading(true);

  try {
   const result = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/web`
   );

   const matchedWebInfo = result.data.find(
    (web_info) => web_info.info_id === info_id
   );
   setSelectedInfo(matchedWebInfo || null);
  } catch (error) {
   console.error("Error loading accommodations:", error);
  }

  setLoading(false);
 }

 const handleRatingChange = (newRating) => {
  setRating(newRating);
 };

 useEffect(() => {
  (async () => await Load())();
 }, []);

 async function Load() {
  const result = await axios.get(
   `${import.meta.env.VITE_API_BASE_URL}/api/reviews`
  );
  setUsers(result.data);
 }

 async function save(event) {
  setLoading(true);
  event.preventDefault();
  setErrors("");
  try {
   await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/save`, {
    full_name: full_name,
    email: email,
    review: review,
    rating: rating,
    display: display,
   });
   setLoading(false);
   await Swal.fire({
    icon: "success",
    title: "Thank You for Your Review!",
    text:
     "We truly appreciate your feedback. It helps us improve our services.",
    showConfirmButton: false,
    showCloseButton: true,
   });

   setId("");
   setFullName("");
   setEmail("");
   setReview("");
   setRating(0);
   setDisplay("");
   setErrors("");
   Load();
  } catch (err) {
   setLoading(false);
   setMessage("");
   const response = err.response;
   if (response && response.status === 422) {
    setErrors(response.data.errors);
   }
   await Swal.fire({
    icon: "error",
    title: "Review Submission Failed",
    text: "Failed to submit your review.",
    showConfirmButton: false,
    showCloseButton: true,
   });
  }
 }
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState(null);
 {
  /**For Reviews */
 }

 const [dropdownOpen, setDropdownOpen] = useState(false);

 const noBookingPlease = () => {
  Swal.fire({
   title: "Not Available Yet",
   text: "To book a room, please contact us on Facebook.",
   icon: "info",
   iconColor: "#000000",
   confirmButtonText: "OK",
   confirmButtonColor: "#009900",
  });
 };

 const handleDropdownToggle = () => {
  setDropdownOpen(!dropdownOpen);
 };

 const handleButtonClick = () => {
  // Replace the URL with the actual URL you want to open in a new tab
  const tourUrl = "https://tour.panoee.com/sirmatafarm-amenities";
  window.open(tourUrl, "_blank");
 };

 const handleDropdownItemClick = (item) => {
  console.log(`Clicked: ${item}`);
  // Perform any desired action
  setDropdownOpen(false);
 };

 const settings = {
  dots: true, // Display dots for navigation
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Display only 1 review per slide
  slidesToScroll: 1,
  arrows: false, // Hide arrow navigations
  autoplay: true,
  autoplaySpeed: 10000, // 5 seconds
 };

 const [message, setMessage] = useState(false);

 return (
  <div className="">

   {/* IMAGE CAROUSEL BANNER */}
   <div className="">
    <div className="">
     <div className="flex items-center justify-center">
      <Carousel
       showArrows={false}
       showThumbs={false}
       showStatus={false}
       emulateTouch={true}
       interval={5000}
       infiniteLoop={true}
       autoPlay={true}
       className="w-full " // Limit the carousel width for larger screens
      >
       <div>
        <img
         src={image1}
         alt=""
         className="w-full win11:h-[750px] object-cover object-center  laptop:h-[460px] tablet:h-[420px] mobile:h-[350px] "
        />
       </div>
       <div>
        <img
         src={image2}
         alt=""
         className="w-full win11:h-[750px] object-cover object-center laptop:h-[460px] tablet:h-[420px] mobile:h-[350px]  "
        />
       </div>
       <div>
        <img
         src={image3}
         alt=""
         className="w-full win11:h-[750px] object-cover object-center laptop:h-[460px] tablet:h-[420px] mobile:h-[350px]"
        />
       </div>
       <div>
        <img
         src={image4}
         alt=""
         className="w-full win11:h-[750px] object-cover object-center laptop:h-[460px] tablet:h-[420px] mobile:h-[350px]"
        />
       </div>
       <div>
        <img
         src={image5}
         alt=""
         className="w-full win11:h-[750px] object-cover object-center laptop:h-[460px] tablet:h-[420px] mobile:h-[350px]  "
        />
       </div>
      </Carousel>

      <div className="absolute justify-center items-center w-fit flex p-5 ">
       <div className="inline-block z-20 items-center justify-center  space-x-6 font-[Poppins] text-base lg:text-lg">
        <button
         className="px-5 py-2 bg-gray-100 font-semibold text-forestgreen-50 tracking-wider rounded-lg  hover:bg-opacity-70 transition-colors duration-300 ease-in-out desktop:px-8 desktop:py-4 desktop:text-xl win11:px-6 win11:py-4 win11:text-xl transform hover:scale-110"
         onClick={handleButtonClick}
        >
         Take a Tour <FaArrowAltCircleRight className="inline-block ml-1" />
         <i className="text-forestgreen-50 fa-solid fa-360-degrees shadow-sm"></i>
        </button>
        <a
         href="/bookings/accommodations"
         target="_blank"
         rel="noopener noreferrer"
        >
         <button
          className="px-5 py-2 mobile:hidden tablet:hidden font-semibold laptop:hidden text-white rounded-lg bg-forestgreen-50 hover:bg-opacity-70 transition-colors duration-300 ease-in-out
      desktop:px-8 desktop:py-4 desktop:text-xl win11:px-6 win11:py-4 win11:text-xl transform hover:scale-110 tracking-wider"
          onClick={handleDropdownToggle}
         >
          Book Now <FaCalendarAlt className="inline-block ml-1" />
         </button>
        </a>
        
        {/* <button
          className="mobile:hidden tablet:hidden laptop:hidden px-5 py-2 text-white bg-forestgreen-50 rounded-lg hover:bg-opacity-70 transition-colors duration-300 ease-in-out
      desktop:px-8 desktop:py-4 desktop:text-xl win11:px-6 win11:py-4 win11:text-xl transform hover:scale-110 tracking-wide"
          onClick={noBookingPlease}
          >
          Book Now <FontAwesomeIcon icon={faCalendar} />
          </button> */}
        {/**
       * 
      {dropdownOpen && (
        <div className=" ">
          <div className="w-48 rounded-sm shadow-md bg-white ring-1 ring-black right-0 ml-10 mt-3 ring-opacity-5 absolute animated fadeInDown">
            <div className="py-3" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/kayorestaurant" target="_blank" rel="noopener noreferrer">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                onClick={() => handleDropdownItemClick("Option 1")}
              >
                <span className="inline-block mr-2">Kayo Restaurant</span>
                <i className="fas fa-utensils"></i>
              </button>
              </a>
            
              <a href="/bookings/accommodations" target="_blank" rel="noopener noreferrer">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  onClick={() => handleDropdownItemClick("Option 2")}
                >
                  <span className="inline-block mr-2">Cabins/Lake Villas</span>
                  <i className="fas fa-bed"></i>
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      */}
       </div>
      </div>
     </div>
    </div>
    {/* QUOTE */}

    <div
     className="w-full flex text-center
  pt-8
  tablet:pt-10 
  laptop:pt-12
  desktop:pt-14
  win11:pt-16 
  px-4 "
    >
     <div className="w-full     ">
      <div
       className="flex justify-center text-[26px] tablet:text-3xl
       laptop:text-5xl 
      desktop:text-6xl win11:text-7xl
    "
      >
       <div className="font-[Poppins] leading-tight text-center font-[550px] tracking-wide justify-center w-full win11:leading-tight">
        <div className="text-black ">
         {loading ? (
          <p>Loading...</p>
         ) : selectedInfo ? (
          <p>
           <div className="text-forestgreen-50 tracking-wider">
            {selectedInfo.tagline.split("\n")[0]}
           </div>
           {selectedInfo.tagline
            .split("\n")
            .slice(1)
            .map((line, index) => (
             <React.Fragment key={index}>
              {line}
              <br />
             </React.Fragment>
            ))}
          </p>
         ) : null}
        </div>
       </div>
      </div>

      <div className="flex justify-center">
       <img src={separator} alt="" className="w-60 win11:w-96 py-3 " />
      </div>

      <div className="flex text-center font-[Poppins] text-black px-2 win11:px-56 ">
       <div className=" text-center tracking-wider text-black pt-4 w-full text-sm leading-normal laptop:text-lg desktop:text-lg win11:text-lg win11:leading-normal">
        Welcome and get lost in nature’s magic at Sirmata Ecofarm and Nature
        Park!
        <br />
        <br />
        Sirmata is an ideal destination for families who want to spend time
        outdoors, explore nature, make memories, and unwind!
        <br />
        <br />
        Here you can enjoy nature and luxury together with its picturesque
        amenities overlooking the beautiful lake, with good food partnered with
        an assortment of drinks to suit your palates and a lot of fun activities
        to get that adrenaline pumping! <br />
        <br />
       </div>
      </div>
     </div>
    </div>

    {/* ACTIVITIES */}
    <section
     className="p-4 py-8 laptop:px-16 tablet:px-10
        tablet:pt-10 
        laptop:pt-12
        desktop:pt-14
        win11:pt-20 justify-center flex"
    >
     <div className="space-y-12  desktop:max-w-6xl win11:max-w-8xl  ">
      <div className=" flex mobile:flex-col tablet:flex-col laptop:flex-col desktop:space-x-6 desktop:grid-cols-2  win11:space-x-10 win11:grid-cols-2    ">
       <div className="flex justify-center shadow-lg desktop:w-full win11:w-full">
        <img
         src={wineanddine}
         alt=""
         className="rounded-sm object-cover w-full h-72 tablet:h-80 laptop:h-[430px] desktop:h-[430px] win11:h-[430px] aspect-video"
        />
       </div>
       <div className="space-y-4 justify-items desktop:space-y-6 win11:space-y-10 py-9 desktop:w-full win11:w-full tablet:px-10 laptop:px-16 border-b-2 ">
        <h2 className="tracking-wider text-forestgreen-300 font-playlist-script text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl">
         Wine &amp; Dine
        </h2>
        <p className="font-[poppins] tracking-wider dark:text-gray-400 desktop:max-w-lg win11:w-full text-sm text-justify win11:text-lg">
         Embark on a culinary odyssey as you indulge in a symphony of tastes
         amidst the serene beauty of nature's embrace. Delight in the perfect
         blend of fine wine and exquisite cuisine, all while gazing upon the
         tranquil expanse of the lake in our enchanting nature park.
        </p>
        <a href="/kayorestaurant" target="_blank" rel="noopener noreferrer">
         <button
          type="button"
          className="text-xs win11:text-base mobile:w-full font-[Poppins] tracking-widest mt-4 win11:mt-8 px-5 py-3 font-medium rounded-lg text-white bg-forestgreen-50 transition-all duration-300 ease-in-out hover:bg-forestgreen-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
         >
          Know More
          <FaArrowRight className="inline-block ml-3" />
         </button>
        </a>
       </div>
      </div>

      <div className="flex mobile:flex-col lg:flex-row-reverse tablet:flex-col laptop:flex-col desktop:space-x-6 desktop:grid-cols-2 win11:space-x-10 win11:grid-cols-2 ">
       <div className="flex justify-center shadow-lg desktop:w-full win11:w-full ">
        <img
         src={relax}
         alt=""
         className="rounded-sm object-cover w-full h-72 tablet:h-80 laptop:h-[430px] desktop:h-[430px] win11:h-[430px] aspect-video"
        />
       </div>
       <div className="space-y-4 desktop:space-y-6 win11:space-y-10 py-9 desktop:w-full win11:w-full tablet:px-10 laptop:px-16 desktop:pr-10 win11:pr-10 border-b-2">
        <h2 className="tracking-wide text-forestgreen-300 font-playlist-script text-4xl  laptop:text-5xl desktop:text-5xl win11:text-6xl">
         Relax
        </h2>
        <p className="font-[poppins] tracking-wider dark:text-gray-400 desktop:max-w-lg win11:w-full text-sm text-justify win11:text-lg">
         Your haven amidst the woods. Our cozy cabins and lake villas offer a
         curated blend of comfort, each thoughtfully crafted to provide
         relaxation and serenity. Choose from a selection of accommodations that
         reflect rustic elegance and embrace the beauty of our nature park.
        </p>
        <a
         href="/accommodation/Alocasia%20Cabin"
         target="_blank"
         rel="noopener noreferrer"
        >
         <button
          type="button"
          className="text-xs win11:text-base mobile:w-full font-[Poppins] tracking-widest mt-4 win11:mt-8 px-5 py-3 font-medium rounded-lg text-white bg-forestgreen-50 transition-all duration-300 ease-in-out hover:bg-forestgreen-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
         >
          Know More
          <FaArrowRight className="inline-block ml-3" />
         </button>
        </a>
       </div>
      </div>

      <div className=" flex mobile:flex-col tablet:flex-col laptop:flex-col desktop:space-x-6 desktop:grid-cols-2 win11:space-x-10 win11:grid-cols-2">
       <div className="flex justify-center shadow-lg desktop:w-full win11:w-full">
        <img
         src={experience}
         alt=""
         className="rounded-sm object-cover w-full h-72 tablet:h-80 laptop:h-[430px] desktop:h-[430px] win11:h-[430px] aspect-video"
        />
       </div>
       <div className="space-y-4 desktop:space-y-6 win11:space-y-10 py-9 desktop:w-full win11:w-full tablet:px-10 laptop:px-16 border-b-2">
        <h2 className="tracking-wider text-forestgreen-300 font-playlist-script text-4xl tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl">
         Experience
        </h2>
        <p className="font-[poppins] tracking-wider text-gray-700 text-sm desktop:max-w-lg win11:w-full text-justify win11:text-lg">
         Where nature is the main event. Sirmata Ecofarm and Nature Park offers
         a variety of activities, including: atv driving, zip biking, obstacle
         course and of course biking at the beautiful cobblestone pathway by the
         lake. Forget the busy city for awhile and experience nature here at
         Sirmata!
        </p>
        <a href="/activities" target="_blank" rel="noopener noreferrer">
         <button
          type="button"
          className="text-xs win11:text-base mobile:w-full font-[Poppins] tracking-widest mt-4 win11:mt-8 px-5 py-3 font-medium rounded-lg text-white bg-forestgreen-50 transition-all duration-300 ease-in-out hover:bg-forestgreen-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
         >
          Know More
          <FaArrowRight className="inline-block ml-3" />
         </button>
        </a>
       </div>
      </div>

      <div className="flex mobile:flex-col lg:flex-row-reverse tablet:flex-col laptop:flex-col desktop:space-x-6 desktop:grid-cols-2  win11:space-x-10 win11:grid-cols-2">
       <div className="flex justify-center shadow-lg desktop:w-full win11:w-full">
        <img
         src={celebrate}
         alt=""
         className="rounded-sm object-cover w-full h-72 tablet:h-80 laptop:h-[430px] desktop:h-[430px] win11:h-[430px] aspect-video"
        />
       </div>
       <div className="space-y-4 desktop:space-y-6 win11:space-y-10 py-9 desktop:w-full win11:w-full tablet:px-10 laptop:px-16 desktop:pr-10 win11:pr-10 border-b-2">
        <h2 className="tracking-wider text-forestgreen-300 font-playlist-script text-4xl  laptop:text-5xl desktop:text-5xl win11:text-6xl">
         Celebrate
        </h2>
        <p className="font-[poppins] tracking-wider text-sm text-gray-700 desktop:max-w-lg win11:w-full text-justify win11:text-lg">
         Where memories are made. From gorgeous views to delicious food and
         exceptional service, our venue offers a truly unique and memorable
         experience. Come celebrate at Sirmata for a wondrous experience!
        </p>
        <a href="/events" target="_blank" rel="noopener noreferrer">
         <button
          type="button"
          className="text-xs win11:text-base mobile:w-full font-[Poppins] tracking-widest mt-4 win11:mt-8 px-5 py-3 font-medium rounded-lg text-white bg-forestgreen-50 transition-all duration-300 ease-in-out hover:bg-forestgreen-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
         >
          Know More
          <FaArrowRight className="inline-block ml-3" />
         </button>
        </a>
       </div>
      </div>
     </div>
    </section>

    {/* REVIEWS */}

    <div className=" bg-forestgreen-50 w-full md:px-0 px-4  flex justify-center items-center">
     <div className="flex-col desktop:flex-row win11:flex-row desktop:max-w-6xl  win11:max-w-8xl justify-between w-full flex items-center 4 justify-center md:px-10  font-[Poppins]  py-10 space-y-5 md:space-y-0">
      {/* Submit Review here */}
      <div className="">
       <div className="flex flex-col max-w-md p-6 shadow-sm rounded-3xl bg-gray-100 dark:text-gray-100 ">
        {errors && (
         <div className="bg-red-900 text-white rounded-md mb-2 p-2 fadeInDown">
          {Object.keys(errors).map((key) => (
           <p className="animated fadeInDown" key={key}>
            {errors[key][0]}
           </p>
          ))}
         </div>
        )}

        <div className="flex flex-col items-center tracking-wide win11:p-2  ">
         <h2 className="text-lg win11:text-2xl font-semibold text-center">
          Share Your Experience
         </h2>
         <div className="flex flex-col items-center py-5 md:py-4 space-y-3">
          <span className="text-center text-sm win11:text-base">
           We appreciate your input. Please tell us about your visit:
          </span>
          <div className="flex w-full flex-wrap md:space-x-0 space-x-2">
           <div
            className="w-[5%] text-lg text-yellow-900 pt-1 items-center flex laptop:absolute font-semibold"
            style={{ zIndex: 1 }}
           >
            RATE:
           </div>
           <div className="flex w-[95%] justify-center">
            <StarRating
             value={rating}
             onChange={handleRatingChange}
             required
             style={{ zIndex: 10 }}
            />
           </div>
          </div>
         </div>

         <div className="flex flex-col w-full space-y-2">
          <input
           type="text"
           placeholder="Your Name"
           className="p-4 rounded-md text-sm resize-none dark:text-gray-100 dark:bg-gray-900"
           value={full_name}
           onChange={(event) => {
            setFullName(event.target.value);
           }}
          />

          <input
           type="email"
           placeholder="Your Email (Optional)"
           className="p-4 rounded-md text-sm resize-none dark:text-gray-100 dark:bg-gray-900"
           value={email}
           onChange={(event) => {
            setEmail(event.target.value);
           }}
          />

          <textarea
           rows="4"
           placeholder="Your Message..."
           className="p-4 rounded-md text-sm resize-none dark:text-gray-100 dark:bg-gray-900"
           value={review}
           onChange={(event) => {
            setReview(event.target.value);
           }}
          />

          <button
           type="button"
           onClick={save}
           className="py-3 my-4 md:my-4 font-semibold rounded-lg tracking-widest bg-forestgreen-50 text-white hover:bg-forestgreen-300"
          >
           {loading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
          </button>
         </div>
        </div>
       </div>
      </div>

      {/* Guest Reviews here */}
      <div className="w-full win11:w-1/2  desktop:w-1/2 pt-4 pb-10    ">
       <h2 className=" tracking-wider  text-center pb-2 win11:pb-10 font-playlist-script text-white text-3xl win11:text-5xl">
        Guest Reviews
       </h2>

       <div className="w-full">
        <Slider {...settings} className="">
         {guest_reviews
          .filter((guest_review) => guest_review.display === 1)
          .map((guest_review, index) => (
           <div key={index}>
            <div className="flex flex-col p-4 w-full   divide-y rounded-md divide-gray-300 text-gray-100 dark:text-gray-100">
             <div className="flex justify-between p-4">
              <div className="">
               <div>
                <h4 className="font-bold text-base tracking-widest">
                 {guest_review.full_name}
                </h4>
               </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow">
               <FontAwesomeIcon icon={faStar} size="lg" color="orange" />
               <span className="text-xl font-bold">{guest_review.rating}</span>
              </div>
             </div>
             <div className="px-4 pt-4 text-sm dark:text-gray-400 text-justify tracking-widest leading-normal">
              <p>{guest_review.review}</p>
             </div>
            </div>
           </div>
          ))}
        </Slider>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* The ArrowUpButton component will appear when in the middle of the page */}

   <ArrowUpButton />
  </div>
 );
};

export default Home;
