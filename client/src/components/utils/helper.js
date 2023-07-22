export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-in", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
};

export const orderStatusOptions = (currentStatus) => {
  const orderEnum = [
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];
  return orderEnum.filter((item) => item.label !== currentStatus);
};
