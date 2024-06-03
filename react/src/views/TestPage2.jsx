import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "../components/admin/CloudinaryUploadWidget";

export default function TestPage2() {
 const [publicId, setPublicId] = useState([]);
 const [secureUrls, setSecureUrls] = useState([]);
 const [cloudName] = useState("di0nkj5kz");
 const [uploadPreset] = useState("sirmata_web_image");
 const [uwConfig] = useState({
  cloudName,
  uploadPreset,
 });

 const cld = new Cloudinary({
  cloud: {
   cloudName,
  },
 });

 useEffect(() => {
  console.log("publicId updated:", publicId);
 }, [publicId]);

 const LogArray = async () => {
  console.log(publicId);
 };

 return (
  <div>
   <h3>Cloudinary Upload Widget Example</h3>
   <CloudinaryUploadWidget
    name={"UPLOAD IMAGE"}
    uwConfig={uwConfig}
    setPublicId={(newPublicId) =>
     setPublicId((prevPublicId) => [...prevPublicId, newPublicId])
    }
   />

   <div style={{ width: "800px" }}>
    {publicId.map((id, index) => (
     <AdvancedImage
      key={index}
      style={{ maxWidth: "100%" }}
      cldImg={cld.image(id)}
      plugins={[responsive(), placeholder()]}
     />
    ))}
   </div>
   <div>
    <button onClick={LogArray} className=" p-2 rounded-md bg-green-200">
     LOG
    </button>
   </div>
  </div>
 );
}
