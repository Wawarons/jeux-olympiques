import { useEffect, useState } from "react";
import { formatTime } from "../../utils/timerFormat";

/**
 * Timer component that displays a countdown timer in the format "mm:ss".
 *
 * @param seconds - The initial number of seconds for the timer.
 * @param isStart - A boolean flag indicating whether the timer should start counting down.
 * @returns A React component that displays the formatted time in minutes and seconds.
 */
const Timer = ({ seconds, isStart }: { seconds: number; isStart: boolean }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStart) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            return prevTime;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStart, time]);

  return (
    <div>
      <p>{formatTime(time)}</p>
    </div>
  );
};

export default Timer;
