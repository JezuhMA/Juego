window.onload = ()=> {
	const PIXEL_TAM = 10;
	const TABLERO_TAM = 40;
	const tablero = document.querySelector("#tablero");

    // ESTADOS
    const FONDO = 0;
    const SERPIENTE = 1;
    const MANZANA = 2;

    function newSegmento(estado ,positionX, positionY) {
        return {
            estado : estado,
            posX: positionX,
            posY: positionY,
        };
    }
//Posiblemente necesite algo asi pa mantener la serpiente localizada
    const cuerpoSerpiente = [];
    const manzana = newSegmento(MANZANA);
	const frag = document.createDocumentFragment();
    const array_Juego = [];
    const POSX_INICIAL_SERPIENTE = 39;
    const POSY_INICIAL_SERPIENTE = 20;

    function initArrayJuego() {
        for (let i = 0; i < TABLERO_TAM; i++) {
            array_Juego[i] = [0];
            for (let j = 0; j < TABLERO_TAM; j++) {
                array_Juego[i][j] = 0;
            }
        }
    }
    function pintarPixeles(estado, pixel){
        pixel.dataset.status = `${estado}`;
        switch (estado) {
            case FONDO :
                pixel.style.backgroundColor = "black";
                break;
            case SERPIENTE :
                pixel.style.backgroundColor = "green";
                break;
            case MANZANA :
                pixel.style.backgroundColor = "red";
                break;
        }
    }

    //ESTA FUNCION INICIA EL JUEGO
    function inicio() {
        // AQUI RECORRO EL ARRAY Y PINTO LOS PIXELES
        initArrayJuego();
        const segmento = newSegmento(1,39, 20);
        cuerpoSerpiente.push(segmento);
        array_Juego[segmento.posX][segmento.posY] = segmento.estado; //Pinto cabeza
        generarPosicionesPowerUP(manzana);
        array_Juego[manzana.posX][manzana.posY] = manzana.estado; //Pinto manzana
        for (let x = 0; x < TABLERO_TAM; x++) {
            for (let y = 0; y < TABLERO_TAM; y++) {
                const pixel = document.createElement("div");
                pixel.dataset.x = `${x}`;
                pixel.dataset.y = `${y}`;
                pixel.style.left = `${x * PIXEL_TAM}px`;
                pixel.style.top = `${y * PIXEL_TAM}px`;
                pixel.style.width = `${PIXEL_TAM}px`;
                pixel.style.height = `${PIXEL_TAM}px`;
                pixel.style.position = "absolute";
                const estado = array_Juego[x][y];
                pintarPixeles(estado, pixel);
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach(elemento => elemento.remove());
        tablero.appendChild(frag);
    }

    inicio();

     function actualizarArrayJuego(){
         for (let x = 0; x < TABLERO_TAM; x++) {
             for (let y = 0; y < TABLERO_TAM; y++) {
                array_Juego[x][y] = 0;
             }
         }
         cuerpoSerpiente.forEach(segmento => {
            array_Juego[segmento.posX][segmento.posY] = segmento.estado;
         });
         array_Juego[manzana.posX][manzana.posY] = manzana.estado;
     }

    function animacionJuego(){
        const pixeles = document.querySelectorAll(`[data-status]`);
        pixeles.forEach(pixel =>{
            let estado = parseInt(pixel.dataset.status); //ESTADO ANTES DE HACER CAMBIOS
            let posX = parseInt(pixel.dataset.x);
            let posY = parseInt(pixel.dataset.y);
            //El estado cambiado en el array_Juego pero no reflejado en el tablero
            let estadoArr = array_Juego[posX][posY];
            if (estado !== estadoArr){
                pintarPixeles(estadoArr, pixel);
            }
        })

    }
    //AQUI puedo pasar un objeto porque hace un paso por referencia entonces si es correcto
    function generarPosicionesPowerUP(powerup){
         let x , y;
         do {
             x = Math.floor(Math.random()*TABLERO_TAM);
             y = Math.floor(Math.random()*TABLERO_TAM);

         }while (!cuerpoSerpiente.every(segmento => x !== segmento.posX && y !== segmento.posY))
         powerup.posY = y;
         powerup.posX = x;
    }

    function manejarColisiones(cabeza , nuevaPos){
        let colisiones = array_Juego[ nuevaPos.x ][nuevaPos.y];
        if (colisiones !== 0){
            if (colisiones === 2){ // Veo si se come una manzana aqui crece
                const segmento = newSegmento(SERPIENTE,nuevaPos.x, nuevaPos.y);
                cuerpoSerpiente.unshift(segmento); //Añado al principio del array
                generarPosicionesPowerUP(manzana);
            }
            else if (colisiones === 1){ //veo que no se coma a si misma
                return false;
            }
        }else { // Aqui avanza normal
            for (let i = cuerpoSerpiente.length - 1; i > 0; i--) {
                cuerpoSerpiente[i].posX = cuerpoSerpiente[i - 1].posX;
                cuerpoSerpiente[i].posY = cuerpoSerpiente[i - 1].posY;
            }
            cabeza.posX = nuevaPos.x;
            cabeza.posY = nuevaPos.y;
        }
        actualizarArrayJuego();
        animacionJuego();
        return true;
    }

    function gameOver() {
        //ACABAR EL JUEGO
    }

    function getNuevaPosicion(codigo, cabeza) {
        let nuevaPos = {
            x: cabeza.posX,
            y: cabeza.posY,
        }

        let control = false;

        switch (codigo) {
            case "ArrowLeft" : {
                if (nuevaPos.x - 1 < 0 ) control = true;
                nuevaPos.x--;
                break;
            }
            case "ArrowRight" : {
                if (nuevaPos.x + 1 >= TABLERO_TAM ) control = true;
                nuevaPos.x++;
                break;
            }
            case "ArrowDown" : {
                if (nuevaPos.y + 1 >= TABLERO_TAM ) control = true;
                nuevaPos.y++;
                break;
            }
            case "ArrowUp" : {
                if (nuevaPos.y - 1 < 0 ) control = true;
                nuevaPos.y--;
                break;
            }
        }
        if (control) gameOver();
        return nuevaPos;
    }

    function manejarEventoMovimiento(event){
        event.preventDefault();
        let cabezaSerpiente = cuerpoSerpiente[0];
        let finalJuego = false;

        const nuevaPos = getNuevaPosicion(event.code, cabezaSerpiente);

        if (nuevaPos.x !== cabezaSerpiente.posX || nuevaPos.y !== cabezaSerpiente.posY){
            if (!manejarColisiones(cabezaSerpiente, nuevaPos)) {
                finalJuego = true
            }
        }

        if (finalJuego) {
            gameOver();
        }
    }

    // Se mueve la serpiente
    window.addEventListener("keydown", manejarEventoMovimiento);
}
