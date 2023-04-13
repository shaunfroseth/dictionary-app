const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchButton = document.getElementById("search-btn");

async function loadData() {
  const word = document.getElementById("input-field").value;
  const response = await fetch(BASE_URL + word);
  const data = await response.json();
  console.log(data);
}

searchButton.addEventListener("click", loadData);

let changeFontStyle = function (font) {
  document.getElementById("output-text").style.fontFamily = font.value;
};
