window.addEventListener("load", function () {
  // clear the amount input field on page load
  document.getElementById("amount").value = "";

  // handle form submit
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    convertCurrency();
  });
});
function convertCurrency() {
  // get the amount and currency inputs
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;

  // check if the amount is a valid number
  if (isNaN(amount)) {
    alert("Please enter a valid number for the amount.");
    return;
  }

  // call the NBP API to get the exchange rate
  const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // calculate the result and display it
      const rate = data.rates[0].mid;
      const result = amount * rate;
      document.getElementById("result").innerHTML = `${amount.toFixed(
        2
      )} ${currency} = ${result.toFixed(2)} PLN`;

      // clear the amount input field
      document.getElementById("amount").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert(
        "An error occurred while converting the currency. Please try again later."
      );
    });
}
