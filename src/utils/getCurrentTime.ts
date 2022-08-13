export const getCurrentDate = (): string => {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  day = Number(day) < 10 ? '0' + day.toString() : day.toString();
  let hour = date.getHours().toString();
  hour = Number(hour) < 10 ? '0' + hour.toString() : hour.toString();
  let minites = date.getMinutes().toString();
  minites =
    Number(minites) < 10 ? '0' + minites.toString() : minites.toString();
  let seconds = date.getSeconds().toString();
  seconds =
    Number(seconds) < 10 ? '0' + seconds.toString() : seconds.toString();

  return year + month + day + hour + minites + seconds;
};
