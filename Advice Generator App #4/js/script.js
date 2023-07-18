const DICE_BUTTON = document.getElementById("dice");
const ADVICE_ID = document.getElementsByClassName("advice-id");
const ADVICE_TEXT = document.getElementsByClassName("advice-text");

const API_URL = "https://api.adviceslip.com/advice";

DICE_BUTTON.addEventListener("click", () => {
  fetch(API_URL, { cache: "no-cache" })
    .then((response) => response.json())
    .then((rs) => {
      let data = rs.slip;
      let dataId = data.id;
      let dataAdvice = data.advice;

      ADVICE_ID.innerHTML = `Advice # ${dataId}`;
      ADVICE_TEXT.innerHTML = dataAdvice;
    });
});
