import { useEffect, useState } from "react";

// Custom hook to track window width, updates on resize event
function useGetWindowSize() {
  // Initialize state with current window width (e.g. 768px for md in Tailwind)
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useGetWindowSize;
