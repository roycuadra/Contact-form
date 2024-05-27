const form = document.querySelector("form");

const inputs = [];
inputs.push(document.querySelector("textarea"));
const formInputs = document.querySelectorAll("input");
formInputs.forEach((input) => {
  if (
    input.type === "text" ||
    input.type === "email" ||
    input.type === "checkbox"
  ) {
    inputs.push(input);
  }
});

const close = document.querySelector(".close");
close.addEventListener("click", (e) => {
  const background = document.querySelector(".background");
  if (!background.classList.contains("hide")) background.classList.add("hide");
  const successMsg = document.querySelector(".success");
  if (!successMsg.classList.contains("hide")) successMsg.classList.add("hide");
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value !== "") {
      switch (e.target.type) {
        case "text":
          if (e.target.id === "input-fname") {
            const parent = document.querySelector("#fname-container");
            const errorMsg = parent.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();
          } else if (e.target.id === "input-lname") {
            const parent = document.querySelector("#lname-container");
            const errorMsg = parent.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();
          }
          return;
        case "textarea":
          const parent = document.querySelector("#msg-container");
          const errorMsg = parent.querySelector(".error-message");
          if (errorMsg) errorMsg.remove();
          return;
        case "checkbox":
          if (e.target.checked) {
            const parent = document.querySelector(".chbox-container");
            const errorMsg = parent.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();
          }
          return;
        case "email":
          if (validateEmail(e.target.value)) {
            const parent = document.querySelector("#email-container");
            const errorMsg = parent.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();
          }
      }
    }
  });
});

function validateEmail(email) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) return true;
  else return false;
}

function validateInput(input) {
  const inputType = input.type;
  let result = true;
  switch (inputType) {
    case "textarea":
      const message = document.querySelector("textarea");
      if (message.value === "") {
        const parent = document.querySelector("#msg-container");
        let err_msg = parent.querySelector(".error-message");
        if (!err_msg) {
          err_msg = document.createElement("p");
          err_msg.className = "error-message";
          err_msg.innerHTML = "Message is required.";
          parent.appendChild(err_msg);
        }

        result = false;
      }
      return result;
    case "checkbox":
      if (!input.checked) {
        const parent = document.querySelector(".chbox-container");
        let err_msg = parent.querySelector(".error-message");
        if (!err_msg) {
          err_msg = document.createElement("p");
          err_msg.className = "error-message";
          err_msg.style.marginTop = "1rem";
          err_msg.innerHTML =
            "To submit this form, please consent to being contacted";
          parent.appendChild(err_msg);
        }

        result = false;
      }
      return result;
    case "text":
      if (input.value === "") {
        if (input.id === "input-fname") {
          const parent = document.querySelector("#fname-container");
          let err_msg = parent.querySelector(".error-message");
          if (!err_msg) {
            err_msg = document.createElement("p");
            err_msg.className = "error-message";
            err_msg.innerHTML = "First name is required.";
            parent.appendChild(err_msg);
          }

          result = false;
        } else if (input.id === "input-lname") {
          const parent = document.querySelector("#lname-container");
          let err_msg = parent.querySelector(".error-message");
          if (!err_msg) {
            err_msg = document.createElement("p");
            err_msg.className = "error-message";
            err_msg.innerHTML = "Last name is required.";
            parent.appendChild(err_msg);
          }

          result = false;
        }
      }
      return result;
    case "email":
      if (input.value === "") {
        const parent = document.querySelector("#email-container");
        let err_msg = parent.querySelector(".error-message");
        if (!err_msg) {
          err_msg = document.createElement("p");
          err_msg.className = "error-message";
          err_msg.innerHTML = "Email is required.";
          parent.appendChild(err_msg);
        }

        result = false;
      }

    default:
      return result;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = [];
  let isFormValid = true;
  inputs.push(document.querySelector("textarea"));
  const formInputs = document.querySelectorAll("input");
  formInputs.forEach((input) => {
    if (
      input.type === "text" ||
      input.type === "email" ||
      input.type === "checkbox"
    ) {
      inputs.push(input);
    }
  });

  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isFormValid = false;
      return;
    }
  });

  if (isFormValid) {
    const background = document.querySelector(".background");
    if (background.classList.contains("hide"))
      background.classList.remove("hide");
    const successMsg = document.querySelector(".success");
    if (successMsg.classList.contains("hide"))
      successMsg.classList.remove("hide");
  } else alert("There was an error");
});
