import { useState } from "react";
import logo from "../assets/react.svg";
import img from "../assets/ems.png";
import JoinForm from "./JoinForm";
import LoginForm from "./LoginForm";

export default function GettingStarted() {
  const [formType, setFormType] = useState(null);
  // null → default text, "engineer" → SE form, "internee" → Internee form

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 bg-[#fff] py-8 px-8 rounded-sm shadow-lg w-[90vw] lg:w-[60vw] h-[90vh] md:h-[80vh]">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center gap-10 w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-gray-300 pr-1 h-[22vh] md:h-[70vh]">
        <img src={img} alt="company" className="w-[30vw] md:w-auto h-[20vh] md:h-[40vh]" />
      </div>

      {/* Right side */}
      {formType === null && (
        <div className="flex flex-col items-center justify-center gap-6 w-full md:w-1/2">
          <img src={logo} alt="company" className="w-20" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            aperiam vero omnis tenetur pariatur aspernatur.
          </p>
          <div className="flex flex-col items-center justify-center w-full">
            <button
              onClick={() => setFormType("engineer")}
              className="border-gray-400 border-2 bg-white rounded-3xl text-center p-1 w-full mb-3"
            >
              Join as a Software Engineer
            </button>
            <button
              onClick={() => setFormType("internee")}
              className="border-gray-400 border-2 rounded-3xl text-center p-1 w-full"
            >
              Join as an Internee
            </button>
            <button className="text-gray-600 text-sm mt-1 "
            onClick={() => setFormType("login")}>Already joined? <p className="underline inline">Login</p></button>
          </div>
        </div>
      )}

      {formType === "engineer" && (
        <JoinForm type="engineer" setFormType={setFormType} />
      )}

      {formType === "internee" && (
        <JoinForm type="internee" setFormType={setFormType} />
      )}

      {formType === "login" && (
        <LoginForm setFormType={setFormType} />
      )}
    </div>
  );
}
