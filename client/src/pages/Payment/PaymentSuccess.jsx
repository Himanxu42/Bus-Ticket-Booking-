import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import axios from "axios";

export default function PaymentSuccess() {
  useEffect(() => {
    async function updatePayment() {
      try {
        await axios.post(
          "http://localhost:4269/booking",
          {},
          { withCredentials: true }
        );
      } catch (error) {}
    }
    updatePayment();
  }, []);
  return (
    <>
      <div className=" h-screen ">
        <Navbar />
        <h1 className="text-3xl text-emerald-600 mt-20 font-semibold text-center">
          Payment was Successfull
        </h1>
      </div>
    </>
  );
}
