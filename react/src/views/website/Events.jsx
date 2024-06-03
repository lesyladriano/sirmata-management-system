import ArrowUpButton from "/src/components/website/ArrowUpButton";

import cake from '/src/assets/images/website/events/kayoglassresto/wedding.jpg';
import banquet from '/src/assets/images/website/events/kayoglassresto/banquet.jpg';
import conference from '/src/assets/images/website/events/kayoglassresto/conferences.jpg';
import parties from '/src/assets/images/website/events/kayoglassresto/parties.jpg';
import banner from '/src/assets/images/website/events/events_banner.jpg';


import e1 from '/src/assets/images/website/events/e1.jpg';
import e2 from '/src/assets/images/website/events/e2.jpg';
import e3 from '/src/assets/images/website/events/e3.jpg';
import e4 from '/src/assets/images/website/events/e4.jpg';

export default function Events() {
  return (
    <div>
       <div className="relative">
        <img src={banner} className="w-full h-[300px] object-cover object-center  win11:h-auto" />
        <div className="bg-black/30 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">EVENTS</h1>
        </div>
    </div>


<div className="flex flex-col desktop:flex-row win11:flex-row win11:px-20 bg-beige-100">
<div className="w-full  desktop:w-1/2 win11:w-1/2 bg-beige-100 p-10  tablet:p-12 laptop:p-20 desktop:px-10 desktop:py-20  win11:px-20 win11:py-20">
  <h4 className="text-base tablet:text-lg laptop:text-xl font-[Poppins] tracking-wider text-forestgreen-300 leading-tight">CELEBRATE IN STYLE</h4>
  <h2 className="text-3xl tablet:text-4xl  laptop:text-5xl desktop:text-4xl win11:text-5xl font-bold font-[Poppins] pb-8 pt-2  win11:pt-4 text-black tracking-wider ">CREATING YOUR <br/> PERFECT MOMENTS</h2>
  <p className="text-sm tablet:text-base laptop:text-base win11:text-lg font-[poppins] pb-8 leading-loose tracking-wider">Experience the pinnacle of memorable occasions at Sirmata, where your perfect moments are elevated amidst breathtaking landscapes. Envision exchanging vows within the ethereal ambiance of the glass chapel, a sanctuary that melds nature and elegance.</p>
  <p className="text-sm tablet:text-base laptop:text-base win11:text-lg font-[poppins] pb-8 leading-loose tracking-wider">Following the ceremony, bask in the luxury of our pool clubhouse, a haven of relaxation and celebration, where vibrant conversations and laughter resonate alongside refreshing waters. Sirmata offers an unrivaled canvas to paint your cherished events, harmonizing beauty, comfort, and the magic of shared memories.</p>

  <div className="  border-brown-100 tracking-wider p-6 mb-8 shadow-md border-2 border-dashed font-[Poppins]">
    <h3 className="text-lg  font-bold text-forestgreen-300 uppercase mb-2">Unlock unforgettable moments!</h3>
    <p className="text-base text-black mb-4">For event inquiries, kindly provide the following details:</p>
    <ul className="list-disc list-inside text-base text-gray-900 mb-4">
        <li>Name</li>
        <li>Event Name</li>
        <li>Event Date</li>
        <li>Number of Pax</li> 
        <li>Contact Number</li>
        <li>Email Address</li>
        <li>Other Relevant Information</li>
    </ul>
    <p className="text-sm text-gray-700">And send to <a href="mailto:sirmatafarm@gmail.com" className="text-forestgreen-100 font-bold hover:underline">sirmatafarm@gmail.com</a> and we’ll get in touch with you shortly.</p>
</div>



</div>


      <div className="w-full  desktop:w-1/2 win11:w-1/2 bg-beige-100 p-4 laptop:p-12  desktop:px-10 desktop:py-20 win11:px-10 win11:py-24"> 
        <div className="grid grid-cols-2 gap-4">
          {/* Images */}
          <img
            src={e1}
            alt="Image 1"
            className="w-full  rounded"
          />
          <img
            src={e2}
            alt="Image 2"
            className="w-full"
          />
          <img
            src={e3}
            alt="Image 3"
            className="w-full rounded"
          />
          <img
            src={e4}
            alt="Image 4"
            className="w-full  rounded"
          />
        </div>
      </div>
    </div>


    <div className="flex items-center justify-center py-5  bg-beige-100">
      <div className="border-t border-brown-100 w-full max-w-xs tablet:max-w-2xl laptop:max-w-lg desktop:max-w-5xl win11:max-w-6xl"></div>
    </div>

  {/* 2nd Row */}
  <section className="flex flex-col desktop:flex-row win11:flex-row py-10 tablet:py-16 tablet:px-10 laptop:py-10 laptop:px-12 desktop:px-10 desktop:py-16 win11:px-32 win11:py-20 bg-beige-100">
  <div className="w-full  desktop:w-1/2 win11:w-1/2 bg-beige-100 px-8  ">
    
  <h4 className="text-base tablet:text-lg laptop:text-xl font-[Poppins] tracking-wider text-forestgreen-300 leading-tight">CHOOSE THE BEST</h4>
  <h2 className="text-2xl tablet:text-3xl  laptop:text-4xl desktop:text-4xl win11:text-4xl  font-bold font-[Poppins] pb-8 tablet:pb-6 pt-2  win11:pt-4 text-black tracking-wider  ">CATERING THAT REFLECTS <br/> YOUR UNIQUE STYLE </h2>
    
    </div>
  
    <div className="w-full  desktop:w-1/2 win11:w-1/2 bg-beige-100 tracking-wider "> 
        <p className="text-xs tablet:text-sm laptop:text-sm win11:text-base font-[poppins] leading-loose max-w-2xl px-8">Savor exquisite catering that marries scrumptious delights, a medley of menu choices, and contemporary elegance.</p>
        <ul className="pt-4 space-y-8 tracking-wide px-8 text-brown-100 "> 
          <li className="font-[poppins] text-lg tablet:text-2xl  laptop:text-2xl win11:text-2xl">01. DELICIOUS MEALS</li>
        
          <li className="font-[poppins] text-lg tablet:text-2xl  laptop:text-2xl win11:text-2xl">02. VARIED MENU OPTIONS</li>

          <li className="font-[poppins] text-lg tablet:text-2xl  laptop:text-2xl win11:text-2xl">03. MODERN PRESENTATION</li>
        </ul>
      </div>
  
</section>







{/* SERVICES */}
<div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-4 win11:grid-cols-4 px-6 tablet:px-24 laptop:px-10 desktop:px-2 win11:px-10 py-8 md:py-12 lg:py-16 xl:py-20">
  <div className="p-4">
  <div className="relative overflow-hidden rounded-lg font-[Poppins]">
      <a href="#" className="block group">
        <img src={parties} alt="Parties" className="w-full mobile:h-[400px] tablet:h-[600px] win11:h-[500px] desktop:h-[350px] laptop:h-[500px] transition duration-500 transform group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col items-end justify-end p-6  hover:bg-forestgreen-300 hover:bg-opacity-50">
          <h1 className="text-xl font-semibold text-forestgreen-50 bg-white  p-2 uppercase tracking-widest mb-2">Parties</h1>
        </div>
      </a>
    </div>
  </div>
  <div className="p-4">
  <div className="relative overflow-hidden rounded-lg font-[Poppins]">
      <a href="#" className="block group">
        <img src={cake} alt="Wedding" className="w-full mobile:h-[400px] win11:h-[500px] tablet:h-[600px] desktop:h-[350px] laptop:h-[500px] transition duration-500 transform group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col items-end justify-end p-6  hover:bg-forestgreen-300 hover:bg-opacity-50">
          <h1 className="text-xl font-semibold text-forestgreen-50 bg-white  p-2 uppercase tracking-widest mb-2">Wedding</h1>
        </div>
      </a>
    </div>
  </div>
  <div className="p-4">
    <div className="relative overflow-hidden rounded-lg font-[Poppins]">
      <a href="#" className="block group">
        <img src={conference} alt="Conferences" className="w-full  mobile:h-[400px] tablet:h-[600px] win11:h-[500px] desktop:h-[350px] laptop:h-[500px] transition duration-500 transform group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col items-end justify-end p-6  hover:bg-forestgreen-300 hover:bg-opacity-50">
          <h1 className="text-xl font-semibold text-forestgreen-50 bg-white  p-2 uppercase tracking-widest mb-2">Conferences</h1>
        </div>
      </a>
    </div>
  </div>
  <div className="p-4">
  <div className="relative overflow-hidden rounded-lg font-[Poppins]">
      <a href="#" className="block group">
        <img src={banquet} alt="Banquets" className="w-full   mobile:h-[400px] tablet:h-[600px] win11:h-[500px] desktop:h-[350px] laptop:h-[500px] transition duration-500 transform group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col items-end justify-end p-6  hover:bg-forestgreen-300 hover:bg-opacity-50">
          <h1 className="text-xl font-semibold text-forestgreen-50 bg-white  p-2 uppercase tracking-widest mb-2">Banquets</h1>
        </div>
      </a>
    </div>
  </div>
</div>




{/* GALLERY */}
{/* <section>
  <div className="max-w-max px-4 pb-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-4">
    <li className="lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <a href="#" className="relative block group">
          <img
            src={image1}
            alt=""
            className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />

         
        </a>
      </li>
      <li>
        <a href="#" className="relative block group">
          <img
            src={image2}
            alt=""
            className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />
        </a>
      </li>

      <li>
        <a href="#" className="relative block group">
          <img
            src={image3}
            alt=""
            className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />

         
        </a>
      </li>
      <li>
        <a href="#" className="relative block group">
          <img
            src={image4}
            alt=""
            className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />

         
        </a>
      </li>
      <li>
        <a href="#" className="relative block group">
          <img
            src={image5}
            alt=""
            className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
          />

         
        </a>
      </li>

      
    </ul>
  </div>
</section> */}

<ArrowUpButton/>
    </div>
  )
}
