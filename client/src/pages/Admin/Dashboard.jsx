import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [state, setState] = useState({
    users: 0,
    buses: 0,
    cities: 0,
    bookings: 0,
  });
  useEffect(() => {
    async function getAdminStats() {
      try {
        const res = await axios.get("http://localhost:4269/admin/statistics", {
          withCredentials: true,
        });
        if (res.status == 200) {
          setState(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAdminStats();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden ">
      <AdminSidebar />
      <div className="w-full overflow-y-auto  flex flex-grow">
        <div className="flex gap-3 flex-col justify-center items-center w-full">
          <div className="flex">
            <h1 className="flex">
              Total number of{" "}
              <Link>
                <span className="font-bold m-2">USERS</span>
              </Link>
            </h1>{" "}
            :<span className="font-bold">{state.users}</span>
          </div>
          <div className="flex">
            <h1>
              Total number of{" "}
              <Link>
                <span className="font-bold m-2">BUSES</span>
              </Link>
            </h1>{" "}
            :<span className="font-bold">{state.buses}</span>
          </div>
          <div className="flex">
            <h1>
              Total number of{" "}
              <Link>
                <span className="font-bold m-2">CITIES</span>
              </Link>
            </h1>{" "}
            :<span className="font-bold">{state.cities}</span>
          </div>
          <div className="flex">
            <h1>
              Total number of{" "}
              <Link>
                <span className="font-bold m-2">BOOKINGS</span>
              </Link>
            </h1>{" "}
            :<span className="font-bold">{state.bookings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
