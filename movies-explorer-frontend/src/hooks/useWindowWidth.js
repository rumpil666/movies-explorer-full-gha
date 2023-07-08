import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [isWindowWidth, setIsWindowWidth] = useState();

  useEffect(() => {
    const handleResizeWindow = () => {
      let timeOutHandler;
      clearTimeout(timeOutHandler)
      timeOutHandler = setTimeout(() => {
        setIsWindowWidth(window.innerWidth)
      }, 1000)
    };
    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();

    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  return isWindowWidth;
}