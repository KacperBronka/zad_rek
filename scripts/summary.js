const saveBtn = document.querySelector("#save");

function checkForRequired() {
  let step1Data = JSON.parse(localStorage.getItem("step1_data"));
  let requiredData = JSON.parse(localStorage.getItem("required_inputs"));

  let requiredFilled = true;

  Object.keys(step1Data).forEach((key) => {
    if (step1Data[key] == "" && requiredData[key] == true) {
      requiredFilled = false;
    }
  });

  return requiredFilled;
}

function saveCurrentData() {
  let dataArray = [];
  if (localStorage.getItem("saved_data") != null) {
    dataArray = JSON.parse(localStorage.getItem("saved_data"));
  }

  if (localStorage.getItem("editing_id") != null) {
    dataArray[parseInt(localStorage.getItem("editing_id"))] = JSON.parse(localStorage.getItem("step1_data"));
    localStorage.removeItem("editing_id");
  } else {
    dataArray.push(JSON.parse(localStorage.getItem("step1_data")));
  }

  localStorage.setItem("saved_data", JSON.stringify(dataArray));
  localStorage.removeItem("step1_data");
}

saveBtn.addEventListener("click", () => {
  if (!checkForRequired()) {
    alert("Please fill required fields");
    return;
  }
  saveCurrentData();
  location.pathname = "/zad_rek/subpages/data_view.html";
});
