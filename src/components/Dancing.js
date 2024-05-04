import React, { useState, useEffect } from 'react';
import '../App.css'
const Dancing = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically toggle visibility every 2 seconds
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <div className={`fading-text ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
      {text}
    </div>
  );
};

export default Dancing;
