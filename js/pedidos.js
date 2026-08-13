document.addEventListener(
    "DOMContentLoaded",
    function () {
  
      // =========================================
      // MATERIALIZE
      // =========================================
  
      M.FormSelect.init(
        document.querySelectorAll(
          "select"
        )
      );
  
      // =========================================
      // CARGAR PLATILLOS
      // =========================================
  
      cargarPlatillos();
  
      // =========================================
      // BOTÓN UBICACIÓN
      // =========================================
  
      const btnUbicacion =
        document.getElementById(
          "btnUbicacion"
        );
  
      if (btnUbicacion) {
  
        btnUbicacion
          .addEventListener(
            "click",
            obtenerUbicacion
          );
  
      }
  
      // =========================================
      // FORMULARIO
      // =========================================
  
      const formPedido =
        document.getElementById(
          "formPedido"
        );
  
      if (formPedido) {
  
        formPedido
          .addEventListener(
            "submit",
            guardarPedido
          );
  
      }
  
    }
  
  );
  
  
  // =============================================
  // MAPA
  // =============================================
  
  let map =
    null;
  
  let marker =
    null;
  
  
  // =============================================
  // CARGAR PLATILLOS
  // =============================================
  
  function cargarPlatillos() {
  
    db.collection(
      "platillos"
    )
  
      .onSnapshot(
  
        function (snapshot) {
  
          let opciones = `
  
            <option
              value=""
              disabled
              selected>
  
              Seleccione un platillo
  
            </option>
  
          `;
  
          snapshot.forEach(
            function (doc) {
  
              const datos =
                doc.data();
  
              opciones += `
  
                <option
                  value="${datos.nombre}">
  
                  ${datos.nombre}
  
                </option>
  
              `;
  
            }
          );
  
          const select =
            document.getElementById(
              "platillo"
            );
  
          if (!select) {
            return;
          }
  
          select.innerHTML =
            opciones;
  
          M.FormSelect.init(
            select
          );
  
        },
  
        function (error) {
  
          console.error(
            "Error cargando platillos:",
            error
          );
  
        }
  
      );
  
  }
  
  
  // =============================================
  // OBTENER UBICACIÓN
  // =============================================
  
  function obtenerUbicacion() {
  
    if (
      !navigator.geolocation
    ) {
  
      alert(
        "Tu navegador no soporta geolocalización."
      );
  
      return;
  
    }
  
    navigator.geolocation
      .getCurrentPosition(
  
        exitoUbicacion,
  
        errorUbicacion,
  
        {
  
          enableHighAccuracy:
            true,
  
          timeout:
            10000,
  
          maximumAge:
            0
  
        }
  
      );
  
  }
  
  
  // =============================================
  // UBICACIÓN CORRECTA
  // =============================================
  
  function exitoUbicacion(
    posicion
  ) {
  
    const latitud =
      posicion.coords.latitude;
  
    const longitud =
      posicion.coords.longitude;
  
    document.getElementById(
      "latitud"
    ).value =
      latitud;
  
    document.getElementById(
      "longitud"
    ).value =
      longitud;
  
    mostrarMapa(
      latitud,
      longitud
    );
  
    // =========================================
    // OBTENER DIRECCIÓN
    // =========================================
  
    fetch(
  
      "https://nominatim.openstreetmap.org/reverse" +
      "?format=json" +
      "&lat=" +
      latitud +
      "&lon=" +
      longitud
  
    )
  
      .then(
        function (respuesta) {
  
          return respuesta.json();
  
        }
      )
  
      .then(
        function (datos) {
  
          if (
            datos &&
            datos.display_name
          ) {
  
            document.getElementById(
              "direccion"
            ).value =
              datos.display_name;
  
            M.updateTextFields();
  
          }
  
          alert(
            "Ubicación obtenida correctamente."
          );
  
        }
      )
  
      .catch(
        function (error) {
  
          console.error(
            "Error obteniendo dirección:",
            error
          );
  
          alert(
            "Se obtuvo la ubicación, pero no fue posible obtener la dirección."
          );
  
        }
      );
  
  }
  
  
  // =============================================
  // MOSTRAR MAPA
  // =============================================
  
  function mostrarMapa(
    latitud,
    longitud
  ) {
  
    if (!map) {
  
      map =
        L.map(
          "mapa"
        )
  
          .setView(
            [
              latitud,
              longitud
            ],
            16
          );
  
      L.tileLayer(
  
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  
        {
  
          maxZoom:
            19,
  
          attribution:
            "&copy; OpenStreetMap contributors"
  
        }
  
      ).addTo(
        map
      );
  
    } else {
  
      map.setView(
        [
          latitud,
          longitud
        ],
        16
      );
  
    }
  
    if (marker) {
  
      map.removeLayer(
        marker
      );
  
    }
  
    marker =
      L.marker(
        [
          latitud,
          longitud
        ]
      )
  
        .addTo(
          map
        )
  
        .bindPopup(
          "Tu ubicación"
        )
  
        .openPopup();
  
    setTimeout(
      function () {
  
        map.invalidateSize();
  
      },
      200
    );
  
  }
  
  
  // =============================================
  // ERROR UBICACIÓN
  // =============================================
  
  function errorUbicacion(
    error
  ) {
  
    switch (
      error.code
    ) {
  
      case error.PERMISSION_DENIED:
  
        alert(
          "Debes permitir el acceso a la ubicación."
        );
  
        break;
  
      case error.POSITION_UNAVAILABLE:
  
        alert(
          "La ubicación no está disponible."
        );
  
        break;
  
      case error.TIMEOUT:
  
        alert(
          "Tiempo de espera agotado."
        );
  
        break;
  
      default:
  
        alert(
          "Error al obtener la ubicación."
        );
  
    }
  
  }
  
  
  // =============================================
  // GUARDAR PEDIDO
  // =============================================
  
  function guardarPedido(
    e
  ) {
  
    e.preventDefault();
  
    const nombre =
      document.getElementById(
        "nombre"
      ).value.trim();
  
    const direccion =
      document.getElementById(
        "direccion"
      ).value.trim();
  
    const platillo =
      document.getElementById(
        "platillo"
      ).value;
  
    const latitud =
      document.getElementById(
        "latitud"
      ).value;
  
    const longitud =
      document.getElementById(
        "longitud"
      ).value;
  
    if (
      nombre === "" ||
      direccion === "" ||
      !platillo
    ) {
  
      alert(
        "Completa todos los campos."
      );
  
      return;
  
    }
  
    const pedido = {
  
      nombre:
        nombre,
  
      direccion:
        direccion,
  
      platillo:
        platillo,
  
      latitud:
        latitud,
  
      longitud:
        longitud,
  
      fecha:
        firebase.firestore
          .FieldValue
          .serverTimestamp()
  
    };
  
    db.collection(
      "pedidos"
    )
  
      .add(
        pedido
      )
  
      .then(
        function () {
  
          alert(
            "Pedido guardado correctamente."
          );
  
          document.getElementById(
            "formPedido"
          ).reset();
  
          document.getElementById(
            "latitud"
          ).value =
            "";
  
          document.getElementById(
            "longitud"
          ).value =
            "";
  
          M.FormSelect.init(
            document.querySelectorAll(
              "select"
            )
          );
  
          M.updateTextFields();
  
          if (
            marker &&
            map
          ) {
  
            map.removeLayer(
              marker
            );
  
            marker =
              null;
  
          }
  
        }
      )
  
      .catch(
        function (error) {
  
          console.error(
            "Error guardando pedido:",
            error
          );
  
          alert(
            "Error al guardar el pedido."
          );
  
        }
      );
  
  }