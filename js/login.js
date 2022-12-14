let user = "";
let pass = "";

function login() {
  user = document.getElementById("usuario").value;
  pass = document.getElementById("contraseña").value;
  if (user != "" && pass != "" && pass.checkValidity()) {
    localStorage.setItem("nombre", user);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btningreso").addEventListener("click", function () {
    login();
  });
});

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          localStorage.setItem("nombre", user);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
