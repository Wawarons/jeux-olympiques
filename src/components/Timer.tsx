import { useEffect, useState } from "react";

/**
 * Timer component that displays a countdown timer in the format "mm:ss".
 *
 * @param seconds - The initial number of seconds for the timer.
 * @param isStart - A boolean flag indicating whether the timer should start counting down.
 * @returns A React component that displays the formatted time in minutes and seconds.
 */
const Timer = ({ seconds, isStart }: { seconds: number; isStart: boolean }) => {
  const [time, setTime] = useState(seconds);
  const [actualTime, setActualTime] = useState("00:00");

  useEffect(() => {
    if (isStart && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
        setActualTime(formatTime(time));
      }, 1000);
    } else {
      setTime(time);
    }
  }, [isStart, time]);

  /**
   * Formats the given time in seconds into a string representation of minutes and seconds in the format "mm:ss".
   *
   * @param time - The time in seconds to be formatted.
   * @returns A string representing the time in minutes and seconds format "mm:ss".
   */
  const formatTime = (time: number) => {
    let minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = time % 60;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <p>{actualTime}</p>
    </div>
  );
};

export default Timer;
