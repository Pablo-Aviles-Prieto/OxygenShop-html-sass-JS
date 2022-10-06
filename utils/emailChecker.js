export const emailChecker = (email) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
