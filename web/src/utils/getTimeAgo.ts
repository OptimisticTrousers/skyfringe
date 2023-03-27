export default function getTimeAgo(date: Date) {
  const dateObj = new Date(date);
  const seconds = Math.floor(Date.now() / 1000 - Number(dateObj) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const yearType =
    dateObj.getFullYear() === new Date().getFullYear() ? undefined : "numeric";

  let resultStr = "";

  if (hours >= 24) {
    resultStr =
      dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: yearType,
      }) +
      " at " +
      dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
  } else if (hours >= 1) {
    resultStr = hours + "h";
  } else if (minutes >= 1) {
    resultStr = minutes + "m";
  } else {
    resultStr = "just now";
  }

  return resultStr;
}
