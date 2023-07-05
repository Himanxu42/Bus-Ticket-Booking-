import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import BuildingIcons from "../../components/icons/BuildingIcons";
import LeftRightIcon from "../../components/icons/LeftRightIcon";
import InputField from "./InputField";
import { isAuthenticated } from "../../helper/";
import { useNavigate } from "react-router-dom";
const initialState = {
  from: {
    value: "",
    label: "",
  },
  to: {
    value: "",
    label: "",
  },
  date: {
    value: "",
    label: "",
  },
};
export default function Home() {
  const [states, setStates] = useState(initialState);
  const navigate = useNavigate();
  function handleChange(name, value, label) {
    console.log("working");
    setStates({
      ...states,
      [name]: {
        value: value,
        label: label,
      },
    });
  }
  console.log(states);
  function handleSubmit(e) {
    e.preventDefault();
    if (!isAuthenticated())
      return navigate("/login", {
        replace: true,
      });
    navigate("/search", {
      state: {
        from: states.from,
        to: states.to,
        date: states.date,
      },
    });
  }
  return (
    <div className="home-background h-screen ">
      <Navbar />

      <div className="h-[60%]  home-hero flex justify-center items-center  ">
        <form onSubmit={handleSubmit} className="flex ">
          <InputField
            name={"from"}
            handleChange={handleChange}
            placeholder={"From"}
            states={states}
            Icon={BuildingIcons}
          />
          <div className="bg-white p-2 flex items-center cursor-pointer">
            <LeftRightIcon height={25} width={25} />
          </div>
          <InputField
            name="to"
            states={states}
            handleChange={handleChange}
            placeholder="To"
            Icon={BuildingIcons}
          />
          <input
            value={states.date.value}
            name="date"
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, e.target.value)
            }
            required
            className="border-[1px]  outline-none focus:border-cyan-600 border-slate-200 select-none"
            type="date"
          />
          <button className="bg-cyan-600 font-medium tracking-wider text-white p-2">
            Search Buses
          </button>
        </form>
      </div>
    </div>
  );
}
