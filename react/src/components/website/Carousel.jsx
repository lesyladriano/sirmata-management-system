import { useState } from 'react';
import { Carousel } from "@material-tailwind/react";


const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = (item) => {
    console.log(`Clicked: ${item}`);
    setDropdownOpen(false);
  };

  return (
    <div className="">
    {/* IMAGE CAROUSEL  */}
<Carousel className=" relative rounded-xl" navigation={({ setActiveIndex, activeIndex, length }) => (
<div className=" bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
 {new Array(length).fill("").map((_, i) => (
   <span key={i} className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
       activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"}`}
     onClick={() => setActiveIndex(i)}
   />
 ))}
</div>
)}
>
<img src="./src/images/kape_puno.jpg" alt="" className="h-full w-full bg-cover"/>
<img src="./src/images/cabins.jpg" alt="" className="h-full w-full bg-cover"/>
<img src="./src/images/kape_puno.jpg" alt="" className="h-full w-full bg-cover"/>
<img src="./src/images/kape_puno.jpg" alt="" className="h-full w-full bg-cover"/>
    <div className="flex justify-center items-center h-screen">
      <div className="absolute inline-block text-left">
        <button
          className="px-4 py-2 text-white bg-gray-900 rounded-full hover:bg-opacity-75"
          onClick={handleDropdownToggle}
        >
          Open Dropdown
        </button>
        {dropdownOpen && (
          <div className="origin-top-right mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleDropdownItemClick("Option 1")}
              >
                Option 1
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleDropdownItemClick("Option 2")}
              >
                Option 2
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleDropdownItemClick("Option 3")}
              >
                Option 3
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </Carousel>
    </div>
  );
};

export default Dropdown;
