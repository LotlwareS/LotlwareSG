import React from "react";
import Hero from "../components/Hero/Hero";
import Equipo from "../components/aboutus/Equipo";
import EquipoTeam from "../components/aboutus/EquipoTeam";
import Services from "../components/Services/Services";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Process from "../components/Process/Process";
import CTA from "../components/CTA/CTA";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Equipo />
      <Services />
      <Skills />
      <Projects />
      <Process />
      <EquipoTeam />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
