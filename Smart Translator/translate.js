let langOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromtext");
let transText = document.querySelector(".toTranslate");
let countValue = document.querySelector(".code_length");
let exchangeLang = document.querySelector(".fa-exchange-alt");

langOption.forEach((selectTag, index) => {
  for (let countryCode in language) {
    let selected = "";
    if (index == 0 && countryCode == "en-GB") selected = "selected";
    else if (index == 1 && countryCode == "bn-IN") selected = "selected";
    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    selectTag.insertAdjacentHTML("beforeend", option);
  }
});

fromText.addEventListener("input", function () {
  let content = fromText.value;
  let fromContent = langOption[0].value;
  let transContent = langOption[1].value;

  let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=${fromContent}|${transContent}`;
  fetch(transLINK)
    .then((res) => res.json())
    .then((data) => {
      transText.value = data.responseData.translatedText;
    });

  countValue.textContent = `${content.length}/7,000`;
});

document.querySelectorAll(".icon-speak").forEach((btn) => {
  btn.addEventListener("click", () => {
    let textarea = btn.closest(".Property_from, .Property_trans").querySelector("textarea");
    let lang = btn.closest(".Property_from") ? langOption[0].value : langOption[1].value;
    let utter = new SpeechSynthesisUtterance(textarea.value);
    utter.lang = lang;
    speechSynthesis.speak(utter);
  });
});


document.querySelectorAll(".icon-copy").forEach((btn) => {
  btn.addEventListener("click", () => {
    let textarea = btn.closest(".Property_from, .Property_trans").querySelector("textarea");
    navigator.clipboard.writeText(textarea.value).then(() => {
      alert("Text copied to clipboard!");
    });
  });
});


exchangeLang.addEventListener("click", function () {
  // Swap text
  let tempText = fromText.value;
  fromText.value = transText.value;
  transText.value = tempText;

  // Swap language
  let tempLang = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value = tempLang;

  
  fromText.dispatchEvent(new Event("input"));
});



