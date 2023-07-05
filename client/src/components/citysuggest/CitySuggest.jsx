import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function CitySuggest({ handleChange, label, name }) {
  const [result, setResult] = useState([]);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const closeRef = useRef(null);
  const inputRef = useRef(null);
  async function searchBuses(search) {
    if (!search) {
      setResult([]);
      return;
    }
    try {
      const res = await axios.post("http://localhost:4269/search/city", {
        search: search,
      });
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(active);
  function selectedOption(id, label) {
    handleChange(name, id, label);
  }

  return (
    
      <div
        ref={closeRef}
        tabIndex={-1}
        onBlur={(e) => {
          const nextFocusElement = e.relatedTarget;
          if (
            nextFocusElement !== closeRef.current &&
            nextFocusElement !== inputRef.current
          ) {
            setActive(false);
          }
        }}
        onFocus={() => {
          setActive(true);
        }}
        className="relative "
      >
        <label
          for="last_name"
          className="block mb-2 text-sm font-medium text-gray-900 capitalize -z-20"
        >
          {label}
        </label>
        <input
          onChange={(e) => {
            setValue(e.target.value);
            searchBuses(e.target.value);
          }}
          value={value}
          type="text"
          ref={inputRef}
          id="last_name"
          name={name}
          className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Guwahati"
          required
          autoComplete="off"
        />
        {active && result.length > 0 && (
          <div className="overflow-y-auto absolute w-full z-20 select-none  max-h-36 min-h-14  rounded-md shadow-xl border-[1px] border-slate-400  left-0 bg-white">
            {result.map((r) => (
              <div
                key={r._id}
                onClick={() => {
                  console.log("hey");
                  setActive(false);
                  selectedOption(r._id, r.name);
                  setValue(r.name);
                  closeRef.current.blur();
                }}
                className="p-2 border-b-[1px] z-50 capitalize cursor-pointer hover:bg-gray-200"
              >
                {r.name}
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
