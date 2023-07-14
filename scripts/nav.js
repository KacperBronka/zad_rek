var blockedNavSteps = document.querySelectorAll(".menu_item.disabled");
const menuItems = document.querySelectorAll(".menu_item");

function redirect(item) {
  var currentValues = JSON.parse(localStorage.getItem("step1_data"));

  var blockedPages;
  var canRedirect = true;
  let pageName = item.dataset.redirect.replace("subpages/", "");

  fetch("/zad_rek/blocked_pages.json")
    .then((response) => response.json())
    .then((data) => {
      blockedPages = data.blocked;
      if (blockedPages.includes(pageName)) {
        if (currentValues == null) return;
        canRedirect = currentValues["marketingName"] != "" || currentValues["technicalName"] != "";
      }

      if (canRedirect) {
        location.pathname = "/zad_rek/" + item.dataset.redirect + ".html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
canUnblockSteps();

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    redirect(item);
  });
});
