import React, { useEffect, useState } from "react";
import home_logo from "../assets/bg_image.jpg";

function Section_1({ logoAnimationFinished }) {
  const [buttonOpacity, setButtonOpacity] = useState(0); // State to manage button opacity

  useEffect(() => {
    if (logoAnimationFinished) {
      const timer = setTimeout(() => {
        setButtonOpacity(100); // Change button opacity to 100 after delay
      }, 1000); // Delay of 1000ms (adjust the value as needed)

      return () => {
        clearTimeout(timer); // Clean up the timer
      };
    }
  }, [logoAnimationFinished]);

  return (
    <div
      className="h-full !-mt-[16.67dvh] pt-35 bg-cover bg-center w-full flex flex-col gap-30 justify-center items-center"
      style={{ backgroundImage: `url(${home_logo})` }}
    >
      <div className="flex flex-col justify-center items-center esamanru-bold gap-5">
        <h1 className="text-6xl lg:text-8xl font-bold text-outline w-full flex justify-center">
          KOREA'S ORIGINAL
        </h1>
        <h1 className="text-6xl lg:text-8xl font-bold text-white w-full flex justify-center">
          10 - INCH PIZZA
        </h1>
      </div>
      <div className="p-5">
        <button
          className={`bg-[#2cccd3] px-5 py-3 rounded-full border-b-6 border-white hover:bg-white hover:border-[#2cccd3] transition-opacity duration-1000 ${
            buttonOpacity === 100 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white font-semibold text-xl hover:text-[#2cccd3] gmarket-medium">
            ORDER NOW
          </p>
        </button>
      </div>
    </div>
  );
}

export default Section_1;
