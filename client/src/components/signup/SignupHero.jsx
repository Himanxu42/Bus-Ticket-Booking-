import { useState } from "react";
import axios from "axios";
import image from "../../assets/FmWkzweaMAE-tdM.jpg";
import { useNavigate } from "react-router-dom";
export default function SignupHero() {
  const [error, setError] = useState("");
  const [validationErrors, setValidationErros] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const name = e.target[1].value;
    const password = e.target[2].value;
    const phone = e.target[3].value;
    if (!email || !password || !phone || !name)
      return alert("YO! EMAIL, PASSWORD, NAME,PHONE DAL!");
    try {
      const response = await axios.post("http://localhost:4269/signup", {
        email,
        password,
        name,
        phone,
      });
      const data = response.data;
      if (response.status == 201) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("auth", true);
        alert("SignUp Success!");
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      const data = error.response.data;
      if (data.msg == "validationError") {
        setValidationErros(data.body);
      } else {
        setValidationErros([]);
      }
      setError(data.msg);
    }
  };
  return (
    <div className="flex items-center gap-2  text-lg">
      <div className="w-full  h-full hidden md:block">
        <img
          loading="lazy"
          src={image}
          alt=""
          className=" h-screen login-image "
        />
      </div>
      <div className="w-full flex justify-center fade_In md:mt-0 mt-20">
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
            <label className="text-slate-500 font-semibold italic">Name</label>
            <input
              autoComplete="off"
              className="py-3 px-2 outline-none border-blue-200 border-[1px] focus:border-blue-500 rounded-md "
              placeholder="name.."
              name="name"
              type="text"
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
          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="" className="text-slate-500 font-semibold italic">
              Phone
            </label>
            <input
              autoComplete="off"
              type="tel"
              className="py-3 px-2 outline-none border-blue-200 border-[1px] focus:border-blue-500 rounded-md "
              placeholder="phone"
              name="phone"
              required
            />
          </div>
          {error && (
            <p className="px-2 text-red-600 font-medium tracking-wider">
              {error}
            </p>
          )}
          {validationErrors.length > 0 && (
            <div>
              {validationErrors.map((error) => (
                <p key={error} className="px-2 text-red-600 tracking-wider">
                  {error}
                </p>
              ))}
            </div>
          )}
          <div className="flex justify-center">
            <button className="bg-green-400 rounded-md px-5 hover:bg-green-300 tracking-wider hover:text-gray-500 text-white p-2">
              Submit
            </button>
          </div>
          <div className="flex gap-2 ml-2 mt-2">
            <p className="text-slate-500 tracking-wider">Have an account?</p>
            <a
              href="/login"
              className="text-green-500  underline font-semibold"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
