function createDateString(timestamp) {
  const dateObj = new Date(timestamp);

  const day = dateObj.getDate();
  const month = Intl.DateTimeFormat('en-GB', { month: 'short' }).format(dateObj);
  const year = dateObj.getFullYear();

  const dateString = `${day} ${month} ${year}`;
  return dateString;
};

export default createDateString;