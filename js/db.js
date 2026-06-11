db.collection("platillos").onSnapshot((datos) => {
    datos.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            mostrarPlatillos(registro.doc.data(), registro.doc.id);
        } if (registro.type === "modified") {
            actualizarPlatillos(registro.doc.data(), registro.doc.id);
        }

    });
});
const formularioAgregar = document.querySelector("form");
formularioAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    const platilloNuevo = {
        nombre: formularioAgregar.title.value,
        ingredientes: formularioAgregar.ingredients.value,
        precio: formularioAgregar.price.value
    }
    db.collection("platillos").add(platilloNuevo).catch((error) => {
        console.error("Error al agregar el platillo: ", error);
        formularioAgregar.title.value = "";
        formularioAgregar.ingredients.value = "";
        formularioAgregar.price.value = "";
    });
}); 