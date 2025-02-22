export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getExpiration = (time1: Date, time2: Date) => {
  return (time2.getTime() - time1.getTime()) / 1000;
};
