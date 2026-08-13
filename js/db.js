const formularioAgregar =
  document.getElementById(
    "formPlatillo"
  );

const contenedorPlatillos =
  document.querySelector(
    ".recipes"
  );


// =============================================
// MOSTRAR PLATILLOS DESDE FIRESTORE
// =============================================

if (contenedorPlatillos) {

  db.collection(
    "platillos"
  )

    .onSnapshot(

      function (snapshot) {

        snapshot
          .docChanges()

          .forEach(
            function (change) {

              // AGREGADO
              if (
                change.type ===
                "added"
              ) {

                if (
                  typeof mostrarPlatillos ===
                  "function"
                ) {

                  mostrarPlatillos(
                    change.doc.data(),
                    change.doc.id
                  );

                }

              }

              // MODIFICADO
              if (
                change.type ===
                "modified"
              ) {

                const anterior =
                  document.getElementById(
                    change.doc.id
                  );

                if (anterior) {

                  anterior.remove();

                }

                if (
                  typeof mostrarPlatillos ===
                  "function"
                ) {

                  mostrarPlatillos(
                    change.doc.data(),
                    change.doc.id
                  );

                }

              }

              // ELIMINADO
              if (
                change.type ===
                "removed"
              ) {

                const elemento =
                  document.getElementById(
                    change.doc.id
                  );

                if (elemento) {

                  elemento.remove();

                }

              }

            }
          );

      },

      function (error) {

        console.error(
          "Error Firestore:",
          error
        );

      }

    );

}


// =============================================
// AGREGAR PLATILLO
// =============================================

if (formularioAgregar) {

  formularioAgregar
    .addEventListener(

      "submit",

      function (e) {

        e.preventDefault();

        const nombre =
          formularioAgregar
            .title
            .value
            .trim();

        const ingredientes =
          formularioAgregar
            .ingredients
            .value
            .trim();

        const precio =
          formularioAgregar
            .price
            .value
            .trim();

        const fotoInput =
          document.getElementById(
            "fotoPlatillo"
          );

        const foto =
          fotoInput
            ? fotoInput.value
            : "";

        if (
          nombre === "" ||
          ingredientes === "" ||
          precio === ""
        ) {

          alert(
            "Completa todos los campos."
          );

          return;

        }

        const platillo = {

          nombre:
            nombre,

          ingredientes:
            ingredientes,

          precio:
            Number(precio),

          foto:
            foto

        };

        db.collection(
          "platillos"
        )

          .add(
            platillo
          )

          .then(
            function () {

              alert(
                "Platillo agregado correctamente."
              );

              formularioAgregar.reset();

              const vistaFoto =
                document.getElementById(
                  "foto"
                );

              if (vistaFoto) {

                vistaFoto.src =
                  "";

              }

              if (fotoInput) {

                fotoInput.value =
                  "";

              }

              M.updateTextFields();

            }
          )

          .catch(
            function (error) {

              console.error(
                "Error:",
                error
              );

              alert(
                "No se pudo agregar el platillo."
              );

            }
          );

      }

    );

}