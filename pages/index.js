import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MainPageCard from "../components/Card/MainPageCard";
import MainPageSlidebar from "../components/Slidebar/MainPageSlidebar";
import MainToggle from "../components/Toggle/MainToggle";
import Footer from "../components/Footer/MainPageFooter";
import Calendar from "../components/Calendar/GoogleCalendar";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

let style = {
  color: "rgb(255, 0, 0)",
  backgroundColor: "#f77f00",
  height: "40px",
  width: "40px",
  // position: "fixed",
  // right: "-100",
  // bottom: "100",
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <MainPageSlidebar />
      <MainToggle />
      <Calendar />
      <ScrollUpButton style={style} ContainerClassname="AnyClassForContainer" />
      {/* <Footer /> */}
    </div>
  );
}
