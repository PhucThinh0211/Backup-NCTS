import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    windowSizeHandler();

    window.addEventListener('resize', windowSizeHandler);

    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, []);

  return windowSize;
};
