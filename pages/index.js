import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MainPageCard from "../components/Card/MainPageCard";
import MainPageSlidebar from "../components/Slidebar/MainPageSlidebar";
import MainToggle from "../components/Toggle/MainToggle";
import Footer from "../components/Footer/MainPageFooter";
import Calendar from "../components/Calendar/GoogleCalendar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <MainPageSlidebar />
      <MainToggle />
      <Calendar />
      <Footer />
    </div>
  );
}
