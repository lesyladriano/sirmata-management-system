export default function BaseAcommodationModal({selectedAccommodation, onClose }) {
    console.log("selectedAccommodation:", selectedAccommodation);
  
    return (
      <>
        {selectedAccommodation && (
          <div className="edit-reservation-base fixed px-10 ">
            <div className="accommodation-modal fadeInDown ">
              <span className=" items-center flex justify-end ml-auto ">
                <i
                  className="fa fa-close text-xl text-gray-700 exit-icon"
                  onClick={onClose}
                />
              </span>
            </div>
          </div>
        )}
      </>
    );
  }
  