import React, { useEffect, useRef, useMemo, useState } from "react";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ep_gc from "../assets/stores/ep_gc.png";
import ep_moa from "../assets/stores/ep_moa.png";
import ep_smne from "../assets/stores/ep_smne.png";

function Section_5() {
  const tickerItems = Array(10).fill("BRANCHES");
  const tickerRef1 = useRef(null);
  const tickerRef2 = useRef(null);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);
  const positionRef1 = useRef(0);
  const positionRef2 = useRef(0);
  const speed = 1; // pixels per frame

  const storeSlides = useMemo(
    () => [
      {
        import_name: ep_gc,
        name: "GRAND\nCENTRAL",
        floor: "UPPER GROUND LEVEL",
        contact_number: "0920-966-5120",
        operating_hours: "7AM - 10PM (weekdays)\n7AM - 10PM (weekends)",
      },
      {
        import_name: ep_moa,
        name: "MALL OF\nASIA",
        floor: "3RD FLOOR, NORTH\nENTERTAINMENT MALL",
        contact_number: "0998-847-9489",
        operating_hours: "8AM - 11PM",
      },
      {
        import_name: ep_smne,
        name: "SM NORTH\nEDSA",
        floor: "2ND FLOOR, ANNEX BUILDING",
        contact_number: "0998-965-2235",
        operating_hours: "10AM - 10PM",
      },
      {
        import_name: ep_gc,
        name: "GRAND\nCENTRAL",
        floor: "UPPER GROUND LEVEL",
        contact_number: "0920-966-5120",
        operating_hours: "7AM - 10PM (weekdays)\n7AM - 10PM (weekends)",
      },
      {
        import_name: ep_moa,
        name: "MALL OF\nASIA",
        floor: "3RD FLOOR, NORTH\nENTERTAINMENT MALL",
        contact_number: "0998-847-9489",
        operating_hours: "8AM - 11PM",
      },
      {
        import_name: ep_smne,
        name: "SM NORTH\nEDSA",
        floor: "2ND FLOOR, ANNEX BUILDING",
        contact_number: "0998-965-2235",
        operating_hours: "10AM - 10PM",
      },
    ],
    []
  ); // Memoize the array to avoid unnecessary re-renders

  useEffect(() => {
    const ticker1 = tickerRef1.current;
    const ticker2 = tickerRef2.current;
    if (!ticker1 || !ticker2) return;

    const tickerWidth1 = ticker1.scrollWidth / 2;
    const tickerWidth2 = ticker2.scrollWidth / 2;

    function animate1() {
      positionRef1.current -= speed;
      if (positionRef1.current <= -tickerWidth1) {
        positionRef1.current = 0;
      }
      ticker1.style.transform = `translateX(${positionRef1.current}px)`;
      animationRef1.current = requestAnimationFrame(animate1);
    }

    function animate2() {
      positionRef2.current += speed;
      if (positionRef2.current >= 0) {
        positionRef2.current = -tickerWidth2;
      }
      ticker2.style.transform = `translateX(${positionRef2.current}px)`;
      animationRef2.current = requestAnimationFrame(animate2);
    }

    animationRef1.current = requestAnimationFrame(animate1);
    animationRef2.current = requestAnimationFrame(animate2);

    return () => {
      cancelAnimationFrame(animationRef1.current);
      cancelAnimationFrame(animationRef2.current);
    };
  }, [speed]);

  const renderTickerItems = (fontSizeClass, textColorClass) =>
    [...tickerItems, ...tickerItems].map((item, index) => (
      <span
        key={index}
        className={`flex-none mr-12 font-bold uppercase ${fontSizeClass} ${textColorClass} esamanru-bold`}
      >
        {item}
      </span>
    ));

  return (
    <div
      className="relative h-full w-full bg-cover bg-center flex flex-col justify-center items-center space-y-4 overflow-hidden"
      style={{ backgroundImage: `url(${home_logo_swirl})` }}
    >
      <div className="absolute top-5 w-[110%] rotate-[350deg] -space-y-10">
        {/* Ticker 1 */}
        <div className="overflow-hidden  opacity-50">
          <div
            ref={tickerRef1}
            className="flex w-max will-change-transform gap-20"
          >
            {renderTickerItems("text-[15rem]/55", "text-outline-ticker-2")}
          </div>
          <div
            ref={tickerRef2}
            className="flex w-max will-change-transform gap-10"
          >
            {renderTickerItems("text-[5rem]", "text-[#2cccd3]")}
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col relative w-full justify-center items-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          watchOverflow={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {storeSlides.map((store, index) => (
            <SwiperSlide
              key={index}
              className="group esamanru-bold text-xl md:text-3xl lg:!text-5xl flex justify-center items-center"
            >
              <span className="w-full h-full flex justify-center items-center gap-10 transition-transform duration-300 hover:scale-[1.05]">
                <div
                  className={`
                            w-1/2 
                            rotate-360
                            !object-contain 
                            shadow-[-15px_20px_0px_rgba(0,0,0,0.1)] 
                            rounded-4xl
                            ml-10 
                            transition-all duration-500 ease-in-out
                            group-[.swiper-slide-active]:rotate-350
                            group-[.swiper-slide-active]:ml-0
                            group-[.swiper-slide-active]:scale-125
                            hover:rotate-350
                          `}
                >
                  <img
                    className="
                            rounded-4xl"
                    src={store.import_name}
                    alt={"EAT PIZZA" + store.name}
                  />
                </div>

                <div className="absolute -right-10 w-1/2 text-center z-10 !object-contain border rounded-4xl opacity-0 scale-95 pointer-events-none transition-all duration-500 ease-in-out group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:pointer-events-auto group-[.swiper-slide-active]:relative flex flex-col gap-5">
                  <p className="text-[#ef3340] text-5xl text-nowrap">{store.name}</p>
                  <div className="flex flex-col text-[#2cccd3] text-xl ">
                    <p>{store.floor}</p>
                    <p>{store.contact_number}</p>
                    <p>{store.operating_hours}</p>
                  </div>
                </div>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Section_5;
