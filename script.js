"use strict";

const currencyElOne = document.getElementById("currency-one");
const amountElOne = document.getElementById("amount-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const btnSwap = document.getElementById("swap");

//global variables
let amountOne;
let currencyOne;
let currencyTwo;
const init = () => {
  showCurrencies(currencyElOne);
  showCurrencies(currencyElTwo);
};

const showCurrencies = async (input) => {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/86551d1f2eb9128fc2b18672/latest/INR"
  );
  const data = await response.json();

  const currencyArr = Object.keys(data.conversion_rates);

  currencyArr.forEach((currency) => {
    const optionEl = document.createElement("option");
    optionEl.value = currency;
    optionEl.innerText = currency;

    input.appendChild(optionEl);
  });
};
const calculate = async function () {
  amountOne = amountElOne.value;
  currencyOne = currencyElOne.value;
  currencyTwo = currencyElTwo.value;

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/86551d1f2eb9128fc2b18672/latest/${currencyOne}`
  );
  const data = await response.json();
  const rate = data.conversion_rates[currencyTwo];

  console.log(rate);

  amountElTwo.value = (amountOne * rate).toFixed(2);
  rateEl.innerText = `1 ${currencyOne} = ${rate.toFixed(2)} ${currencyTwo}`;
};

amountElOne.addEventListener("input", calculate);
currencyElOne.addEventListener("change", calculate);
currencyElTwo.addEventListener("change", calculate);

btnSwap.addEventListener("click", () => {
  let temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;

  calculate();
});

init();
