import axios from "axios";
import { useState, useRef } from "react";

export default function InputField({
  placeholder,
  name,
  Icon,
  states,
  handleChange,
}) {
  const [clicked, setClicked] = useState(false);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const closeRef = useRef(null);
  function handleFocus() {
    setActive(true);
  }
  function handleBlur(e) {
    const nextFocusElement = e.relatedTarget;
    if (
      nextFocusElement !== closeRef.current &&
      nextFocusElement !== inputRef.current
    ) {
      setActive(false);
    }
  }
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
  return (
    <div
      ref={closeRef}
      className="relative"
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div
        className={` " ${
          active ? "border-cyan-600" : "border-slate-300"
        }    flex items-center gap-2 p-1 border-[1px]  input-group bg-white relative"`}
      >
        <Icon height={25} width={25} />
        <div className="relative ">
          <input
            ref={inputRef}
            type="text"
            required
            autoComplete="off"
            name={name}
            value={states[name].label}
            onChange={(e) => {
              searchBuses(e.target.value);
              handleChange(e.target.name, e.target.value, e.target.value);
            }}
            className="w-56 pt-5 capitalize  pb-2 outline-none text-slate-600 font-medium "
            id={placeholder}
          />
          <label
            htmlFor={placeholder}
            className={`text-gray-600 text-lg absolute  font-medium left-0 bottom-3   transition-all duration-500 ease-linear  ${
              active || states[name] ? "move-up" : ""
            } `}
          >
            {placeholder}
          </label>
        </div>
      </div>
      {active && result.length > 0 && (
        <div className="overflow-y-auto w-full absolute  z-20 select-none  max-h-36 min-h-14  rounded-md shadow-xl border-[1px] border-slate-400   left-0 bg-white">
          {result.map((r) => (
            <div
              key={r._id}
              onClick={() => {
                console.log("hey");
                setActive(false);
                handleChange(name, r._id, r.name);
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
