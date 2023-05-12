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
  let resultDiv = document.getElementById("results");
  resultDiv.innerHTML = ""; //Clear innerHTML between searches

  try {
    const result = await loadData();
    const audioFile = result[0].phonetics.find(
      (x) => x.audio && x.audio.includes("us.mp3")
    );

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
    phonetic.innerHTML = result[0].phonetics.find((x) => x.text).text;
    wordPhoneticDiv.appendChild(phonetic);

    //audio button
    if (audioFile) {
      let playButton = document.createElement("button");
      playButton.setAttribute("class", "play-btn");
      playButton.setAttribute("id", "play-button");
      primaryInfo.appendChild(playButton);
      playButton.addEventListener("click", () => {
        const audio = new Audio(audioFile.audio);
        audio.play();
      });
    }

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
        "</span></li>" +
        "<p>Meaning</p>";
      let definitionList = document.createElement("ul");
      definitionList.setAttribute("class", "definition-list");
      meaningList.appendChild(definitionList);
      for (let j = 0; j < meanings[i].definitions.length; j++) {
        if (j > 5) break;
        definitionList.innerHTML +=
          "<li><span>" + meanings[i].definitions[j].definition + "</span></li>";
      }
    }

    let divider = document.createElement("hr");
    divider.setAttribute("class", "divider");
    resultDiv.appendChild(divider);
    let source = document.createElement("p");
    source.setAttribute("class", "source-url");
    source.innerHTML = `Source: <a href='https://en.wiktionary.org/wiki/${result[0].word}'target="_blank rel="noopener noreferrer"">https://en.wiktionary.org/wiki/${result[0].word}</a>`;
    resultDiv.appendChild(source);
  } catch (error) {
    alert("No results found, please try again.");
  }
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

//switches font via select menu
let changeFontStyle = function (font) {
  document.getElementById("output-text").style.fontFamily = font.value;
};
