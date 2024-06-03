

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/src/assets/css/slider.css';
import '/src/assets/css/about.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { GiThreeLeaves } from "react-icons/gi";
import { GiWoodBeam } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";




import Image1 from '/src/assets/images/website/about/one_about.jpg';
import Image2 from '/src/assets/images/website/about/two_about.jpg';
import Image3 from '/src/assets/images/website/about/three_about.jpg';
import Image4 from '/src/assets/images/website/about/four_about.jpg';
import Image5 from '/src/assets/images/website/about/five_about.jpg';
import Image6 from '/src/assets/images/website/about/six_about.jpg';
import Image7 from '/src/assets/images/website/about/seven_about.jpg';
import Image8 from '/src/assets/images/website/about/eight_about.jpg';

import promo from '/src/assets/images/website/about/aspectvideo.jpg';

import ArrowUpButton from "/src/components/website/ArrowUpButton";
import separator from '/src/assets/images/website/separator_OAP.png';
import aboutbanner from '/src/assets/images/website/about/about_banner.jpg';


const CustomPrevArrow = (props) => (
  <button
    {...props}
    className="slick-arrow custom-prev-arrow"
    aria-label="Previous"
  >
    <FontAwesomeIcon icon={faChevronLeft} className='bg-forestgreen-50 p-4  '  />
  </button>
);

const CustomNextArrow = (props) => (
  <button
    {...props}
    className="slick-arrow custom-next-arrow"
    aria-label="Next"
  >
    <FontAwesomeIcon icon={faChevronRight} className='bg-forestgreen-50 p-4 ' />
  </button>
);


export default function AboutUs() {

   // Carousel items array
   const carouselItems = [
    { imageSrc: Image1, caption: 'Caption 1' },
    { imageSrc: Image2, caption: 'Caption 2' },
    { imageSrc: Image3, caption: 'Caption 3' },
    // Add more items as needed
  ];


  return (

   <div className='top-80'>

<div className="relative">
  <img src={aboutbanner}  className="w-full h-[300px] object-cover object-center  win11:h-auto" />
  <div className="bg-black/25 absolute inset-0 flex items-center justify-center">
    <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">ABOUT</h1>
  </div>
</div>


<div className='text-center bg-white pt-12 win11:pt-20'>
  <h2 className='font-playlist-script text-4xl win11:text-5xl text-gray-800 tracking-wider'>Why Choose Us</h2>
  <p className='pt-2 pb-4 win11:pt-5 text-sm win11:text-base tracking-wide font-medium font-[Poppins] text-brown-100'>TOP REASONS TO CHOOSE SIRMATA</p>
</div>

<div className="bg-white grid grid-cols-1 gap-8 px-6 pt-5 pb-10 win11:pt-12 win11:pb-20 laptop:grid-cols-3 desktop:grid-cols-3 win11:grid-cols-3 desktop:gap-8 tablet:px-12 win11:px-20 win11:gap-12 font-[Poppins]">
  <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
    <GiThreeLeaves className="text-forestgreen-600 w-20 h-20 win11:w-24 win11:h-24 mb-4" />
    <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">LIVE AMIDST NATURE</h2>
    <p className="win11:px-16 text-gray-600 tracking-wide text-sm text-center">
      Immerse yourself in nature's beauty to rejuvenate and refresh.
    </p>
  </div>

  <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
    <GiWoodBeam className="text-brown-100 w-24 h-20 win11:w-28 win11:h-24 mb-4" />
    <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">RUSTIC HAVEN</h2>
    <p className="win11:px-16 text-gray-600 tracking-wide text-sm text-center">
      Discover rustic charm in a wood-inspired atmosphere for an authentic experience.
    </p>
  </div>

  <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
    <MdFamilyRestroom alt="Logo 3" className="text-forestgreen-600 w-20 h-20 win11:w-24 win11:h-24 mb-4" />
    <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">FAMILY FRIENDLY</h2>
    <p className="win11:px-16 text-gray-600 tracking-wide text-sm text-center">
      Enjoy a calm and welcoming environment that feels just like home for your family.
    </p>
  </div>
</div>











 
{/* 2-column container */}
<div className="flex flex-col lg:flex-row items-center justify-center w-full p-0 relative">
      <div className="lg:w-1/2 p-0 relative">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          className=''
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="custom-carousel-arrow custom-carousel-arrow-left"
              >
                <FontAwesomeIcon icon={faChevronLeft} className='bg-forestgreen-50  text-white p-3' />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="custom-carousel-arrow custom-carousel-arrow-right"
              >
                <FontAwesomeIcon icon={faChevronRight} className='bg-forestgreen-50  text-white p-3' />
              </button>
            )
          }
        >
        
           <div className=''>
              <img src={Image3} alt="Slider Image 1" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div className=''>
              <img src={Image2} alt="Slider Image 2" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div>
              <img src={Image5} alt="Slider Image 3" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div>
              <img src={Image1} alt="Slider Image 4" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div className=''>
              <img src={Image7} alt="Slider Image 1" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div className=''>
              <img src={Image4} alt="Slider Image 2" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div>
              <img src={Image6} alt="Slider Image 3" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
            <div>
              <img src={Image8} alt="Slider Image 4" className='w-[400px] h-[400px] laptop:w-[500px] laptop:h-[500px] desktop:w-[550px] desktop:h-[550px] win11:w-[600px] win11:h-[600px] carousel-img' />
            </div>
        </Carousel>
  </div>

  <div className="lg:w-1/2 h-full laptop:h-[400px] desktop:h-[550px] win11:h-[600px] win11:px-14 py-10 win11:py-24 bg-brown-50 ">
    <h2 className="font-playlist-script text-3xl win11:text-4xl pb-8 pl-10 text-forestgreen-50 tracking-widest">Why Sirmata?</h2>
    <p className="px-8  text-sm win11:text-base font-[poppins] text-black text-justify tracking-wider leading-loose">
    Sirmata is a deep Ilocano word for “to dream” or “to vision”. The founding couple is very fond of fruit bearing
trees and gardening. When they acquired a mango farm with more than 300 mango trees, they dreamt of having a
100% sustainable farm so they planted more fruit bearing farm. Eventually, they decided to have their own water
reservoir that will serve not only their farm but also the farmlands nearby. </p>
    <p className="px-8   pt-6 text-sm win11:text-base font-[poppins] text-black text-justify tracking-wider leading-loose">
    The farm was then became the family’s
escape from the hustle and bustle of their daily life. They used the place for biking, gardening and welcoming and
entertaining friend and relatives. Moving on, the family saw the joy it brought to the people who went to their place so 
eventually they opened it to the public. And the rest is history. 
    </p>

   
  </div>
  
</div>

<div className="flex flex-col lg:flex-row items-center justify-center w-full h-full ">
  
  <div className="lg:w-1/2 h-full laptop:h-[400px] desktop:h-[550px] win11:h-[600px] pb-4 py-10 win11:py-28 bg-brown-50 ">
  <h2 className="font-playlist-script text-3xl win11:text-4xl pb-8 pl-10 win11:pl-20 text-forestgreen-50 tracking-widest">Why Ecofarm?</h2>
  <p className="px-8 win11:px-20 text-sm win11:text-base font-[poppins] text-black text-justify tracking-wider leading-loose">
  The farm is composed of 300 mango tree farms and different kinds of fruit bearing trees and various hard wood.
    We try to be 100% sustainable as possible. Our water for our gardens are all from a deep-well and is solar powered. 
    We only use all natural fertilizers and organic pesticides. Our wood structure from the glass house and railings are all upcycled.
    The walkway uses solar lights and the bricks along the pathway are made of recycled plastic. </p>
    <p className="px-8  win11:px-20 py-6 text-sm win11:text-base font-[poppins] text-black text-justify tracking-wider leading-loose">
    We are also gearing towards farm to table
    experience for our restaurant by providing organic produce straight from our farm. This is what we want our all guests to learn.
    That they can support a sustainable lifestyle without compromising quality.
    </p>
    
  </div>

  <div className="lg:w-1/2 h-full laptop:h-[400px] desktop:h-[550px] win11:h-[600px]  py-8 win11:py-32 bg-forestgreen-50 ">
  <h2 className="font-playlist-script text-3xl win11:text-4xl pb-8 pl-10 win11:pl-20 text-brown-50 tracking-widest">Why Kayo?</h2>
    <p className="px-8 win11:px-20  text-sm text-gray-100 win11:text-base font-[poppins]  text-justify tracking-wider leading-loose">
    Kayo means wood or tree in Ilocano. The founding couple highly appreciates wood and has always
    been collectors of wooden fixtures and antique furniture. When they built the view deck, they 
    used upcycled hard wood as its foundation. 
    </p>
    <p className="px-8  win11:px-20 py-6 text-sm win11:text-base font-[poppins] text-gray-100 text-justify tracking-wider leading-loose">
   They decided to build a space where mostly made of
    wood where you can still be surrounded by nature. In tune with nature, they decided to open the
    restaurant with wood as its inspiration so they named it Kayo. 
    </p>
  </div>
</div>




<div className="relative tracking-widest ">
  <div className="relative group">
    <a href="#" className="block overflow-hidden group">
      <img src={promo} className="w-full h-[200px] md:h-[350px] object-cover object-center" alt="Promo" />
      <div className="bg-black/25 absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h2 className="text-white font-[Poppins] text-xl md:text-4xl font-semibold tracking-wider mb-2 md:mb-4">Book Your Stay Now!</h2>
          <p className="text-white text-lg md:text-2xl mb-2 md:mb-8 font-bold font-[Poppins]">Call Us: <a href="tel:+639171208306" className="underline">+63 917 120 8306</a></p>
          <a href="/bookings/accommodations" target="_blank" rel="noopener noreferrer" className="font-[Poppins] uppercase bg-forestgreen-50 text-white px-6 py-2 md:py-3 rounded-full text-sm md:text-base  shadow hover:bg-forestgreen-300 transition duration-300">
            Book Now
          </a>
        </div>
      </div>
    </a>
  </div>
</div>


  {/* VISION & PURPOSE */}
  <div className="relative flex flex-col items-center justify-center text-black bg-brown-50 p-6 md:py-14 win11:flex-col">
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center flex-1 py-8  bg-brown-50">
    <p className="text-3xl win11:text-5xl font-playlist-script font-[poppins] text-dark-50 pb-3 text-center tracking-wide">Our Vision</p>
    <img
      src={separator}
      alt=""
      className="w-56 md:w-96 pr-4"
    />
    <p className="font-medium font-[poppins] text-sm desktop:text-lg win11:text-lg py-4  text-center">
    <p className='pb-4'>To become premier eco-tourism destination in the Philippines</p>
    <p className='pb-4'>To be known as one of the leading choice for destination weddings and events.</p>
    <p className='pb-4'>To impart with the guests the knowledge on how to have sustainable practices.</p>
    <p className=''>To provide well-rounded nature retreat to all guests.</p>


    </p>
  </div>



  <div className="w-full md:w-1/2 flex flex-col items-center justify-center flex-1 py-8  bg-brown-50">
  <p className="text-3xl win11:text-5xl font-playlist-script font-[poppins] text-dark-50 pb-3 text-center tracking-wide">Our Mission</p>
    <img
      src={separator}
      alt=""
      className="w-56 md:w-96 pr-4"
    />
    <p className="font-medium font-[poppins] text-sm desktop:text-lg win11:text-lg  py-4 leading-loose  text-center">
    Committed in providing environmentally-sound experience and a well-rounded retreat to new and returning
    guests that exceeds their expectations with our sustainable practice and outstanding service.
    </p>
  </div>
</div>




  {/* AWARDS */}
  {/* <section className="pt-1 pb-5 dark:text-gray-100">
  <div className="container mx-auto text-center sm:grid-flow-col"> */}
    {/* Your content inside the container */}
  {/* </div>
  <div className="container flex justify-center mx-auto win11:flex-row dark:text-gray-400">
    <div className="grid grid-cols-2 gap-8 win11:gap-24 md:grid-cols-4 xl:grid-cols-4 ">
      <div className="flex justify-center p-6 align-middle">
        <img
          src="./src/assets/images/website/award_sample.png"
          alt=""
          className="w-80 lg:w-40"
        />
      </div>
      <div className="flex justify-center p-6 align-middle ">
        <img
          src="./src/assets/images/website/award_sample.png"
          alt=""
          className="w-80 lg:w-40"
        />
      </div>
      <div className="flex justify-center p-6 align-middle">
        <img
          src="./src/assets/images/website/award_sample.png"
          alt=""
          className="w-80 lg:w-40"
        />
      </div>
      <div className="flex justify-center p-6 align-middle">
        <img
          src="./src/assets/images/website/award_sample.png"
          alt=""
          className="w-80 lg:w-40"
        />
      </div>
    </div>
  </div>
</section> */}



<ArrowUpButton/>

   </div>

  )
}
