document.addEventListener(
  "DOMContentLoaded",
  function () {

    // =========================================
    // MATERIALIZE
    // =========================================

    const menus =
      document.querySelectorAll(
        ".sidenav"
      );

    M.Sidenav.init(
      menus
    );

    // =========================================
    // CÁMARA
    // =========================================

    let streaming = false;
    let streamActual = null;

    const width = 320;

    let height = 240;

    const video =
      document.getElementById(
        "video"
      );

    const canvas =
      document.getElementById(
        "canvas"
      );

    const foto =
      document.getElementById(
        "foto"
      );

    const fotoPlatillo =
      document.getElementById(
        "fotoPlatillo"
      );

    const btnFoto =
      document.getElementById(
        "btnFoto"
      );

    const btnTomarFoto =
      document.getElementById(
        "btnTomarFoto"
      );

    const btnCerrarCamara =
      document.getElementById(
        "btnCerrarCamara"
      );

    // =========================================
    // ABRIR CÁMARA
    // =========================================

    if (btnFoto) {

      btnFoto.addEventListener(
        "click",
        function () {

          if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
          ) {

            alert(
              "Tu navegador no soporta el acceso a la cámara."
            );

            return;

          }

          navigator.mediaDevices
            .getUserMedia({

              video: {

                facingMode: {
                  ideal: "environment"
                }

              },

              audio: false

            })

            .then(
              function (stream) {

                streamActual =
                  stream;

                video.srcObject =
                  stream;

                return video.play();

              }
            )

            .catch(
              function (error) {

                console.error(
                  "Error de cámara:",
                  error
                );

                alert(
                  "No se pudo acceder a la cámara. Revisa los permisos."
                );

              }
            );

        }

      );

    }

    // =========================================
    // AJUSTAR VIDEO
    // =========================================

    if (video) {

      video.addEventListener(
        "canplay",
        function () {

          if (!streaming) {

            if (
              video.videoWidth > 0 &&
              video.videoHeight > 0
            ) {

              height =
                video.videoHeight /
                (
                  video.videoWidth /
                  width
                );

            }

            video.setAttribute(
              "width",
              width
            );

            video.setAttribute(
              "height",
              height
            );

            streaming =
              true;

          }

        }

      );

    }

    // =========================================
    // TOMAR FOTO
    // =========================================

    if (btnTomarFoto) {

      btnTomarFoto.addEventListener(
        "click",
        tomarFoto
      );

    }

    function tomarFoto() {

      if (!streamActual) {

        alert(
          "Primero debes abrir la cámara."
        );

        return;

      }

      const contexto =
        canvas.getContext(
          "2d"
        );

      canvas.width =
        width;

      canvas.height =
        height;

      contexto.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      const fotoFinal =
        canvas.toDataURL(
          "image/jpeg",
          0.7
        );

      foto.src =
        fotoFinal;

      fotoPlatillo.value =
        fotoFinal;

    }

    // =========================================
    // CERRAR CÁMARA
    // =========================================

    if (btnCerrarCamara) {

      btnCerrarCamara
        .addEventListener(
          "click",
          cerrarCamara
        );

    }

    function cerrarCamara() {

      if (streamActual) {

        streamActual
          .getTracks()
          .forEach(
            function (track) {

              track.stop();

            }
          );

        streamActual =
          null;

      }

      video.srcObject =
        null;

      streaming =
        false;

    }

  }

);


// =============================================
// MOSTRAR PLATILLOS
// =============================================

function mostrarPlatillos(
  platillo,
  id
) {

  const contenedor =
    document.querySelector(
      ".recipes"
    );

  if (!contenedor) {
    return;
  }

  const div =
    document.createElement(
      "div"
    );

  div.classList.add(
    "card-panel",
    "recipe"
  );

  div.id =
    id;

  let imagen = "";

  if (
    platillo.foto &&
    platillo.foto !== ""
  ) {

    imagen = `

      <img
        src="${platillo.foto}"
        alt="${platillo.nombre}"
        class="responsive-img recipe-image">

    `;

  } else {

    imagen = `

      <i class="material-icons medium grey-text">
        restaurant
      </i>

    `;

  }

  div.innerHTML = `

    <div class="recipe-image-container">

      ${imagen}

    </div>

    <div class="recipe-details">

      <div class="recipe-title">
        ${platillo.nombre}
      </div>

      <div class="recipe-ingredients">
        ${platillo.ingredientes}
      </div>

      <div class="recipe-price">
        $${platillo.precio}
      </div>

    </div>

    <div class="recipe-delete">

      <button
        type="button"
        class="btn-floating red delete-btn"
        data-id="${id}">

        <i class="material-icons">
          delete
        </i>

      </button>

    </div>

  `;

  contenedor.appendChild(
    div
  );

  activarEliminar();

}


// =============================================
// ELIMINAR PLATILLOS
// =============================================

function activarEliminar() {

  document
    .querySelectorAll(
      ".delete-btn"
    )

    .forEach(
      function (btn) {

        btn.onclick =
          function () {

            const id =
              btn.getAttribute(
                "data-id"
              );

            if (
              confirm(
                "¿Deseas eliminar este platillo?"
              )
            ) {

              db.collection(
                "platillos"
              )

                .doc(id)

                .delete()

                .catch(
                  function (error) {

                    console.error(
                      error
                    );

                    alert(
                      "No se pudo eliminar el platillo."
                    );

                  }
                );

            }

          };

      }
    );

}