import React, { useState, useRef, useEffect } from "react";
import home_logo_swirl from "../assets/bg_image_swirl.jpg";
import rj_betlog from "../assets/rj_betlog1.png";
import ep_logo from "../assets/fav_icon.png";
import ep_logo_fill from "../assets/fav_icon_fill.png";
import delivery from "../assets/delivery_motor.png";
import delivery_icon from "../assets/delivery_motor_w_icon.png";
import smoke from "../assets/SmokeGIF.gif";
import grab from "../assets/grab.png";
import foodpanda from "../assets/foodpanda.png";

function Section_4({ scrollPosition }) {
  const [deliverySrc, setDeliverySrc] = useState(delivery);
  const [isMoving, setIsMoving] = useState(false);
  const deliveryRef = useRef(null);
  const epLogosRef = useRef([]);
  const lastXRef = useRef(0);
  const prevCenterRef = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const deliveryEl = deliveryRef.current;
    if (!deliveryEl) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const animate = () => {
      const rect = deliveryEl.getBoundingClientRect();
      const deliveryY = rect.top;
      const viewportHeight = window.innerHeight;

      if (deliveryY >= 0 && deliveryY <= viewportHeight) {
        const progress = 1 - deliveryY / viewportHeight;
        const maxTravel = window.innerWidth + deliveryEl.offsetWidth;
        const rawX = -progress * maxTravel;
        const targetX = clamp(rawX, -maxTravel, 0);

        // Smooth movement
        const currentX = lerp(lastXRef.current, targetX, 0.1);
        deliveryEl.style.transform = `translateX(${currentX}px)`;

        // Determine if it's still moving
        const hasMoved = Math.abs(currentX - lastXRef.current) > 0.5;
        if (hasMoved) {
          if (!isMoving) setIsMoving(true);
        } else {
          if (isMoving) {
            setTimeout(() => setIsMoving(false), 800);
          }
        }

        lastXRef.current = currentX;

        // Switch delivery icon mid-screen
        const middleY = viewportHeight / 2;
        if (deliveryY < middleY && deliverySrc !== delivery_icon) {
          setDeliverySrc(delivery_icon);
        } else if (deliveryY >= middleY && deliverySrc !== delivery) {
          setDeliverySrc(delivery);
        }
      } else {
        if (isMoving) {
          setTimeout(() => setIsMoving(false), 800);
        }
      }

      animationFrame.current = requestAnimationFrame(animate);
    };
    
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [deliverySrc, isMoving]);
  
  

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
      <img className="z-20 w-[100%]" src={rj_betlog} alt="RJ Betlog" />

      <img
        ref={(el) => (epLogosRef.current[0] = el)}
        className="absolute z-20 h-auto w-1/8 right-0 top-15 -translate-x-[170%] -translate-y-1/2"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        ref={(el) => (epLogosRef.current[1] = el)}
        className="absolute z-20 h-auto w-1/6 left-1/6 top-5 -translate-y-1 -translate-x-1/2"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />
      <img
        ref={(el) => (epLogosRef.current[2] = el)}
        className="absolute z-20 h-auto w-1/10 left-1/8 top-1/2 -translate-y-3/4"
        src={ep_logo}
        alt="EAT PIZZA LOGO"
      />

      <div className="absolute top-1/4 left-1/4 -translate-x-[30%] -translate-y-[80%] rotate-[309deg] gap-3 z-20 flex flex-col justify-center items-center">
        <h1 className="text-outline-loader text-5xl md:text-7xl lg:text-[145px] esamanru-bold">
          ENJOY
        </h1>
        <h1 className="text-2xl md:text-4xl lg:text-[58px] esamanru-bold text-[#ef3340]">
          ANYTIME, ANYWHERE
        </h1>
      </div>

      <img
        className="absolute z-30 h-auto w-2/7 bottom-0 translate-y-1/2"
        src={ep_logo_fill}
        alt="EAT PIZZA LOGO"
      />

      <div className="overflow-hidden absolute bottom-0 h-[40%] bg-[#2cccd3] w-full flex flex-row justify-center items-center">
        <div className="w-full">
          <div className="w-1/2 absolute left-25 flex flex-col gap-3 items-center top-50 z-100 text-white text-3xl esamanru-light">
            <p>Order Via:</p>
            <img className="h-auto w-1/4" src={grab} alt="EAT PIZZA Grab" />
            <img
              className="h-auto w-1/3"
              src={foodpanda}
              alt="EAT PIZZA FoodPanda"
            />
          </div>
        </div>
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

          <img
            className={`w-3/4 absolute left-32 top-3 transition-opacity duration-700 ease-out ${
              isMoving ? "opacity-100" : "opacity-0"
            }`}
            src={smoke}
            alt="smoke"
          />
        </div>
      </div>
    </div>
  );
}

export default Section_4;
