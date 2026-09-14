const calculateDiscountedPrice = (price: number, discount: number) => {
  if (discount <= 0) return new Intl.NumberFormat("en-US").format(price);

  const discountedPrice = Math.round(price - (price * discount) / 100);
  return new Intl.NumberFormat("en-US").format(discountedPrice);
};
export default calculateDiscountedPrice;
