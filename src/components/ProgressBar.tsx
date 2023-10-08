import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScrollValue =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / maxScrollValue) * 100;
      setScrollWidth(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const barStyle = {
    width: `${scrollWidth}%`,
  };

  return (
    <div className="progress-bar" style={barStyle}>
    </div>
  );
}

export default ProgressBar;