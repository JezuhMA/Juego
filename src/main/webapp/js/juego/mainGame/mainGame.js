window.onload = ()=> {
	const pixel_tam = 10;
	const TABLERO_TAM = 40;
	const tablero = document.querySelector("#tablero");
	const frag = document.createDocumentFragment();
    const array_Juego = [];
    // CABEZASERPIENTE = 1
    // CUERPOSERPIENTE = 2
    // MANZANA = 3
    // FONDO = 0
    let estado = - 1;

    // AQUI RELLENO EL ARRAY_JUEGO PARA QUE TENGA EL TAMAÑO DEL TABLERO
 	for (let i = 0; i < TABLERO_TAM; i++) {
		array_Juego[i] = [0];
		for (let j = 0; j < TABLERO_TAM; j++) {
			array_Juego[i][j] = 0;
		}
	}

    array_Juego[38][20] = 1; //Pinto cabeza
    array_Juego[39][20] = 1;
    array_Juego[20][15] = 3; //Pinto manzana

    function animacionJuego() {
        // AQUI RECORRO EL ARRAY Y PINTO LOS PIXELES
        for (let x = 0; x < TABLERO_TAM; x++) {
            for (let y = 0; y < TABLERO_TAM; y++) {
                const pixel = document.createElement("div");
                pixel.style.left = `${x * pixel_tam}px`;
                pixel.style.top = `${y * pixel_tam}px`;
                pixel.style.width = `${pixel_tam}px`;
                pixel.style.height = `${pixel_tam}px`;
                pixel.style.position = "absolute";
                estado = array_Juego[x][y];
                if (estado === 0) {
                    pixel.style.backgroundColor = "black";
                } else if (estado === 1 || estado === 2) { //PINTO LA CABEZA
                    pixel.style.backgroundColor = "green";
                } else if (estado === 3) {
                    pixel.style.backgroundColor = "red";
                }
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach(elemento => elemento.remove());
        tablero.appendChild(frag);
    }

    animacionJuego();

    window.addEventListener("keydown", (event)=>{
        event.preventDefault();
        switch (event.code) {
            case "ArrowLeft" : {
                for (let x = 0; x < TABLERO_TAM; x++) {
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[ x - 1 ][y] = estado;
                            array_Juego[x][y] = 0;
                            animacionJuego();
                            estado = -1;
                        }
                    }
                }
                break;
            }
            case "ArrowUp" : {
                for (let x = 0; x < TABLERO_TAM; x++) {
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[x][y - 1] = estado;
                            array_Juego[x][y] = 0;
                            animacionJuego();
                            estado = -1;
                        }
                    }
                }
                break;
            }
        }
    });
}
