import React, { useState, useRef, useEffect } from "react";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";
import rj_betlog from "../assets/rj_betlog.png";
import ep_logo from "../assets/fav_icon.png";
import ep_logo_fill from "../assets/fav_icon_fill.png";
import delivery from "../assets/delivery_motor.png";
import delivery_icon from "../assets/delivery_motor_w_icon.png";
import smoke from "../assets/SmokeGIF.gif";

function Section_4({ scrollPosition }) {
  const [deliverySrc, setDeliverySrc] = useState(delivery);
  const [isMoving, setIsMoving] = useState(false);
  const deliveryRef = useRef(null);
  const epLogosRef = useRef([]);
  const lastXRef = useRef(0);
  const prevCenterRef = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const section = document.querySelector(".section-4-container");
    const deliveryEl = deliveryRef.current;
    if (!section || !deliveryEl) return;

    const motorWidth = deliveryEl.offsetWidth;
    const totalTravel = window.innerWidth + motorWidth;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    const middleThreshold = window.innerWidth / 2;

    const animate = () => {
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const sectionProgress = Math.min(
        1,
        Math.max(0, (scrollPosition - sectionOffsetTop) / sectionHeight)
      );

      const targetX = motorWidth - totalTravel * sectionProgress;
      const currentX = lerp(lastXRef.current, targetX, 0.1);

      deliveryEl.style.transform = `translateX(${currentX}px)`;

      const hasMoved = Math.abs(currentX - lastXRef.current) > 0.5;
      if (hasMoved) {
        if (!isMoving) setIsMoving(true);

        const motorCenterX =
          deliveryEl.getBoundingClientRect().left + motorWidth / 2;

        if (
          motorCenterX < middleThreshold &&
          prevCenterRef.current >= middleThreshold
        ) {
          setDeliverySrc(delivery_icon);
        } else if (
          motorCenterX >= middleThreshold &&
          prevCenterRef.current < middleThreshold
        ) {
          setDeliverySrc(delivery);
        }

        prevCenterRef.current = motorCenterX;
        lastXRef.current = currentX;
      } else {
        if (isMoving) {
          setTimeout(() => {
            setIsMoving(false);
          }, 800); // match this to CSS fade time
        }
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [scrollPosition, isMoving]);

  useEffect(() => {
    if (!epLogosRef.current) return;

    // Adjust this factor to control how fast the logos spin with scroll
    const rotationFactor = 0.3;

    epLogosRef.current.forEach((logo, index) => {
      if (logo) {
        const baseAngle = [306, 285, 80, 0][index];
        const rotation = baseAngle + scrollPosition * rotationFactor;
        logo.style.transform = `rotate(${rotation}deg)`;
      }
    });
  }, [scrollPosition]);

  return (
    <div
      className="section-4-container relative h-fit bg-white w-full text-black bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${home_logo_swirl})` }}
    >
      <img className="z-20 w-full h-auto" src={rj_betlog} alt="RJ Betlog" />

      <img
        ref={(el) => (epLogosRef.current[0] = el)}
        className="absolute z-20 h-auto w-1/10 right-0 top-0 -translate-x-[200%] -translate-y-1/2"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        ref={(el) => (epLogosRef.current[1] = el)}
        className="absolute z-20 h-auto w-1/8 left-1/4 top-0 translate-y-1/3 -translate-x-1/2"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        ref={(el) => (epLogosRef.current[2] = el)}
        className="absolute z-20 h-auto w-1/12 left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2"
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
        ref={(el) => (epLogosRef.current[3] = el)}
        className="absolute z-30 h-auto w-2/6 bottom-0 translate-y-1/2"
        src={ep_logo_fill}
        alt="EAT PIZZA LOGO"
      />

      <div className="overflow-x-auto absolute bottom-0 h-[55dvh] bg-[#2cccd3] w-full flex justify-center items-center">
        <div
          ref={deliveryRef}
          className="delivery-motor absolute z-20 h-auto w-[10%] bottom-0 right-0 flex flex-row items-end"
        >
          <img
            className={`w-full h-full origin-right ${
              isMoving ? "animate-vibrate" : ""
            }`}
            src={deliverySrc}
            alt="delivery"
          />
          {isMoving && (
            <img
              className="w-3/4 absolute left-30 top-6"
              src={smoke}
              alt="smoke"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Section_4;
