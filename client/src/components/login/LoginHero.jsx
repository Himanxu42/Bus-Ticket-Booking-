import { useState } from "react";
import image from "../../assets/FmWkzweaMAE-tdM.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LoginHero() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email || !password) return alert("YO! EMAIL AUR PASSWORD DAL!");
    try {
      const response = await axios.post(
        "http://localhost:4269/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (response.status == 200) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("auth", true);
        localStorage.setItem("role", data.role);
        window.location.href = "/";
      }
    } catch (error) {
      const errorMsg = error.response.data.msg;
      setError(errorMsg);
    }
  };
  return (
    <div className="flex items-center gap-2  text-lg">
      <div className="w-full  h-full hidden md:block">
        <img
          loading="lazy"
          src={image}
          alt=""
          className=" h-screen login-image"
        />
      </div>
      <div className="w-full flex justify-center fade_In md:mt-0 mt-36">
        <form
          onSubmit={handleSubmit}
          className=" w-[90%] lg:w-[80%] bg-slate-50 p-3 rounded-md"
        >
          <div className="w-full flex flex-col p-2 gap-2">
            <label className="text-slate-500 font-semibold italic">Email</label>
            <input
              autoComplete="off"
              className="py-3 px-2 outline-none border-blue-200 border-[1px] focus:border-blue-500 rounded-md "
              type="email"
              placeholder="email"
              name="email"
              required
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="" className="text-slate-500 font-semibold italic">
              Password
            </label>
            <input
              autoComplete="off"
              className="py-3 px-2 outline-none border-blue-200 border-[1px] focus:border-blue-500 rounded-md "
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </div>
          {error && <p className="px-2 text-red-600 font-medium">{error}</p>}
          <div className="flex justify-center">
            <button className="bg-green-400 rounded-md px-5 hover:bg-green-300 tracking-wider hover:text-gray-500 text-white p-2">
              Login
            </button>
          </div>
          <div className="flex gap-2 ml-2 mt-2">
            <p className="text-slate-500 tracking-wider">
              Dont have an account?
            </p>
            <a
              href="/signup"
              className="text-cyan-700  underline font-semibold"
            >
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
