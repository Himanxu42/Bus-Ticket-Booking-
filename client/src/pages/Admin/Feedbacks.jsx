import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import axios from "axios";

export default function Feedbacks() {
  const [data, setData] = useState([]);

  const getFeedbacks = async () => {
    const res = await axios.get("http://localhost:4269/feedback");
    console.log(res.data);
    setData(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getFeedbacks();
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
                  User
                </th>
                <th scope="col" class="px-6 py-3">
                  User email
                </th>
                <th scope="col" class="px-6 py-3">
                  Feedback
                </th>
              </tr>
            </thead>
            {data.map((f) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        {f.user.name}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {f.user.email}
                      </th>
                      <th scope="col" class="px-6 py-3">
                       <div className="border-rose-400 border-[1px] p-2 rounded-md">
                       {f.feedback}
                       </div>
                      </th>
                    </tr>
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
