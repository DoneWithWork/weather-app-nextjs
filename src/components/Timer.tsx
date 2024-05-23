"use client";
import React, { useEffect, useState } from "react";

type TimerProps = {
  time: number;
};
export default function Timer({ time }: TimerProps) {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    // Function to increment current time by one second
    const incrementTime = () => {
      setCurrentTime((prevTime) => prevTime + 1);
    };

    // Set interval to increment time every second
    const intervalId = setInterval(incrementTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Re-run effect if initialEpochTime changes

  // Function to format time to 24-hour format with seconds
  const formatTime = (epochTime: number) => {
    const date = new Date(epochTime * 1000);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>{formatTime(currentTime)}</h1>
    </div>
  );
}
