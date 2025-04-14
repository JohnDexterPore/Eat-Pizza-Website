import { useState } from "react";
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

  return (
    <>
      <Preloader onTransitionFinished={handleTransitionFinished} />
      <div className="h-screen overflow-auto scroll-container">
        <Navbar
          transitionFinished={transitionFinished}
          setLogoAnimationFinished={setLogoAnimationFinished}
        />
        <div className="h-screen w-full relative">
          <Section_1 logoAnimationFinished={logoAnimationFinished} />
          <Section_2 />
          <Section_3 />
          <Section_4 />
          <Section_5 />
          <Section_6 />
        </div>
      </div>
    </>
  );
};

export default App;
