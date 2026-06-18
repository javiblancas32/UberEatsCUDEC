let contenidolista = '';
function agregarAlista(platillo,id){
    contenidolista += `<option value='${platillo.id}'>
    ${platillo.nombre}
  </option>`;
  document.getElementById('listaPlatillos').innerHTML = contenidolista;

}