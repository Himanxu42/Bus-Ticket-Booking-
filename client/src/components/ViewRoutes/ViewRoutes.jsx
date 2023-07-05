import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function ViewRoutes({ open, onClose, bus }) {
  console.log(bus);
  return (
    <div>
      <Modal open={open} onClose={onClose} center>
        <h2 className="text-xl text-gray-500 p-2 font-bold">Bus Routes</h2>
        <div className="flex justify-center bg-gray-200 w-full">
          <div class="relative overflow-x-auto w-full">
            <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">
              <thead class="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    City
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Depature(Forwards)
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Arrival(Backwards)
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Distance
                  </th>
                </tr>
              </thead>

              <tbody>
                {bus.locations.map((data) => {
                  return (
                    <>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400"
                        >
                          {data?.city.name}
                        </th>
                        <td class="px-6 py-4">{data.to}</td>

                        <td class="px-6 py-4">{data.from}</td>
                        <td class="px-6 py-4">{data.km}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewRoutes;
