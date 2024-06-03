import { Link } from "react-router-dom";
import logo from "/src/assets/images/sirmata_logo.png";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 flex flex-col items-center justify-center"> {/* Changed this line */}
          <img src={logo} alt="Sirmata Logo" className="h-32 w-auto my-4" /> {/* Adjust height as needed */}
          <h1 className="mt-4 text-6xl md:text-8xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Oops!</h1>
          <p className="text-lg md:text-xl mb-12 text-center text-gray-600 dark:text-gray-300">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-forestgreen-50 hover:bg-forestgreen-600 text-white py-3 px-6 rounded-lg text-lg md:text-xl transition duration-300 ease-in-out"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
