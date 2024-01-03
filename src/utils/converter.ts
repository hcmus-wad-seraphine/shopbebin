export const convertDateToReadable = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const capitalize = (str: string) => {
  const trimmed = str.replace(/_/g, " ").toLowerCase();
  return trimmed.charAt(0).toUpperCase() + str.slice(1);
};
