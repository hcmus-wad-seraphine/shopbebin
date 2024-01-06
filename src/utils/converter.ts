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

export const shortenProductName = (name: string) => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  }

  return name;
};

export const shortenId = (id: string) => {
  return id.slice(0, 4) + "..." + id.slice(-4);
};
