import React, { useEffect, useState } from "react";
import Calendar from "@ericz1803/react-google-calendar";

const API_KEY = "AIzaSyCe5J4iPxuoXdTqCPNyI6VzD1aQfKlbM-E";
const calendars = [
  {
    calendarId: "sams.kmitl@gmail.com",
    color: "#f77f00", //optional, specify color of calendar 2 events
  },
];

const GoogleCalendar = () => {
  return (
    <div className="Main-Toggle-Div">
      <Calendar apiKey={API_KEY} calendars={calendars} />
    </div>
  );
};

export default GoogleCalendar;
