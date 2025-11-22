let data = "";
let word = "";
let searh = document.querySelector(".js-search");
let meaning = document.querySelector(".js-meaning");
let example = document.querySelector(".js-example");
let inputword = document.querySelector(".js-input");

async function wordMeaning(params) {
  // Word Input
  word = inputword.value;

  // Diciotnary
  try {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let current = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    data = await current.json();

    try {
      meaning.innerHTML = `Meaning: ${data[0].meanings[0].definitions[0].definition}`;
      example.innerHTML = `Example: ${
        data[0].meanings[0].definitions[0].example || "No Example"
      }`;
    } catch {
      meaning.innerHTML = "Invalid Word";
      example.innerHTML = "";
    }
  } catch {
    document.body.innerHTML = "Error! 404";
  }

  console.log(data);
}

searh.addEventListener("click", async function () {
  await wordMeaning();
  inputword.value = "";
});

inputword.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    await wordMeaning();
    inputword.value = "";
  }
});
