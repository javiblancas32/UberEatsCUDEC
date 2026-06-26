
const btnAgregarPlatillo = document.getElementById('btnAgregarPlatillo');

let contenido = '';

document.addEventListener('DOMContentLoaded', function () {

  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });

});

// ==========================
// BOTÓN
// ==========================
if (btnAgregarPlatillo) {
  btnAgregarPlatillo.addEventListener('click', function () {
    alert('Platillo agregado');
  });
}

// ==========================
// MOSTRAR PLATILLOS (GLOBAL)
// ==========================
function mostrarPlatillos(platillo, id) {

  contenido += `
    <div class="card-panel recipe white row" id="${id}">
      <div class="recipe-details">

        <div class="recipe-title">${platillo.nombre}</div>

        <div class="recipe-ingredients">${platillo.ingredientes}</div>

        <div class="recipe-price">Precio: $${platillo.precio}</div>

      </div>
    </div>
  `;

  const contenedor = document.querySelector('.recipes');

  if (contenedor) {
    contenedor.innerHTML = contenido;
  }
}