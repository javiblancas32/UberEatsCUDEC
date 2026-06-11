btnAgregarPlatillo = document.getElementById('btnAgregarPlatillo')

<<<<<<< HEAD
let contenido = '';

=======
let contenido ='';
>>>>>>> b0419a418573ca8d3a86bdd72f43e96c3c95e25b
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

btnAgregarPlatillo.addEventListener('click', function() {
  alert('Platillo Agregado');
<<<<<<< HEAD


});

function mostrarPlatillos(platillo, id) {
  contenido += `
    <div class="card-panel recipe white row"
      id="${id}">
      <div class="recipe-details">
        <div class="recipe-title">
          ${platillo.nombre}
        </div>

        <div class="recipe-ingredients">
          ${platillo.ingredientes}
        </div>

        <div class="recipe-price">
          Precio: $${platillo.precio}
        </div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  document.querySelector('.recipes').innerHTML = contenido;
}

function actualizarPlatillos(platillo, id) {
let tarjeta = document.getElementById(`${id}`);
tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
tarjeta.querySelector(".recipe-price").innerHTML = `Precio: $${platillo.precio}`;
=======
});

function mostrarPlatillos(platillo,id) {
  contenido += `
  <div class="card-panel recipe" white row" data-id="${id}">
    <div class="recipe-details">
      <div class="recipe-title">
        ${platillo.nombre}
      </div>
      <div class="recipe-ingredients">
        ${platillo.ingredientes}
      </div>
      <div class="recipe-title">
        precio:$${platillo.precio}
      </div>
    </div>
      <div class="recipe.delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
       
  </div>`;
  document.querySelector('.recipes').innerHTML = contenido;
>>>>>>> b0419a418573ca8d3a86bdd72f43e96c3c95e25b
}