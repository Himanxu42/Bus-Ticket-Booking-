import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BusDetails from "../../components/BusDetails/BusDetails";

function AllUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  


  const getBus = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:4269/buses");
    console.log(res.data);
    setData(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getBus();
  }, []);

  return (
    
    <div className="flex h-screen overflow-hidden ">
    
      <AdminSidebar />
      <div className="flex justify-center bg-gray-800 w-full">
        <div class="relative overflow-x-auto w-full">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Bus name
                </th>
                <th scope="col" class="px-6 py-3">
                  Bus Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Bus Capacity
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Direction
                </th>
                <th scope="col" class="px-6 py-3">
                  Next Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {data.map((bus) => {
              return (
                <>
                  <tbody>
                   <BusDetails bus={bus}/>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
