import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function OffersAndPromos() {
  
  return (
    <div className="">
      <div className="relative mb-24">
  <img src="./src/assets/images/website/offersandpromos/oap_banner.jpg"  className="w-full h-[400px] object-cover object-center sm:h-full" />
  <div className="bg-black/25 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
    <h1 className="text-5xl text-white items-center font-[Poppins] sm:text-3xl md:text-5xl tracking-wide text-center">OFFERS AND PROMOS</h1>
  </div>
</div>

 {/* OAP 1 */}
 <section className="overflow-hidden justify-center items-center rounded-2xl mx-8 my-8 lg:mx-auto lg:my-28 shadow-2xl md:grid lg:grid-cols-2">
        <div className="md:flex">
          <Carousel
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            emulateTouch={true}
            interval={5000}
            infiniteLoop={true}
            autoPlay={true}
            className="w-full h-96 lg:h-full"
          >
            <div>
              <img
                src="./src/assets/images/website/offersandpromos/photoshoot_oap.jpg"
                alt=""
                className="w-full h-full lg:aspect-square"
              />
            </div>
            <div>
              <img
                src="./src/assets/images/website/offersandpromos/photoshoot_package.jpg"
                alt=""
                className="w-full h-full lg:aspect-square"
              />
            </div>
          </Carousel>

          <div className="justify-center text-center my-24 sm:p-6">
            <p className="text-2xl font-[poppins] text-forestgreen-400 font-semibold tracking-widest text-center py-4">
              Take a snap!
            </p>
            <img
              src="./src/assets/images/website/offersandpromos/separator_OAP.png"
              alt=""
              className="w-96"
            />
            <div className="w-96 mt-6 bottom-0 mx-auto"></div>
            <h2 className="mt-6 font-black">
              <span className="mx-4 font-[poppins] block text-sm">
                Capture the moments that matter with our exquisite photoshoot
                package tailored to your unique style and vision.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* OAP 2 */}
      <section className="overflow-hidden justify-center items-center rounded-2xl mx-8 my-8 lg:mx-auto lg:w-6/12 h-1/6 shadow-2xl md:grid lg:grid-cols-2">
        <div className="md:flex">
          <img
            src="./src/assets/images/website/spa_massage.jpg"
            alt=""
            className="w-full lg:aspect-square md:h-full"
          />
          <div className="justify-center text-center my-8 sm:p-6">
            <p className="text-2xl font-[poppins] text-forestgreen-400 font-semibold tracking-widest text-center py-4">
              Treat Yourself!
            </p>
            <img
              src="./src/assets/images/website/offersandpromos/separator_OAP.png"
              alt=""
              className="w-96"
            />
            <div className="w-96 mt-6 bottom-0 mx-auto"></div>
            <h2 className="mt-6 font-black">
              <span className="mx-4 font-[poppins] block text-sm">
                Just in case you need reminding, relax and go on a stress-free
                zone. Hiraya Welness and Spa offers 15% discount on all service
                with advanced booking.
                <br />
                <br />
                For inquiries and booking, you may call: 09171107910 /
                09774047308
                <br />
                Note: Advanced booking requires 50% down payment.
              </span>
            </h2>
            {/* <a className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white" href="">
        Get Discount
      </a> */}
            <p className="mt-8 text-xs font-medium uppercase text-gray-400">
              Offer valid for this weekend June 17-18, 2023 *
            </p>
          </div>
        </div>
      </section>

      {/* OAP 3 */}
      <section className="overflow-hidden justify-center items-center rounded-2xl mx-8 my-8 lg:mx-auto lg:w-6/12 h-1/6 shadow-2xl md:grid lg:grid-cols-2">
        <div className="md:flex ">
          <img
            src="./src/assets/images/website/offersandpromos/fathers_day.jpg"
            alt=""
            className="aspect-square md:h-full"
          />
          <div className="justify-center text-center my-24 sm:p-6">
            <p className="text-2xl font-[poppins] text-forestgreen-400 font-semibold tracking-widest text-center py-4">
              Father's Day
            </p>
            <img
              src="./src/assets/images/website/offersandpromos/separator_OAP.png"
              alt=""
              className="w-96 "
            />
            <div className="w-96 mt-6 bottom-0 mx-auto"></div>
            <h2 className="mt-6 font-black">
              <span className="mx-4 font-[poppins] block text-sm">
                Let's cheers and celebrate this weekend as we will be giving
                free beer for the amazing dads that will celebrate with us.
                Enjoy your dinner together with a live acoustic band starting
                from 5pm. 🍻
              </span>
            </h2>
            {/* <a className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white" href="">
        Get Discount
      </a> */}
            <p className="mt-8 text-xs font-medium uppercase text-gray-400">
              Offer valid for this weekend June 17-18, 2023 *
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
