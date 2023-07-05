import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { func } from "prop-types";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  async function getBookingById() {}
  useEffect(() => {
    async function getAllBookings() {
      try {
        const res = await axios.get("http://localhost:4269/all/booking", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBookings();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (search == "") return;
      const res = await axios.get(`http://localhost:4269/booking/${search}`);
      const newArray = [res.data];
      setBookings(newArray);
    } catch (error) {
      console.log(error);
      setBookings([]);
    }
  }
  return (
    <div className="flex h-screen overflow-hidden ">
      <AdminSidebar />

      <div className="flex justify-center bg-gray-800 w-full">
        <div class="relative overflow-x-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center mt-10 mb-10"
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              className=" outline-none text-white border-[1px] w-[60%] border-emerald-400 bg-transparent px-2 py-3 rounded-full"
            />
            <button className="border-[1px] border-fuchsia-500 px-9 ml-2 rounded-full text-fuchsia-400">
              Search
            </button>
          </form>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Bus Number
                </th>

                <th scope="col" class="px-6 py-3">
                  PNR
                </th>

                <th scope="col" class="px-6 py-3">
                  From
                </th>
                <th scope="col" class="px-6 py-3">
                  To
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>

                <th scope="col" class="px-6 py-3">
                  Booked at
                </th>
              </tr>
            </thead>
            {bookings.map((booking) => (
              <tbody className="text-slate-300 font-semibold">
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">{booking?.bus.bus_number}</td>

                  <td class="px-6 py-4">{booking._id}</td>
                  <td class="px-6 py-4">{booking?.from.name}</td>

                  <td class="px-6 py-4">{booking?.to.name}</td>
                  <td class="px-6 py-4">{booking?.price}</td>
                  <td class="px-6 py-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
