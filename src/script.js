const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchButton = document.getElementById("search-btn");
const toggleSlider = document.getElementById("light-dark-toggle");

async function loadData() {
  const word = document.getElementById("input-field").value;
  const response = await fetch(BASE_URL + word);
  const data = await response.json();

  return data;
}

async function displayData() {
  let result = await loadData();

  let resultDiv = document.getElementById("results");
  resultDiv.innerHTML = ""; //Clear innerHTML between searches

  //Set h1 for retrieved word
  let wordHeader = document.createElement("h1");
  wordHeader.innerHTML = result[0].word;
  resultDiv.appendChild(wordHeader);

  let phonetic = document.createElement("p");
  phonetic.setAttribute("class", "phonetic");
  phonetic.innerHTML = result[0].phonetic;
  resultDiv.appendChild(phonetic);

  //Create and append list of meanings
  let meanings = result[0].meanings;
  let meaningList = document.createElement("ul");

  meaningList.setAttribute("class", "part-of-speech");
  resultDiv.appendChild(meaningList);

  //Append "partOfSpeech" and definitions for each partOfSpeech
  for (let i = 0; i < meanings.length; i++) {
    meaningList.innerHTML +=
      "<li class='type-word'><span>" +
      meanings[i].partOfSpeech +
      "</span></li>";
    let definitionList = document.createElement("ul");
    definitionList.setAttribute("class", "definition-list");
    meaningList.appendChild(definitionList);
    for (let j = 0; j < meanings[i].definitions.length; j++) {
      definitionList.innerHTML +=
        "<li><span>" + meanings[i].definitions[j].definition + "</span></li>";
    }
  }

  console.log(result);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  console.log("click");
}

toggleSlider.addEventListener("click", toggleTheme);

// Checks for click or enter-press
searchButton.addEventListener("click", displayData);
document.getElementById("input-field").addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.key == "Enter") {
    document.getElementById("search-btn").click();
  }
});
//

let changeFontStyle = function (font) {
  document.getElementById("output-text").style.fontFamily = font.value;
};
