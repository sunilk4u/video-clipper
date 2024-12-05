export function convertTime(timeInSec) {
  let mm = Math.floor(timeInSec / 60);
  let hh = Math.floor(mm / 60);
  let ss = Math.floor(timeInSec % 60);

  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;

  return `${hh}:${mm}:${ss}`;
}
