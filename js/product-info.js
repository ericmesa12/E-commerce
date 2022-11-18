const apiProd = "https://japceibal.github.io/emercado-api/products/";
const apiComments =
  "https://japceibal.github.io/emercado-api/products_comments/";

function mostrarArray(producto) {
  let listado = "";
  listado += `
  <div class="container" style="width:700px;" >
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${producto.images[0]}" class="d-block w-100">
    </div>
    <div class="carousel-item">
      <img src="${producto.images[1]}" class="d-block w-100" >
    </div>
    <div class="carousel-item">
      <img src="${producto.images[2]}" class="d-block w-100" >
    </div>
    <div class="carousel-item">
      <img src="${producto.images[3]}" class="d-block w-100" >
    </div>
    
  </div>
  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div><hr>

  <div class="container">
    <b>Precio</b>
    <p>${producto.currency} ${producto.cost}</p>
    <b>Descripción</b>
    <p>${producto.description}</p>
    <b>Categoría</b>
    <p>${producto.category}</p>
    <b>Cantidad de vendidos</b>
      <p>${producto.soldCount} artículos vendidos</p>
  </div><button type="button" onclick="pushcart(${producto.id})" class="btn btn-success">Comprar ahora</button><hr>
  `;

  document.getElementById("prod").innerHTML = listado;
}

function pushcart(Arraycart) {
  localStorage.setItem("addcart", Arraycart);
  window.location = "cart.html";
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function relatedProduct(producto) {
  let listado = "";
  for (let recomend of producto) {
    listado += `
    <div onclick="setProdID(${recomend.id})">
    <p>${recomend.name}<br>
    <img src="${recomend.image}" alt="product image" width="150" height="150" class="img-thumbnail">
    </div>
    `;
  }
  document.getElementById("recomendados").innerHTML = listado;
}

function corazones(puntos) {
  let heart = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= puntos) {
      heart += '<i style="color:red;" class="fas fa-heart"></i>';
    } else {
      heart += '<i class="far fa-heart"></i>';
    }
  }
  return heart;
}

function showComments(users) {
  let orderOfcomments = "";
  for (let user of users) {
    orderOfcomments += `
    <br>
    <div class="comentarios">
    <ul>
     <li style="list-style: none";><b style="color:blue;">${user.user}</b> - ${
      user.dateTime
    }</li><hr>
     <li style="list-style: none";>${user.description}</li><br>
     <li style="list-style: none";>Puntuacion: ${corazones(user.score)}</li>
    </ul>
    </div>`;
  }
  document.getElementById("comments").innerHTML = orderOfcomments;
}

function nuevocomment() {
  let fecha = new Date();
  let dato = {};
  dato.user = localStorage.getItem("nombre");
  dato.dateTime = `${fecha.getFullYear()}-${
    fecha.getMonth() + 1
  }-${fecha.getDate()}-${fecha.toLocaleTimeString()}`;
  dato.description = document.getElementById("newComment").value;
  dato.score = document.getElementById("puntajes").value;
  arrayComments.push(dato);
  document.getElementById("newComment").value = "";
  showComments(arrayComments);
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(apiProd + localStorage.getItem("prodID") + ".json").then(
    function (resultado) {
      if (resultado.status === "ok") {
        arrayProduct = resultado.data;
        related = resultado.data.relatedProducts;
        mostrarArray(arrayProduct);
        relatedProduct(related);
      }
    }
  );
  getJSONData(apiComments + localStorage.getItem("prodID") + ".json").then(
    function (resultado) {
      if (resultado.status === "ok") {
        arrayComments = resultado.data;
        showComments(arrayComments);
      }
    }
  );
  document.getElementById("sendComment").addEventListener("click", function () {
    nuevocomment();
  });
});
