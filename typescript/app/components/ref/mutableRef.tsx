import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ComponentRendere from "../ComponentRendere";

const MutableRef = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <ComponentRendere>
      <div>{time}</div>
      <Button handalClick={() => stopTimer()}>Stop Timer</Button>
    </ComponentRendere>
  );
};

export default MutableRef;
