import React, { useState, useEffect } from "react";
import Good_Picture from "../assets/Biswas.jpeg";
import { Link } from "react-router"; // Typically, you want react-router-dom for web apps

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 100px, set show to true
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full p-8 flex justify-between z-10 transition-colors duration-500 ease-in-out ${
        show ? "bg-black" : "bg-transparent"
      }`}
    >
      <Link to="/">
        <img
          className="fixed top-3 left-5 w-20 object-contain cursor-pointer"
          src={Good_Picture}
          alt="Biswas Logo"
        />
      </Link>
      {/* Center link: Recommendations button */}
      <Link to="/recommendations">
        <button className="btn btn-md btn-soft btn-primary fixed top-3 left-30 w-35 cursor-pointer">
          Recommendations
        </button>
      </Link>
      <Link to="/list">
        <img
          className="fixed top-4 right-5 w-24 object-contain cursor-pointer"
          src="https://upfaithandfamily.com/wp-content/uploads/2020/09/My-List-Button-1.1.png"
          alt="Netflix Avatar"
        />
      </Link>
    </div>
  );
};

export default Nav;
