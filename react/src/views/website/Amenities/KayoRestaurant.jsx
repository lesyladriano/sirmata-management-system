import ArrowUpButton from "/src/components/website/ArrowUpButton";

import kayorestobanner from '/src/assets/images/website/amenities/kayoresto/kayo_banner.jpg';
import food1 from '/src/assets/images/website/amenities/kayoresto/food1.jpg';
import food2 from '/src/assets/images/website/amenities/kayoresto/food2.jpg';
import food3 from '/src/assets/images/website/amenities/kayoresto/food3.jpg';
import separator from '/src/assets/images/website/separator_OAP.png';
import logo from '/src/assets/images/website/amenities/kayoresto/kayo_logo.png';
import menu1 from '/src/assets/images/website/amenities/kayoresto/menu1.jpg';
import menu2 from '/src/assets/images/website/amenities/kayoresto/menu2.jpg';
import image1 from '/src/assets/images/website/amenities/kayoresto/kr1.jpg';
import image2 from '/src/assets/images/website/amenities/kayoresto/kr2.jpg';
import image3 from '/src/assets/images/website/amenities/kayoresto/kr3.jpg';
import image4 from '/src/assets/images/website/amenities/kayoresto/kr4.jpg';
import image5 from '/src/assets/images/website/amenities/kayoresto/kr5.jpg';


export default function KayoRestaurant() {
  return (
    <div>
       <div className="relative ">
        <img src={kayorestobanner} className="w-full h-[300px] object-cover object-center  win11:h-auto" />
        <div className="bg-black/30 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl text-center laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">KAYO RESTAURANT</h1>
        </div>
        </div>
        
      {/**  
        <div className="absolute bottom-0 lg:-bottom-16 lg:inset-x-96 inset-x-0 md:inset-x-64 px-16 py-6 bg-forestgreen-50">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="flex items-center mb-8 md:mb-0">
      <select className="px-10 py-3 border border-black">
        <option value="1">1 person</option>
        <option value="2">2 people</option>
        <option value="3">3 people</option>
        <option value="4">4 people</option>
        <option value="5">5 people</option>
        <option value="6">6 people</option>
        <option value="7">7 people</option>
        <option value="8">8 people</option>
        <option value="9">9 people</option>

      
      </select>
    </div>

    <div className="flex items-center mt-8 md:mb-0">
      <input type="date" className="mb-8 lg:w-96 h-11 " />
    </div>

    <div className="flex items-center mt-1 md:mb-0">

    <input type="time" className="w-48 lg:w-96 h-11 " />
    </div>

    <button className="px-10 py-3 bg-forestgreen-300 tracking-widest text-white">
      BOOK A TABLE
    </button>
  </div>
        </div>


      </div>
    */}

<div className="flex flex-col items-center justify-center py-8 win11:py-14">
<h2 className='font-[Poppins] text-2xl  tablet:text-3xl desktop:text-4xl
       win11:text-5xl 
        text-black tracking-wide font-bold uppercase py-2'>Discover Exquisite Flavors</h2>
<img src={separator} alt="Logo" className="w-60 win11:w-80 py-1 win11:py-2 " />
  <p className="pt-4 px-6 win11:max-w-4xl text-sm font-[poppins] laptop:px-24 desktop:px-48 text-black win11:text-lg text-center tracking-wider leading-normal ">
  Eat your heart out at our al fresco dining that offers filipino comfort food that is especially made by our chefs for our guests to enjoy while enjoying
  the cool breeze and the fantastic view of the lake.
  </p>
  
  </div>


  <div className="bg-forestgreen-50 p-6 border-dashed border-2 border-forestgreen-100 shadow-lg text-center font-[Poppins] tracking-wider">
    <h3 className="text-xl text-beige-100 mb-4">Secure your spot at our table and indulge in culinary delights!</h3>
    <p className="text-base text-white mb-4">Reserve your restaurant experience today by calling our hotline <a href="tel:09171107910" className="text-forestgreen-300 tracking-widest font-bold">0917 110 7910</a> / <a href="tel:09171208306" className="font-bold tracking-widest text-forestgreen-300">0917 120 8306</a> <br/>or message us on <a href="https://www.facebook.com/sirmata.ecofarm" className="text-white  hover:underline">Facebook</a> for more information.</p>
</div>




  <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-8 lg:gap-12 xl:gap-14 xl:px-20 font-[Poppins]">
  <div className="relative aspect-square hover:scale-105 transition-transform duration-300">
    <img src={food1} className="object-cover object-center w-full h-full brightness-100 rounded-lg " alt="Kayo Resto" />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
      <h3 className="text-sm md:text-lg font-bold tracking-widest">A TREAT FOR YOUR TASTE BUDS</h3>
      <p className="text-xs md:text-sm tracking-wide">Indulge in a tantalizing delight.</p>
    </div>
  </div>
  <div className="relative aspect-square hover:scale-105 transition-transform duration-300">
    <img src={food2} className="object-cover object-center w-full h-full brightness-100 rounded-lg " alt="Kayo Resto" />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
      <h3 className="text-sm md:text-lg font-bold tracking-widest">AMAZING APPETIZERS</h3>
      <p className="text-xs md:text-sm tracking-wide">Delight in an exquisite selection of mouthwatering appetizers.</p>
    </div>
  </div>
  <div className="relative aspect-square hover:scale-105 transition-transform duration-300">
    <img src={food3} className=" w-full  h-full rounded-lg" alt="Kayo Resto" />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
      <h3 className="text-sm md:text-lg font-bold tracking-widest">GREAT AMBIANCE</h3>
      <p className="text-xs md:text-sm tracking-wide">Enjoy an exquisite dining experience.</p>
    </div>
  </div>
</div>






     {/* Articles */}
     



<div className="bg-brown-50 mb-8">
<div className="text-brown-200 flex flex-col items-center justify-center">
  <div className="flex items-center pt-7 pb-2">
    <img src={logo} alt="Logo" className="w-54 h-32 md:w-68 md:h-40" />
  </div>

  <img src={separator} alt="Separator" className="w-56 md:w-[400px] mb-10" />

  <p className="pb-6 px-4 max-w-3xl  font-[Poppins] text-xs win11:text-sm  tracking-wider text-center leading-loose">
    Delight in the heartwarming flavors of Filipino comfort food as our menu takes you on a culinary journey through
    cherished classics and cherished family recipes, each dish a testament to the rich cultural tapestry of the Philippines.
  </p>

  <div className="flex flex-col md:flex-row pb-10">
    <div className="w-full md:w-1/2 p-4 rounded">
      <img src={menu1} alt="Image 1" className="rounded-lg w-full h-auto" />
    </div>
    <div className="w-full md:w-1/2 p-4">
      <img src={menu2} alt="Image 2" className="rounded-lg w-full h-auto" />
    </div>
  </div>
</div>




  
    </div>



{/* GALLERY */}
<section>
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
</section>

<ArrowUpButton/>
</div>

    
  
  );
}
