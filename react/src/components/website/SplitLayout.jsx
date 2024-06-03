import Card from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import slide_image_1 from '../../assets/images/website/about/kapepuno.jpg';

function SplitLayout() {

const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
}
const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
}


  return (
    <div className="relative">
      <div className="text-center py-8  text-xl font-bold"></div>
      <div className="absolute right-8 top-5 ">
        <button onClick={scrollLeft} className="p-3 m-3 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-3 m-3 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <div id="content" className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
        <div>
        <div className="card bg-white w-[350px] h-550px] m-2 rounded-lg shadow-lg">
          <div className="top">
          <img
            className="w-[800px] h-[500px] object-cover rounded-md "
            src={slide_image_1}
            alt="img"
          />
          </div>
          
        </div>
        </div>
      </div>
    </div>
  );
}

export default SplitLayout;
