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
    <Carousel className='' navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="  bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
            <span key={i} className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"}`} onClick={() => setActiveIndex(i)}/>
            ))}
            </div>
            )}>

            <img src="./src/assets/images/website/kape_puno.jpg" alt="" className="h-full w-full bg-cover"/>
            <img src="./src/assets/images/website/cabins.jpg" alt="" className="h-full w-full bg-cover"/>
            <img src="./src/assets/images/website/kape_puno.jpg" alt="" className="h-full w-full bg-cover"/>
            <img src="./src/assets/images/website/cabins.jpg" alt="" className="h-full w-full bg-cover"/>
            
          </Carousel>
    </div>
  );
};

export default Dropdown;
