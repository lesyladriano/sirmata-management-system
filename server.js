import express from "express";
import cors from "cors";

const app = express();

app.use(
 cors({
  origin: [
   "http://127.0.0.1:3000",
   "https://sirmatafarm.com",
   "http://localhost:3000/",
  ],
 })
);

app.use(express.static("react/public"));

// Start the server on port 443
<<<<<<< HEAD
app.listen(8000, () => {
  console.log('Servers is running on https://api.sirmatafarm.com');
=======
app.listen(8080, () => {
 console.log("Server is running on http://127.0.0.1:8080");
>>>>>>> 5dd0d223ee725cd94e6fd76ec92bed5f25fbe45d
});
