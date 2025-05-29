import { useState, useEffect, useRef } from "react";
import Preloader from "./component/preloader.jsx";
import Navbar from "./component/navbar.jsx";
import Section_1 from "./component/section_1.jsx";
import Section_2 from "./component/section_2.jsx";
import Section_3 from "./component/section_3.jsx";
import Section_4 from "./component/section_4.jsx";
import Section_5 from "./component/section_5.jsx";
import Section_6 from "./component/section_6.jsx";

const App = () => {
  const [transitionFinished, setTransitionFinished] = useState(false);

  // Callback to update the transition finished state
  const handleTransitionFinished = () => {
    setTransitionFinished(true);
  };
  const [logoAnimationFinished, setLogoAnimationFinished] = useState(false);

  // State to store scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Ref for the scroll container div
  const scrollContainerRef = useRef(null);

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
      <Preloader onTransitionFinished={handleTransitionFinished} />
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
