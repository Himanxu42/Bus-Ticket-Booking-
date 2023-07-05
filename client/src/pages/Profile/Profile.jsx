import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import axios from "axios";
import { Fail, Sleep, Success } from "../../utility";

export default function Profile() {
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  useEffect(() => {
    async function getProfile() {
      const res = await axios.get("http://localhost:4269/user", {
        withCredentials: true,
      });

      setUser({ ...res.data, bookings: res.data.bookings.reverse() });
    }
    getProfile();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text == "") return;
    try {
      const res = await axios.post(
        "http://localhost:4269/feedback",
        {
          text: text,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        Success("Feedback added!");
        setText("");
      }
    } catch (error) {
      Fail(error?.response?.data.msg || error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full  items-center mt-10">
        <h1 className="text-xl font-semibold border-b-[1px] border-b-slate-400">
          {user?.name}
        </h1>
        <h1 className="text-xl font-semibold border-b-[1px] border-b-slate-400">
          {user?.email}
        </h1>
      </div>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            rows={3}
            onChange={(e) => setText(e.target.value)}
            className="border-[1px] w-72 p-2"
            placeholder="Add your feed back!"
            value={text}
          ></textarea>
          <button className="bg-emerald-300 py-2">Add Feedback</button>
        </form>
      </div>
      <div className="flex mt-20 w-full justify-center capitalize">
        <table class="w-[70%]  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Bus Number
              </th>
              <th scope="col" class="px-6 py-3">
                PNR
              </th>
              <th scope="col" class="px-6 py-3">
                Departure
              </th>
              <th scope="col" class="px-6 py-3">
                Arrival
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Seat No
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Time
              </th>
              <th scope="col" class="px-6 py-3">
                Booked at
              </th>
              <th scope="col" class="px-6 py-3">
                Bus Phone
              </th>
            </tr>
          </thead>
          {user?.bookings?.map((booking) => {
            return (
              <>
                <tbody className="text-slate-300 font-semibold">
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4">{booking?.bus.bus_number}</td>

                    <td class="px-6 py-4">{booking._id}</td>
                    <td class="px-6 py-4">{booking?.from.name}</td>

                    <td class="px-6 py-4">{booking?.to.name}</td>
                    <td class="px-6 py-4">{booking?.price}</td>
                    <td class="px-6 py-4">{booking?.seat}</td>
                    <td class="px-6 py-4">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4">
                      {
                        booking?.bus.locations.find(
                          (l) => l?.city == booking?.from._id
                        )?.from
                      }
                    </td>
                    <td class="px-6 py-4">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4">{booking?.bus.phone}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}
