let Arraycart = [];
let mostrarSubtotal = [];
let porcentaje = [];

function showCart() {
  let table = "";
  for (let product of Arraycart) {
    table += `
  
    <tr>
      <th><img style="width:100px;" src="${product.image}"></th>
      <td>${product.name}</td>
      <td class="precio">${product.currency} ${product.unitCost}</td>
      <td><input onclick="subtotal(this.value)"id="inputcantidad" type="number" style="width:50px;" value="1"></td>
      <td id="valueCount">USD ${product.unitCost}</td>
      <td><img src="img/papelera.png" style="width:30px;"<td>
    </tr>
  </tbody>
`;
  }
  document.getElementById("tableCart").innerHTML = table;
}

function subtotal(Cantidad) {
  for (let dato of Arraycart) {
    mostrarSubtotal = dato.unitCost * Cantidad;
    result = dato.currency + " " + mostrarSubtotal;
    document.getElementById("valueCount").innerHTML = result;
    showCost();
  }
}

function showCost() {
  let envioCost = mostrarSubtotal * porcentaje;
  let Total = mostrarSubtotal + envioCost;
  document.getElementById("subtotal").innerHTML = "USD " + mostrarSubtotal;
  document.getElementById("envio").innerHTML = "USD " + envioCost.toFixed(0);
  document.getElementById("TotalCost").innerHTML = "USD " + Total;
}

function formaDePago(opc1, opc2) {
  document.getElementById("nTarjeta").disabled = opc1;
  document.getElementById("Codigo").disabled = opc1;
  document.getElementById("Fecha").disabled = opc1;
  document.getElementById("nCuenta").disabled = opc2;
}

function validarPago() {
  let Credito = document.getElementById("Credito");
  let Transfer = document.getElementById("Transfer");
  let Feed = document.getElementById("feedMetodo");
  let select = document.getElementById("Select");

  if (!Credito.checked && !Transfer.checked) {
    select.classList.add("text-danger");
    Feed.classList.remove("d-none");
    Feed.classList.add("d-inline");
  } else if (Credito.checked || Transfer.checked) {
    select.classList.remove("text-danger");
    select.classList.add("text-primary");
    Feed.classList.remove("d-inline");
    Feed.classList.add("d-none");
    alert("Compra exitosa");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CART_INFO_URL + "25801" + ".json").then(function (resultado) {
    if (resultado.status === "ok") {
      Arraycart = resultado.data.articles;
      showCart(Arraycart);
      showCost();
    }
  });
  document.getElementById("Premium").addEventListener("change", function () {
    porcentaje = 0.15;
    showCost();
  });
  document.getElementById("Express").addEventListener("change", function () {
    porcentaje = 0.07;
    showCost();
  });
  document.getElementById("Standard").addEventListener("change", function () {
    porcentaje = 0.05;
    showCost();
  });
  document.getElementById("Credito").addEventListener("change", function () {
    formaDePago(false, true);
  });

  document.getElementById("Transfer").addEventListener("change", function () {
    formaDePago(true, false);
  });
  document.getElementById("regBtn").addEventListener("click", function () {
    validarPago();
  });
});

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
