const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchButton = document.getElementById("search-btn");
const playButton = document.getElementById("play-button");
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

  //primary info
  let primaryInfo = document.createElement("div");
  primaryInfo.setAttribute("class", "primary-info");
  resultDiv.appendChild(primaryInfo);

  //word+phonetic
  let wordPhoneticDiv = document.createElement("div");
  wordPhoneticDiv.setAttribute("class", "word-phonetic");
  primaryInfo.appendChild(wordPhoneticDiv);

  //Set h1 for retrieved word
  let wordHeader = document.createElement("h1");
  wordHeader.innerHTML = result[0].word;
  wordPhoneticDiv.appendChild(wordHeader);

  let phonetic = document.createElement("p");
  phonetic.setAttribute("class", "phonetic");
  phonetic.innerHTML = result[0].phonetic;
  wordPhoneticDiv.appendChild(phonetic);

  let playButton = document.createElement("button");
  playButton.setAttribute("class", "play-btn");
  playButton.setAttribute("id", "play-button");
  primaryInfo.appendChild(playButton);

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

  playButton.addEventListener("click", () => {
    let length = result[0].phonetics.length;
    let audio = new Audio(result[0].phonetics[length - 1].audio);
    audio.play();
    console.log(result[0].phonetics[length - 1].audio);
  });
}

//Toggle dark mode
toggleSlider.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

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
