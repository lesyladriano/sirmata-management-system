export default function ReviewViewModal({ selectedReview, onClose }) {
 return (
  <div
   className="bg-black bg-opacity-20 h-screen w-screen fixed top-0 left-0 flex justify-center items-center font-[Poppins]  fixed px-10"
   style={{ zIndex: 9999 }}
  >
   {selectedReview && (
    <div className="bg-white flex-col fadeInDown w-125 font-[Poppins] rounded-md shadow-md fadeInDown flex items-center   max-h-[80%]">
     <div className="font-semibold tracking-widest w-full shadow-md sticky bg-forestgreen-100 text-white flex  justify-between  px-4 py-2  rounded-t-md">
      <span className="text-lg">Review ID: {selectedReview.review_id}</span>
      <span className="items-center flex justify-end ml-auto">
       <i
        className="fa fa-close text-xl hover:cursor-pointer  text-white exit-icon"
        onClick={onClose}
       />
      </span>
     </div>

     <div className="p-4 w-full overflow-auto">
      <div className=" w-full shadow-md  h-fit card-item2 py-2">
       <div className="w-full justify-between flex items-center">
        <div className="flex-col">
         <div className="text-md font-semibold">Full Name</div>
         <div className="text-xl px-2">{selectedReview.full_name}</div>
        </div>
        <span>
         {Array.from({ length: selectedReview.rating }, (_, index) => (
          <i
           key={index}
           className="fa-star fa-solid text-xl text-yellow-900 "
          />
         ))}
        </span>
       </div>

       <div className="flex-col  pb-4">
        <div className="text-md font-semibold">Email</div>
        <div className="text-md px-2">{selectedReview.email}</div>
       </div>

       <div className="whitespace-pre-line px-6 bg-white border-gray-400 border-dashed border-2 rounded-md py-2 text-justify custom-scrollbar">
        {selectedReview.review}
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
