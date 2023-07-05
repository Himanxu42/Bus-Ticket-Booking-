import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
function Booking() {
  const [gap, setGap] = useState(new Set([2, 6, 10, 14, 18]));
  const [seats, setSeats] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const [selected, setSelected] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [price, setPrice] = useState(0);
  const { state } = useLocation();
  useEffect(() => {
    let start, end;
    state.bus.locations.forEach((location) => {
      if (location.city._id == state.from.value) start = location.km;
      if (location.city._id == state.to.value) end = location.km;
    });
    setPrice(state.bus.price_per_km * Math.abs(start - end));
    async function getBookins() {
      console.log(state.date);
      try {
        const res = await axios.get(
          `http://localhost:4269/booking?id=${state.bus._id}&date=${state.date.value}`
        );
        if (res.status == 200) setBookings(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBookins();
  }, []);

  console.log(selected);
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-center space-x-4 items-center h-[20vh] bg-stone-100 p-4">
          <div className="w-[80%] flex bg-white justify-between p-4 rounded-lg">
            <div className="">
              <p className="text-gray-400">
                Bus Name :{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {state.bus.bus_name}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                No :{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {state.bus.bus_number}
                </span>
              </p>
            </div>
            <div className="text-gray-400">
              <p className="text-gray-400 text-md">
                Starting:{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {state.from.label}
                </span>
              </p>
              <p className="text-gray-400 text-md">
                Distination :{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {state.to.label}
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-gray-400 text-md">Date : </p>
              <p className="text-gray-600 font-bold">
                {new Date(state.date.label).toLocaleDateString()}
              </p>
            </div>
            <div className="">
              <p className="text-gray-400 text-md">Pricing per seat </p>
              <p className="text-gray-600 font-bold">{price}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-6 p-4 items-center h-[50vh]">
          <div className="grid grid-cols-5 gap-2">
            {seats.map((s, index) => (
              <>
                {gap.has(index) && <div></div>}
                <div
                  key={index}
                  onClick={(e) =>
                    setSelected((current) => {
                      console.log(current);
                      if (current.find((c) => c == s)) {
                        return current.filter((c) => c != s);
                      }
                      return [...current, s];
                    })
                  } 
                  className="flex flex-col  items-center"
                > 
                   <span className="text-xs font-semibold text-slate-300">{s}</span>
                  <input
                    disabled={bookings.find((b) => b.seat == s)}
                    checked={bookings.find((b) => b.seat == s)}
                    type="checkbox"
                    className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1>
            Total price :{" "}
            <span className="font-semibold mr-3">
              {price * selected.length}
            </span>
          </h1>
          {selected.length > 0 && (
            <Link
              to="/payment"
              state={{
                bus: state.bus,
                from: state.from,
                to: state.to,
                selected: selected,
                amount: price * selected.length,
                date: state.date.value,
              }}
            >
              <button className="bg-gray-700 text-white px-4 py-2  rounded-md hover:bg-gray-800">
                Proced
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
