import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const [active, setActive] = useState(useLocation().pathname.split("/")[2]);

  return (
    <div className="h-screen border-[1px] space-y-6 pt-5 bg-gray-100  border-r-[#c9c9c9] w-72">
      <Link to="/admin/dashboard">
        <div className={`pl-5 ${active == "dashboard" ? "font-bold" : ""}`}>
          Admin Panel
        </div>
      </Link>

      <div className="">
        <Link to="/admin/addbus">
          <div
            className={`hover:bg-gray-200 ${
              active == "addbus" ? "font-bold" : ""
            } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]`}
          >
            Add Bus
          </div>
        </Link>
        <Link to="/admin/addcity">
          <div
            className={`hover:bg-gray-200 ${
              active == "addcity" ? "font-bold" : ""
            } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]`}
          >
            Add City
          </div>
        </Link>
        <Link to="/admin/all-bus">
          <div
            className={`hover:bg-gray-200 ${
              active == "all-bus" ? "font-bold" : ""
            } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]`}
          >
            All Bus
          </div>
        </Link>
        <Link to="/admin/all-bookings">
          <div
            className={`hover:bg-gray-200 ${
              active == "all-bookings" ? "font-bold" : ""
            } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]`}
          >
            All Bookings
          </div>
        </Link>
        <Link to="/admin/feedbacks">
          <div
            className={`hover:bg-gray-200 ${
              active == "feedbacks" ? "font-bold" : ""
            } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]`}
          >
            Feedbacks
          </div>
        </Link>

        <div
          onClick={() => {
            localStorage.clear("auth");
            localStorage.clear("id");
            localStorage.clear("role");
            window.location.reload();
          }}
          className={`hover:bg-gray-200 ${
            active == "all-transaction" ? "font-bold" : ""
          } cursor-pointer pl-5 py-4 border-[1px] border-y-[#c9c9c9]  text-red-600 font-semibold`}
        >
          Log out!
        </div>
      </div>
    </div>
  );
}
