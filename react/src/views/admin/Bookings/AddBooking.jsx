
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../../assets/css/addbookings.css';
import LoadingCircle from '../../../components/misc/LoadingCircle';
export default function BookingAccommodation() {

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleDateClick = (date) => {
    console.log(markedDate)
    if (checkInDate === null) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (checkOutDate === null && date > checkInDate) {
      setCheckOutDate(date);
    } else {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
    setNumberOfNights(calculateNights());
  };
  const [markedDate, setMarkedDate] = useState(null); 



  const handleAddKids = () => setKids((prevKids) => prevKids + 1);
  const handleRemoveKids = () => kids > 0 && setKids((prevKids) => prevKids - 1);
  const handleAddAdult = () => setAdults((prevAdults) => prevAdults + 1);
  const handleRemoveAdult = () => adults > 1 && setAdults((prevAdults) => prevAdults - 1);

  
{/**OLF NA TO */}
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };



  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return numberOfNights;
    }
    return 0;
  };

  const handleCheckAvailability = () => {
    setMarkedDateRanges([]);
    const requiredCapacity = adults + kids;
    setDateErrorMessage('');
  


  
    const overlappingReservations = reservations.filter(reservation => {
      const reservationStartDate = new Date(reservation.check_in_date);
      const reservationEndDate = new Date(reservation.check_out_date);
  
      return (
        checkInDate < reservationEndDate && checkOutDate > reservationStartDate
      );
    });
  
    if (overlappingReservations.length > 0) {
      // Handle overlapping reservations
      console.log('Overlapping reservations:', overlappingReservations);
  
      // Get accommodation_id from overlapping reservations
      const overlappingAccommodationIds = overlappingReservations.map(reservation => reservation.accommodation_id);
      console.log('Overlapping accommodation IDs:', overlappingAccommodationIds);
  
      // Filter accommodations based on both capacity and overlapping reservations
      const filteredAccommodations = originalAccommodations.filter((accommodation) => {
        const [minCapacity, maxCapacity] = accommodation.capacity.split('-');
        return (
          Number(minCapacity) <= requiredCapacity &&
          requiredCapacity <= Number(maxCapacity) &&
          !overlappingAccommodationIds.includes(accommodation.accommodation_id)
        );
      });
  
      setAccommodation(filteredAccommodations);
      setShowBookingDetails(true);
    }
  };
  

 
 
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  
const handleResetFilters = () => {
  setAccommodation(originalAccommodations);
  setSelectedTab("All"); 
  setSearchQuery(""); 
  setShowBookingDetails(false); 
  setCheckInDate(null); 
  setCheckOutDate(null); 
  setAdults(1); 
  setKids(0);
};
  
  
const [originalAccommodations, setOriginalAccommodations] = useState([]);
  const [accommodation_id, setAccommodationId] = useState(null);
  const [room_name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [images, setImages] = useState("");
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(false);

  const [guest_id, setGuestId] = useState('');
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [guest_email, setGuestEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const [special_requests, setSpecialRequest] = useState("");
  const [arrival_time, setArrivalTime] = useState("");
  const handleArrivalTimeChange = (event) => {
  setArrivalTime(event.target.value);
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  
    async function Load() {
      setMarkedDateRanges([]);
      setLoading(true);
      try {
        const accommodationResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/accommodation`);

     
        setAccommodation(accommodationResponse.data);
        setOriginalAccommodations(accommodationResponse.data);
        console.log('Accommodation',accommodationResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

  function displayFeatures(features) {
    if (!features) {
      return "N/A";
    } else if (Array.isArray(features)) {
      return features.join(', ');
    } else {
      return features;
    }
  }

 

  const getIcon = (accommodationType) => {
    if (accommodationType === "Cabin") {
      return <i className='fa fa-house mr-1' />;
    } else if (accommodationType === "Villa" || accommodationType === "Lake Villa") {
      return <i className='fa fa-house-chimney  mr-1' />;
    } else {
      return <i className='fa fa-house  mr-1' />;
    }
  };

  {/** Selected Tab */}
  const [selectedTab, setSelectedTab] = useState("All");


  {/**Search Function */}
  const [searchQuery, setSearchQuery] = useState('');
  const filteredAccommodations = accommodation.filter((accommodation) => {
    const matchesType = selectedTab === "All" || accommodation.type === selectedTab;
    const accommodationName = accommodation.room_name.toLowerCase();
    const accommodationType = accommodation.type.toLowerCase();
    const accommodationDescription = accommodation.description.toLowerCase();
    const featuresArray = Array.isArray(accommodation.feature) ? accommodation.feature : [accommodation.feature];
    const matchesSearchQuery =
      accommodationName.includes(searchQuery.toLowerCase()) ||
      accommodationType.includes(searchQuery.toLowerCase()) ||
      accommodationDescription.includes(searchQuery.toLowerCase()) ||
      featuresArray.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    const isNotMaintenance = accommodation.status !== "Maintenance";
    return matchesType && matchesSearchQuery && isNotMaintenance;
  });

  const [dateErrorMessage, setDateErrorMessage] = useState(null);

  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  function handleBookNow(accommodationId) {
    
    console.log('cc',checkInDate)
    console.log('cc',checkOutDate)

    setDateErrorMessage(null);

    console.log('cc',checkInDate)
    console.log('cc',checkOutDate)
  

    setSwitchTab(false);
    const selectedAccommodation = accommodation.find(acc => acc.accommodation_id === accommodationId);
  
    if (selectedAccommodation) {
      setSelectedAccommodation({
        ...selectedAccommodation,
        accommodation_id: accommodationId // Ensure the accommodation_id is included
      });
    }
  
    console.log(selectedAccommodation); // Make sure the object includes accommodation_id
  }
  
  

const formatDateCalendar = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

{/**Check Schedule */}
const parseDate = (dateString) => {
  const parts = dateString.split('-');
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[0], 10);

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};







const [switchTab, setSwitchTab] = useState(true);
  {/**Set Total Payment */}
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace(/,/g, ''));
  };



  const getLocalDate = () => {
    const now = new Date();
    const localOffsetMs = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    return new Date(now.getTime() - localOffsetMs);
  };

  function formatDate1(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }


  {/**Save */}

async function save(event) {
  event.preventDefault();
  setIsLoadingSave(true);

  console.log('HI');

  const guestData = {
  first_name: first_name,
  last_name: last_name,
  guest_email: guest_email,
  contact_number: contact_number,
  address: address,
  };
  

  try {
  const guestResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/guests/save`, guestData);
  
  const guestId = guestResponse.data.guest_id;
  
  const confirmation = ``;
  
  // Use SweetAlert for confirmation
  const result = await Swal.fire({
    title: 'Confirm Reservation',
    icon: 'question',
    html: confirmation,
    iconColor: '#A0A0A0',
    showCancelButton: true,
    confirmButtonText: 'Continue',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#009900',
    cancelButtonColor: '#990000',
    width: '30em',
    showCloseButton: true,
   
    });
  

  if (result.isConfirmed) {

  const reservationData = {
  guest_id: guestId,
  accommodation_id:selectedAccommodation.accommodation_id,
  special_requests: special_requests || 'None',
  check_in_date: checkInDate,
  check_out_date: checkOutDate,
  arrival_time: arrival_time,
  status:'Scheduled',
  };
  
  try {
  const reservationResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reservation/save`, reservationData);
  const reservationId = reservationResponse.data.reservation_id; // Get the reservation_id from the response
  
  
  await Swal.fire({
    title: 'Reservation Confirmation',
    icon: 'success',
    text: 'Your reservation has been successfully submitted.',
    confirmButtonColor: '#606060',
    timer: 4000,
    timerProgressBar: true,
});

  
          // Clear form data
          setSaveError("");
          setGuestId("");
          setFirstName("");
          setLastName("");
          setGuestEmail("");
          setContactNumber("");
          setAddress("");
          setSpecialRequest("");
          setArrivalTime("");
          setIsLoadingSave(false);
          setCheckInDate("");
          setCheckOutDate("");
          setMarkedDateRanges(null)
          const totalAmount = (
            calculateNights() * parsePrice(selectedAccommodation.price)
          );

          const paymentData = {
            reservation_id: reservationId, // Use the ID from the guestResponse
            guest_id: guestId,
            payment_mode: 'offline',
            reference_number: '99999',
            total_amount: totalAmount, // Make sure you have totalAmount defined
            payment_status: 'Paid',

          };
          try {
             const paymentResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payments/save`, paymentData);
            const paymentId = paymentResponse.data.payment_id; // Get the reservation_id from the response

            const updatedReservationData = {
              ...reservationData,
              payment_id:paymentId,
            };


            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/reservation/update/${reservationId}`, updatedReservationData);

          } catch (error) {
            console.error("Payment Error:", error);
            await Swal.fire({
              title: 'Payment Error',
              text: 'Your payment failed to process.',
              icon: 'error',
              showConfirmButton: false,
              showCloseButton: true,
          
          });
            // SweetAlert error notification
          }
        } catch (error) {
          await Swal.fire({
            title: 'Reservation Error',
            text: 'Your reservation failed to be processed.',
            icon: 'error',
            showConfirmButton: false,
            showCloseButton: true,
            width: '30em',
        });
        
        
         // SweetAlert error notification
        }
      } else {
  
        await Swal.fire({
          title: 'Reservation Cancelled',
          text: 'Your reservation has been cancelled.',
          icon: 'info',
          confirmButtonColor: '#606060',
          timer: 5000,
          timerProgressBar: true,
        });
         // SweetAlert canceled notification
        window.location.href = "/bookings/allbooking";
        setSaveError("");
        setGuestId("");
        setFirstName("");
        setLastName("");
        setGuestEmail("");
        setContactNumber("");
        setAddress("");
        setSpecialRequest("");
        setArrivalTime("");
         setIsLoadingSave(false);
   
        try {
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/guests/delete/`+ guestId);
        } catch (error) {
          setIsLoadingSave(false);
          console.error("Error deleting guest:", error);
        }
      
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setSaveError(response.data.errors);
        setSwitchTab(true);
      }
      setIsLoadingSave(false);
    await Swal.fire({
      title: 'Reservation Failed',
      text: 'We apologize, the reservation could not be completed.',
      icon: 'error',
      showConfirmButton: false,
      showCloseButton: true,
      focusClose: true,
    });
    }
  }
  
  const [save_error, setSaveError] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);


  const handleTabClick = () => {
    if (checkInDate === null || checkOutDate === null || selectedAccommodation.accommodation_id === null) {
      setDateErrorMessage('Check-in and Check-out dates, as well as accommodation, are required.');
    } else {
      setDateErrorMessage('');
      setSwitchTab(false);
    }
  };

  
  const [reservations, setReservations] = useState([]);
  const [markedDateRanges, setMarkedDateRanges] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
const [message,setMessage]=useState("");
const [loadingSched,setLoadingSched]=useState(false);

const handleCheckSchedule = async (accommodationId) => {
  handleDateClick(null);
  setDateErrorMessage(null);
  setMarkedDateRanges([]);
  setMessage("");
  setLoadingSched(true);

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reservation`);
    const currentDate = new Date();
    const reservationsForAccommodation = response.data.filter(
      reservation =>
        reservation.accommodation_id === accommodationId &&
        new Date(reservation.check_out_date) >= currentDate // Check if check-out date is in the future
    );

    const newMarkedDateRanges = reservationsForAccommodation.map(reservation => ({
      start: new Date(reservation.check_in_date),
      end: new Date(reservation.check_out_date)
    }));
    console.log('newMarkedDateRanges',newMarkedDateRanges)
    setMarkedDateRanges(newMarkedDateRanges);

    if (reservationsForAccommodation.length > 0) {
      setLoadingSched(false);
      setSelectedReservation(reservationsForAccommodation[0]);
      setMessage("Reservations set for this Accommodation");
    } else {
      setLoadingSched(false);
      setSelectedReservation(null);
      setMessage("No reservations found for this accommodation.");
    }
  } catch (error) {
    setLoadingSched(false);
    console.log("DUmbass");
    console.error('Error fetching reservations:', error);
  }
};


const getTileContent = (date, selectedBookingDateRange, reservedGuestDates) => {
  if (selectedBookingDateRange.some(selectedDate => selectedDate.toDateString() === date.toDateString())) {
    return <div className="guest_booking_dates"></div>;
  } else if (reservedGuestDates.some(reservedDate => date >= reservedDate.check_in_date && date <= reservedDate.check_out_date)) {
    return <div className="reserved_guest_dates"></div>;
  }
  return null;
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reservation`);
      setReservations(response.data);

      const reservationsForAccommodation = response.data.filter(
        reservation => reservation.accommodation_id === accommodationId
      );

      const newMarkedDateRanges = reservationsForAccommodation.map(reservation => ({
        start: new Date(reservation.check_in_date),
        end: new Date(reservation.check_out_date)
      }));

      setMarkedDateRanges(newMarkedDateRanges);

      if (reservationsForAccommodation.length > 0) {
        setSelectedReservation(reservationsForAccommodation[0]);
        setMessage("");
      } else {
        setSelectedReservation(null);
        setMessage("No reservations found for this accommodation.");
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  fetchData();
}, []);


  const [reservationCheckIn, setReservationCheckIn] = useState(null);
  const [reservationCheckOut, setReservationCheckOut] = useState(null);




  const tileClassName = ({ date, view }) => {
    
    const isInMarkedRange = markedDateRanges.some(range => date >= range.start && date <= range.end);
    if (isInMarkedRange) {
      return 'marked-date-range';
    }
    console.log('isInMarkedRange',isInMarkedRange)
    

    
    if (checkInDate && checkOutDate) {
      if (date >= checkInDate && date <= checkOutDate) {
        if (date === checkInDate) {
          return 'selected-date-range check-in-date';
        }
        return 'selected-date-range';
      }
    } else if (date === checkInDate) {
      return 'check-in-date';
    }
    return null;
  };
  
    
  

return(
    
<div className=' '>
    <div className="flex-1 justify-start">
    <h2 className="tracking-wider font-[Poppins] font-semibold px-12 py-8  text-xl">BOOKINGS  <FontAwesomeIcon icon={faAngleRight} className=''/> ADD BOOKING</h2>
    </div>
    <hr className="border-t-2 px-14 border-gray-300 " />

    {/**Parent Container */}
    <div className='w-full flex mt-4 px-14'> 
        <div
        className={`py-1 w-36 whitespace-nowrap shadow-sm text-center rounded-t-lg border-2 ${
          switchTab ? 'bg-white' : ' bg-gray-200'
        }`}
        onClick={() => setSwitchTab(true)}>
           <i className='fa-solid fa-plus'/> Add Bookings
        </div>    
        <div
        className={`py-1 w-36 whitespace-nowrap shadow-sm text-center rounded-t-lg border-2 ${
          switchTab ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={handleTabClick}>
        <i className='fa-solid fa-user'/> Personal Details
      </div>
          

     </div>
   {switchTab ? ( 
    <div className="cabin-card bg-white p-2 mx-14 justify-center desktop:space-x-10   win11:space-x-10   laptop:flex-col  tablet:flex-col mobile:flex-col desktop:flex win11:flex desktop:h-140  win11:h-140">

      {/**Calendar Container */}
      <div className='  flex justify-center'>
      <div className="addbookings-calendar-container h-fit w-full flex  justify-center">
        <div className="bg-gray-200 rounded-md  shadow-sm ">
             <ReactCalendar
                minDate={new Date()}
                className="addbookings-calendar-design "
                view="month"
                onClickDay={handleDateClick}
                value={[checkInDate, checkOutDate]}
                selectRange={true}
                tileClassName={tileClassName}
                monthClassName="text-lg font-bold"
              />



              <div className="book-now-container flex-col space-y-2 mx-2 ">
              <div className="details-container space-y-3 px-2 ">
                
              {dateErrorMessage && (
                <div className="fadeInDown bg-red-900 text-white px-2 py-1 rounded-md shadow-md text-sm">
                  {dateErrorMessage}
                </div>
                )} 

{message && (
  <div className="fadeInDown bg-green-600 text-white px-2 py-1 rounded-md shadow-md text-sm">{message}</div>
)}


                <div className="flex justify-between">
                  {/**Check In Date */}
                  <span className="flex">
                    Check In:
                    <div className="ml-2 w-20 text-center font-semibold">
                      {checkInDate && formatDate(checkInDate)}
                    </div>
                  </span>
                  {/**Check Out Date */}
                  <span className="flex">
                    Check Out:
                    <div className="ml-2 w-20 text-center font-semibold">
                      {checkOutDate && formatDate(checkOutDate)}
                    </div>
                  </span>
                </div>

                {/**Adults, Kids, and Nights */}
                <div className="flex justify-between w-full mt-2 ">
                  <div className="w-1/2 justify-between">
                    <span className="flex justify-between">
                      Adults:
                      <div className="w-20 add-customer-container space-x-3">
                        <i
                          className={`fa fa-minus ${
                            adults === 1? 'text-gray-400 cursor-not-allowed' : ''
                          }`}
                          onClick={adults === 0 ? null : handleRemoveAdult}
                        />
                        <span className="font-semibold">{adults}</span>
                        <i className="fa fa-plus" onClick={handleAddAdult} />
                      </div>
                    </span>
                    <span className="flex justify-between">
                      Kids:
                      <div className="w-20 add-customer-container space-x-3">
                        <i
                          className={`fa fa-minus ${
                            kids === 0 ? 'text-gray-400 cursor-not-allowed' : ''
                          }`}
                          onClick={kids === 0 ? null : handleRemoveKids}
                        />
                        <span className="font-semibold">{kids}</span>
                        <i className="fa fa-plus" onClick={handleAddKids} />
                      </div>
                    </span>
                  </div>

                  {/**Nights */}
                  <div className="w-1/2 flex justify-center">
                    <div className="px-1 py-1 rounded-md shadow-md bg-forestgreen-50 text-white">
                      <div className="justify-center flex text-2xl font-normal">
                        {calculateNights()}
                      </div>
                      <div className="text-lg">Nights</div>
                    </div>
                  </div>
                </div>
              </div>

              {/**Availability Button */}
              <div className="">
                <button className="btn-block shadow-md btn-checkavail py-3" onClick={handleCheckAvailability}>
                  Check Available Accommodations
                </button>
              </div>
            </div>
        </div>

        
      </div>
</div>

      {/**Accommodations */}                      
      <div className="laptop:mt-4 
       mobile:mt-4 tablet:mt-4 bg-gray-200 overflow-auto">
      <div className="  flex-col mobile:whitespace-nowrap tablet:whitespace-nowrap  laptop:w-full tablet:w-full mobile:w-full">
      

        <div className='bg-green-900 pt-2 rounded-t-md '>
          <div className=' booking-tab-container px-4 mobile:px-0 tablet:px-0 justify-between '>
            <div className=' space-x-4 mobile:space-x-2 tablet:space-x-2 flex items-center' >
              <div className={`booking-tab px-3 py-1${selectedTab === "Cabin" ? "active" : ""}`}
                onClick={() => setSelectedTab("Cabin")}>
                Cabins
              </div>
              <div className={`booking-tab  px-3 py-1 ${selectedTab === "Lake Villa" ? "active" : ""}`}
                onClick={() => setSelectedTab("Lake Villa")}>
                Villas
              </div>
              <div className={`booking-tab  px-3 py-1${selectedTab === "All" ? "active" : ""}`}
              onClick={() => handleResetFilters()}>
              All
            </div>
            </div>
            <div className="flex">
              <input
                className="search-bar h-full"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button">
                <i className="fa fa-magnifying-glass" />
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className='h-full px-4 py-4 text-gray-900 '>
            <LoadingCircle />
          </div>
        )}

        {!loading && (
          <div className=' px-4 py-4 overflow-auto  h-full  w-180   '>
            {filteredAccommodations.length === 0 ? (
              <div className="card text-center font-[Poppins] ">
                No matches found.
              </div>
            ) : (
              filteredAccommodations.map((accommodation) => {
                if (selectedTab === "All" || accommodation.type === selectedTab) {
                  return (
                    <div key={accommodation.id} className="">
                      <div className="shadow-md justify-between fadeInDown flex p-4 mb-2 bg-white win11:h-52 desktop:h-52 laptop:flex-col tablet:flex-col  ">

                        {/** IMAGE THUMBNAIL */}
                          <div className="win11:h-full desktop:h-full tablet:flex tablet:justify-center  h-50" >
                            <img src={accommodation.images} className="accommodation-thumbnail-add object-cover" />
                          </div>

                        {/** ACCOMMODATION DETAILS */}
                        <div className='  w-full px-2 '>
                        <div className='uppercase font-bold text-lg text-green-900'>
                        
                          </div>
                          <div className='uppercase font-bold text-lg text-green-900 w-full flex justify-between'>
                            <div>
                            {accommodation.room_name}
                            </div>
                            <div className='items-center cursor-pointer' title='Check Accommodation Schedule'>
                            {!loadingSched ? (  
                            <i className='fa fa-calendar' onClick={() => handleCheckSchedule(accommodation.accommodation_id)} />
                            ):(
                              <i className='fa-solid fa-spin fa-spinner' />
                            )}
                            </div>


                          </div>
                  
                          <div className="justify-between pt-2 flex  ">
                            <div >
                              {getIcon(accommodation.type)}
                              {accommodation.type}
                            </div>
                            <div>
                              <i className='fa fa-person text-lg mr-1' />
                              Capacity: &nbsp;
                              {accommodation.capacity}
                            </div>
                          </div>
                         
                          <div className=''>
                          <div className='w-full  flex flex-col mt-2'>
                            <div className=' h-full items-center w-full'>
                              <div className='flex flex-wrap justify-center'>
                                <div className='font-bold text-2xl'>
                                  PHP {accommodation.price}
                                </div> 
                                <div className='w-full flex justify-center t'>
                                  <span className='text-sm'>per night</span>
                                </div>
                              </div>
                            </div>
                            <div className='w-full '>
                                <button className='book-now-button' onClick={() => handleBookNow(accommodation.accommodation_id)}>Book Now</button>
                            </div>
                          </div>
                         </div>
                        </div>

                        {/** PRICE AND BOOK */}
                        
                      </div>
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        )}
      </div>                     
      </div>
    </div>):
    ( 
      <div className='border-blue-900 border-2  cabin-card bg-whitep-2 mx-14 justify-center desktop:space-x-10   win11:space-x-10   laptop:flex-col  tablet:flex-col mobile:flex-col desktop:flex win11:flex desktop:h-140  win11:h-140  '>
     
        <div className="bg-white p-2 justify-center  flex space-x-4 grid-cols-2 grid   border-red-900  border">
            
            {/**Booked Room Column */}
          <div className='pt-6 w-full flex justify-center  h-fit'>
      
              <div className=' border-2 rounded-lg shadow-md p-2'>
              

                <div>
                 <img src= {selectedAccommodation.images} className=' w-full object-cover h-40' />
                </div>

                  {/**Desc */} 
                <div className=''>
                 <div className='flex items-center  justify-between '>
                    <div className='text-lg  font-bold'>
                      {selectedAccommodation.room_name}
                    </div>
                  </div>
                  <div className='text-sm flex grid grid-cols-2 '>
                    <div className='w-full '>
                      Capacity: &nbsp; {selectedAccommodation.capacity}
                    </div>
                    <div className='w-full '>
                      Nights: &nbsp; {calculateNights()}
                    </div>
                  </div>
                  <div className='flex grid grid-cols-2'>
                    <div className='w-full'>
                      Check In:  {checkInDate && formatDate(checkInDate)}
                    </div>
                    <div className='w-full'>
                      Check Out:  {checkOutDate && formatDate(checkOutDate)}
                    </div>
                  </div>
                  <div className='flex w-full grid grid-cols-2  py-1'>
                    <div className='w-full font-bold text-md' >
                     Price Per Night: 
                    </div>
                    <div className=' w-full font-bold  text-lg'>
                      PHP  {selectedAccommodation.price}
                    </div>
                  </div>

                
                </div>

              </div>

              {save_error && (
                <div className="alert text-white mt-3 shadow-md fadeInDown">
                {Object.keys(save_error).map((key) => (
                <p className="" key={key}>
                {save_error[key][0]}
                </p>
                ))}
                </div>
                )}

          </div>     

          <div className='w-full  flex justify-center '>

     <div className='max-w-xl p-4'>
        <div className="grid grid-cols-6">
          <div className='flex grid grid-cols-2 gap-2'>
            <div className="">
                <label htmlFor="firstname" className="text-sm">First name</label>
                <input
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    required
                    value={first_name}
                    onChange={(event) => { setFirstName(event.target.value); }}
                    className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                />
            </div>

            <div className="">
                <label htmlFor="lastname" className="text-sm">Last name</label>
                <input
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    value={last_name}
                    onChange={(event) => { setLastName(event.target.value); }}
                    className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                />
            </div>
          </div>

          <div className='flex grid grid-cols-2 gap-2'>
            <div className="">
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={guest_email}
                    onChange={(event) => { setGuestEmail(event.target.value); }}
                    className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                />
            </div>

            <div className="">
                <label htmlFor="contactNo" className="text-sm">Contact number</label>
                <input
                    id="contactNo"
                    type="text"
                    placeholder="Contact no."
                    value={contact_number}
                    onChange={(event) => { setContactNumber(event.target.value); }}
                    className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                />
            </div>
          </div>
            <div className="col-span-full">
                <label htmlFor="address" className="text-sm">Address</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => { setAddress(event.target.value); }}
                    className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
                />
            </div>

            
        </div>
        <hr className="border-1 border-forestgreen-50 opacity-90 mt-4 py-1" />
        <form action="" className="flex flex-col">
        <div className="grid grid-cols-2  gap-2">
          {/* Special Request Field */}
          <div className="">
            <label htmlFor="specialRequest" className="text-sm">Special Request</label>
            <textarea 
              id="specialRequest"
              placeholder="Enter your special request"
              rows="3"
              value={special_requests}
              onChange={(event) => { setSpecialRequest(event.target.value); }}
              className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900 border-2 p-2"
            />
          </div>
          {/* Expected Arrival Time Field with Dropdown */}
          <div className="">
            <label htmlFor="arrivalTime" className="text-sm">Estimated Arrival Time</label>
            <select
              id="arrivalTime"
              className="w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900 h-12 border-2"
              value={arrival_time}
              onChange={handleArrivalTimeChange}>
              <option value="">Select an option</option>
              <option value="2:00 pm">2:00 pm</option>
              <option value="4:00 pm">4:00 pm</option>
              <option value="7:00 pm">7:00 pm</option>
            </select>
          </div>
        </div>

        <div className='w-full py-2 grid grid-cols-2 px-20'> 
          <div className='text-center'>
            Payment Method:
          </div>
          <div className='text-center'>
            Face to Face
          </div>
        </div>

        <div className='w-full text-xl py-2 grid grid-cols-2 px-20'> 
          <div className='text-center'>
            Total Amount:
          </div>
          <div className='text-center'>
            {(
              calculateNights() * parsePrice(selectedAccommodation.price)
            ).toLocaleString('en-PH', {
              style: 'currency',
              currency: 'PHP',
            })}
          </div>
        </div>

        <div>
        <button
                        type='submit'
                        className="bg-forestgreen-50 btn-block text-white py-3 rounded-md shadow-lg btn-proceed"
                        onClick={save}  >
                           {isLoadingSave ? 
                              <i className="fa fa-spinner fa-spin">
                            </i> : 'PROCEED'}
                      </button>
        </div>
      </form>

    </div>
        </div>


          
        </div>
      </div>

    )}
</div>
)
}