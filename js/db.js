db.collection("platillos").onSnapshot((datos) => {
    datos.forEach((registro) => {
        mostrarPlatillos(registro.data(), registro.id);

    });
});