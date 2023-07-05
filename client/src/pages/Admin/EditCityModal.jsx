import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Fail, Sleep, Success } from "../../utility";
import axios from "axios";

export default function EditCityModal({ open, onClose, city }) {
  const [name, setName] = useState(city.name);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (name == "") {
        Fail("Input missing failed!");
      }
      const res = await axios.patch(
        `http://localhost:4269/city/${city._id}`,
        {
          name,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        Success("Updated successfully!");
        await Sleep(1000);
        window.location.reload();
      }
    } catch (error) {
      Fail(error?.response.data.msg || error.message);
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-5">
        <div>
          <h1 className="text-slate-600 font-semibold mb-2">
            Update city name
          </h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-60 outline-none border-[1px] p-3 rounded-md"
          />
        </div>
        <div>
          <button className="px-7 py-2 border-[2px] border-emerald-600 rounded-full mt-3 text-emerald-700 font-semibold">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
