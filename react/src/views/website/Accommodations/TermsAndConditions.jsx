import AdditionalTermsList from "../../../context/admin/TermsListRersevation";

export default function TermsAndConditions({ onClose }) {
 return (
  <div
   className="bg-black bg-opacity-50 h-screen w-screen fixed top-0 left-0 flex justify-center md:items-center pt-[6rem]  md:pt-0     desktop:items-center win11:items-center font-[Poppins]  fixed px-10"
   style={{ zIndex: 99999 }}
  >
   <div className="bg-white flex-col fadeInDown w-125 font-[Poppins] rounded-md shadow-md fadeInDown flex items-center h-[80%]">
    <div className="font-semibold text-center tracking-widest w-full shadow-md sticky bg-forestgreen-1100 text-white flex  justify-between  px-4 py-2  rounded-t-md">
     <span className="w-full text-center ">TERMS & CONDITIONS</span>
     <span className="items-center flex  justify-end ml-auto">
      <i
       className="fa fa-close text-xl hover:cursor-pointer  text-white exit-icon"
       onClick={onClose}
      />
     </span>
    </div>

    <div className="w-full overflow-auto  space-y-4 pt-4 ">
     {AdditionalTermsList.map((item, index) => (
      <div className="" key={index}>
       <div className="text-white bg-forestgreen-50  rounded-br-full rounded-tr-full w-fit tracking-wider px-5 py-1 shadow-sm font-semibold">
        {index + 1}. {item.title}
       </div>
       <p className="text-sm px-5 pt-2">
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

     <div className="bg-brown-50 rounded-md shadow-sm px-4 py-2 mt-4 text-center  ">
      By using our reservation website, you acknowledge that you have read,
      understood, and agree to abide by these terms and conditions.
     </div>
    </div>
   </div>
  </div>
 );
}
