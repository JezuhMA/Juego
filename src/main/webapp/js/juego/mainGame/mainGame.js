/**
 * The `onload` method initializes the game and handles game logic.
 *
 * @returns {void}
 */
window.onload = () => {
    const PIXEL_TAM = 10;
	const TABLERO_TAM = 40;
    const pixeles = [];
    // ESTADOS
    const FONDO = 0;
    const CABEZA_SERPIENTE = 1;
    const CUELLO_SERPIENTE = 2;
    const CUERPO = 3;
    const MANZANA = 4;
    let ultimaDireccion = null;
    const direccion = {
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
    };
    const COLORES= {
        0 : "fondo",
        1 : "serpiente",
        2 : "serpiente",
        3 : "serpiente",
        4 : "manzana",
    }
    let ultimoTiempo = 0;
    const FPS = 15; // Los FPS que deseas
    const intervalo = 1000 / FPS; // Intervalo de tiempo en ms

    function newSegmento(estado, positionX, positionY) {
        return {
            estado: estado,
            posX: positionX,
            posY: positionY,
        };
    }
//Posiblemente necesite algo asi pa mantener la serpiente localizada
    const cuerpoSerpiente = [];
    const manzana = newSegmento(MANZANA);
	const frag = document.createDocumentFragment();
    const array_Juego = [];
    const POSX_INICIAL_SERPIENTE = 38;
    const POSY_INICIAL_SERPIENTE = 20;

    function initArrayJuego() {
        for (let i = 0; i < TABLERO_TAM; i++) {
            array_Juego[i] = [0];
            for (let j = 0; j < TABLERO_TAM; j++) {
                array_Juego[i][j] = FONDO;
            }
        }
    }
    function darEstiloPixel(pixel, estado, x, y) {
        pixel.dataset.x = `${x}`;
        pixel.dataset.y = `${y}`;
        pixel.style.left = `${x * PIXEL_TAM}px`;
        pixel.style.top = `${y * PIXEL_TAM}px`;
        pixel.classList.add("pixel");
        pixel.dataset.status = `${estado}`;
        pixel.classList.add(COLORES[estado]);
    }
    function pintarPixeles(estado, pixel){
        if(pixel.dataset.status === estado) return;
        const clase = pixel.dataset.status;
        pixel.dataset.status = `${estado}`;
        pixel.classList.remove(COLORES[clase]);
        pixel.classList.add(COLORES[estado]);
    }

    //ESTA FUNCION INICIA EL JUEGO
    function inicio() {
        // AQUI RECORRO EL ARRAY Y PINTO LOS PIXELES
        const tablero = document.querySelector("#tablero");
        initArrayJuego();
        const cabeza = newSegmento(CABEZA_SERPIENTE, POSX_INICIAL_SERPIENTE, POSY_INICIAL_SERPIENTE);
        const cuello = newSegmento(CUELLO_SERPIENTE, POSX_INICIAL_SERPIENTE + 1, POSY_INICIAL_SERPIENTE);
        cuerpoSerpiente.push(cabeza);
        cuerpoSerpiente.push(cuello);
        array_Juego[cabeza.posX][cabeza.posY] = cabeza.estado; //Pinto serpiente
        array_Juego[cuello.posX][cuello.posY] = cuello.estado;
        generarPosicionesPowerUP(manzana);
        array_Juego[manzana.posX][manzana.posY] = manzana.estado; //Pinto manzana
        for (let x = 0; x < TABLERO_TAM; x++) {
            pixeles[x] = [];
            for (let y = 0; y < TABLERO_TAM; y++) {
                const pixel = document.createElement("div");
                const estado = array_Juego[x][y];
                pixeles[x][y] = pixel;
                darEstiloPixel(pixel, estado, x, y);
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach(elemento => elemento.remove());
        tablero.appendChild(frag);
    }
     function actualizarArrayJuego(){
         for (let x = 0; x < TABLERO_TAM; x++) {
             for (let y = 0; y < TABLERO_TAM; y++) {
                array_Juego[x][y] = FONDO;
             }
         }
         cuerpoSerpiente.forEach(segmento => {
            array_Juego[segmento.posX][segmento.posY] = segmento.estado;
         });
         array_Juego[manzana.posX][manzana.posY] = manzana.estado;
     }

    function actualizarPixeles(){
        for (let x = 0; x < TABLERO_TAM; x++) {
            for (let y = 0; y < TABLERO_TAM; y++) {
                const estado = array_Juego[x][y];
                const pixel = pixeles[x][y];
                if (pixel.dataset.status !== `${estado}`){
                    pintarPixeles(estado, pixel);
                }
            }
        }
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
//TODO: mejorar la puta serpiente
    function actualizarSerpiente(){
        for (let i = 0; i < cuerpoSerpiente.length - 1; i++) {
            if (i === 0){
                cuerpoSerpiente[i].estado = CABEZA_SERPIENTE;
            }else if (i === 1){
                cuerpoSerpiente[i].estado = CUELLO_SERPIENTE;
            }else{
                cuerpoSerpiente[i].estado = CUERPO;
            }
        }
    }
    function manejarColisiones(cabeza , nuevaPos){
        if (nuevaPos.x < 0 || nuevaPos.x >= array_Juego.length || nuevaPos.y < 0 || nuevaPos.y >= array_Juego[0].length) {
            return false;
        }
        let colisiones = array_Juego[ nuevaPos.x ][nuevaPos.y];
        if (colisiones !== FONDO){
            if (colisiones === MANZANA){ // Veo si se come una manzana aqui crece
                const segmento = newSegmento(CUERPO, nuevaPos.x, nuevaPos.y);
                cuerpoSerpiente.unshift(segmento); //Añado al principio del array
                actualizarSerpiente();
                generarPosicionesPowerUP(manzana);
            }
            else if (colisiones === CUELLO_SERPIENTE){
                //Aqui tengo que mantener la direccion de la serpiente
            }
            else if (colisiones === CUERPO){ //veo que no se coma a si misma
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

        actualizarRecursos();
        return true;
    }
    function actualizarRecursos() {
        actualizarArrayJuego();
        actualizarPixeles();
    }

    function gameOver() {
        //ACABAR EL JUEGO
    }

    function getNuevaPosicion(codigo, cabeza) {
        let nuevaPos = {
            x: cabeza.posX,
            y: cabeza.posY,
        };

        if (!codigo && ultimaDireccion) {
            codigo = ultimaDireccion;
        }

        const direccionNueva = direccion[codigo];
        if (direccionNueva) {
            nuevaPos.x += direccionNueva.x;
            nuevaPos.y += direccionNueva.y;
        }

        if (codigo) ultimaDireccion = codigo;
        return nuevaPos;
    }


    function manejarEventoMovimiento(event){
         if (event.code !== null) {
             if (event.preventDefault) {
                 event.preventDefault();
             }
             let cabezaSerpiente = cuerpoSerpiente[0];
             let finalJuego = false;

             const nuevaPos = getNuevaPosicion(event.code, cabezaSerpiente);

             if (nuevaPos.x !== cabezaSerpiente.posX || nuevaPos.y !== cabezaSerpiente.posY) {
                 if (!manejarColisiones(cabezaSerpiente, nuevaPos)) {
                     finalJuego = true
                 }
             }

             if (finalJuego) {
                 gameOver();
             }
         }
    }

    function animacionJuego(tiempoActual){
        requestAnimationFrame(animacionJuego);
         const deltaTiempo = tiempoActual - ultimoTiempo;
         if (deltaTiempo < intervalo) {
             return;
         }
         ultimoTiempo = tiempoActual;
         if (ultimaDireccion) {
             manejarEventoMovimiento({code: ultimaDireccion});
         }

    }

    // Se mueve la serpiente
    window.addEventListener("keydown", manejarEventoMovimiento);
    inicio();
    requestAnimationFrame(animacionJuego);
}