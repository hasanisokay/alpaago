import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";

const MainLayout = () => {
  const [cursorX, setCursorX] = useState();
  const [cursorY, setCursorY] = useState();
const {loading } = useContext(AuthContext);
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

  if(loading) return <Loader />
  return (
    <>
      <div className="min-h-[calc(100vh-40px)]">
        <Navbar></Navbar>
        <div className="pt-[70px]">
        <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>

      {/* <div
        className="cursor"
        style={{
          left: cursorX + 'px',
          top: cursorY + 'px',
        }}
      >
        <p className="text-on-cursor">Your Text</p>
      </div> */}
    </>
  );
};

export default MainLayout;
