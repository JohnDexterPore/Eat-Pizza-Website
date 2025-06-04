import { useState, useEffect, useRef } from "react";
import Preloader from "./component/preloader.jsx";
import Navbar from "./component/navbar.jsx";
import Section_1 from "./component/section_1.jsx";
import Section_2 from "./component/section_2.jsx";
import Section_3 from "./component/section_3.jsx";
import Section_4 from "./component/section_4.jsx";
import Section_5 from "./component/section_5.jsx";
import Section_6 from "./component/section_6.jsx";

import classic_cheese from "./assets/pizza/classic_cheese.png";
import sweet_milk from "./assets/pizza/sweet_milk.png";
import aloha from "./assets/pizza/aloha.png";
import sweet_potato from "./assets/pizza/sweet_potato.png";
import pepperoni from "./assets/pizza/pepperoni.png";
import sweetcorn_cheese from "./assets/pizza/sweetcorn_cheese.png";
import beef_bulgogi from "./assets/pizza/beef_bulgogi.png";
import h_s_bulgogi from "./assets/pizza/h_s_bulgogi.png";
import korean_sausage from "./assets/pizza/korean_sausage.png";
import samgyeopsal from "./assets/pizza/samgyeopsal.png";

import home_logo_swirl from "./assets/bg_image_swirl.jpg";
import outer_shell from "./assets/outer_shell.png";
import home_logo from "./assets/bg_image.jpg";

import sliding_icons from "./assets/sliding_icons.mp4";
import sliding_text from "./assets/sliding_text.mp4";
import check from "./assets/check.mp4";
import pizza_display_1 from "./assets/pizza_display_1.jpg";
import pizza_display_2 from "./assets/pizza_display_2.jpg";
import pizza_display from "./assets/pizza_display.png";
import accent_1 from "./assets/accent_1.png";
import accent_2 from "./assets/accent_2.png";
import accent_3 from "./assets/accent_3.png";
import accent_4 from "./assets/accent_4.png";
import accent_5 from "./assets/accent_5.png";
import all_white_logo from "./assets/all_white_logo.png";

import rj_betlog from "./assets/rj_betlog1.png";
import ep_logo from "./assets/fav_icon.png";
import ep_logo_fill from "./assets/fav_icon_fill.png";
import delivery from "./assets/delivery_motor.png";
import delivery_icon from "./assets/delivery_motor_w_icon.png";
import smoke from "./assets/SmokeGIF.gif";
import grab from "./assets/grab.png";
import foodpanda from "./assets/foodpanda.png";

import ep_gc from "./assets/stores/ep_gc.png";
import ep_moa from "./assets/stores/ep_moa.png";
import ep_smne from "./assets/stores/ep_smne.png";
import animated_store from "./assets/animated_store.png";

const App = () => {
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Callback to update the transition finished state
  const handleTransitionFinished = () => {
    setTransitionFinished(true);
  };
  const [logoAnimationFinished, setLogoAnimationFinished] = useState(false);

  // State to store scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Ref for the scroll container div
  const scrollContainerRef = useRef(null);

  // List of assets to preload
  const assetsToLoad = [
    classic_cheese,
    sweet_milk,
    aloha,
    sweet_potato,
    pepperoni,
    sweetcorn_cheese,
    beef_bulgogi,
    h_s_bulgogi,
    korean_sausage,
    samgyeopsal,
    home_logo_swirl,
    outer_shell,
    home_logo,
    sliding_icons,
    sliding_text,
    check,
    pizza_display_1,
    pizza_display_2,
    pizza_display,
    accent_1,
    accent_2,
    accent_3,
    accent_4,
    accent_5,
    all_white_logo,
    rj_betlog,
    ep_logo,
    ep_logo_fill,
    delivery,
    delivery_icon,
    smoke,
    grab,
    foodpanda,
    ep_gc,
    ep_moa,
    ep_smne,
    animated_store,
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalAssets) {
          setAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        // Even if an asset fails to load, count it to avoid blocking
        loadedCount++;
        if (loadedCount === totalAssets) {
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrollPosition(scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Preloader onTransitionFinished={handleTransitionFinished} loop={!assetsLoaded} />
      <div
        className="h-screen overflow-auto scroll-container"
        ref={scrollContainerRef}
      >
        <Navbar
          transitionFinished={transitionFinished}
          setLogoAnimationFinished={setLogoAnimationFinished}
          scrollPosition={scrollPosition}
        />
        <div className="h-screen w-full relative">
          <Section_1 logoAnimationFinished={logoAnimationFinished} scrollPosition={scrollPosition} />
          <Section_2 scrollPosition={scrollPosition} />
          <Section_3 scrollPosition={scrollPosition} />
          <Section_4 scrollPosition={scrollPosition} />
          <Section_5 scrollPosition={scrollPosition} />
          <Section_6 scrollPosition={scrollPosition} />
        </div>
      </div>
    </>
  );
};

export default App;
