import React from "react";
import "./ScrollButton.css";
import useDocumentScrollThrottled from "../services/useDocumentScrollThrottled";
import smoothscroll from "smoothscroll-polyfill";
export default function ScrollButton() {
  const [showScroll, setShowScroll] = React.useState(false);
  useDocumentScrollThrottled((callbackData) => {
    const { currentScrollTop } = callbackData;
    setShowScroll(currentScrollTop > 400);
  });
  const scrollTop = () => {
    smoothscroll.polyfill();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <img
        src="/scrollToTop.png"
        alt="Scroll up"
        className={`scrollTop`}
        onClick={scrollTop}
        style={{
          height: 40,
          width: 40,
          display: showScroll ? "flex" : "none",
        }}
      />
    </div>
  );
}
