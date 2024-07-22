const btnCopyPassword = document.querySelector(".btn-copy-password");
const createdPassword = document.querySelector(".created-password");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");

//checkBoxes
const includeNumbers = document.querySelector("#include-numbers");
const includeLetters = document.querySelector("#include-letters");
const includeMixedCase = document.querySelector("#include-mixed-case");
const includePunctuation = document.querySelector("#include-punctuation");

slider.addEventListener("input", (e) => {
  e.stopPropagation();
  if (
    includeNumbers.checked ||
    includeLetters.checked ||
    includeMixedCase.checked ||
    includePunctuation.checked
  ) {
    createPassword();
  }
  sliderValue.textContent = e.target.value;
});

//function to get set of characters for password
const getCharacterSet = () => {
  let characters = "";
  if (includeNumbers.checked) characters += "0123456789";
  if (includeLetters.checked) characters += "abcdefghijklmnopqrstuvwxyz";
  if (includeMixedCase.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includePunctuation.checked) characters += "!@#$%^&*()_+{}[]:;<>,.?/~`|";
  return characters;
};

//function to generate password
const createPassword = () => {
  let password = "";
  const characterSet = getCharacterSet();
  const passwordLength = slider.value;
  for (let i = 0; i < passwordLength; i++) {
    if (characterSet.length > 0) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet[randomIndex];
    }
  }
  createdPassword.textContent = password;
};
//copy password to clipboard
btnCopyPassword.addEventListener("click", () => {
  if (!createdPassword.textContent) {
    alert("No password to copy.");
    return;
  }

  // navigator.clipboard API provides the ability to interact with the clipboard
  navigator.clipboard
    // wtiteText returns a promise
    .writeText(createdPassword.textContent)
    .then(() => {
      alert("Password copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy password: ", err);
    });
});
