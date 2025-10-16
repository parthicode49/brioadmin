import React, { useState, useEffect,useMemo } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
  const location=useLocation()
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };
useMemo(()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
},[location])
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="scroll-to-top"
        onClick={scrollTop}
        style={{
          display: showScroll ? "block" : "none",
        }}
      >
        <i className="ri-arrow-up-line"></i>
      </div>
    </>
  );
};

export default ScrollToTop;
