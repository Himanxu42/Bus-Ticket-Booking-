import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { Fail, Sleep, Success, convertDate } from "../../utility";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import ViewRoutes from "../ViewRoutes/ViewRoutes";
export default function BusDetails({ bus }) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [direction, setDirection] = useState(bus?.direction || "forward");
  const [date, setDate] = useState(
    bus?.nextDate && convertDate(new Date(bus.nextDate).toLocaleDateString())
  );
  console.log(date);
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(`http://localhost:4269/bus/${bus._id}`, {
        date: date,
        direction: direction,
      });
      if (res.status == 200) {
        Success("Updated");
        await Sleep(1000);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Fail(error?.response?.data.msg || error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:4269/bus/${bus._id}`);
      if (res.status == 200) {
        Success("Deleted!");
        await Sleep(1000);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      Fail(error?.response?.data.msg || error.message);
    }
  };
  return (
    <>
      {open && <ViewRoutes open={open} onClose={onCloseModal} bus={bus} />}
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {bus.bus_name}
        </th>
        <td class="px-6 py-4">{bus.bus_number}</td>

        <td class="px-6 py-4">{bus.bus_capacity}</td>
        <td class="px-6 py-4">{bus.phone}</td>
        <td class="px-6 py-4">
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="px-4 py-[5px] bg-gray-800 border border-[#374151] rounded-sm"
          >
            <option value={"forward"}>Forward</option>
            <option value={"backward"}>Backward</option>
          </select>
        </td>
        <td class="px-6 py-4">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="py-[5px] bg-gray-200 border border-[#374151] rounded-sm "
          />
        </td>
        <td class="px-6 py-4 space-x-3 ">
          <button
            onClick={handleUpdate}
            className="hover:text-blue-500 border border-[#374151] px-2 py-[5px] hover:border-blue-500 rounded-sm"
          >
            Update
          </button>
          <button onClick={handleDelete}>
            <DeleteOutlined className="text-rose-600 text-xl cursor-pointer" />
          </button>
          <EyeOutlined
            onClick={onOpenModal}
            className="text-green-500 text-xl cursor-pointer"
          />
        </td>
      </tr>
    </>
  );
}
