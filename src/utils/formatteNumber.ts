const formatteeNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("en-US").format(number);

  return formattedNumber;
};
export default formatteeNumber;
