import gc from '/src/assets/images/website/events/gc.jpg';
import leaf from '/src/assets/images/website/leaf_about.png';


import image1 from '/src/assets/images/website/amenities/kayoresto/kayonight.jpg';
import image2 from '/src/assets/images/website/amenities/kayoresto/shrimp.jpg';
import image3 from '/src/assets/images/website/amenities/kayoresto/dessert.jpg';
import image4 from '/src/assets/images/website/amenities/kayoresto/breakfast.jpg';
import image5 from '/src/assets/images/website/amenities/kayoresto/winenight.jpg';

export default function GlassChapel() {
  return (
    <div>
      <div className="relative">
        <img src="./src/assets/images/website/glass_chapel.jpg"  className="w-full h-[400px] object-cover object-center sm:h-full" />
        <div className="bg-black/30 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl text-white  tracking-wide font-[Poppins] sm:text-3xl md:text-5xl">GLASS CHAPEL</h1>
        </div>
    </div>


    <section className="bg-brown-50 min-h-screen px-6 sm:px-12 md:px-24 lg:px-36 xl:px-40">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
    <div className="col-span-1 px-6 sm:px-0 flex justify-center items-center">
      <div className="relative sm:pl-0 sm:ml-0 lg:py-28 md:py-24">
        <div className="flex justify-center">
          <img src={gc} alt="Photo" className="w-9/12 sm:w-7/12 md:w-9/12 lg:w-7/12" />
        </div>
        <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-full lg:pl-96 lg:pb-16 md:pl-60 my-6 sm:mt-14 md:mt-20 sm:pt-80">
          <div className="bg-forestgreen-500 w-56 sm:w-72 md:w-96 h-64 sm:h-72 md:h-80 lg:p-8 lg:pt-14 sm:px-4 md:p-8 text-center space-y-5 text-brown-50">
            <img src={leaf} alt="Logo" className="w-20 h-12 mx-auto" />
            <h2 className="lg:text-3xl text-3xl md:text-4xl font-[poppins] leading-relaxed tracking-wider my-2">REFINED SERVICES</h2>
            <p className="text-sm sm:text-base md:text-lg">This is the content for the second column. Sed ut perspiciatis</p>
          </div>
        </div>
      </div>
    </div>

    
    <div className="col-span-1 -space-y-16">
      <div className="pt-6 md:py-20 lg:pl-24 lg:pt-44">
        <h4 className="text-lg md:text-5xl lg:text-lg font-[Poppins] sm:pb-6 md:pb-8 tracking-wider text-forestgreen-200 leading-tight">CELEBRATE IN STYLE</h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Poppins] pb-4 sm:pb-6 md:pb-8 text-brown-200 tracking-wider leading-relaxed">CREATING YOUR PERFECT MOMENTS</h2>
        <p className="text-base font-[poppins] leading-loose">This is the content for the second column. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
      </div>
      <div className="pt-28 pb-20 lg:pl-24 lg:pt-8">
        <button className="font-[poppins] leading-relaxed tracking-widest bg-brown-200 text-white py-4 px-8">
          INQUIRE NOW
        </button>
      </div>
    </div>


  </div>
  <hr className="border-t-2 border-gray-300 my-20" />
  {/* 2nd Row */}
  <div className="grid grid-cols-2 gap-4 items-center">
    <div className="col-span-1">
    <div className="py-6 sm:py-12 md:py-20 lg:pl-40">
        <h4 className="text-lg  md:text-5xl lg:text-lg font-[Poppins] pb-4 sm:pb-6 md:pb-8 text-brown-200 leading-tight">CHOOSE THE BEST</h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Poppins] pb-4 sm:pb-6 md:pb-8 text-brown-200 leading-tight">CATERING THAT REFLECTS YOUR UNIQUE STYLE</h2>
      </div>
    </div>
    <div className="col-span-1">
    <div className="py-6 sm:py-12 md:py-20 lg:py-24">
        <p className="text-sm sm:text-base md:text-lg font-[poppins] leading-loose max-w-2xl lg:max-w-3xl pt-4 pl-2 sm:pl-8 md:pl-12 lg:pl-12">This is the content for the second 
        column. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
        <ul className="pt-10 space-y-8 lg:pl-12"> 
          <li className="font-[poppins] text-2xl">01. DELICIOUS MEALS</li>
        
          <li className="font-[poppins] text-2xl">02. VARIED MENU OPTIONS</li>
        </ul>
      </div>
    </div>
  </div>
</section>



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
    </div>
  )
}
