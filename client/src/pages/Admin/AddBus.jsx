import React, { useState } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { PlusOutlined } from "@ant-design/icons";

const testData = [
  "Honvar",
  "Chechat",
  "Digras",
  "Bhabra",
  "Vyara",
  "Yammunagar",
  "Ghanaur",
  "Ambahhta",
  "Balugaon",
  "Pithampur",
  "Bhanjanagar",
  "Parol",
  "Washim",
  "Mandapeta",
  "Jubbal",
  "Bilgi",
  "Dhuri",
  "Begowal",
  "Hata",
  "Naliya",
];
const initialState = {
  bus_name: "",
  starting_from: "",
  bus_number: "",
  phone: "",
  state: "",
  final_destination: "",
  email: "",
  locations: [],
};
const initialLocation = {
  city: "",
  km: "",
  to: "",
  from: "",
  label: "",
};
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import CitySuggest from "../../components/citysuggest/CitySuggest";
const Wait = (dur) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, dur);
  });
};

export default function AddBus() {
  const [bestMatches, setBestMatches] = useState([]);
  const [curDrop, setCurDrop] = useState("");
  const [suggest, setSuggest] = useState("");
  const [entered, setEntered] = useState([]);
  const [busState, setState] = useState(initialState);
  const [initLocation, setInitLocation] = useState(initialLocation);
  const handleTimeFormat = (format) => {
    setTimeFormat(format);
  };
  const handleChange = (name, value, label) => {
    setState({ ...busState, [name]: value });
  };
  const handleLocationChange = (name, value, label) => {
    if (name == "km") value = parseInt(value);
    console.log(label);
    if (label)
      setInitLocation({
        ...initLocation,
        label: label,
        [name]: value,
      });
    else
      setInitLocation({
        ...initLocation,
        [name]: value,
      });
  };
  const addLocation = () => {
    const { city, km, from, to } = initLocation;
    console.log(initLocation);
    if (!city || !from || !to) {
      return enqueueSnackbar("Missing fields", {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "error",
        autoHideDuration: 1000,
      });
    }
    setState({
      ...busState,
      ["locations"]: [...busState.locations, initLocation],
    });
    setInitLocation(initialLocation);
    setTimeFormat("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      bus_name,
      starting_from,
      bus_number,
      phone,
      state,
      final_destination,
      email,
      locations,
    } = busState;
    if (
      !bus_name ||
      !starting_from ||
      !bus_number ||
      !phone ||
      !state ||
      !final_destination ||
      !email ||
      locations.length == 0
    ) {
      return enqueueSnackbar("Missing fields", {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "error",
        autoHideDuration: 1000,
      });
    }
    try {
      const res = await axios.post("http://localhost:4269/addbus", {
        bus_name,
        starting_from,
        bus_number,
        phone,
        state,
        final_destination,
        email,
        locations,
      });
      if (res.status == 200) {
        enqueueSnackbar(res.data.msg, {
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
          variant: "success",
          autoHideDuration: 1000,
        });
        await Wait(1000);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      return enqueueSnackbar(error?.response.data.msg || error.message, {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };
  console.log(busState);
  return (
    <div className="flex h-screen overflow-hidden ">
      <AdminSidebar />
      <div className="w-full overflow-y-auto  flex flex-grow">
        <div className="w-full flex justify-center items-center mt-[100px]">
          <form onSubmit={handleSubmit} className="">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Bus name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="bus_name"
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, "")
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Capital Travels"
                  required
                />
              </div>
              <CitySuggest
                name={"starting_from"}
                label={"Starting from"}
                handleChange={handleChange}
              />
              <div>
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Bus number
                </label>
                <input
                  type="text"
                  id="company"
                  name="bus_number"
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, "")
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="90xxx"
                  required
                />
              </div>

              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, "")
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  State
                </label>
                <input
                  type="text"
                  id="company"
                  name="state"
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, "")
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Assam"
                  required
                />
              </div>
              <CitySuggest
                handleChange={handleChange}
                label={"Final Destination"}
                name="final_destination"
              />
            </div>

            <div className="mb-6">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) =>
                    handleChange(e.target.name, e.target.value, "")
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
            </div>
            <div className="p-1 space-y-3 bg-cyan-100  ">
              <div className="flex justify-center max-w-md  flex-wrap gap-2">
                {busState.locations.map((location, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 p-2 rounded-md text-gray-500 font-semibold"
                  >
                    {location?.label} {location.from_time}
                  </span>
                ))}
              </div>
              <p className="text-red-500 text-sm font-semibold">
                Please include the starting and final destination aswell*
              </p>
              <CitySuggest
                label={"City"}
                handleChange={handleLocationChange}
                name={"city"}
              />

              <div className=" ">
                <label
                  for="pricing"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Kilometer
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    id="pricing"
                    name="km"
                    value={initLocation.price}
                    onChange={(e) =>
                      handleLocationChange(e.target.name, e.target.value, "")
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="12"
                  />
                </div>
              </div>
              <div className="">
                <label
                  for="l-time"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Departure time(forward)
                </label>
                <div className=" relative">
                  <input
                    type="text"
                    name="to"
                    onChange={(e) =>
                      handleLocationChange(e.target.name, e.target.value, "")
                    }
                    id="l-time"
                    value={initLocation.from_time}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="12"
                  />
                </div>
              </div>
              <div className="">
                <label
                  for="l-time"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Arrival time(backward)
                </label>
                <div className=" relative">
                  <input
                    type="text"
                    name="from"
                    onChange={(e) =>
                      handleLocationChange(e.target.name, e.target.value, "")
                    }
                    id="l-time"
                    value={initLocation.to_time}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="12"
                  />
                </div>
              </div>

              <div onClick={addLocation} className="flex justify-center mb-2">
                <div className=" flex p-2.5 border-[1px] border-green-500 rounded-md cursor-pointer">
                  <PlusOutlined className="text-green-600" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
