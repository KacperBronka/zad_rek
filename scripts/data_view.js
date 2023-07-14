const table = document.querySelector(".table");

function createRow(name, id) {
  let nameNode = document.createElement("span");
  nameNode.innerText = name;

  let editNode = document.createElement("span");
  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.dataset.id = id;
  editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>";
  editNode.appendChild(editBtn);

  let deleteNode = document.createElement("span");
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.dataset.id = id;
  deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
  deleteNode.appendChild(deleteBtn);

  table.appendChild(nameNode);
  table.appendChild(editNode);
  table.appendChild(deleteNode);
}

if (localStorage.getItem("saved_data") != null) {
  var savedData = JSON.parse(localStorage.getItem("saved_data"));
  savedData.forEach((val, index) => {
    createRow(val.marketingName, index);
  });
}
const editBtns = document.querySelectorAll("button.edit");
const deleteBtns = document.querySelectorAll("button.delete");

editBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let savedData = JSON.parse(localStorage.getItem("saved_data"));
    localStorage.setItem("step1_data", JSON.stringify(savedData[btn.dataset.id]));
    localStorage.setItem("editing_id", btn.dataset.id);
    location.pathname = "/zad_rek/index.html";
  });
});

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let savedData = JSON.parse(localStorage.getItem("saved_data"));
    savedData.splice(btn.dataset.id, 1);
    localStorage.setItem("saved_data", JSON.stringify(savedData));
    location.reload();
  });
});
