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

    // AQUI RELLENO EL ARRAY_JUEGO PARA QUE TENGA EL TAMAÑO DEL TABLERO
 	for (let i = 0; i < TABLERO_TAM; i++) {
		array_Juego[i] = [0];
		for (let j = 0; j < TABLERO_TAM; j++) {
			array_Juego[i][j] = 0;
		}
	}

    array_Juego[39][20] = 1; //Pinto cabeza
    array_Juego[20][15] = 3; //Pinto manzana

    //ESTA FUNCION INICIA EL BUCLE
    function inicio() {
        // AQUI RECORRO EL ARRAY Y PINTO LOS PIXELES
        for (let x = 0; x < TABLERO_TAM; x++) {
            for (let y = 0; y < TABLERO_TAM; y++) {
                const pixel = document.createElement("div");
                pixel.dataset.x = `${x}`;
                pixel.dataset.y = `${y}`;
                pixel.style.left = `${x * pixel_tam}px`;
                pixel.style.top = `${y * pixel_tam}px`;
                pixel.style.width = `${pixel_tam}px`;
                pixel.style.height = `${pixel_tam}px`;
                pixel.style.position = "absolute";
                const estado = array_Juego[x][y];
                if (estado === 0) {
                    pixel.style.backgroundColor = "black";
                    pixel.dataset.status = `${estado}`;
                } else if (estado === 1 || estado === 2) { //PINTO LA CABEZA Y EL CUERPO
                    pixel.style.backgroundColor = "green";
                    pixel.dataset.status = `${estado}`;
                } else if (estado === 3) {
                    pixel.style.backgroundColor = "red"
                    pixel.dataset.status = `${estado}`;
                }
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach(elemento => elemento.remove());
        tablero.appendChild(frag);
    }

    inicio();

    function animacionJuego(){
        const pixeles = document.querySelectorAll(`[data-status]`);
        //SI YO ME QUIERO MOVER A LA DERECHA SUMO UNO A LA X & MANTENGO LA Y
        pixeles.forEach(pixel =>{
            let estado = parseInt(pixel.dataset.status); //ESTADO ANTES DE HACER CAMBIOS
            let posX = parseInt(pixel.dataset.x);
            let posY = parseInt(pixel.dataset.y);
            let estadoArr = array_Juego[posX][posY];
            if (estado !== estadoArr){
                pixel.dataset.status = `${estadoArr}`;
                switch (estadoArr){
                    case 0 :{
                        pixel.style.backgroundColor = "black";
                        break;
                    }
                    case 1 :
                    case 2 : {
                        pixel.style.backgroundColor = "green";
                        break;
                    }
                    case 3 : {
                        pixel.style.backgroundColor = "red";
                    }
                }
            }
        })

    }

    window.addEventListener("keydown", (event)=>{
        event.preventDefault();
        switch (event.code) {
            case "ArrowLeft" : {
                let pararBucles = false; //variable de control para parar el bucle externo
                for (let x = 0; x < TABLERO_TAM; x++) {
                    if (pararBucles) break;
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        let estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[ x - 1 ][y] = 1;
                            array_Juego[x][y] = 0;
                            pararBucles = true;
                            break;
                        }
                    }
                }
                animacionJuego();
                break;
            }
            case "ArrowRight" : {
                let pararBucles = false;
                for (let x = 0; x < TABLERO_TAM; x++) {
                    if (pararBucles) break;
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        let estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[ x + 1 ][y] = 1;
                            array_Juego[x][y] = 0;
                            pararBucles = true;
                            break;
                        }
                    }

                }
                animacionJuego();
                break;
            }
            case "ArrowDown" : {
                let pararBucles = false;
                for (let x = 0; x < TABLERO_TAM; x++) {
                    if (pararBucles) break;
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        let estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[x][y + 1] = 1;
                            array_Juego[x][y] = 0;
                            break;
                        }
                    }
                }
                animacionJuego();
                break;
            }
            case "ArrowUp" : {
                let pararBucles = false;
                for (let x = 0; x < TABLERO_TAM; x++) {
                    if(pararBucles) break;
                    for (let y = 0; y < TABLERO_TAM; y++) {
                        let estado = array_Juego[x][y];
                        if (estado === 1){
                            array_Juego[x][y - 1] = 1;
                            array_Juego[x][y] = 0;
                            pararBucles = true;
                            break;
                        }
                    }
                }
                animacionJuego();
                break;
            }
        }
    });
}
