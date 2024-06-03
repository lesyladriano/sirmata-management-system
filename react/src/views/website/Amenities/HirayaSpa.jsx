import { useState, useRef } from 'react';
import ArrowUpButton from "/src/components/website/ArrowUpButton";

import banner from '/src/assets/images/website/amenities/hirayaspa/banner.jpg';
import massage from '/src/assets/images/website/amenities/hirayaspa/massage.jpg';
import handfoot from '/src/assets/images/website/amenities/hirayaspa/handfoot.jpg';
import gelpolish from '/src/assets/images/website/amenities/hirayaspa/gelpolish.jpg';
import separator from '/src/assets/images/website/separator_OAP.png';
import logo from '/src/assets/images/website/amenities/hirayaspa/hiraya_logo.png';


import image1 from '/src/assets/images/website/amenities/hirayaspa/hs4.jpg';
import image2 from '/src/assets/images/website/amenities/hirayaspa/hs3.jpg';
import image3 from '/src/assets/images/website/amenities/hirayaspa/hs5.jpg';
import image4 from '/src/assets/images/website/amenities/hirayaspa/hs2.jpg';
import image5 from '/src/assets/images/website/amenities/hirayaspa/hs1.jpg';



export default function HirayaSpa() {
    const [activeTab, setActiveTab] = useState('tab1');
    const contentRef = useRef(null);
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <div>
      
      <div className="relative">
        <img
          src={banner}
          className="w-full h-[300px] object-cover object-center  win11:h-auto"
          alt="Kape Puno"
        />
        <div className="bg-black/25 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl text-center laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">HIRAYA WELLNESS & SPA</h1>
        </div>
      </div>


      <div className="flex flex-col items-center justify-center pt-10 pb-4 win11:py-14">
      <h2 className='font-[Poppins] text-2xl  tablet:text-3xl desktop:text-4xl
       win11:text-5xl 
        text-black tracking-wide font-bold uppercase py-2'>THE SERVICES WE OFFER</h2>
<img src={separator} alt="Logo" className="w-60 win11:w-80 py-1 win11:py-2 " />

<p className="pt-4 px-6 win11:max-w-4xl text-sm font-[poppins] laptop:px-24 desktop:px-48 text-black win11:text-lg text-center tracking-wider leading-normal ">
    Our spa treatment provides a refreshing experience for your body through a full-body massage using luxury massage oil infused with selected essences. The treatment concludes with a rejuvenating homemade tea to clenase the body.
  </p>

  </div>


  <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-8 lg:gap-12 xl:gap-14 xl:px-20 font-[Poppins]">

  <div className="relative aspect-square hover:scale-105 transition-transform duration-300">
  <img src={massage} className="object-cover object-center w-full h-full brightness-100 rounded-lg" alt="Hiraya Spa" />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
  <h3 className="text-sm md:text-lg font-bold tracking-widest">MASSAGE</h3>
    <p className="text-xs md:text-sm tracking-wide">Discover ultimate relaxation through expert massage therapies that renew your body and mind. </p>
  </div>
</div>
<div className="relative aspect-square hover:scale-105 transition-transform duration-300">
  <img src={handfoot} className="object-cover object-center w-full h-full brightness-100 rounded-lg " alt="Hiraya Spa" />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
  <h3 className="text-sm md:text-lg font-bold tracking-widest">HAND AND FOOT CARE</h3>
    <p className="text-xs md:text-sm tracking-wide">Experience rejuvenation as skilled professionals pamper your hands and feet, leaving you revitalized and refreshed.</p>
  </div>
</div>
<div className="relative aspect-square hover:scale-105 transition-transform duration-300">
  <img src={gelpolish} className="object-cover object-center w-full h-full brightness-100 rounded-lg " alt="Hiraya Spa" />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-80 text-white rounded-b-lg">
  <h3 className="text-sm md:text-lg font-bold tracking-widest">GEL POLISH</h3>
    <p className="text-xs md:text-sm tracking-wide">Elevate your style with our Korean gel polish, featuring vibrant, long-lasting colors for a flawless finish.</p>
  </div>
</div>
</div>



<div className="bg-beige-100 text-brown-200 flex flex-col items-center justify-center">
  <div className="flex items-center pt-10">
    <img src={logo} alt="Logo" className="w-56 h-32 md:w-72 md:h-48" />
  </div>

 
  
  <p className="px-4 pt-2 pb-7 max-w-5xl text-sm text-center tracking-wider font-[poppins] leading-relaxed">
    Indulge in a sanctuary of rejuvenation with our comprehensive spa and wellness menu, offering an array of expert
    treatments designed to nurture your body and soothe your soul, leaving you feeling utterly revitalized and balanced.
  </p>
  <img src={separator} alt="Separator" className="w-56 md:w-80" />
</div>






    <div className="bg-beige-100 py-12 ">
    
      <ul className="flex justify-center mb-4 space-x-5">
      <li className={`mr-4 cursor-pointer ${activeTab === 'tab1' ? 'text-forestgreen-300' : 'text-gray-500'}`} onClick={() => handleTabClick('tab1')}>
  <button className="text-base win11:text-xl font-semibold font-[poppins] tracking-wider">MASSAGE</button>
</li>
<li className={`mr-4 cursor-pointer ${activeTab === 'tab2' ? 'text-forestgreen-300' : 'text-gray-500'}`} onClick={() => handleTabClick('tab2')}>
  <button className="text-base win11:text-xl font-semibold font-[poppins] tracking-wider">HAND AND FOOT</button>
</li>
<li className={`mr-4 cursor-pointer ${activeTab === 'tab3' ? 'text-forestgreen-300' : 'text-gray-500'}`} onClick={() => handleTabClick('tab3')}>
  <button className="text-base win11:text-xl font-semibold font-[poppins] tracking-wider">GEL POLISH</button>
</li>
      </ul>

  {/* TAB 1 */}
  <div ref={contentRef} className="px-4 py-2 tracking-wider">
    {activeTab === 'tab1' && (
      <div className="py-4">
        <h2 className="text-4xl win11:text-5xl font-playlist-script tracking-wider text-forestgreen-300 pb-10 text-center">Massage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mx-4 sm:mx-10 lg:mx-20">
  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Harmony Massage</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm text-justify tracking-wider px-2">Experience our distinctive Hiraya Spa massage while enjoying the essence of your preferred aromatherapy oil.
      This type of massage can also help t improve circulation and relieve pain caused by fatigued self tissues.</p>
      <p className="text-sm pt-5 text-center">60 minutes ....... Php700</p>
      <p className="text-sm text-center">90 minutes ....... Php999</p>
    </div>
  </div>

  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
    <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Hot Stone Massage</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm tracking-wider text-justify px-2">Uses a therapeutic technique that involves using smooth, heated stones to relax muscles and alleviate tension in the body.</p>
      <p className="text-sm pt-5  text-center">90 minutes ....... Php1200</p>
      <p className="text-sm  text-center">120 minutes ....... Php1500</p>
    </div>
  </div>

  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
    <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Swedish Massage</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm tracking-wider text-justify px-2">A form of massage therapy that can help relax your entire body by targeting and releasing tension in your muscles. This can be especially helpful if you spend a lot of time sitting or exercising.</p>
      <p className="text-sm pt-5  text-center">60 minutes ....... Php700</p>
      <p className="text-sm  text-center">90 minutes ....... Php999</p>
    </div>
  </div>
  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
    <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Ventosa Massage</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm tracking-wider text-justify px-2">Uses a traditional Chinese therapy that involves placing heated glass cups on the skin to create a vacuum effect, which promotes blood flow and relieves muscle tension.</p>
      <p className="text-sm pt-5  text-center">90 minutes ....... Php1200</p>
      <p className="text-sm  text-center">120 minutes ....... Php1500</p>
    </div>
  </div>

  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
    <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Shiatsu Massage</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm tracking-wider text-justify px-2">A massage technique that applies pressure points on the body. It can be performed through clothing and doesn't typically involve using oils. This massage helps to restore energy flow.</p>
      <p className="text-sm pt-5  text-center">60 minutes ....... Php700</p>
      <p className="text-sm  text-center">90 minutes ....... Php999</p>
    </div>
  </div>

  <div className="flex flex-col rounded bg-forestgreen-50 p-4">
    <div className="font-[poppins] text-brown-50">
    <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Other Massages</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
      <p className="text-xs win11:text-sm tracking-wider text-justify px-2">These massages are designed to target specific areas of the body that require extra attention.</p>
      <p className="text-sm pt-5  text-center">Head Massage (30 mins.)....... Php300</p>
      <p className="text-sm  text-center">Back Massage (30 mins.) ....... Php350</p>
      <p className="text-sm  text-center">Hand Massage (30 mins.)....... Php300</p>
      <p className="text-sm  text-center">Foot Massage (30 mins.)....... Php350</p>
    </div>
  </div>
</div>
</div>

          

         
        )}

{activeTab === 'tab2' && (
<div className="px-8 py-2">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Hand Care */}
    <div className="font-[poppins] tracking-wider py-4">
    <h2 className="text-3xl win11:text-4xl   font-playlist-script text-forestgreen-300 pb-6 text-center">Hand Care</h2>
      <ul className='win11:m-10 rounded bg-forestgreen-50 py-8 px-8 text-brown-50 space-y-8'>
      <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Cosmos Manicure </h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Basic nail cleaning and trimming</p>
           <h2 className="text-sm win11:text-base px-2">Php250</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Santan Manicure </h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Nail cleaning, shaping, cuticle treatment, with regular polish application</p>
           <h2 className="text-sm win11:text-base px-2">Php300</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">PETUNIA HAND SPA </h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">All natural hand spa, nail cleaning, shaping, cuticle treatment, hand and wrist massage with polish application</p>
           <h2 className="text-sm win11:text-base px-2">Php500</h2>
           </li>
      </ul>
    </div>

    {/* Foot Care */}
    <div className="font-[poppins] py-4">
    <h2 className="text-3xl win11:text-4xl   font-playlist-script text-forestgreen-300 pb-6 text-center">Foot Care</h2>
      
    <ul className='win11:m-10 rounded bg-forestgreen-50 py-8 px-8 text-brown-50 space-y-8'>
      <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Rosas Pedicure</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Basic nail cleaning and trimming</p>
           <h2 className="text-sm win11:text-base px-2">Php270</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Dahlia Pedicure</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Anti-bacterial foot soak, nail shaping, cuticle treatment, with polish application</p>
           <h2 className="text-sm win11:text-base px-2">Php320</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Azalea Foot Spa</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Basic nail cleaning and trimming</p>
           <h2 className="text-sm win11:text-base px-2">Php600</h2>
           </li>
      </ul>
    </div>

    {/* Hand and Foot Package */}
    <div className="font-[poppins] py-4">
    <h2 className="text-3xl win11:text-4xl  font-playlist-script text-forestgreen-300 pb-6 text-center">Hand and Foot Package</h2>
    <ul className='win11:m-10 rounded bg-forestgreen-50 py-8 px-8 text-brown-50 space-y-8'>
    <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Gardenia Package</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Basic nail cleaning and trimming of nails of hand and foot</p>
           <h2 className="text-sm win11:text-base px-2">Php500</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Plumeria Package</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">Nail cleaning, shaping, cuticle treatment, basic massage, polish application of hand and foot</p>
           <h2 className="text-sm win11:text-base px-2">Php600</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-2 text-beige-50 uppercase font-semibold tracking-widest">Hibiscus Package</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
           <p className="text-xs win11:text-sm tracking-wider  pb-2 px-2">All natural hand and foot spa, nail cleaning, relaxing massage with polish application</p>
           <h2 className="text-sm win11:text-base px-2">Php1000</h2>
           </li>
      </ul>
    </div>
  </div>
</div>


)}
 
       

{activeTab === 'tab3' && (
      <div className="flex justify-center items-center ">
      <div className="w-full sm:w-3/4 lg:w-1/2">
      <h2 className="text-3xl win11:text-4xl  font-playlist-script text-forestgreen-300 py-6 text-center">Gel Polish</h2>
          <div className="font-[poppins] mx-5 lg:mx-28">
           
          <ul className='win11:m-10 rounded bg-forestgreen-50 py-8 px-8 text-brown-50 space-y-6'>
          <p className="text-xs win11:text-sm tracking-wider  leading-loose pb-2 text-justify">Uses imported Korean gel polish that are known for their high quality and innovation. This new technology promises to make your gel polish stay longer. Enjoy!</p>
          <li className=''>
      <h2 className="text-base win11:text-lg py-1 text-beige-50 uppercase font-semibold tracking-widest">Gel MAnicure</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
          
           <h2 className="text-sm win11:text-base px-2">Php500</h2>
           </li>
        

           <li className=''>
      <h2 className="text-base win11:text-lg py-1 text-beige-50 uppercase font-semibold tracking-widest">Gel Pedicure</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
          
           <h2 className="text-sm win11:text-base px-2">Php600</h2>
           </li>

           <li className=''>
      <h2 className="text-base win11:text-lg py-1 text-beige-50 uppercase font-semibold tracking-widest">Orchid Package</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
          
           <h2 className="text-sm win11:text-base px-2">Php1000</h2>
           </li>
           <li className=''>
      <h2 className="text-base win11:text-lg py-1 text-beige-50 uppercase font-semibold tracking-widest">Gel Removal</h2>
      <hr className="border-t-2 py-2 border-forestgreen-300 mr-20 " />
          
           <h2 className="text-sm win11:text-base px-2">Php100</h2>
           </li>
      </ul>
          </div>
      </div>
  </div>
  
        )}
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
            src={image4}
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
            src={image5}
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

      
    </ul>
  </div>
</section>


<ArrowUpButton/>

    </div>
  )
}
