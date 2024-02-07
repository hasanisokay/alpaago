import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [cursorX, setCursorX] = useState();
  const [cursorY, setCursorY] = useState();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.pageX);
      setCursorY(e.pageY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-40px)]">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      {/* Cursor */}
      <div
        className="cursor"
        style={{
          left: cursorX + 'px',
          top: cursorY + 'px',
        }}
      >
        {/* Text to display on cursor */}
        <p className="text-on-cursor">Your Text</p>
      </div>
    </>
  );
};

export default MainLayout;
