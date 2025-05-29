import React from "react";
import animated_store from "../assets/animated_store.png";

function Section_6({ scrollPosition }) {
  return (
    <div className="relative h-full bg-[#2cccd3] w-full text-black bg-cover bg-center flex flex-col justify-center items-center">
      <img className="w-3/5" src={animated_store} alt="EAT PIZZA ANIMATED STORE" />
    </div>
  );
}

export default Section_6;
