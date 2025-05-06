import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location]); // This effect runs when the location changes

  return null; // This component doesn't render anything
};

export default ScrollTop;
