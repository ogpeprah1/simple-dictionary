const searchField = document.getElementById("searchfield");
const submitBtn = document.getElementById("submitBtn");
const definitionContainer = document.querySelector(".definition-container");
const preloader = document.getElementById("preloader");
const word = document.getElementById("word");
const phonetics = document.getElementById("phonetics");
const meanings = document.getElementById("meanings");
const definition = document.getElementById("definition");
const synonym = document.getElementById("synonym");
const antonym = document.getElementById("antonym");

async function getDefinition() {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchField.value}`;

  try {
    // Show the preloader when the button is clicked
    preloader.style.display = "flex";

    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    // Clear previous phonetic text
    phonetics.textContent = "";

    result.forEach((element) => {
      word.textContent = element.word;

      element.phonetics.forEach((phonetic) => {
        phonetics.textContent += phonetic.text + ", ";
      });

      definition.innerHTML = "<span>Definitions:<span/><br>";
      antonym.innerHTML = "<h3>Antonyms:</h3>";
      synonym.innerHTML = "<h3>Synonyms:</h3>";

      element.meanings.forEach((meaning) => {
        meaning.definitions.forEach((def) => {
          definitionContainer.style.display = "block";
          definition.innerHTML += def.definition + "<br><br>";
          console.log(def.definition);
        });

        meaning.synonyms.forEach((sy) => {
          if (sy == undefined || sy == "") {
            synonym.innerHTML += "not available";
          } else {
            synonym.innerHTML += sy + ", ";
          }
        });
        meaning.antonyms.forEach((an) => {
          if (an == "") {
            antonym.innerHTML += " not available";
          } else {
            antonym.innerHTML += an + ", ";
          }
        });
      });
    });
  } catch (error) {
    console.error(error);
  } finally {
    // Hide the preloader when the data is fetched
    preloader.style.display = "none";
  }
}

submitBtn.onclick = () => getDefinition();
