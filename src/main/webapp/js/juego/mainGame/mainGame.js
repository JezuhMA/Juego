import {Snake} from "./snake.js";
import {PowerUp} from "./powerups.js";
import {PuntuacionUsuario} from "./puntuacionUsuario.js"

window.onload = () => {
    /**
     * Declaraciones de constantes y variables.
     *
     * @const {number} separacionPixeles - Define la separación entre píxeles en unidades de em.
     * @const {number} TABLERO_X - Define el ancho del tablero de juego en celdas.
     * @const {Array} tableroArr - Probablemente contendrá los datos del tablero de juego.
     * @const {Array} pixeles - Probablemente contendrá los datos de los píxeles.
     * @const {number} FONDO - Representa el estado de fondo de una celda en el tablero de juego.
     * @const {number} CABEZA_SERPIENTE - Representa el estado de la cabeza de la serpiente en una celda del tablero de juego.
     * @const {number} CUERPO - Representa el estado del cuerpo de la serpiente en una celda del tablero de juego.
     * @const {number} MANZANA - Representa el estado de una powerUp en una celda del tablero de juego.
     * @const {Object} DIRECCION - Mapea los códigos de tecla a vectores de dirección.
     * @let {string} codigoDireccionActual - Almacenará el código de dirección actual.
     * @let {number} puntuacion - Almacena la puntuación actual, inicializada en 0.
     * @let {boolean} juegoTerminado - Indica si el juego ha terminado.
     * @let {number} idIntervalo - Almacenará el ID del intervalo establecido por `setInterval`.
     * @const {number} FPS - Define los fotogramas por segundo deseados.
     * @const {number} intervalo - Define el intervalo entre fotogramas en milisegundos.
     * @let {Array} cuerpoSerpiente - Almacenará los segmentos del cuerpo de la serpiente.
     * @let {Object} powerUp - Un segmento que representa una powerUp.
     * @const {number} POSX_INICIAL_SERPIENTE - Define la posición inicial en x de la serpiente.
     * @const {number} POSY_INICIAL_SERPIENTE - Define la posición inicial en y de la serpiente.
     */

    const TABLERO_X = 30;
    const separacionPixeles = 100 / TABLERO_X; // % de separacion entre pixeles
    const tableroArr = [];
    const pixeles = [];

    const FONDO = 0;
    const CABEZA_SERPIENTE = "cabeza";
    const CUERPO = "cuerpo";
    const MANZANA = "manzana";

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
    let puntuacion = 0; // Puntuacion inicial
    let juegoTerminado = false;
    let idIntervalo;

    const FPS = 10; // Los FPS que deseas
    const intervalo = 1000 / FPS; // Intervalo de tiempo en ms

    let powerUp;
    //AQUI SE CREA UNA SERPIENTE
    const POSX_INICIAL_SERPIENTE = 15;
    const POSY_INICIAL_SERPIENTE = 15;
    const SNAKE = new Snake(CABEZA_SERPIENTE, POSX_INICIAL_SERPIENTE, POSY_INICIAL_SERPIENTE);
    const almacenamiento = new PuntuacionUsuario();

    /**
     * Aplica estilos a un elemento píxel basado en los parámetros proporcionados.
     *
     * @param {HTMLElement} pixel - El elemento píxel al que se le aplicarán los estilos.
     * @param {number} estado - El estado del píxel.
     * @param {number} x - La coordenada x del píxel.
     * @param {number} y - La coordenada y del píxel.
     */
    function darEstiloPixel(pixel, estado, x, y) {
        pixel.style.left = `${x * separacionPixeles}%`;
        pixel.style.top = `${y * separacionPixeles}%`;
        pixel.classList.add("pixel");
        pixel.dataset.status = `${estado}`;
    }

    /**
     * Actualiza el estado de un elemento píxel. Si el estado actual del píxel ya es igual al nuevo estado, la función no hace nada.
     * De lo contrario, actualiza el estado del píxel al nuevo estado.
     *
     * @param {string} estado - El nuevo estado que se aplicará al píxel.
     * @param {HTMLElement} pixel - El elemento píxel cuyo estado se actualizará.
     */
    function pintarPixeles(estado, pixel) {
        if (pixel.dataset.status === estado) return;
        pixel.dataset.status = `${estado}`;
    }

    /**
     * Actualiza la puntuación actual y máxima. Las puntuaciones se muestran en la página web
     *  y la puntuación máxima se almacena en el almacenamiento local para persistencia.
     *
     * @function
     * @name actualizarPuntuacion
     */
    function actualizarPuntuacion(puntos) {
        puntuacion += puntos;
        document.querySelector(
            "#puntuacion"
        ).textContent = `Puntuacion: ${puntuacion}`;
        if (puntuacion >= localStorage.getItem("maxPuntuacion")) {
            localStorage.setItem("maxPuntuacion", `${puntuacion}`);
            document.querySelector(
                "#puntuacion_max"
            ).textContent = `Puntuacion mas alta: ${localStorage.getItem(
                "maxPuntuacion"
            )}`;
        }
    }

    /**
     * Define el estado de un píxel basado en sus coordenadas y las posiciones de la cabeza, el cuello y la powerUp.
     * @param {number} x - La coordenada x del píxel.
     * @param {number} y - La coordenada y del píxel.
     * @returns {number} El estado del píxel.
     */
    function definirPixelStatus(x, y) {
        let estado = FONDO;
        const cabeza = SNAKE.getCabeza();
        if (x === cabeza.posX && y === cabeza.posY) {
            estado = cabeza.parte;
        }
        else if (x === powerUp.getPosX() && y === powerUp.getPosY()) {
            estado = powerUp.getParte();
        }
        return estado;
    }

    /**
     * Genera el tablero del juego con los elementos proporcionados.
     */
    function generarTablero() {
        const tablero = document.querySelector("#tablero");
        const frag = document.createDocumentFragment();
        for (let x = 0; x < TABLERO_X; x++) {
            tableroArr[x] = [];
            for (let y = 0; y < TABLERO_X; y++) {
                const pixel = document.createElement("div");
                const estado = definirPixelStatus(x, y);
                tableroArr[x][y] = estado;
                pixeles.push(pixel);
                darEstiloPixel(pixel, estado, x, y);
                frag.appendChild(pixel);
            }
        }
        tablero.childNodes.forEach((elemento) => elemento.remove());
        tablero.appendChild(frag);
    }

    /**
     * Inicializa la tabla de puntuaciones.
     */
    function initTablaPuntuacion() {
        const tablaPuntuaciones = document.querySelector(
            "#tablaPuntuacionesContenido"
        );
        const arrayUsuarios = obtenerDatosUsuarios();
        const frag = document.createDocumentFragment();
        tablaPuntuaciones.childNodes.forEach((elemento) => elemento.remove());
        arrayUsuarios.sort((a, b) => b.puntuacion - a.puntuacion);
        arrayUsuarios.forEach((usuario) => {
            const registro = document.createElement("li");
            registro.textContent = `${usuario.nombre}: ${usuario.puntuacion}`;
            frag.appendChild(registro);
        });
        tablaPuntuaciones.appendChild(frag);
    }

    /**
     * Inicia el juego.
     */
    function inicio() {
        nuevoPWUps(MANZANA);
        generarTablero();
        initTablaPuntuacion();
        actualizarPuntuacion(0);
    }
    /**
     * Actualiza el array de juego con los valores correspondientes
     * de los estados de la serpiente y la powerUp.
     */
    function actualizarArrayJuego() {
        for (let x = 0; x < TABLERO_X; x++) {
            for (let y = 0; y < TABLERO_X; y++) {
                tableroArr[x][y] = FONDO;
            }
        }
        SNAKE.getCuerpo().forEach((segmento) => {
            tableroArr[segmento.posX][segmento.posY] = segmento.parte;
        });
        tableroArr[powerUp.getPosX()][powerUp.getPosY()] = powerUp.getParte();
    }

    /**
     * Actualiza los pixeles del juego en función del estado del tablero.
     */
    function actualizarPixelesJuego() {
        for (let x = 0; x < TABLERO_X; x++) {
            for (let y = 0; y < TABLERO_X; y++) {
                const estado = tableroArr[x][y];
                const pixel = pixeles[x * TABLERO_X + y]; //Aqui obtengo el pixel que corresponde
                if (pixel.dataset.status !== `${estado}`) {
                    pintarPixeles(estado, pixel);
                }
            }
        }
    }

    /**
     * Genera las posiciones de una powerUp en el tablero de juego.
     * @param {Object} tipo - El powerUp.
     */
    function nuevoPWUps(tipo) {
        const pos = {
            x:  undefined,
            y: undefined,
        };
        do {
            pos.x = Math.floor(Math.random() * TABLERO_X);
            pos.y = Math.floor(Math.random() * TABLERO_X);
        } while (
            !SNAKE.getCuerpo().every(
                (segmento) => pos.x !== segmento.posX && pos.y !== segmento.posY
            )
            );
        powerUp = new PowerUp(tipo, pos.x, pos.y);
    }

    /**
     * Maneja las colisiones en el juego.
     *
     * @param {Object} nuevaDir - La nueva posición a la que se mueve la serpiente.
     * @returns {boolean} - Devuelve false si ocurre una colisión, true en caso contrario.
     *
     * La función comienza verificando si la nueva posición está fuera del tablero de juego. Si lo está, la función devuelve `false`, indicando una colisión con los límites del tablero de juego.
     * A continuación, obtiene el valor en la nueva posición en el array `tableroArr`, que probablemente representa el tablero de juego. Este valor se asigna a la variable `colisiones`.
     * Luego, verifica si `colisiones` no es igual a `FONDO`, lo cual probablemente representa un espacio vacío en el tablero de juego. Si no lo es, significa que hay algo en la nueva posición.
     * Si `colisiones` es igual a `MANZANA`, lo cual probablemente representa una powerUp, crea un nuevo segmento en la nueva posición, lo agrega al principio del array `cuerpoSerpiente`, que representa el cuerpo de la serpiente, actualiza el cuerpo de la serpiente, incrementa la puntuación (`puntuacion`), actualiza la visualización de la puntuación y genera una nueva posición para la powerUp.
     * Si `colisiones` es igual a `CUERPO`, lo cual probablemente representa el cuerpo de la serpiente, devuelve `false`, indicando una colisión con el propio cuerpo de la serpiente.
     * Si `colisiones` es igual a `FONDO`, mueve cada segmento del cuerpo de la serpiente a la posición del segmento que está delante de él y mueve la cabeza de la serpiente a la nueva posición.
     * Finalmente, actualiza los recursos del juego utilizando la función `actualizarRecursos` y devuelve `true`, indicando que no hay colisión.
     */
    function manejarColisiones(nuevaDir) {
        if (SNAKE.chocaBorde(nuevaDir, TABLERO_X)) {
            return false;
        }

        if (SNAKE.chocaObj(nuevaDir, powerUp)) {
            SNAKE.crearSegmento(CUERPO);
            actualizarPuntuacion(powerUp.getPuntos());
            nuevoPWUps(MANZANA);
            return true;
        }
        return !SNAKE.seCome(nuevaDir);
    }
    /**
     * Actualiza los recursos del juego.
     */
    function actualizarRecursos() {
        actualizarArrayJuego();
        actualizarPixelesJuego();
    }

    /**
     * Función que se ejecuta cuando el juego termina.
     * Detiene el intervalo de tiempo, remueve el evento de teclado,
     * muestra un diálogo para recoger datos del usuario, guarda los datos del usuario,
     * cierra el diálogo y recarga la página.
     */
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
            guardarDatosUsuario(nombre, puntuacion);
            dialog.close();
            window.location.reload();
        });
        document.querySelector("#game_over").style.display = "block";
    }

    /**
     * Guarda los datos del usuario en el almacenamiento local.
     * @param {string} nombre - El nombre del usuario.
     * @param {number} puntuacion - La puntuación del usuario.
     */
    function guardarDatosUsuario(nombre, puntuacion) {
        // Crear un objeto de usuario con el nombre y puntuación
        let usuario = {
            nombre: nombre,
            puntuacion: puntuacion,
        };

        // Obtener la lista existente de usuarios
        let usuarios = localStorage.getItem("usuarios");

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
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    /**
     * Obtiene la lista de usuarios almacenados en localStorage.
     * @returns {Array} La lista de usuarios almacenados. Si no hay usuarios almacenados, devuelve un array vacío.
     */
    function obtenerDatosUsuarios() {
        // Obtener la lista de usuarios de localStorage
        let usuarios = localStorage.getItem("usuarios");

        // Comprobar si la lista de usuarios es null (es decir, si no había usuarios almacenados previamente)
        if (!usuarios) {
            // Si no había lista de usuarios, devolvemos un array vacío
            return [];
        }

        // Si había usuarios, los convertimos de JSON a un objeto JavaScript y los devolvemos
        return JSON.parse(usuarios);
    }

    /**
     * Oculta el elemento con el id "play".
     */
    function quitarPlay() {
        document.querySelector("#play").style.display = "none";
    }

    /**
     * Comprueba si la tecla presionada es una tecla válida para el juego.
     * @param {Object} event - El evento de teclado.
     * @returns {boolean} - Devuelve true si la tecla es válida, de lo contrario devuelve false.
     */
    function comprobarKey(event) {
        return (
            event.code === "ArrowLeft" ||
            event.code === "ArrowRight" ||
            event.code === "ArrowUp" ||
            event.code === "ArrowDown" ||
            event.code === "KeyW" ||
            event.code === "KeyA" ||
            event.code === "KeyS" ||
            event.code === "KeyD"
        );
    }
    /**
     * Maneja los eventos de movimiento en un juego.
     *
     * @param {Object} event - El objeto de evento del evento de movimiento.
     *
     * La función comienza verificando si el código del evento es una tecla válida para el movimiento utilizando la función `comprobarKey`. Esta función verifica si el código del evento es una de las teclas de flecha o las teclas WASD, que se utilizan comúnmente para el movimiento en los juegos.
     * Si el código del evento es una tecla válida, asigna el código del evento a la variable `codigo`. Si la puntuación (`puntuacion`) es 0, llama a la función `quitarPlay`, que oculta el botón de reproducción estableciendo su estilo de visualización en "none".
     * Luego, verifica si el código del evento no es nulo. Si no lo es, evita la acción predeterminada del evento si es posible. Esto se hace generalmente para evitar comportamientos específicos del navegador que podrían interferir con el juego.
     * A continuación, obtiene el primer segmento de la serpiente (`cabezaSerpiente`) y calcula la nueva posición (`nuevaPos`) basada en la dirección actual (`codigo`) y la posición actual de la cabeza de la serpiente (`cabezaSerpiente`).
     * Luego, verifica si la nueva posición es diferente de la posición actual. Si lo es, verifica las colisiones en la nueva posición utilizando la función `manejarColisiones`. Esta función verifica si la nueva posición está fuera del tablero de juego o si colisiona con el cuerpo de la serpiente o una powerUp. Si ocurre una colisión (es decir, `manejarColisiones` devuelve `false`), establece `juegoTerminado` en `true`.
     * Finalmente, si `juegoTerminado` es `true`, llama a la función `gameOver`, que finaliza el juego y muestra un mensaje de fin de juego. También elimina el escuchador de eventos para el evento de liberación de tecla, muestra un diálogo para recopilar datos del usuario y recarga la página después de que el usuario envíe sus datos.
     */
    function manejarEventoMovimiento(event) {
        if (comprobarKey(event)) {
            const codigo = event.code;
            if (puntuacion === 0) {
                quitarPlay();
            }
            if (codigo !== null) {

                if (event.preventDefault) {
                    event.preventDefault();
                }

                if (!codigoDireccionActual) codigoDireccionActual = codigo;

                const nuevaPos = SNAKE.mantieneDir(DIRECCION[codigoDireccionActual], DIRECCION[codigo]) ?
                    DIRECCION[codigoDireccionActual] : DIRECCION[codigo];

                if (nuevaPos === DIRECCION[codigo]) codigoDireccionActual = codigo;

                if (!manejarColisiones(nuevaPos)) {
                    juegoTerminado = true;
                }else{
                    SNAKE.moverSerpiente(nuevaPos);
                    actualizarRecursos();
                }
            }
        }
        if (juegoTerminado) {
            gameOver();
        }
    }

    /**
     * Función que realiza la animación del juego.
     * Se ejecuta en un intervalo de tiempo y maneja el evento de movimiento.
     */
    function animacionJuego() {
        idIntervalo = setInterval(() => {
            if (codigoDireccionActual) {
                manejarEventoMovimiento({ code: codigoDireccionActual });
            }
        }, intervalo);
    }

    window.addEventListener("keyup", manejarEventoMovimiento);
    inicio();
    animacionJuego();
};