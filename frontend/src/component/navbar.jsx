import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

function Navbar({ transitionFinished, setLogoAnimationFinished, scrollPosition }) {
  const [logoOpacity, setLogoOpacity] = useState(0); // State to manage logo opacity
  const isScrolled = scrollPosition > 0;

  useEffect(() => {
    // Delay the logo opacity change until the navbar is fully visible
    if (transitionFinished) {
      const timer = setTimeout(() => {
        setLogoOpacity(100); // Change logo opacity to 100 after delay
        setLogoAnimationFinished(true); // Notify that the logo animation is finished
      }, 1000); // Delay of 500ms (adjust the value as needed)
     
      return () => {
        clearTimeout(timer);
      };
    }
  }, [transitionFinished, setLogoAnimationFinished]); // This effect depends on the transitionFinished prop

  return (
    <div
      className={`navbar shadow-lg bg-white text-black relative z-50 flex justify-between items-center px-5 transition-all duration-500 ${
        isScrolled ? "h-1/9" : "h-2/12"
      } ${transitionFinished ? "opacity-100" : "opacity-0"}`}
    >
      <div className="navbar-start w-1/4"></div>
      <div className="navbar-center w-1/2 flex justify-center items-center">
        <img
          className={`transition-all duration-500 ${
            logoOpacity === 100 ? "opacity-100" : "opacity-0"
          } ${isScrolled ? "w-2xs md:w-xs lg:w-2xs" : "w-xs md:w-sm lg:w-md"}`}
          src={Logo}
          alt="Eat Pizza"
        />
      </div>
      <div className="navbar-end w-1/4 flex justify-start items-start">
        <div
          className={`dropdown duration-500 ${
            logoOpacity === 100 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="bg-white border-0 p-3 hover:bg-gray-300 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-10 w-10"
            >
              <path
                stroke="#2cccd3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16"
              ></path>
              <path
                stroke="#ef3340"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12h16"
              ></path>
              <path
                stroke="#2cccd3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 18h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-md dropdown-content bg-white rounded-b-2xl z-10 w-40 p-2 font-semibold text-6xl uppercase flex justify-center items-center gmarket-medium ${
              isScrolled ? "right-0 top-21" : "right-0 top-27"
            }`}
          >
            <li>
              <a className="hover:text-[#ec3f44]">ABOUT US</a>
            </li>
            <li>
              <a className="hover:text-[#ec3f44]">MENU</a>
            </li>
            <li>
              <a className="hover:text-[#ec3f44]">BRANCHES</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
