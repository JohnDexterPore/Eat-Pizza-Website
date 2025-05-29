import React, { useEffect, useRef } from "react";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";

function Section_5() {
  const tickerItems = Array(10).fill("BRANCHES");
  const tickerRef1 = useRef(null);
  const tickerRef2 = useRef(null);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);
  const positionRef1 = useRef(0);
  const positionRef2 = useRef(0);
  const speed = 1; // pixels per frame

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
        <div className="overflow-hidden">
          <div
            ref={tickerRef1}
            className="flex w-max will-change-transform gap-20"
          >
            {renderTickerItems(
              "text-[15rem]/55",
              "text-outline-ticker-2"
            )}
          </div>
          <div
            ref={tickerRef2}
            className="flex w-max will-change-transform gap-10"
          >
            {renderTickerItems("text-[5rem]", "text-[#2cccd3]")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section_5;
