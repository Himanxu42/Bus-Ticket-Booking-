import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import axios from "axios";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function Search() {
  const location = useLocation();
  const { from, to, date } = location.state;
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    async function getSearchRes() {
      try {
        const searchRes = await axios.post("http://localhost:4269/search", {
          from: from.value,
          to: to.value,
          date: date.value,
        });
        if (searchRes.status == 200) {
          setBuses(searchRes.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSearchRes();
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-32 mt-5 space-y-2 capitalize">
        {buses.length == 0 && (
          <h1 className="text-center font-semibold text-xl text-rose-500">
            No buses were found!
          </h1>
        )}
        {buses.map((bus) => {
          return (
            <div>
              <Link
                to="/booking"
                state={{
                  bus: bus,
                  from: from,
                  to: to,
                  date: date,
                }}
              >
                <div className="bg-emerald-300 py-7 px-3 rounded-md flex justify-between ga">
                  <span className="text-white text-2xl font-bold w-[30%]">
                    {bus.bus_name}
                  </span>
                  <span className="text-lg font-semibold">{date.value}</span>
                  <span className="text-md font-semibold">
                    Rs{" "}
                    {bus.locations.reduce((acc, location) => {
                      console.log(location);
                      if (location.city.name === from.label) {
                        acc += location.km;
                      } else if (location.city.name === to.label) {
                        acc += location.km;
                      }
                      return acc;
                    }, 0) * bus.price_per_km}
                  </span>
                  <div className="flex gap-4">
                    <span className="text-lg font-semibold">{from.label}</span>
                    <span className="flex flex-col">
                      <ArrowLeftOutlined />
                      <ArrowRightOutlined />
                    </span>
                    <span className="text-lg font-semibold">{to.label}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
