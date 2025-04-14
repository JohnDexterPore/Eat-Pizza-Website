import React, { useState, useRef, useEffect } from "react";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";
import rj_betlog from "../assets/rj_betlog.png";
import ep_logo from "../assets/fav_icon.png";
import ep_logo_fill from "../assets/fav_icon_fill.png";
import delivery from "../assets/delivery_motor.png";
import delivery_icon from "../assets/delivery_motor_w_icon.png";

function Section_4() {
  const [deliverySrc, setDeliverySrc] = useState(delivery);
  const [isMoving, setIsMoving] = useState(false);
  const lastTranslateXRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    const deliveryElement = document.querySelector(".delivery-motor");

    if (!scrollContainer || !deliveryElement) return;

    const section = document.querySelector(".section-4-container");
    if (!section) return;

    const motorWidth = deliveryElement.offsetWidth;
    const totalTravel = window.innerWidth + motorWidth;

    const getTranslateXFromScroll = () => {
      const scrollPos = scrollContainer.scrollTop;
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const sectionProgress = Math.min(
        1,
        Math.max(0, (scrollPos - sectionOffsetTop) / sectionHeight)
      );

      return motorWidth - totalTravel * sectionProgress;
    };

    let currentX = getTranslateXFromScroll();
    let targetX = currentX;
    let prevX = currentX;
    deliveryElement.style.transform = `translateX(${currentX}px)`;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const middleThreshold = window.innerWidth / 2;

    const update = () => {
      targetX = getTranslateXFromScroll();
      currentX = lerp(currentX, targetX, 0.1);

      deliveryElement.style.transform = `translateX(${currentX}px)`;

      const hasMoved = Math.abs(currentX - lastTranslateXRef.current) > 0.5;

      if (hasMoved) {
        if (!isMoving) setIsMoving(true);
        lastTranslateXRef.current = currentX;

        // Detect center crossing and update image
        const motorCenterX =
          deliveryElement.getBoundingClientRect().left + motorWidth / 2;

        if (motorCenterX < middleThreshold && prevX >= middleThreshold) {
          // Crossed center going left
          setDeliverySrc(delivery_icon);
        } else if (motorCenterX >= middleThreshold && prevX < middleThreshold) {
          // Crossed center going right
          setDeliverySrc(delivery);
        }

        prevX = motorCenterX;
      } else {
        if (isMoving) setIsMoving(false);
      }

      animationFrame.current = requestAnimationFrame(update);
    };

    animationFrame.current = requestAnimationFrame(update);

    scrollContainer.addEventListener("scroll", () => {}, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", () => {});
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isMoving]);

  return (
    <div
      className="section-4-container relative h-fit bg-white w-full text-black bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${home_logo_swirl})` }}
    >
      <img className="z-20 w-full h-auto" src={rj_betlog} alt="RJ Betlog" />

      <img
        className="absolute z-20 h-auto w-1/10 right-0 top-0 -translate-x-[200%] -translate-y-1/2 rotate-[306deg]"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        className="absolute z-20 h-auto w-1/8 left-1/4 top-0 translate-y-1/3 -translate-x-1/2 rotate-[285deg]"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        className="absolute z-20 h-auto w-1/12 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-[80deg]"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />

      <div className="absolute top-1/4 left-1/3 -translate-x-[30%] -translate-y-[90%] rotate-[309deg] z-20 flex flex-col justify-center items-center">
        <h1 className="text-outline-loader text-5xl md:text-7xl lg:text-9xl esamanru-bold">
          ENJOY
        </h1>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-[#ef3340]">
          ANYTIME, ANYWHERE
        </h1>
      </div>

      <img
        className="absolute z-30 h-auto w-2/6 bottom-0 translate-y-1/2"
        src={ep_logo_fill}
        alt="EAT PIZZA LOGO"
      />

      <div className="overflow-x-auto absolute bottom-0 h-[55dvh] bg-[#2cccd3] w-full flex justify-center items-center">
        <div className="delivery-motor absolute z-20 h-auto w-1/10 bottom-0 right-0">
          <img
            className={`w-full h-auto origin-right ${
              isMoving ? "animate-vibrate" : ""
            }`}
            src={deliverySrc}
            alt="delivery"
          />
        </div>
      </div>
    </div>
  );
}

export default Section_4;
