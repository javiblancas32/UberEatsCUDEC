db.collection("platillos").onSnapshot((datos) => {
    datos.forEach((registro) => {
<<<<<<< HEAD
        console.log(registro);
    });


=======
        console.log(registro);                    
    });

>>>>>>> 5f807f2d4ab1f26eedf68f9e1bc53ce6ea93047c
});