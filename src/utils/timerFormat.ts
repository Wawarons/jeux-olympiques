/**
 * Formats the given time in seconds into a string representation of minutes and seconds in the format "mm:ss".
 *
 * @param time - The time in seconds to be formatted.
 * @returns A string representing the time in minutes and seconds format "mm:ss".
 */
export const formatTime = (time: number) => {
  if (time < 0) {
    return "00:00";
  }

  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = time % 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
};
