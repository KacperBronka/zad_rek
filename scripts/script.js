const Inputs = {
  marketingName: document.querySelector("#marketing_name"),
  technicalName: document.querySelector("#technical_name"),
  description: document.querySelector("#description"),
  dropdown1: document.querySelector("#dropdown1"),
  dropdown2: document.querySelector("#dropdown2"),
  benefitAmount: document.querySelector("#benefit_amount"),
  startDate: document.querySelector("#start_date"),
  finishDate: document.querySelector("#finish_date"),
  price: document.querySelectorAll("input[name='price']"),
  connectWOther: document.querySelector("#connect_w_other"),
  backPromotion: document.querySelector("#back_promotion"),
};
let tempObj = {};
let requiredInputs = {};
var blockedNavSteps = document.querySelectorAll(".menu_item.disabled");
function canUnblockSteps() {
  var currentValues = JSON.parse(localStorage.getItem("step1_data"));
  if (currentValues == null) return;
  if (currentValues["marketingName"] != "" || currentValues["technicalName"] != "") {
    blockedNavSteps.forEach((v) => {
      if (v.classList.contains("disabled")) {
        v.classList.remove("disabled");
      }
    });
  } else {
    blockedNavSteps.forEach((v) => {
      if (!v.classList.contains("disabled")) {
        v.classList.add("disabled");
      }
    });
  }
}

if (localStorage.getItem("step1_data") != null) {
  let currentValues = JSON.parse(localStorage.getItem("step1_data"));

  Object.keys(currentValues).forEach((currentValKey) => {
    const input = Inputs[currentValKey];
    if (input instanceof NodeList) {
      // check if it is a radio input
      input.forEach((v) => {
        if (v.value == currentValues[currentValKey]) {
          v.checked = true;
        }
      });
    } else {
      if (input.type == "checkbox") {
        input.checked = currentValues[currentValKey];
      } else {
        input.value = currentValues[currentValKey];
      }
      if (input.type == "date" && currentValues[currentValKey] != "") {
        input.classList.add("has_value");
      }
    }
  });
}

Object.keys(Inputs).forEach((inputKey) => {
  const input = Inputs[inputKey];
  if (input instanceof NodeList) {
    // check if it is a radio input
    input.forEach((v) => {
      v.addEventListener("input", () => {
        tempObj[inputKey] = v.value;
        localStorage.setItem("step1_data", JSON.stringify(tempObj));
        canUnblockSteps();
      });
      if (v.checked) {
        tempObj[inputKey] = v.value;
      }
    });
  } else {
    input.addEventListener("input", () => {
      tempObj[inputKey] = input.type == "checkbox" ? input.checked : input.value;
      localStorage.setItem("step1_data", JSON.stringify(tempObj));
      canUnblockSteps();
    });
    tempObj[inputKey] = input.type == "checkbox" ? input.checked : input.value;
  }
  requiredInputs[inputKey] = input.required;
});
localStorage.setItem("required_inputs", JSON.stringify(requiredInputs));
localStorage.setItem("step1_data", JSON.stringify(tempObj)); // save inputs to JSON object in localstorage
