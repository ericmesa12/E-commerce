document.getElementById("form").addEventListener("submit", function (event) {
  if (!document.getElementById("form").checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    alert("Cambios guardados");
  }
  document.getElementById("form").classList.add("was-validated");
});

document.getElementById("user").value = localStorage.getItem("nombre");

function SaveInfo() {
  let primernombre = document.getElementById("nombre1").value;
  let segundonombe = document.getElementById("nombre2").value;
  let primerapellido = document.getElementById("apellido1").value;
  let segundoapellido = document.getElementById("apellido2").value;
  let user = document.getElementById("user").value;
  let phone = document.getElementById("phone").value;
  let img = document.getElementById("SelectIMG").value;

  localStorage.setItem("imagen", img);
  localStorage.setItem("primernombre", primernombre);
  localStorage.setItem("segundonombre", segundonombe);
  localStorage.setItem("primerapellido", primerapellido);
  localStorage.setItem("segundoapellido", segundoapellido);
  localStorage.setItem("nombre", user);
  localStorage.setItem("phone", phone);
}

function showInfo() {
  document.getElementById("nombre1").value =
    localStorage.getItem("primernombre");
  document.getElementById("nombre2").value =
    localStorage.getItem("segundonombre");
  document.getElementById("apellido1").value =
    localStorage.getItem("primerapellido");
  document.getElementById("apellido2").value =
    localStorage.getItem("segundoapellido");
  document.getElementById("phone").value = localStorage.getItem("phone");
  document.getElementById("imgPerfil").value = localStorage.getItem("imagen");
}

document.getElementById("SelectIMG").onchange = function (e) {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function () {
    let image = document.getElementById("imgPerfil");
    image.src = reader.result;
    preview.append(image);
  };
};

document.addEventListener("DOMContentLoaded", function () {
  showInfo();
});
document.getElementById("btn_enviar").addEventListener("click", function () {
  SaveInfo();
});
