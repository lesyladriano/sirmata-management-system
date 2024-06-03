import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/admin/ContextProvider";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";

import img5 from "../../assets/images/img5.jpg";
import '../../assets/css/login-slideshow.css';

export default function LoginLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const images = [img2, img3,img5, img1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /*
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images]);
  */
  
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  console.log('Access Token in Local Storage:', accessToken);

  return (
    <div id="guestLayout">
      <div className="img-slideshow">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`img${index + 1}`}
            className={`img_bg ${index === currentImageIndex ? "active" : ""}`}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
}
