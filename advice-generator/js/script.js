const DICE_BUTTON = document.getElementById("dice");
const ADVICE_ID = document.getElementsByClassName("advice-id");
const ADVICE_TEXT = document.getElementsByClassName("advice-text");

const API_URL = "https://api.adviceslip.com/advice";

DICE_BUTTON.addEventListener("click", function () {
  fetch(API_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      ADVICE_ID.innerHTML = `ADVICE #${data.slip.id}`;
      ADVICE_TEXT.innerHTML = `"${data.slip.advice}"`;
    });
});
