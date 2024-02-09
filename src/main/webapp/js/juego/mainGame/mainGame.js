/**
 * The `onload` method initializes the game and handles game logic.
 *
 * @returns {void}
 */
window.onload = () => {
    const separacionPixeles = 1.5;    // em
	const TABLERO_X = 30;
    const tableroArr = [];
    const pixeles = [];
    // ESTADOS
    const FONDO = 0;
    const CABEZA_SERPIENTE = 1;
    const CUERPO = 2;
    const MANZANA = 3;
    const DIRECCION = {
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        KeyW: { x: 0, y: -1 },
        KeyA: { x: -1, y: 0 },
        KeyS: { x: 0, y: 1 },
        KeyD: { x: 1, y: 0 },
    };
    let codigoDireccionActual;
    let puntuacion = 0;
    let juegoTerminado = false;
    let idIntervalo;

    const FPS = 10; // Los FPS que deseas
    const intervalo = 1000 / FPS; // Intervalo de tiempo en ms

    const cuerpoSerpiente = [];
    const manzana = newSegmento(MANZANA);
    const POSX_INICIAL_SERPIENTE = 28;
    const POSY_INICIAL_SERPIENTE = 15;


    function newSegmento(estado, positionX, positionY) {
        return {
            estado: estado,
            posX: positionX,
            posY: positionY,
        };
    }
    function darEstiloPixel(pixel, estado, x, y) {
        pixel.style.left = `${x * separacionPixeles}em`;
        pixel.style.top = `${y * separacionPixeles}em`;
        pixel.classList.add("pixel");
        pixel.dataset.status = `${estado}`;
    }
    /*
        Esta funcion comprueba que si cambia el estatus del pixel en el array_juego
          se actualiza en el array de pixeles
     */
    function pintarPixeles(estado, pixel){
        if(pixel.dataset.status === estado) return;
        pixel.dataset.status = `${estado}`;
    }
    function actualizarPuntuacion (){
        document.querySelector("#puntuacion").textContent = `Puntuacion: ${puntuacion}`;
        if (puntuacion >= localStorage.getItem("maxPuntuacion")) {
            localStorage.setItem("maxPuntuacion", `${puntuacion}`);
            document.querySelector("#puntuacion_max").textContent = `Puntuacion mas alta: ${localStorage.getItem("maxPuntuacion")}`;
        }
    }
    //ESTA FUNCION INICIA EL JUEGO
    function initSerpiente() {
        const cabeza = newSegmento(CABEZA_SERPIENTE, POSX_INICIAL_SERPIENTE, POSY_INICIAL_SERPIENTE);
        const cuello = newSegmento(CUERPO, POSX_INICIAL_SERPIENTE + 1, POSY_INICIAL_SERPIENTE);
        cuerpoSerpiente.push(cabeza);
        cuerpoSerpiente.push(cuello);
        return {cabeza, cuello};
    }

    function definirPixelStatus(x, y, cabeza, cuello, manzana) {
        let estado = FONDO;
        if (x === cabeza.posX && y === cabeza.posY) {
            estado = CABEZA_SERPIENTE;
        }
        else if (x === cuello.posX && y === cuello.posY) {
            estado = CUERPO;
        }
        else if (x === manzana.posX && y === manzana.posY) {
            estado = MANZANA;
        }
        return estado;
    }

    function generarTablero(cabeza, cuello, manzana) {
        const tablero = document.querySelector("#tablero");
        const frag = document.createDocumentFragment();
        for (let x = 0; x < TABLERO_X; x++) {
            tableroArr[x] = [];
            for (let y = 0; y < TABLERO_X; y++) {
                const pixel = document.createElement("div");
                const estado = definirPixelStatus(x, y, cabeza, cuello, manzana);
                tableroArr[x][y] = estado;
                pixeles.push(pixel);
                darEstiloPixel(pixel, estado, x, y);
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach(elemento => elemento.remove());
        tablero.appendChild(frag);
    }

    function initTablaPuntuacion(){
        const tablaPuntuaciones = document.querySelector("#tablaPuntuacionesContenido");
        const arrayUsuarios = obtenerDatosUsuarios();
        const frag = document.createDocumentFragment();
        tablaPuntuaciones.childNodes.forEach(elemento => elemento.remove());
        arrayUsuarios.sort((a, b) => b.puntuacion - a.puntuacion);
        arrayUsuarios.forEach(usuario => {
            const registro = document.createElement("li");
            registro.textContent = `${usuario.nombre}: ${usuario.puntuacion}`;
            frag.appendChild(registro);
        });
        tablaPuntuaciones.appendChild(frag);
    }

    function inicio() {
        const {cabeza, cuello} = initSerpiente();
        generarPosicionesManzana(manzana);
        generarTablero(cabeza, cuello, manzana);
        initTablaPuntuacion();
        actualizarPuntuacion();
    }
     function actualizarArrayJuego(){
         for (let x = 0; x < TABLERO_X; x++) {
             for (let y = 0; y < TABLERO_X; y++) {
                 tableroArr[x][y] = FONDO;
             }
         }
         cuerpoSerpiente.forEach(segmento => {
             tableroArr[segmento.posX][segmento.posY] = segmento.estado;
         });
         tableroArr[manzana.posX][manzana.posY] = manzana.estado;
     }

    function actualizarPixelesJuego(){
        for (let x = 0; x < TABLERO_X; x++) {
            for (let y = 0; y < TABLERO_X; y++) {
                const estado = tableroArr[x][y];
                const pixel = pixeles[x * TABLERO_X + y]; //Aqui obtengo el pixel que corresponde
                if (pixel.dataset.status !== `${estado}`){
                    pintarPixeles(estado, pixel);
                }
            }
        }
    }
    //AQUI puedo pasar un objeto porque hace un paso por referencia entonces si es correcto
    function generarPosicionesManzana(manzana){
         let x , y;
         do {
             x = Math.floor(Math.random()*TABLERO_X);
             y = Math.floor(Math.random()*TABLERO_X);

         }while (!cuerpoSerpiente.every(segmento => x !== segmento.posX && y !== segmento.posY))
         manzana.posY = y;
         manzana.posX = x;
    }

    function actualizarSerpiente(){
        for (let i = 0; i < cuerpoSerpiente.length; i++) {
            if (i !== 0 && i !== 1){
                cuerpoSerpiente[i].estado = CUERPO;
            }else if (i === 1){
                cuerpoSerpiente[i].estado = CUERPO;
            }
        }
    }
    function manejarColisiones(cabeza , nuevaPos){
        if (nuevaPos.x < 0 || nuevaPos.x >= TABLERO_X || nuevaPos.y < 0 || nuevaPos.y >= TABLERO_X) {
            return false;
        }
        let colisiones = tableroArr[ nuevaPos.x ][nuevaPos.y];
        if (colisiones !== FONDO){
            if (colisiones === MANZANA){ // Veo si se come una manzana aqui crece
                const segmento = newSegmento(CABEZA_SERPIENTE, nuevaPos.x, nuevaPos.y);
                cuerpoSerpiente.unshift(segmento); //Añado al principio del array
                actualizarSerpiente();
                puntuacion ++;
                actualizarPuntuacion();
                generarPosicionesManzana(manzana);
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
        actualizarPixelesJuego();
    }
    function gameOver() {
        if (idIntervalo) {
            clearInterval(idIntervalo);
        }
        window.removeEventListener("keyup", manejarEventoMovimiento);
        const dialog = document.querySelector("#recogerdatos");
        const form = document.querySelector("#formulario");
        dialog.showModal();
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const nombre = form.nombre.value;
            console.log(nombre);
            guardarDatosUsuario(nombre, puntuacion);
            dialog.close();
            window.location.reload();
        });
        document.querySelector("#game_over").style.display = "block";
    }

    function guardarDatosUsuario(nombre, puntuacion) {
        // Crear un objeto de usuario con el nombre y puntuación
        let usuario = {
            nombre: nombre,
            puntuacion: puntuacion
        };

        // Obtener la lista existente de usuarios
        let usuarios = localStorage.getItem('usuarios');

        // Comprobar si la lista de usuarios es null (es decir, si no había usuarios almacenados previamente)
        if (!usuarios) {
            // Si no había lista de usuarios, creamos una con el usuario actual
            usuarios = [usuario];
        } else {
            // Si había una lista de usuarios, la convertimos de JSON a un objeto JavaScript
            usuarios = JSON.parse(usuarios);

            // Agregar el usuario a la lista de usuarios
            usuarios.push(usuario);
        }

        // Convertir la lista de usuarios a JSON y guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    function obtenerDatosUsuarios() {
        // Obtener la lista de usuarios de localStorage
        let usuarios = localStorage.getItem('usuarios');

        // Comprobar si la lista de usuarios es null (es decir, si no había usuarios almacenados previamente)
        if (!usuarios) {
            // Si no había lista de usuarios, devolvemos un array vacío
            return [];
        }

        // Si había usuarios, los convertimos de JSON a un objeto JavaScript y los devolvemos
        return JSON.parse(usuarios);
    }

    function getNuevaPosicion(codigo, cabeza) {
        let nuevaPos = {
            x: cabeza.posX,
            y: cabeza.posY,
        };

        if (!codigo && codigoDireccionActual) {
            codigo = codigoDireccionActual;
        }

        const direccionNueva = validarDireccion(codigo, codigoDireccionActual);
        if (direccionNueva) {
            nuevaPos.x += direccionNueva.x;
            nuevaPos.y += direccionNueva.y;
        }
        return nuevaPos;
    }

    function validarDireccion(codigo, codDireccionActual) {
        const nuevaDireccion = DIRECCION[codigo];
        if(nuevaDireccion && codDireccionActual){
            const direccionActualCodigo = DIRECCION[codDireccionActual];
            if (direccionActualCodigo.x === -nuevaDireccion.x && direccionActualCodigo.y === -nuevaDireccion.y) {
                return direccionActualCodigo; //Aqui no se puede ir en la direccion contraria
            }
        }
        if (codigo) codigoDireccionActual = codigo; //Aqui actualizo la direccion
        return nuevaDireccion;
    }

    function quitarPlay(){
        document.querySelector("#play").style.display = "none";
    }
    function comprobarKey(event){
        return event.code === "ArrowLeft"
            || event.code === "ArrowRight"
            || event.code === "ArrowUp"
            || event.code === "ArrowDown"
            || event.code === "KeyW"
            || event.code === "KeyA"
            || event.code === "KeyS"
            || event.code === "KeyD"
    }
    function manejarEventoMovimiento(event){
         if (comprobarKey(event)){
            const codigo = event.code;
            if (puntuacion === 0) {
                quitarPlay();
            }
             if (event.code !== null) {
                 if (event.preventDefault) {
                     event.preventDefault();
                 }
                 let cabezaSerpiente = cuerpoSerpiente[0];

                 const nuevaPos = getNuevaPosicion(codigo, cabezaSerpiente);

                 if (nuevaPos.x !== cabezaSerpiente.posX || nuevaPos.y !== cabezaSerpiente.posY) {
                     if (!manejarColisiones(cabezaSerpiente, nuevaPos)) {
                         juegoTerminado = true
                     }
                 }
             }

        }
        if (juegoTerminado) {
            gameOver();
        }
    }

    function animacionJuego(){
        idIntervalo = setInterval(()=>{
            if (codigoDireccionActual){
                manejarEventoMovimiento({code: codigoDireccionActual});
            }
        }, intervalo);
    }


    window.addEventListener("keyup", manejarEventoMovimiento);
    inicio();
    animacionJuego();
}