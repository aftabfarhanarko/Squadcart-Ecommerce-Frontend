"use client";
import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(3600 + 34 * 60 + 21); // Example: 1 hour, 34 minutes, and 21 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { 
        hours: String(hours).padStart(2, '0'), 
        minutes: String(minutes).padStart(2, '0'), 
        seconds: String(seconds).padStart(2, '0') 
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const TimeUnit = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#D31A7A] text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg shadow-inner font-bold text-lg md:text-xl border border-white/20">
        {value}
      </div>
      <p className="text-[10px] md:text-xs text-white/70 uppercase mt-1 tracking-wider font-semibold">
        {label}
      </p>
    </div>
  );

  return (
    <div className="flex items-center gap-3 md:gap-4 font-baiJamjuree">
      <TimeUnit label="Hours" value={hours} />
      <span className="text-white text-xl font-bold mb-5">:</span>
      <TimeUnit label="Minutes" value={minutes} />
      <span className="text-white text-xl font-bold mb-5">:</span>
      <TimeUnit label="Seconds" value={seconds} />
    </div>
  );
};

export default CountDown;
