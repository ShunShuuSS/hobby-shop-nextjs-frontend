const rupiahCurrency = (number) => {
  return "Rp" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const helper = {
  rupiahCurrency,
};

export default helper;
