import ArrowUpButton from "/src/components/website/ArrowUpButton";
import { SiCoffeescript } from "react-icons/si";
import { GiCakeSlice } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";

import kapepunologo from '/src/assets/images/website/amenities/kapepuno/kape_puno_logo.png';

import kapepunobanner from '/src/assets/images/website/amenities/kapepuno/banner.jpg';
import separator1 from '/src/assets/images/website/amenities/kapepuno/separator_kapepuno1.png';
import separator2 from '/src/assets/images/website/amenities/kapepuno/separator_kapepuno.png';

import kp1 from '/src/assets/images/website/amenities/kapepuno/1_kapepuno.jpg';
import kp2 from '/src/assets/images/website/amenities/kapepuno/hours.jpg';
import kp3 from '/src/assets/images/website/amenities/kapepuno/3_kapepuno.jpg';
import kp4 from '/src/assets/images/website/amenities/kapepuno/4_kapepuno.jpg';

import image1 from '/src/assets/images/website/amenities/kapepuno/5_kapepuno.jpg';
import image2 from '/src/assets/images/website/amenities/kapepuno/6_kapepuno.jpg';
import image3 from '/src/assets/images/website/amenities/kapepuno/7_kapepuno.jpg';
import image4 from '/src/assets/images/website/amenities/kapepuno/8_kapepuno.jpg';
import image5 from '/src/assets/images/website/amenities/kapepuno/9_kapepuno.jpg';

export default function KapePuno() {
  
  return (
    <div>
      <div className="relative">
        <img
          src={kapepunobanner}
          className="w-full h-[300px] object-cover object-center  win11:h-auto"
          alt="Kape Puno"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl text-center laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">KAPE PUNO TREEHOUSE CAFE</h1>
  </div>
</div>

{/* introduction */}
<div className="flex flex-col items-center justify-center  text-center bg-white py-12 win11:py-20 ">
<h2 className='font-[Poppins] text-2xl  tablet:text-3xl desktop:text-4xl
       win11:text-5xl 
        text-black tracking-wide font-bold uppercase py-2'>Get that coffee fix</h2>
  <img src={separator1} alt="Logo" className="w-52 win11:w-72 win11:py-2" />
  <p className="pt-4 px-6 win11:max-w-4xl text-sm font-[poppins] laptop:px-24 desktop:px-48 text-black win11:text-lg text-center tracking-wider leading-normal ">
   When you're in Sirmata, be sure to stop in Kape Puno for your morning or afternoon coffee fix with the view of Mt. Bulaylay! 
   We are proudly serving specialty coffee and drinks and homemade pastries that will surely melt everyone's heart.
  </p>

  <div className="grid grid-cols-1 px-10 pt-10 pb-6 gap-12 win11:pt-12  laptop:grid-cols-3 desktop:grid-cols-3 win11:grid-cols-3 desktop:gap-10  tablet:px-28 win11:px-52 win11:gap-20 font-[Poppins] ">
    <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
      <SiCoffeescript alt="coffee icon" className="text-brown-100 w-20 h-20 win11:w-24 win11:h-24 mb-4" />
      <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">COFFEE TYPES</h2>
      <p className="win11:px-0 text-gray-600 tracking-wide text-sm text-center">A harmonious blend of velvety steamed milk and bold espresso, creating a creamy and satisfying Latte.</p>
    </div>
    <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
      <GiCakeSlice alt="Logo 2" className="text-brown-100 w-20 h-16 win11:w-28 win11:h-24 mb-4" />
      <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">FRESH PASTRY</h2>
      <p className="win11:px-10 text-gray-600 tracking-wide text-sm text-center">Indulge in the buttery layers and exquisite flavors of a freshly baked pastry.</p>
    </div>
    <div className="flex flex-col items-center justify-center transform transition duration-300 ease-in-out hover:scale-105">
      <SiBuymeacoffee alt="Logo 3" className="text-brown-100 w-20 h-20 win11:w-20 win11:h-24 mb-4" />
      <h2 className="text-lg font-semibold tracking-wider py-1 win11:py-2 font-[poppins]">COFFEE TO GO</h2>
      <p className="win11:px-10 text-gray-600 tracking-wide text-sm text-center">Your favorite coffee, ready to accompany you on the journey.</p>
    </div>
  </div>
</div>

{/* Responsive 4-column photos */}
<div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 gap-2  desktop:grid-cols-4 win11:grid-cols-4">
            <img
              src={kp4}
              alt="Photo 1"
              className="aspect-square object-cover object-center"
            />
            <img
              src={kp2}
              alt="Photo 2"
              className="aspect-square object-cover object-center"
            />
            <img
              src={kp3}
              alt="Photo 3"
              className="aspect-square object-cover object-center"
            />
            <img
              src={kp1}
              alt="Photo 4"
              className="aspect-square object-cover object-center"
            />
          
          </div>





{/* MENU */}
<div className="bg-brown-100 text-white flex flex-col items-center justify-center mt-4 pt-4">
  <div className="flex items-center pt-7 pb-2">
    <img src={kapepunologo} alt="Logo" className="w-54 h-32 win11:w-68 win11:h-40" />
  </div>

  <img src={separator2} alt="Logo" className="w-56 win11:w-72 pt-1 pb-6" />

  <p className="pb-6 px-4 max-w-4xl font-[Poppins] text-gray-200 text-sm text-center leading-relaxed tracking-wider">
    Experience a symphony of flavors with our café menu, where aromatic coffees and artisanal beverages intertwine to create a delightful harmony for your senses. From rich espresso classics to innovative iced concoctions, our menu offers a captivating journey for coffee enthusiasts and beverage aficionados alike.
  </p>
</div>

<div className="bg-brown-100 font-[Poppins] p-6 pb-10 mb-2 leading-relaxed tracking-widest">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Hot Coffee */}
      <div className="bg-brown-50 p-6 rounded shadow-md tracking-widest  hover:bg-white transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold mb-4">Hot Coffee</h2>
        <ul className="text-sm text-black space-y-1 ">
          <li className="flex justify-between"><span className="coffee-name">Cafe Americano</span> <span className="price">120</span></li>
          <li className="flex justify-between"><span className="coffee-name">Cafe Latte</span> <span className="price">130</span></li>
          <li className="flex justify-between"><span className="coffee-name">Caramel Macchiato</span> <span className="price">130</span></li>
          <li className="flex justify-between"><span className="coffee-name">White Chocolate Mocha</span> <span className="price">130</span></li>
          <li className="flex justify-between"><span className="coffee-name">Hazelnut Latte</span> <span className="price">140</span></li>
          <li className="flex justify-between"><span className="coffee-name">Macadamia Nut Latte</span> <span className="price">140</span></li>
          <li className="flex justify-between"><span className="coffee-name">Sea Salt Caramel Latte</span> <span className="price">140</span></li>
          {/* Add more items */}
        </ul>
      </div>

      {/* Iced Coffee */}
      <div className="bg-brown-50 p-6 rounded shadow-md tracking-widest hover:bg-white transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold mb-4">Iced Coffee</h2>
        <ul className="text-sm text-black space-y-1">
          <li className="flex justify-between"><span className="coffee-name">Iced Americano</span> <span className="price">120</span></li>
          <li className="flex justify-between"><span className="coffee-name">Iced Caramel Latte</span> <span className="price">140</span></li>
          <li className="flex justify-between"><span className="coffee-name">Iced Latte</span> <span className="price">140</span></li>
          <li className="flex justify-between"><span className="coffee-name">Dark Mocha Latte</span> <span className="price">140</span></li>
          <li className="flex justify-between"><span className="coffee-name">Caramel Macchiato</span> <span className="price">145</span></li>
          <li className="flex justify-between"><span className="coffee-name">Iced Hazelnut Latte</span> <span className="price">145</span></li>
          <li className="flex justify-between"><span className="coffee-name">White Chocolate Mocha</span> <span className="price">145</span></li>
          {/* Add more items */}
        </ul>
      </div>

      {/* Coffee Alternatives */}
      <div className="bg-brown-50 p-6 rounded shadow-md tracking-widest hover:bg-white transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold mb-4">Coffee Alternatives</h2>
        <ul className="text-sm text-black space-y-1">
          <li className="flex justify-between"><span className="coffee-name font-bold">HOT</span></li>
          <li className="flex justify-between"><span className="coffee-name">Hot Tea with Lemon & Honey</span> <span className="price">85</span></li>
          <li className="flex justify-between"><span className="coffee-name">Milk Chocolate</span> <span className="price">115</span></li>
          <li className="flex justify-between"><span className="coffee-name">White Chocolate</span> <span className="price">120</span></li>
          <li className="flex justify-between"><span className="coffee-name font-bold">ICED</span></li>
          <li className="flex justify-between"><span className="coffee-name">Iced White Chocolate</span> <span className="price">130</span></li>
          <li className="flex justify-between"><span className="coffee-name">Chai Tea Latte</span> <span className="price">160</span></li>
          <li className="flex justify-between"><span className="coffee-name">Matcha Green Tea Latte</span> <span className="price">160</span></li>
          {/* Add more items */}
        </ul>
      </div>
    </div>
  </div>
</div>












  
      {/* GALLERY */}
      <section>
  <div className="max-w-max px-4 py-6 lg:px-8">
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
