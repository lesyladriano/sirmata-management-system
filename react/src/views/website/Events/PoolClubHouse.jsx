
import cake from '/src/assets/images/website/events/kayoglassresto/wedding.jpg';
import banquet from '/src/assets/images/website/events/kayoglassresto/banquet.jpg';
import conference from '/src/assets/images/website/events/kayoglassresto/conferences.jpg';
import parties from '/src/assets/images/website/events/kayoglassresto/parties.jpg';


export default function PoolClubHouse() {
  return (
    <div>
      <div className="relative">
        <img src="./src/assets/images/website/poolclubhouse.jpg"  className="w-full h-[400px] object-cover object-center sm:h-full" />
        <div className="bg-black/30 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl text-white  tracking-wide font-[Poppins] sm:text-3xl md:text-5xl">POOL CLUBHOUSE</h1>
        </div>
    </div>


         
<section className="bg-brown-50 h-full lg:min-h-screen px-6 sm:px-12 md:px-24 lg:px-36 lg:py-12 xl:px-40">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
    <div className="col-span-1 px-6 sm:px-0">
      <div className="relative sm:pl-0 sm:ml-0 lg:py-28 md:py-24">
        <div className="flex mt-10 lg:ml-48 lg:pb-5">
          <img src={conference} alt="Photo" className="w-9/12 " />
        </div>
        <div className="absolute inset-1 lg:inset-0 mt-80 pl-20 lg:pl-96 lg:mt-72 lg:pt-72  ">
          <div className="bg-forestgreen-500 w-80 h-28 lg:w-96 lg:h-60  text-brown-50">
            <h2 className="lg:text-4xl text-2xl md:text-4xl font-[poppins] tracking-wide lg:tracking-wider p-5 lg:p-14 lg:leading-tight">WE'LL MAKE YOUR PARTY PERFECT</h2>
          </div>
        </div>
      </div>
    </div>

    <div className="col-span-1 -space-y-16">
      <div className="pt-6 md:py-20 lg:pl-24 lg:pt-44">
        <h4 className="text-lg md:text-5xl lg:text-lg font-[Poppins] sm:pb-6 md:pb-8 tracking-wider text-forestgreen-200 leading-tight">CELEBRATE IN STYLE</h4>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Poppins] pb-4 sm:pb-6 md:pb-8 text-brown-200 tracking-wider leading-relaxed">YOUR PERFECT <br/> BANQUET</h2>
        <p className="text-base font-[poppins] leading-loose">This is the content for the second column. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
        <ul className="pt-10 space-y-5"> 
          <li className="font-[poppins] text-2xl">01. DELICIOUS MEALS</li>
          <hr className="border-t-2 border-gray-300 my-8" />
          <li className="font-[poppins] text-2xl">02. VARIED MENU OPTIONS</li>
        </ul>
      </div>
      <div className="pt-28 pb-20 lg:pl-24 lg:pt-8">
        <button className="font-[poppins] leading-relaxed tracking-widest bg-brown-200 text-white py-4 px-8">
          INQUIRE NOW
        </button>
      </div>
    </div>
  </div>
</section>

{/* SERVICES */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 py-5 mx-6 sm:mx-12 md:mx-24 lg:mx-36 xl:mx-40 my-24">
  <div className="p-2">
    <div className="relative">
      <a href="#" className="block overflow-hidden group">
        <img
          src={parties}
          alt=""
          className="h-[350px] opacity-80 w-full object-cover transition duration-500 group-hover:scale-105 aspect-auto lg:h-[450px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <span className="mt-3 inline-block px-5 py-3 lg:text-2xl font-[poppins] font-bold uppercase tracking-widest text-white">
            PARTIES
          </span>
        </div>
      </a>
    </div>
  </div>
  <div className="p-2">
    <div className="relative">
      <a href="#" className="block overflow-hidden group">
        <img
          src={cake}
          alt=""
          className="h-[350px] opacity-80 w-full object-cover transition duration-500 group-hover:scale-105 aspect-auto lg:h-[450px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <span className="mt-3 inline-block px-5 py-3 lg:text-2xl font-[poppins] font-bold uppercase tracking-widest text-white">
            WEDDING
          </span>
        </div>
      </a>
    </div>
  </div>
  <div className="p-2">
    <div className="relative">
      <a href="#" className="block overflow-hidden group">
        <img
          src={conference}
          alt=""
          className="h-[350px] opacity-80 w-full object-cover transition duration-500 group-hover:scale-105 aspect-auto lg:h-[450px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <span className="mt-3 inline-block px-5 py-3 lg:text-2xl font-[poppins] font-bold uppercase tracking-widest text-white">
            CONFERENCES
          </span>
        </div>
      </a>
    </div>
  </div>
  <div className="p-2 hover-forestgreen-50">
    <div className="relative">
      <a href="#" className="block overflow-hidden group">
        <img
          src={banquet}
          alt=""
          className="h-[350px] opacity-80 w-full object-cover transition duration-500 group-hover:scale-105 aspect-auto lg:h-[450px]"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <span className="mt-3 inline-block px-5 py-3 lg:text-2xl font-[poppins] font-bold uppercase tracking-widest text-white">
            BANQUETS
          </span>
        </div>
      </a>
    </div>
  </div>
</div>

    </div>
  )
}
