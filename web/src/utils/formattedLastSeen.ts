function formatLastSeen(createdAt: Date) {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const currentDay = currentDate.getDate();
  const createdDay = createdDate.getDate();

  if (currentDay === createdDay) {
    // Same day, format as "Last seen today at HH:mm"
    const hours = createdDate.getHours();
    const minutes = createdDate.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return `Last seen today at ${formattedTime}`;
  } else {
    // Different day, format as "Last seen on MMM DD"
    const month = createdDate.toLocaleString("default", { month: "short" });
    const day = createdDate.getDate();

    return `Last seen on ${month} ${day}`;
  }
}

export default formatLastSeen;
