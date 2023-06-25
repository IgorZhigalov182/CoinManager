export const getBuyTime = (date) => {
  const time = new Date(date);
  return time.toLocaleString().split(',')[1];
};

export const getBuyDate = (date) => {
  const time = new Date(date);

  return time.toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const timeStampToMonth = (timeStamp) => {
  return new Date(timeStamp).getMonth() + 1;
};
