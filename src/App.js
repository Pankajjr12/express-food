import React, { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import Main from "./layout/Main";

function App() {
  const [showSplash, setShowSplash] = useState(true); // Initialize with true
  const duration = 3000;

  useEffect(() => {
    const isSmallDevice = window.innerWidth <= 768;
    setShowSplash(isSmallDevice);

    if (isSmallDevice) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  return (
    <div>
      <SplashScreen /> {/* Conditionally render SplashScreen */}
      {!showSplash && <Main />} {/* Conditionally render Main */}
    </div>
  );
}

export default App;
