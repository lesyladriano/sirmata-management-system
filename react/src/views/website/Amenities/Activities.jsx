import ArrowUpButton from "/src/components/website/ArrowUpButton";
import banner from '/src/assets/images/website/amenities/activities/banner.jpg';
import separator from '/src/assets/images/website/separator_OAP.png';
import bike from '/src/assets/images/website/amenities/activities/bike.jpg';
import spiderweb from '/src/assets/images/website/amenities/activities/spiderweb1.jpg';
import obstaclecourse from '/src/assets/images/website/amenities/activities/obstaclecourse.jpg';
import zipbike from '/src/assets/images/website/amenities/activities/zipbike.jpg';
import kayak from '/src/assets/images/website/amenities/activities/kayak.jpg';
import fishing from '/src/assets/images/website/amenities/activities/fishing.jpg';

export default function Activities() {
  return (
    <div className="m-auto">
      <div className="relative">
        <img src={banner} className="w-full h-[300px] object-cover object-center win11:h-auto" />
        <div className="bg-black/30 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl text-center laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">ACTIVITIES</h1>
        </div>
      </div>

      <section className="">
        <div className="flex flex-col items-center justify-center pt-10 pb-4 win11:py-20">
          <h2 className='font-[Poppins] text-2xl tablet:text-3xl desktop:text-4xl win11:text-5xl text-black tracking-wide font-bold uppercase py-2'>
            IT'S TIME FOR AN ADVENTURE!
          </h2>
          <img src={separator} alt="Logo" className="w-60 win11:w-80 py-1 win11:py-2" />
          <p className="pt-4 px-6 win11:max-w-4xl text-sm font-[poppins] laptop:px-24 desktop:px-48 text-black win11:text-lg text-center tracking-wider leading-normal ">
          Get that adrenaline rush and try the famous Spider Web suspended 25 feet above the ground, embark on a serene kayaking adventure on the lake, or enjoy fishing in the calm waters. You can also explore the Zipbike and Obstacle Course or simply bike around Sirmata to soak in the fresh air and scenic beauty.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 desktop:px-20 win11:px-32 mb-10">
        <Card image={bike} title="Biking" description="Embark on a scenic biking journey through the tranquil landscapes of a nature park." />
        <Card image={spiderweb} title="Spider Web" description="Climb the 25-ft tall spider web, an exhilarating challenge with panoramic views." />
        <Card image={obstaclecourse} title="Obstacle Course" description="Navigate a dynamic outdoor obstacle course, blending natural beauty with exhilarating challenges." />
        <Card image={zipbike} title="Zip Bike" description="Explore nature from new heights with zip biking, a fusion of exhilarating zip lining and biking." />
        <Card image={kayak} title="Kayak" description="Enjoy a calm kayaking journey on the peaceful lake waters, surrounded by beautiful nature views." />
        <Card image={fishing} title="Fishing" description="Relax and enjoy fishing in the calm lake waters, surrounded by nature's beauty." />
      </div>

      <ArrowUpButton />
    </div>
  );
}

const Card = ({ image, title, description }) => {
  return (
    <div className="p-3 relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative group">
        <a href="#" className="block overflow-hidden group">
          <img
            src={image}
            alt=""
            className="win11:h-[600px] h-[450px] tablet:h-[400px] laptop:h-[450px] desktop:h-[450px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 flex flex-col items-start justify-start p-4 sm:p-6 font-[Poppins]">
            <span className="inline-block bg-white px-3 py-1 text-sm sm:text-base font-semibold shadow-lg text-forestgreen-50 uppercase tracking-widest">{title}</span>
          </div>
        </a>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-forestgreen-50 bg-opacity-90 text-white font-[Poppins]">
          <p className="text-xs sm:text-sm tracking-wide">{description}</p>
        </div>
      </div>
    </div>
  );
};
