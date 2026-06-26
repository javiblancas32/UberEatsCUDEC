
// ==========================
// LISTENER FIREBASE
// ==========================
db.collection("platillos").onSnapshot((snapshot) => {

  snapshot.docChanges().forEach((change) => {

    if (change.type === "added") {
      if (typeof mostrarPlatillos === "function") {
        mostrarPlatillos(change.doc.data(), change.doc.id);
      }
    }

    if (change.type === "modified") {
      if (typeof actualizarPlatillo === "function") {
        actualizarPlatillo(change.doc.data(), change.doc.id);
      }
    }

  });

});


// ==========================
// FORMULARIO (SOLO SI EXISTE)
// ==========================
const formularioAgregar = document.querySelector("form");

if (formularioAgregar) {

  formularioAgregar.addEventListener("submit", (e) => {
    e.preventDefault();

    const platilloNuevo = {
      nombre: formularioAgregar.title.value,
      ingredientes: formularioAgregar.ingredients.value,
      precio: formularioAgregar.price.value
    };

    db.collection("platillos").add(platilloNuevo)
      .then(() => {
        formularioAgregar.reset();
        alert("Platillo agregado");
      })
      .catch((error) => {
        console.log(error);
        alert("Error al agregar");
      });

  });

}