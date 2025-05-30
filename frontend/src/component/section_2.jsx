import React, { useRef, useEffect, useState } from "react";
import sliding_icons from "../assets/sliding_icons.mp4";
import sliding_text from "../assets/sliding_text.mp4";
import check from "../assets/check.mp4";
import pizza_display_1 from "../assets/pizza_display_1.jpg";
import pizza_display_2 from "../assets/pizza_display_2.jpg";
import pizza_display from "../assets/pizza_display.png";
import accent_1 from "../assets/accent_1.png";
import accent_2 from "../assets/accent_2.png";
import accent_3 from "../assets/accent_3.png";
import accent_4 from "../assets/accent_4.png";
import accent_5 from "../assets/accent_5.png";
import all_white_logo from "../assets/all_white_logo.png";

function Section_2({ scrollPosition }) {
  const tickerItems = Array(10).fill({
    item1: "EASY TO EAT 10 INCH-PIZZA",
    item2: "HOT. FRESH. FAST",
  });

  const tickerRef1 = useRef(null);
  const animationRef1 = useRef(null);
  const positionRef1 = useRef(0);
  const baseSpeed = 1; // normal speed

  const speedMultiplierRef = useRef(1);
  const resetSpeedTimeoutRef = useRef(null);

  useEffect(() => {
    const ticker1 = tickerRef1.current;
    if (!ticker1) return;

    const tickerWidth1 = ticker1.scrollWidth / 2;

    function animate1() {
      // Use current speed multiplier (changes dynamically)
      positionRef1.current += baseSpeed * speedMultiplierRef.current;

      if (positionRef1.current >= 0) {
        positionRef1.current = -tickerWidth1;
      }

      ticker1.style.transform = `translateX(${positionRef1.current}px)`;
      animationRef1.current = requestAnimationFrame(animate1);
    }

    animationRef1.current = requestAnimationFrame(animate1);

    return () => {
      cancelAnimationFrame(animationRef1.current);
    };
  }, []); // run only once on mount

  // Effect to update speedMultiplier on scrollPosition change
  useEffect(() => {
    // On scrollPosition change, speed up to max 3x
    const newMultiplier = Math.min(Math.max(scrollPosition / 100, 1), 5);
    speedMultiplierRef.current = newMultiplier;

    // Clear any existing reset timeout
    if (resetSpeedTimeoutRef.current) {
      clearTimeout(resetSpeedTimeoutRef.current);
    }

    // After 1 second of no scrollPosition changes, reset multiplier to 1 (normal speed)
    resetSpeedTimeoutRef.current = setTimeout(() => {
      speedMultiplierRef.current = 1;
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (resetSpeedTimeoutRef.current) {
        clearTimeout(resetSpeedTimeoutRef.current);
      }
    };
  }, [scrollPosition]);
  

  const renderTickerItems = (fontSize1, fontSize2, color1, color2) =>
    [...tickerItems, ...tickerItems].map((item, index) => (
      <div key={index} className="flex">
        <span className="flex flex-col">
          <span
            className={`font-bold uppercase esamanru-bold ${fontSize1} ${color1}`}
          >
            {item.item1}
          </span>
          <span
            className={`font-bold uppercase esamanru-bold ${fontSize2} ${color2}`}
          >
            {item.item2}
          </span>
        </span>
        <img
          src={all_white_logo}
          alt="EAT PIZZA LOGO"
          className="rotate-90 h-[520px] w-auto"
        />
      </div>
    ));

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRefCheck = useRef(null);
  const videoRefCheck1 = useRef(null);
  const videoRefCheck2 = useRef(null);
  const checkboxSectionRef = useRef(null);
  const divisor = 30;
  let scrollTimeout = null;
  let reverseAnimationFrame = null;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const playReverse = () => {
    if (!videoRef1.current || !videoRef2.current) return;

    const step = () => {
      if (
        videoRef1.current.currentTime > 0.1 ||
        videoRef2.current.currentTime > 0.1
      ) {
        videoRef1.current.currentTime -= 0.01; // Adjust for smoothness
        videoRef2.current.currentTime -= 0.01; // Adjust for smoothness
        reverseAnimationFrame = requestAnimationFrame(step);
      } else {
        videoRef1.current.currentTime = videoRef1.current.duration; // Loop to end
        videoRef2.current.currentTime = videoRef2.current.duration; // Loop to end
        reverseAnimationFrame = requestAnimationFrame(step);
      }
    };

    cancelAnimationFrame(reverseAnimationFrame); // Stop previous animation
    reverseAnimationFrame = requestAnimationFrame(step);
  };

  const stopReverse = () => {
    cancelAnimationFrame(reverseAnimationFrame);
  };

  useEffect(() => {
    if (!videoRef1.current || !videoRef2.current) return;

    let lastScrollPosition = 0;

    if (scrollPosition > lastScrollPosition) {
      // Scrolling down - Play normally
      stopReverse();
      videoRef1.current.playbackRate = 1;
      videoRef1.current.play();
      videoRef2.current.playbackRate = 1;
      videoRef2.current.play();
    } else if (scrollPosition < lastScrollPosition) {
      // Scrolling up - Reverse playback
      videoRef1.current.pause();
      videoRef2.current.pause();
      playReverse();
    }

    // Clear previous timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Stop video when scrolling stops
    scrollTimeout = setTimeout(() => {
      if (videoRef1.current || videoRef2.current) {
        videoRef1.current.pause();
        videoRef2.current.pause();
        stopReverse();
      }
    }, 100);

    lastScrollPosition = scrollPosition;

    // Cleanup function to clear timeout on unmount
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      stopReverse();
    };
  }, [scrollPosition]);

  useEffect(() => {
    const playRate = 4;
    const observer = new IntersectionObserver(
      (entries) => {
        let hasActivated = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasActivated) {
            hasActivated = true; // Set the flag to true so it doesn't run again

            videoRefCheck.current.playbackRate = playRate;
            videoRefCheck1.current.playbackRate = playRate;
            videoRefCheck2.current.playbackRate = playRate;

            // Start the first video
            videoRefCheck.current.play();

            // Wait for the first video to finish, then play the second
            videoRefCheck.current.onended = () => {
              videoRefCheck1.current.play();

              // Wait for the second video to finish, then play the third
              videoRefCheck1.current.onended = () => {
                videoRefCheck2.current.play();
              };
            };
          } else if (!entry.isIntersecting && hasActivated) {
            // If the section goes out of view after triggering, pause the videos
            videoRefCheck.current.pause();
            videoRefCheck1.current.pause();
            videoRefCheck2.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    if (checkboxSectionRef.current) {
      observer.observe(checkboxSectionRef.current);
    }

    // Clean up observer when component unmounts
    return () => {
      if (checkboxSectionRef.current) {
        observer.unobserve(checkboxSectionRef.current);
      }
    };
  }, []);
  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className="h-fit pt-35 bg-[#2cccd3] w-full text-black bg-cover bg-center overflow-hidden relative flex justify-center items-center"
      >
        <video
          ref={videoRef1}
          className="absolute top-20 left-0 w-full h-full object-cover scale-175 rotate-2"
          src={sliding_icons}
          loop
          muted
        ></video>
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <img
            src={pizza_display}
            alt="Pizza Display"
            className="relative z-10 w-1/2 rounded-[3vw] rotate-357 shadow-[-25px_30px_0px_rgba(0,0,0,0.1)]"
          />
          <img
            src={accent_1}
            alt=""
            className="absolute w-1/11 left-150 bottom-195 z-12"
            style={{
              transform: `translate(${(mousePosition.x - 150) / divisor}px, ${
                (mousePosition.y - 195) / divisor
              }px)`,
            }}
          />
          <img
            src={accent_2}
            alt=""
            className="absolute w-1/11 left-80 bottom-130 z-12"
            style={{
              transform: `translate(${
                -(mousePosition.x - 80) / divisor // Reverse movement by flipping the direction
              }px, ${(mousePosition.y - 130) / divisor}px)`,
            }}
          />
          <img
            src={accent_3}
            alt=""
            className="absolute w-1/11 left-90 bottom-30 z-12"
            style={{
              transform: `translate(${
                (mousePosition.x - 90) / divisor // This one moves normally
              }px, -${(mousePosition.y - 30) / divisor}px)`, // Reverse vertical movement
            }}
          />
          <img
            src={accent_4}
            alt=""
            className="absolute w-1/11 left-280 bottom-35 z-12"
            style={{
              transform: `translate(${
                -(mousePosition.x - 280) / divisor // Reverse horizontal movement here too
              }px, ${(mousePosition.y - 35) / divisor}px)`,
            }}
          />
          <img
            src={accent_5}
            alt=""
            className="absolute w-1/11 left-350 bottom-40 z-12"
            style={{
              transform: `translate(${
                -(mousePosition.x - 350) / divisor // Reverse both x and y here
              }px, -${(mousePosition.y - 40) / divisor}px)`,
            }}
          />

          <div className="pt-10 relative flex flex-wrap justify-center items-center text-3xl gmarket-bold text-white gap-5">
            <div className="w-full">
              <p className="w-full flex justify-center">
                Lorem ipsum dolor&nbsp;
                <span className="text-[#ef3340]">sit amet,</span>
              </p>
              <p className="w-full flex justify-center">
                <span className="text-[#ef3340]">consectetur</span>
                &nbsp;adipiscing elit
              </p>
            </div>
            <p className="w-2/5 flex text-center text-sm gmarket-medium">
              Nullam congue neque id tellus auctor, eu porta felis ultrices.
              Vestibulum sed ligula risus. Donec a tempus mi. Vestibulum et enim
              cursus, congue odio sit amet, volutpat eros. Nullam luctus enim
              non augue commodo facilisis. Sed eu mi aliquam, porta nibh id,
              interdum arcu. Praesent id tincidunt erat, quis auctor lacus. Nam
              porttitor tellus enim, a hendrerit nisl euismod vitae. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10 h-fit bg-[#2cccd3] w-full text-black bg-cover bg-center overflow-hidden relative flex justify-center items-center">
        <div className="absolute top-56 w-[110%] rotate-[5deg] -space-y-10">
          {/* Ticker 1 */}
          <div ref={tickerRef1} className="flex w-max will-change-transform">
            {renderTickerItems(
              "text-[175px]/60",
              "text-[280px]/65",
              "text-outline-ticker-1",
              "text-outline-ticker-1"
            )}
          </div>
        </div>
        <video
          ref={videoRef2}
          className="absolute bottom-10 left-0 w-full h-full object-cover scale-175 rotate-350 invisible"
          src={sliding_text}
          loop
          muted
        ></video>
        <div className="relative flex flex-wrap justify-center items-center gap-15">
          <div className="flex justify-start items-center gap-30 w-full">
            <div className="w-1/2 flex justify-end pt-30">
              <div
                style={{ backgroundImage: `url(${pizza_display_1})` }}
                className="w-2/5 h-150 rotate-350 bg-center bg-cover rounded-[3vw] overflow-hidden shadow-[-15px_20px_0px_rgba(0,0,0,0.1)]"
              ></div>
            </div>
            <div className="w-1/2 flex justify-start pb-30">
              <div
                style={{ backgroundImage: `url(${pizza_display_2})` }}
                className="w-2/5 h-150 rotate-3 bg-center bg-cover rounded-[3vw] overflow-hidden shadow-[-15px_20px_0px_rgba(0,0,0,0.1)]"
              ></div>
            </div>
          </div>
          <div
            ref={checkboxSectionRef}
            className="pb-35 w-full flex-wrap justify-center items-center text-3xl text-white gmarket-bold"
          >
            <div className="w-full flex justify-center items-center">
              <div className="flex w-1/6">
                <video
                  ref={videoRefCheck}
                  className="top-20 left-0 w-1/5 h-full object-cover"
                  src={check}
                  muted
                ></video>
                <span className="pt-6">Lorem ipsum</span>
              </div>
              <div className="flex w-1/6">
                <video
                  ref={videoRefCheck1}
                  className="top-20 left-0 w-1/5 h-full object-cover"
                  src={check}
                  muted
                ></video>
                <span className="pt-6">Lorem ipsum</span>
              </div>
              <div className="flex w-1/6">
                <video
                  ref={videoRefCheck2}
                  className="top-20 left-0 w-1/5 h-full object-cover"
                  src={check}
                  muted
                ></video>
                <span className="pt-6">Lorem ipsum</span>
              </div>
            </div>
            <div className="w-full flex justify-center text-center p-5">
              <p className="w-2/5 text-sm gmarket-medium text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                rhoncus pellentesque elit. Aliquam sagittis leo nulla, sit amet
                tempor orci sagittis elementum. Donec varius mauris eros.
                Maecenas dictum arcu eu eleifend mattis
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section_2;
