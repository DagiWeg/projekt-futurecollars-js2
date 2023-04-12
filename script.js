window.addEventListener("load", function () {
  document.getElementById("amount").value = "";
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    convertCurrency();
  });
});
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;

  if (isNaN(amount)) {
    alert("Proszę wprowadzić kwotę.");
    return;
  }
  if (amount < 0) {
    alert("Proszę wprowadzić poprawną, dodatnią kwotę.");
    return;
  }

  const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0].mid;
      const result = amount * rate;
      document.getElementById("result").innerHTML = `${amount.toFixed(
        2
      )} ${currency} = ${result.toFixed(2)} PLN`;

      document.getElementById("amount").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert(
        "Wystąpił błąd podczas przeliczania waluty. Proszę spróbować jeszcze raz."
      );
    });
}
