document.addEventListener('DOMContentLoaded', function () {

  // Inicializar Materialize select
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);

  cargarPlatillos();
});

function cargarPlatillos() {

  db.collection("platillos").onSnapshot((snapshot) => {

    let options = '<option disabled selected>Seleccione un platillo</option>';

    snapshot.forEach(doc => {
      const data = doc.data();

      options += `
        <option value="${doc.id}">
          ${data.nombre}
        </option>
      `;
    });

    const select = document.getElementById('platillo');
    select.innerHTML = options;

    // Reinicializar Materialize después de cambiar el DOM
    M.FormSelect.init(select);
  });
}