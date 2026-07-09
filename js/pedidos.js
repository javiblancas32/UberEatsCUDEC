document.addEventListener("DOMContentLoaded", function () {

    // Inicializar Materialize
    M.FormSelect.init(document.querySelectorAll("select"));

    // Cargar platillos
    cargarPlatillos();

    // Botón de ubicación
    const btnUbicacion = document.getElementById("btnUbicacion");

    if (btnUbicacion) {
        btnUbicacion.addEventListener("click", obtenerUbicacion);
    }

});

// =============================
// Cargar platillos
// =============================
function cargarPlatillos() {

    db.collection("platillos").onSnapshot(snapshot => {

        let opciones = '<option value="" disabled selected>Seleccione un platillo</option>';

        snapshot.forEach(doc => {
            opciones += `
                <option value="${doc.data().nombre}">
                    ${doc.data().nombre}
                </option>
            `;
        });

        const select = document.getElementById("platillo");
        select.innerHTML = opciones;

        M.FormSelect.init(select);

    });

}

// =============================
// Obtener ubicación
// =============================
function obtenerUbicacion() {

    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }

    navigator.geolocation.getCurrentPosition(exito, errorUbicacion);

}

// =============================
// Éxito
// =============================
function exito(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    document.getElementById("latitud").value = latitud;
    document.getElementById("longitud").value = longitud;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`)
        .then(respuesta => respuesta.json())
        .then(datos => {

            if (datos.display_name) {

                document.getElementById("direccion").value = datos.display_name;

                M.updateTextFields();

                alert("Ubicación obtenida correctamente.");

            } else {

                alert("No se pudo obtener la dirección.");

            }

        })
        .catch(err => {

            console.error(err);

            alert(
                "Latitud: " + latitud +
                "\nLongitud: " + longitud
            );

        });

}

// =============================
// Error ubicación
// =============================
function errorUbicacion(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:
            alert("Debes permitir el acceso a la ubicación.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible.");
            break;

        case error.TIMEOUT:
            alert("Tiempo de espera agotado.");
            break;

        default:
            alert("Error al obtener la ubicación.");

    }

}

// =============================
// Guardar pedido
// =============================
document.getElementById("formPedido").addEventListener("submit", function (e) {

    e.preventDefault();

    const pedido = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        platillo: document.getElementById("platillo").value,
        latitud: document.getElementById("latitud").value,
        longitud: document.getElementById("longitud").value
    };

    db.collection("pedidos").add(pedido)
        .then(() => {

            alert("Pedido guardado correctamente.");

            this.reset();

            document.getElementById("latitud").value = "";
            document.getElementById("longitud").value = "";

            M.FormSelect.init(document.querySelectorAll("select"));
            M.updateTextFields();

        })
        .catch(err => {

            console.error(err);

            alert("Error al guardar el pedido.");

        });

});