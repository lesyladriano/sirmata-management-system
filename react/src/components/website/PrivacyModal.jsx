import PrivacyList from "../../context/admin/PricacyList";

export default function PrivacyModal({ onClose }) {
 return (
  <div
   className="bg-black bg-opacity-50 h-screen w-screen fixed top-0 left-0 flex justify-center pt-[6rem]  md:pt-0     desktop:items-center win11:items-center font-[Poppins]  fixed px-10"
   style={{ zIndex: 99999 }}
  >
   <div className="bg-white font-[Poppins] flex-col fadeInDown w-125 font-[Poppins] rounded-md shadow-md fadeInDown flex items-center h-[80%]">
    <div className="font-semibold tracking-widest w-full shadow-md sticky bg-forestgreen-1100  text-white flex  justify-between  px-4 py-2  rounded-t-md">
     <span className="w-full text-center ">PRIVACY POLICY</span>
     <span className="items-center flex justify-end ml-auto">
      <i
       className="fa fa-close text-xl hover:cursor-pointer  text-white exit-icon"
       onClick={onClose}
      />
     </span>
    </div>

    <div className="w-full  h-[100%] overflow-auto pb-4">
     <div className="bg-brown-50 rounded-md shadow-sm px-4 py-2 text-center  ">
      {" "}
      This Privacy Policy explains how{" "}
      <span className="font-semibold">
       Sirmata Ecofarm and Nature Park
      </span>{" "}
      collects, uses, and discloses personal information obtained from visitors
      of our website and guests who use our services.
     </div>

     <div className="rounded-md  text-justify pt-3 space-y-4 ">
      {PrivacyList.map((item, index) => (
       <div className="" key={index}>
        <div className="text-white bg-forestgreen-50  rounded-br-full rounded-tr-full w-fit tracking-wider px-5 py-1 shadow-sm font-semibold">
         {index + 1}. {item.title}
        </div>
        <p className="text-sm px-5 pt-3 ">
         {item.desc.split("\n").map((line, lineIndex) =>
          line.trim().startsWith("-") ? (
           <li
            className="text-gray-900 text-sm pt-1 pl-4 text-justify"
            key={lineIndex}
           >
            {line.trim().substring(2)}
           </li>
          ) : (
           <span key={lineIndex}>
            {line}
            <br />
           </span>
          )
         )}
        </p>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}
