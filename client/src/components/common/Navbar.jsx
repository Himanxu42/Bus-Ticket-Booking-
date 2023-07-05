import { DownOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../helper/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  async function handleLogout(e) {
    console.log("hi");
    try {
      const response = await axios.get("http://localhost:4269/logout");
      if (response.status == 200) {
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="px-28 select-none bg-gradient-to-r items-center from-cyan-700 to-blue-200 py-5  flex justify-between ">
      <div>
        <a href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="30"
            fill="white"
            className="bi bi-bus-front-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.496 2.496 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A43.608 43.608 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1v2ZM3.552 3.22A43.306 43.306 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44.304 44.304 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994ZM8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9c1.876 0 3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44.304 44.304 0 0 0 8 4Zm-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1Z" />
          </svg>
          <p className="text-2xl italic font-semibold tracking-wider text-white">
            BOOK BUS
          </p>
        </a>
      </div>
      <div className="flex gap-5 items-center">
        <div className="cursor-pointer">
          <p className="text-gray-500 font-semibold tracking-wider">Help</p>
        </div>

        <div className="flex items-baseline p-2   gap-2 cursor-pointer group relative dropdown_container">
          <p className="tracking-wide  text-gray-500 font-semibold">
            Manage Booking
          </p>
          <DownOutlined color="#6b7280" className="showDropDown" />
          <div className=" dropdown  absolute w-full group-hover:flex  hidden flex-col   rounded-md top-10 z-10  bg-white shadow-md ">
            <a
              className="hover:bg-gray-300 text-center text-md text-gray-500 rounded-b-md tracking-wide font-mono py-3 "
              href="/profile"
            >
              Profile
            </a>
          </div>
        </div>
        {!isAuthenticated() ? (
          <div className="space-x-5">
            <a
              href="/login"
              className="bg-green-300 p-2 tracking-wider font-semibold text-stone-500 rounded-md hover:bg-green-500 hover:text-gray-200"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-blue-400 p-2 tracking-wider font-semibold text-stone-500 rounded-md hover:bg-blue-500 hover:text-gray-200"
            >
              Signup
            </a>
          </div>
        ) : (
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 p-2 text-white hover:bg-red-400 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
