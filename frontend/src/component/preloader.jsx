import { useState, useEffect, useRef } from "react";
import epLoader from "../assets/preloader/ep_loader.mp4";

const Preloader = ({ onTransitionFinished }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeInSecondText, setFadeInSecondText] = useState(false); // State for second text animation
  const videoRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useEffect(() => {
    // Calculate and set scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );

    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        setShowVideo(false); // Remove video
        setShowContent(true); // Show content

        // Trigger animation after video ends
        setTimeout(() => {
          if (firstTextRef.current) {
            // Set max-width dynamically to trigger the transition
            firstTextRef.current.style.maxWidth = "100%";
          }

          // After first text animation ends, fade in second text
          setTimeout(() => {
            setFadeInSecondText(true); // Trigger second text fade-in
          }, 1000); // Delay before second text fade-in

          // After second text animation ends, start fading out preloader
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsPlaying(false); // Remove preloader
              if (onTransitionFinished) {
                onTransitionFinished(); // Notify that the transition is finished
              }
            }, 500); // Match with fade-out transition
          }, 2000); // Wait for second text animation before fade out
        }, 0); // No delay before showing content
      };

      video.addEventListener("ended", handleVideoEnd);
      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [onTransitionFinished]);

  if (!isPlaying) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white overflow-y-scroll w-screen z-100 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {showVideo && (
        <div>
          <video ref={videoRef} autoPlay playsInline muted>
            <source src={epLoader} type="video/mp4" />
          </video>
        </div>
      )}

      {showContent && (
        <div className="h-full pt-35 bg-cover bg-center w-full flex flex-col gap-30 justify-center items-center">
          <div className="flex flex-col justify-center items-center esamanru-bold gap-5 text-center">
            <h1
              ref={firstTextRef}
              id="text_header"
              className="text-3xl md:text-6xl lg:text-8xl/30 font-bold text-outline-loader flex justify-center header-loader"
            >
              KOREA'S ORIGINAL
            </h1>
            <h1
              ref={secondTextRef}
              className={`text-3xl md:text-6xl lg:text-8xl font-bold text-[#2cccd3] w-full flex justify-center opacity-0 transition-opacity duration-1000 ${
                fadeInSecondText ? "opacity-100" : "opacity-0"
              }`}
            >
              10 - INCH PIZZA
            </h1>
          </div>
          <div className="p-5 opacity-0">
            <button className="bg-[#2cccd3] px-5 py-3 rounded-full border-b-6 border-white hover:bg-white hover:border-[#2cccd3]">
              <p className="text-white font-semibold text-xl gmarket-medium">
                ORDER NOW
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preloader;
