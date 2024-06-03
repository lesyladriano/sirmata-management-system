function HeaderBanner({ banner }) {
 return (
  <div className="flex">
   <div className="flex-1 shadow-md justify-start bg-forestgreen-100 text-white">
    <h2 className="tracking-widest font-[Poppins] bg-forestgreen-100 font-semibold px-12 py-8 text-lg">
     {banner}
    </h2>
   </div>
  </div>
 );
}

export default HeaderBanner;
