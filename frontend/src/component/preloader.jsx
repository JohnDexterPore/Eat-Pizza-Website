import { useState, useEffect, useRef } from "react";
import epLoader from "../assets/preloader/ep_loader.mp4";

const Preloader = ({ onTransitionFinished, loop }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeInSecondText, setFadeInSecondText] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true); // New state for video loading

  const videoRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );

    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        if (loop) {
          video.play();
        } else {
          setShowVideo(false);
          setShowContent(true);

          setTimeout(() => {
            if (firstTextRef.current) {
              firstTextRef.current.style.maxWidth = "100%";
            }

            setTimeout(() => {
              setFadeInSecondText(true);
            }, 1000);

            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => {
                setIsPlaying(false);
                if (onTransitionFinished) {
                  onTransitionFinished();
                }
              }, 500);
            }, 2000);
          }, 0);
        }
      };

      video.addEventListener("ended", handleVideoEnd);
      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [onTransitionFinished, loop]);

  if (!isPlaying) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white overflow-y-scroll w-screen z-100 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Spinner Loader while video loads */}
      {showVideo && isVideoLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-12 h-12 border-4 border-[#2cccd3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showVideo && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onCanPlayThrough={() => setIsVideoLoading(false)} // Hide loader when video is ready
          >
            <source src={epLoader} type="video/mp4" />
          </video>
        </div>
      )}

      {showContent && (
        <div className="h-[100dvh] pt-35 bg-cover bg-center w-full flex flex-col gap-30 justify-center items-center">
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
