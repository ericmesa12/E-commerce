const api =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";

array = [];

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function mostrarArray(productos) {
  let listado = "";
  for (let producto of productos) {
    listado +=
      `
    <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
    <div class="row">
        <div class="col-3">
            <img src="` +
      producto.image +
      `" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>` +
      producto.name +
      `<br>` +
      `</h4> 
                <p> ` +
      producto.cost +
      producto.currency +
      ` <p> ` +
      producto.description +
      `</p> 
                </div>
                <small class="text-muted">` +
      producto.soldCount +
      ` artículos</small> 
            </div>
        </div>
    </div>
</div>`;
  }
  document.getElementById("cars").innerHTML = listado;
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(api).then(function (resultado) {
    if (resultado.status === "ok") {
      array = resultado.data.products;
      mostrarArray(array);
    }
  });

  function search() {
    let filtro = document.getElementById("buscar").value;
    listFiltered = array.filter((elProducto) => {
      return (
        elProducto.name.toLowerCase().indexOf(filtro.toLowerCase()) > -1 ||
        elProducto.description.toLowerCase().indexOf(filtro.toLowerCase()) > -1
      );
    });
    mostrarArray(listFiltered);
  }

  function filtro(array) {
    let preMin = document.getElementById("rangoPrecioMin").value;
    let preMax = document.getElementById("rangoPrecioMax").value;
    let listFiltered = array.filter(
      (producto) => producto.cost >= preMin && producto.cost <= preMax
    );
    mostrarArray(listFiltered);
  }

  function orderAsce(a, b) {
    if (a.cost < b.cost) {
      return -1;
    }
    if (a.cost > b.cost) {
      return 1;
    }
    return 0;
  }

  function orderDesce(a, b) {
    if (a.cost > b.cost) {
      return -1;
    }
    if (a.cost < b.cost) {
      return 1;
    }
    return 0;
  }

  function orderForReleva(a, b) {
    if (a.soldCount > b.soldCount) {
      return -1;
    }
    if (a.soldCount < b.soldCount) {
      return 1;
    }
    return 0;
  }

  document.getElementById("buscar").addEventListener("input", function () {
    search(array);
  });

  document.getElementById("descend").addEventListener("click", function () {
    array.sort(orderDesce);
    mostrarArray(array);
  });

  document.getElementById("ascend").addEventListener("click", function () {
    array.sort(orderAsce);
    mostrarArray(array);
  });

  document.getElementById("masVendido").addEventListener("click", function () {
    array.sort(orderForReleva);
    mostrarArray(array);
  });
  document
    .getElementById("botonFiltrar")
    .addEventListener("click", function () {
      filtro(array);
    });
  document
    .getElementById("botonLimpiar")
    .addEventListener("click", function () {
      mostrarArray(array);
      document.getElementById("rangoPrecioMin").value = "";
      document.getElementById("rangoPrecioMax").value = "";
    });
});
