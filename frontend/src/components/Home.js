import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";
import Address from "../components/Address";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Address />
      <Contact />
    </div>
  );
};

export default Home;
