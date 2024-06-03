import ArrowUpButton from "/src/components/website/ArrowUpButton";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from  "react";
import faqsbanner from '/src/assets/images/website/faqs_banner1.jpg';

// eslint-disable-next-line react/prop-types
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg shadow-lg bg-forestgreen-50 mb-4">
      <details className="border border-gray-200">
        <summary className="flex justify-between items-center p-4 cursor-pointer">
          <h2 className="text-lg text-white tracking-widest">{question}</h2>
          <span className={`bg-gray-100 text-gray-600 rounded-full p-2 transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`} onClick={toggleAccordion}>
            {isOpen ? <FaTimes className="text-black" /> : <FaPlus className="text-black" />}
          </span>
        </summary>
        {isOpen && <p className="p-4 bg-white tracking-wider text-black">{answer}</p>}
      </details>
    </div>
  );
};

export default function Faqs() {
  return (
    <div className="mx-auto">
      <div className="relative ">
        <img
          src={faqsbanner}
          className="w-full h-[300px] object-cover object-center  win11:h-auto"
          alt="FAQs Banner"
        />
        <div className="bg-black/25 p-12 md:p-12 lg:px-16 lg:py-24 absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl text-white font-[Poppins] tablet:text-4xl laptop:text-5xl desktop:text-5xl win11:text-6xl tracking-wider win11:tracking-wider">
            FAQS
          </h1>
        </div>
      </div>


      <div className="container mx-auto px-6 win11:px-20 py-12 font-[Poppins]">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <div className="grid grid-cols-1 gap-6">
              <FaqItem
                question="Where are you located?"
                answer="Visit us at Brgy. Malineng, Cuyapo, Nueva Ecija. We are 1km away from the National Highway and is 20 minutes away from TPLEX - Carmen Exit. Waze App: Sirmata Ecofarm and Nature Park"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-6">
              <FaqItem
                question="Are you pet-friendly?"
                answer="Small pets and animals that weigh 10 kilos and below are allowed on the property subject to certain terms and conditions."
              />
              <FaqItem
                question="Can we bring outside food?"
                answer="Bringing in outside food, ordering, and delivery of food from outside our premises is prohibited. Corkage fees may apply.
                No cooking is allowed inside the cabin/villa."
              />
              <FaqItem
                question="What is your mode of payment?"
                answer="We accept payments through BDO bank transfer, cash, and Gcash."
              />
            </div>
          </div>
        </div>
      </div>

      <ArrowUpButton/>
    </div>
  );
}
