import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";

export default function UserForm() {
 const { id } = useParams();
 const [user, setUser] = useState({
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  contact_number: "",
  password: "",
  password_confirmation: "",
  account_type: "",
 });
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState(null);
 const navigate = useNavigate();

 {
  /**Change Password */
 }
 const [isPasswordOpen, setIsPasswordOpen] = useState(false);
 const togglePassword = () => {
  setIsPasswordOpen(!isPasswordOpen);
 };
 const makePassword = isPasswordOpen ? "fadeInDown" : "fadeOutAsideItems";

 useEffect(() => {
  if (id) {
   setLoading(true);
   axiosClient
    .get(`/users/${id}`)
    .then(({ data }) => {
     setLoading(false);
     setUser(data);
     setProfilePic(data.profile_pic); // Set profile picture in the state
    })
    .catch(() => {
     setLoading(false);
    });
  }
 }, [id]);

 const onSubmit = (ev) => {
  ev.preventDefault();

  const updatedUser = {
   ...user,
   profile_pic: profilePic,
  };

  const endpoint = user.id ? `/update/users/${user.id}` : "/users";
  console.log("Submitting data:", updatedUser); // Log the submitted data
  axiosClient
   .request({
    url: endpoint,
    method: user.id ? "PUT" : "POST",
    data: updatedUser,
   })
   .then(() => {
    // Show Notf
    navigate("/users");
   })
   .catch((err) => {
    console.log(err);
    const response = err.response;
    if (response && response.status === 422) {
     setErrors(response.data.errors);
    }
   });
 };

 const [profilePic, setProfilePic] = useState(null);

 return (
  <div className="m-10">
   <Link
    to="/users"
    style={{
     display: "flex",
     justifyContent: "flex-end",
     marginBottom: "1rem",
     textDecoration: "none",
    }}
   >
    <button className="btn btn-delete mx-16">Back</button>
   </Link>

   <div className="card flex ">
    {/**Account Profile Picture*/}
    <div className="account-profile-container justify-center flex-col  w-full">
     <form>
      <div className="flex justify-center ">
       <div className="account-profile-placeholder border-2 border-black">
        {profilePic ? (
         <img src={URL.createObjectURL(profilePic)} alt="Profile Pic" />
        ) : (
         "Place Profile Pic Here"
        )}
       </div>
      </div>
      <div className="flex justify-center p-2 text-lg mt-3  ">
       {user.id ? (
        <h1>
         <b>Update User:</b> {user.first_name} {user.last_name}
        </h1>
       ) : (
        <h1>
         <b>New User</b>
        </h1>
       )}
      </div>
     </form>
    </div>

    {/**Errors */}
    <div className="w-full flex-col">
     {errors && (
      <div className="alert">
       {Object.keys(errors).map((key) => (
        <p className="animated fadeInDown" key={key}>
         {errors[key][0]}
        </p>
       ))}
      </div>
     )}

     {!loading && (
      <form onSubmit={onSubmit} className="space-y-4  ">
       <div className="flex-container2">
        <div className="flex-container  ">
         <div className="nowrap w-full flex items-center font-bold">
          User ID:{" "}
         </div>
         <div className=""> {user.id}</div>
        </div>
       </div>

       <div className="flex-container">
        <input
         value={user.first_name}
         onChange={(ev) => setUser({ ...user, first_name: ev.target.value })}
         style={{ marginRight: "1rem" }}
         placeholder="First Name"
         className="mr-1"
        />
        <input
         value={user.last_name}
         onChange={(ev) => setUser({ ...user, last_name: ev.target.value })}
         placeholder="Last Name"
         className="ml-1"
        />
       </div>
       <input
        value={user.email}
        onChange={(ev) => setUser({ ...user, email: ev.target.value })}
        placeholder="Email"
       />
       <input
        type="file"
        onChange={(ev) => setProfilePic(ev.target.files[0])}
       />

       <input
        value={user.contact_number}
        onChange={(ev) => setUser({ ...user, contact_number: ev.target.value })}
        placeholder="Contact Number"
       />

       <div className={`${makePassword}`}>
        <div className="space-y-4">
         <input
          type="password"
          onChange={(ev) => setUser({ ...user, password: ev.target.value })}
          placeholder="Password"
         />
         <input
          type="password"
          onChange={(ev) =>
           setUser({ ...user, password_confirmation: ev.target.value })
          }
          placeholder="Password Confirmation"
         />
        </div>
       </div>

       <div className="account-container whitespace-nowrap">
        <h3 className="text-md font-medium">Account Type</h3>
        <div className="flex-container">
         <input
          type="radio"
          value="admin"
          checked={user.account_type === "admin"}
          onChange={(ev) => setUser({ ...user, account_type: ev.target.value })}
         />{" "}
         Admin
        </div>
        <span className="flex-container">
         <input
          type="radio"
          value="employee"
          checked={user.account_type === "employee"}
          onChange={(ev) => setUser({ ...user, account_type: ev.target.value })}
         />{" "}
         Employee
        </span>
       </div>

       <div className="flex-container">
        <button
         className="btn-add btn-block bg-forestgreen-50"
         style={{ marginRight: "1rem" }}
        >
         Save
        </button>
        <button
         type="button"
         className="btn-edit btn-block"
         onClick={togglePassword}
        >
         {isPasswordOpen ? "Save Password" : "Change Password"}
        </button>
       </div>
      </form>
     )}
    </div>
   </div>
  </div>
 );
}
