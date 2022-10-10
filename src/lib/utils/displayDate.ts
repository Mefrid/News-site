export const displayDate = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return "";
  }
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
