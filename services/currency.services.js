export const fetchingCurrencyAPI = async (currentCurrency, optionSelected) => {
  try {
    const result = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentCurrency}/${optionSelected}.json`
    );
    return result.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
