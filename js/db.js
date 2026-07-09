let contenido = "";

db.collection("platillos").onSnapshot((snapshot) => {

  contenido = "";

  snapshot.docChanges().forEach((change) => {

    if (change.type === "added") {
      if (typeof mostrarPlatillos === "function") {
        mostrarPlatillos(change.doc.data(), change.doc.id);
      }
    }

    if (change.type === "removed") {
      const el = document.getElementById(change.doc.id);
      if (el) el.remove();
    }

  });

});

// AGREGAR PLATILLOS
const formularioAgregar = document.querySelector("form");

if (formularioAgregar) {

  formularioAgregar.addEventListener("submit", (e) => {
    e.preventDefault();

    const platillo = {
      nombre: formularioAgregar.title.value,
      ingredientes: formularioAgregar.ingredients.value,
      precio: formularioAgregar.price.value
    };

    db.collection("platillos").add(platillo)
      .then(() => formularioAgregar.reset())
      .catch(err => console.log(err));

  });

}