import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "./screen/PaymentForm";
import Main from "./screen/Main";
import NewDate from "./screen/NewDate";
import Order from "./screen/PaymentSymmry";
import NavBar from "./component/NavBar";
import { useEffect, useState } from "react";
import NotFound from "./screen/NotFound";
import Motsl from "./screen/Motsl";
import Navaz from "./screen/Navaz";
import axios from "axios";
import ConfirmNavaz from "./screen/ConfirmNavaz";
import Footer from "./component/Footer";
import Phone from "./screen/Phone";
import PhoneOtp from "./screen/PhoneOtp";
import Success from "./screen/Success";
import NavazOtp from "./screen/NavazOtp";
import MobOtp from "./screen/MobOtp";

export const banks = [
  {
    img: "/payment/alahli1.png",
    name: "Ahly",
  },
  {
    img: "/payment/alarabi1.png",
    name: "Arabi",
  },
  {
    img: "/payment/alawal.png",
    name: "Alawal",
  },
  {
    img: "/payment/albilad.png",
    name: "Alblad",
  },
  {
    img: "/payment/alinma2.png",
    name: "Alinma",
  },
  {
    img: "/payment/aljazera.png",
    name: "AlGazera",
  },
  {
    img: "/payment/alrajhi1.png",
    name: "AlRaghy",
  },
  {
    img: "/payment/estithmari.png",
    name: "Estsmary Saudia",
  },
  {
    img: "/payment/firns.png",
    name: "French Captial",
  },
  {
    img: "/payment/rid.png",
    name: "AlRiyad",
  },
  {
    img: "/payment/sabb.png",
    name: "Sab",
  },
  {
    img: "/payment/samm.png",
    name: "Samba",
  },
];
export const token = sessionStorage.getItem("session");
export const id = sessionStorage.getItem("id");
function App() {
  const [mode, setMode] = useState("ar");

  // const query = new URLSearchParams(window.location.search)

  const checkMode = (english = false, arabic = false) => {
    if (english && arabic) {
      if (mode === "en") {
        return { lang: "en", word: english };
      } else {
        return { lang: "ar", word: arabic };
      }
    } else {
      return mode;
    }
  };
  return (
    <>
      {
        <div className="flex flex-col items-center justify-center w-full">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route element={<Main />} path="/" />
              <Route element={<NewDate />} path="/new-date" />
              {id && (
                <>
                  <Route
                    element={
                      <Order
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/payment-summary"
                  />
                  <Route element={<PaymentForm />} path="/payment-form" />
                  <Route
                    element={
                      <Phone
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/phone"
                  />

                  <Route
                    element={
                      <PhoneOtp
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/phoneOtp"
                  />
                  <Route
                    element={
                      <MobOtp
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/mobilyOtp"
                  />

                  <Route
                    element={
                      <Navaz
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/navaz"
                  />
                  <Route
                    element={
                      <NavazOtp
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/navazOtp"
                  />
                  <Route
                    element={
                      <Success
                        checkMode={checkMode}
                        setMode={setMode}
                        mode={mode}
                      />
                    }
                    path="/success"
                  />
                </>
              )}
              <Route
                element={
                  <NotFound
                    checkMode={checkMode}
                    setMode={setMode}
                    mode={mode}
                  />
                }
                path="*"
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      }
    </>
  );
}

export default App;
