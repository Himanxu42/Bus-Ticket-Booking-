import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fail, Sleep, Success } from "../../utility";
import Modal from "react-responsive-modal";
import EditCityModal from "./EditCityModal";

export default function AddCities() {
  const [cities, setCities] = useState([]);
  const [c, setCity] = useState({});
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const handleSumit = async (e) => {
    e.preventDefault();
    if (!name) return alert("enter a name");
    try {
      const res = await axios.post("http://localhost:4269/city", {
        name: name,
      });
      if (res.status == 200) {
        alert("success");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data.msg || error?.message);
    }
  };
  useEffect(() => {
    async function getCities() {
      try {
        const res = await axios.get("http://localhost:4269/city");
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, []);
  async function deleteCity(id) {
    try {
      const res = await axios.delete(`http://localhost:4269/city/${id}`);
      if (res.status == 200) {
        Success("Deleted city!");
        await Sleep(1000);
        window.location.reload();
      }
    } catch (error) {
      Fail(error?.response.data.msg || error.message);
    }
  }
  return (
    <div className="flex h-screen overflow-hidden ">
      <AdminSidebar />
      {open && (
        <EditCityModal open={open} onClose={() => setOpen(false)} city={c} />
      )}
      <div className="w-full overflow-y-auto  flex flex-grow">
        <div className="flex   mt-10 w-full justify-evenly">
          <form onSubmit={handleSumit} className="flex flex-col gap-2">
            <input
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-500 w-72 py-2 px-3 rounded-full text-white"
              placeholder="chennai"
            />
            <button className="bg-emerald-400 rounded-full py-2 text-white font-semibold">
              Add
            </button>
          </form>
          <div>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      City name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Created
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {city.name}
                      </th>
                      <td class="px-6 py-4">
                        {new Date(city.createdAt).toLocaleDateString()}
                      </td>
                      <td class="px-6 py-4 space-x-3">
                        <button onClick={() => deleteCity(city._id)}>
                          <DeleteOutlined className="text-rose-600 text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setOpen(true);
                            setCity(city);
                          }}
                        >
                          <EditOutlined className="text-cyan-500 text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
