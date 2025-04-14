import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";
import outer_shell from "../assets/outer_shell.png";
import aloha from "../assets/pizza/aloha.png";
import beef_bulgogi from "../assets/pizza/beef_bulgogi.png";
import classic_cheese from "../assets/pizza/classic_cheese.png";
import h_s_bulgogi from "../assets/pizza/h_s_bulgogi.png";
import korean_sausage from "../assets/pizza/korean_sausage.png";
import pepperoni from "../assets/pizza/pepperoni.png";
import samgyeopsal from "../assets/pizza/samgyeopsal.png";
import sweet_milk from "../assets/pizza/sweet_milk.png";
import sweet_potato from "../assets/pizza/sweet_potato.png";
import sweetcorn_cheese from "../assets/pizza/sweetcorn_cheese.png";

const Section_3 = React.memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [resetPosition, setResetPosition] = useState(false);

  const pizzaSlides = useMemo(
    () => [
      { import_name: classic_cheese, name: "Classic\nCheese" },
      { import_name: sweet_milk, name: "Sweet\nMilk" },
      { import_name: aloha, name: "Aloha" },
      { import_name: sweet_potato, name: "Sweet\nPotato" },
      { import_name: pepperoni, name: "Pepperoni" },
      { import_name: sweetcorn_cheese, name: "Sweet Corn\nCheese" },
      { import_name: beef_bulgogi, name: "Beef\nBulgogi" },
      { import_name: h_s_bulgogi, name: "Hot & Spicy\nBulgogi" },
      { import_name: korean_sausage, name: "Korean\nSausage" },
      { import_name: samgyeopsal, name: "Samgyeopsal" },
    ],
    []
  ); // Memoize the array to avoid unnecessary re-renders

  const handleTransition = (swiper) => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex(swiper.realIndex);
        setResetPosition(true);
        setTimeout(() => {
          setTransitioning(false);
          setResetPosition(false);
        }, 100);
      }, 500);
    }
  };

  // Ensure activeIndex is within bounds
  const currentSlide = pizzaSlides[activeIndex] || pizzaSlides[0];

  return (
    <>
      <div
        className="h-8/9 p-10 bg-white w-full text-black bg-cover bg-center relative flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${home_logo_swirl})` }}
      >
        <div className="flex relative justify-center items-end w-full h-1/2">
          <img
            src={outer_shell}
            alt="Outer Shell"
            className={`relative ${
              transitioning
                ? "left-1/4"
                : resetPosition
                ? "left-1/8"
                : "left-1/8"
            } z-10 w-1/2 rounded-4xl transition-all duration-500 ease-in-out`}
          />
          <img
            src={currentSlide.import_name}
            alt={currentSlide.name}
            className={`relative ${
              transitioning
                ? "right-1/4"
                : resetPosition
                ? "right-1/8"
                : "right-1/8"
            } z-9 w-1/2 rounded-4xl transition-all duration-500 ease-in-out`}
          />
        </div>

        <div className="flex flex-wrap relative justify-start items-start w-full h-1/2 gap-5">
          <div className="h-1/2 flex relative w-full">
            <Swiper
              onSlideChange={handleTransition}
              modules={[Autoplay, Pagination]}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              spaceBetween={10}
              watchOverflow={true}
              autoplay={{
                delay: 3000, // 3000ms = 3 seconds
                disableOnInteraction: false, // Prevent stopping autoplay after user interaction
              }}
              className="mySwiper"
            >
              {pizzaSlides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="h-full w-full swiper-slide-custom group esamanru-bold text-xl md:text-3xl lg:!text-5xl flex justify-center items-center transition-all duration-300"
                >
                  <span className="gap-2 md:gap-5 lg:gap-10 uppercase group-[.swiper-slide-active]:scale-125 h-full w-full flex flex-col justify-center items-center text-center">
                    <div className="w-full flex justify-center items-center text-outline-swiper-top">
                      <span>{slide.name.split("\n")[0]}</span>
                    </div>

                    <div className="w-full flex justify-center items-center text-outline-swiper-bottom">
                      <span>{slide.name.split("\n")[1]}</span>
                    </div>
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="h-1/2 flex flex-col relative w-full justify-center items-center gap-5">
            <p className="w-1/2 text-center text-xl gmarket-meium text-[#2cccd3]">
              Nullam congue neque id tellus auctor, eu porta felis ultrices.
              Vestibulum sed ligula risus. Donec a tempus mi. Vestibulum et enim
              cursus, congue odio sit amet, volutpat eros.
            </p>
            <div className="flex flex-row gap-10 justify-center items-center">
              <button className="text-white !font-semibold !text-xl hover:text-[#2cccd3] gmarket-medium bg-[#2cccd3] px-5 py-3 rounded-full border-6 border-white hover:bg-white hover:border-[#2cccd3]">
                <p className="">OUR MENU</p>
              </button>
              <button className="text-white !font-semibold !text-xl hover:text-[#ef3340] gmarket-medium bg-[#ef3340] px-5 py-3 rounded-full border-6 border-white hover:bg-white hover:border-[#ef3340]">
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Section_3;
