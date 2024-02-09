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
     * @const {number} MANZANA - Representa el estado de una manzana en una celda del tablero de juego.
     * @const {Object} DIRECCION - Mapea los códigos de tecla a vectores de dirección.
     * @let {string} codigoDireccionActual - Almacenará el código de dirección actual.
     * @let {number} puntuacion - Almacena la puntuación actual, inicializada en 0.
     * @let {boolean} juegoTerminado - Indica si el juego ha terminado.
     * @let {number} idIntervalo - Almacenará el ID del intervalo establecido por `setInterval`.
     * @const {number} FPS - Define los fotogramas por segundo deseados.
     * @const {number} intervalo - Define el intervalo entre fotogramas en milisegundos.
     * @let {Array} cuerpoSerpiente - Almacenará los segmentos del cuerpo de la serpiente.
     * @let {Object} manzana - Un segmento que representa una manzana.
     * @const {number} POSX_INICIAL_SERPIENTE - Define la posición inicial en x de la serpiente.
     * @const {number} POSY_INICIAL_SERPIENTE - Define la posición inicial en y de la serpiente.
     */

    const TABLERO_X = 30;
    const separacionPixeles = 100 / TABLERO_X; // % de separacion entre pixeles
    const tableroArr = [];
    const pixeles = [];

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
    let puntuacion = 0; // Puntuacion inicial
    let juegoTerminado = false;
    let idIntervalo;

    const FPS = 10; // Los FPS que deseas
    const intervalo = 1000 / FPS; // Intervalo de tiempo en ms

    const cuerpoSerpiente = [];
    const manzana = newSegmento(MANZANA);
    const POSX_INICIAL_SERPIENTE = 15;
    const POSY_INICIAL_SERPIENTE = 15;

    /**
     * Crea un nuevo objeto de segmento con el estado y las posiciones proporcionadas.
     *
     * @param {any} estado - El estado del nuevo segmento.
     * @param {number} positionX - La coordenada x del nuevo segmento.
     * @param {number} positionY - La coordenada y del nuevo segmento.
     * @returns {Object} Un nuevo objeto de segmento con el estado y las posiciones proporcionadas.
     */
    function newSegmento(estado, positionX, positionY) {
        return {
            estado: estado,
            posX: positionX,
            posY: positionY,
        };
    }

    /**
     * Aplica estilos a un elemento píxel basado en los parámetros proporcionados.
     *
     * @param {HTMLElement} pixel - El elemento píxel al que se le aplicarán los estilos.
     * @param {string} estado - El estado del píxel.
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
    function actualizarPuntuacion() {
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
     * Inicializa una serpiente para un juego de serpientes. Crea dos segmentos de la serpiente, la cabeza y el cuello, y los añade al array `cuerpoSerpiente`, que representa el cuerpo de la serpiente.
     *
     * @function
     * @name initSerpiente
     * @returns {Object} Un objeto que contiene la cabeza y el cuello de la serpiente.
     */
    function initSerpiente() {
        const cabeza = newSegmento(
            CABEZA_SERPIENTE,
            POSX_INICIAL_SERPIENTE,
            POSY_INICIAL_SERPIENTE
        );

        cuerpoSerpiente.push(cabeza);

        return { cabeza};
    }

    /**
     * Define el estado de un píxel basado en sus coordenadas y las posiciones de la cabeza, el cuello y la manzana.
     * @param {number} x - La coordenada x del píxel.
     * @param {number} y - La coordenada y del píxel.
     * @param {object} cabeza - El objeto que representa la cabeza de la serpiente.
     * @param {object} manzana - El objeto que representa la manzana.
     * @returns {number} El estado del píxel.
     */
    function definirPixelStatus(x, y, cabeza, manzana) {
        let estado = FONDO;
        if (x === cabeza.posX && y === cabeza.posY) {
            estado = CABEZA_SERPIENTE;
        }
        else if (x === manzana.posX && y === manzana.posY) {
            estado = MANZANA;
        }
        return estado;
    }

    /**
     * Genera el tablero del juego con los elementos proporcionados.
     *
     * @param {number} cabeza - Coordenada de la cabeza de la serpiente.
     * @param {number} manzana - Coordenada de la manzana.
     */
    function generarTablero(cabeza, manzana) {
        const tablero = document.querySelector("#tablero");
        const frag = document.createDocumentFragment();
        for (let x = 0; x < TABLERO_X; x++) {
            tableroArr[x] = [];
            for (let y = 0; y < TABLERO_X; y++) {
                const pixel = document.createElement("div");
                const estado = definirPixelStatus(x, y, cabeza, manzana);
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
        const { cabeza} = initSerpiente();
        generarPosicionesManzana(manzana);
        generarTablero(cabeza, manzana);
        initTablaPuntuacion();
        actualizarPuntuacion();
    }
    /**
     * Actualiza el array de juego con los valores correspondientes
     * de los estados de la serpiente y la manzana.
     */
    function actualizarArrayJuego() {
        for (let x = 0; x < TABLERO_X; x++) {
            for (let y = 0; y < TABLERO_X; y++) {
                tableroArr[x][y] = FONDO;
            }
        }
        cuerpoSerpiente.forEach((segmento) => {
            tableroArr[segmento.posX][segmento.posY] = segmento.estado;
        });
        tableroArr[manzana.posX][manzana.posY] = manzana.estado;
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
     * Genera las posiciones de una manzana en el tablero de juego.
     * @param {Object} manzana - El objeto de la manzana.
     */
    function generarPosicionesManzana(manzana) {
        let x, y;
        do {
            x = Math.floor(Math.random() * TABLERO_X);
            y = Math.floor(Math.random() * TABLERO_X);
        } while (
            !cuerpoSerpiente.every(
                (segmento) => x !== segmento.posX && y !== segmento.posY
            )
            );
        manzana.posY = y;
        manzana.posX = x;
    }

    /**
     * Actualiza el estado de la serpiente.
     */
    function actualizarSerpiente() {
        for (let i = 0; i < cuerpoSerpiente.length; i++) {
            if (i !== 0 && i !== 1) {
                cuerpoSerpiente[i].estado = CUERPO;
            } else if (i === 1) {
                cuerpoSerpiente[i].estado = CUERPO;
            }
        }
    }
    /**
     * Maneja las colisiones en el juego.
     *
     * @param {Object} cabeza - La cabeza de la serpiente.
     * @param {Object} nuevaPos - La nueva posición a la que se mueve la serpiente.
     * @returns {boolean} - Devuelve false si ocurre una colisión, true en caso contrario.
     *
     * La función comienza verificando si la nueva posición está fuera del tablero de juego. Si lo está, la función devuelve `false`, indicando una colisión con los límites del tablero de juego.
     * A continuación, obtiene el valor en la nueva posición en el array `tableroArr`, que probablemente representa el tablero de juego. Este valor se asigna a la variable `colisiones`.
     * Luego, verifica si `colisiones` no es igual a `FONDO`, lo cual probablemente representa un espacio vacío en el tablero de juego. Si no lo es, significa que hay algo en la nueva posición.
     * Si `colisiones` es igual a `MANZANA`, lo cual probablemente representa una manzana, crea un nuevo segmento en la nueva posición, lo agrega al principio del array `cuerpoSerpiente`, que representa el cuerpo de la serpiente, actualiza el cuerpo de la serpiente, incrementa la puntuación (`puntuacion`), actualiza la visualización de la puntuación y genera una nueva posición para la manzana.
     * Si `colisiones` es igual a `CUERPO`, lo cual probablemente representa el cuerpo de la serpiente, devuelve `false`, indicando una colisión con el propio cuerpo de la serpiente.
     * Si `colisiones` es igual a `FONDO`, mueve cada segmento del cuerpo de la serpiente a la posición del segmento que está delante de él y mueve la cabeza de la serpiente a la nueva posición.
     * Finalmente, actualiza los recursos del juego utilizando la función `actualizarRecursos` y devuelve `true`, indicando que no hay colisión.
     */
    function manejarColisiones(cabeza, nuevaPos) {
        if (
            nuevaPos.x < 0 ||
            nuevaPos.x >= TABLERO_X ||
            nuevaPos.y < 0 ||
            nuevaPos.y >= TABLERO_X
        ) {
            return false;
        }
        let colisiones = tableroArr[nuevaPos.x][nuevaPos.y];
        if (colisiones !== FONDO) {
            if (colisiones === MANZANA) {
                // Veo si se come una manzana aqui crece
                const segmento = newSegmento(CABEZA_SERPIENTE, nuevaPos.x, nuevaPos.y);
                cuerpoSerpiente.unshift(segmento); //Añado al principio del array
                actualizarSerpiente();
                puntuacion++;
                actualizarPuntuacion();
                generarPosicionesManzana(manzana);
            } else if (colisiones === CUERPO) {
                //veo que no se coma a si misma
                return false;
            }
        } else {
            // Aqui avanza normal
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
            console.log(nombre);
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
     * Calcula una nueva posición basada en la posición actual y una dirección.
     *
     * @param {Object} cabeza - La posición actual, con las propiedades posX y posY.
     * @param {number} codigo - El código de dirección. Si no se proporciona, se utiliza el código de dirección actual.
     * @param {number} codigoDireccionActual - El código de dirección actual.
     * @returns {Object} nuevaPos - La nueva posición después de moverse en la dirección especificada.
     *
     * La función comienza creando un objeto `nuevaPos` con las propiedades `x` e `y` que se establecen inicialmente en la posición actual de la "cabeza" (`cabeza.posX`, `cabeza.posY`).
     * A continuación, verifica si no se proporciona un código de dirección (`codigo`) y si existe un código de dirección actual (`codigoDireccionActual`). Si este es el caso, establece `codigo` en el valor de `codigoDireccionActual`. Esto significa que si no se proporciona una nueva dirección, se utilizará la dirección actual.
     * Luego, llama a la función `validarDireccion` con `codigo` y `codigoDireccionActual` como argumentos. Esta función se encarga de validar la nueva dirección y devolverla. Si la nueva dirección es opuesta a la actual, la función devuelve la dirección actual en su lugar (evitando un movimiento en dirección opuesta). Si se proporciona una nueva dirección válida, actualiza la dirección actual con la nueva.
     * Si `validarDireccion` devuelve una dirección válida (`direccionNueva`), el código actualiza `nuevaPos.x` y `nuevaPos.y` sumando los valores `x` e `y` de `direccionNueva` a ellos. Esto mueve efectivamente la posición en la dirección especificada por `direccionNueva`.
     * Finalmente, se devuelve el objeto `nuevaPos` actualizado. Este objeto representa la nueva posición después del movimiento en la dirección especificada.
     */
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
    /**
     * Valida una nueva dirección en comparación con la dirección actual.
     *
     * @param {number} codigo - El código de la nueva dirección.
     * @param {number} codDireccionActual - El código de la dirección actual.
     * @returns {Object} - La nueva dirección después de la validación.
     *
     * La función comienza obteniendo la nueva dirección (`nuevaDireccion`) de `DIRECCION` utilizando el código de dirección proporcionado (`codigo`).
     * A continuación, verifica si tanto `nuevaDireccion` como `codDireccionActual` son verdaderos. Si lo son, obtiene la dirección actual (`direccionActualCodigo`) de `DIRECCION` utilizando el código de dirección actual (`codDireccionActual`).
     * Luego, verifica si los valores `x` e `y` de `direccionActualCodigo` son los negativos de los valores `x` e `y` de `nuevaDireccion`, respectivamente. Si lo son, significa que la nueva dirección es opuesta a la dirección actual. En este caso, la función devuelve `direccionActualCodigo`, evitando efectivamente un movimiento en dirección opuesta.
     * Si la nueva dirección no es opuesta a la dirección actual, la función verifica si `codigo` es verdadero. Si lo es, actualiza `codigoDireccionActual` con `codigo`, actualizando así la dirección actual con la nueva dirección.
     * Finalmente, la función devuelve `nuevaDireccion`, que es la nueva dirección después de la validación. Si la nueva dirección era opuesta a la dirección actual, `nuevaDireccion` sería igual a la dirección actual. De lo contrario, sería la dirección especificada por `codigo`.
     */
    function validarDireccion(codigo, codDireccionActual) {
        const nuevaDireccion = DIRECCION[codigo];
        if (nuevaDireccion && codDireccionActual) {
            const direccionActualCodigo = DIRECCION[codDireccionActual];
            if (
                direccionActualCodigo.x === -nuevaDireccion.x &&
                direccionActualCodigo.y === -nuevaDireccion.y
            ) {
                return direccionActualCodigo; //Aqui no se puede ir en la direccion contraria
            }
        }
        if (codigo) codigoDireccionActual = codigo; //Aqui actualizo la direccion
        return nuevaDireccion;
    }

    /**
     * Oculta el elemento con el id "play".
     */
    function quitarPlay() {
        document.querySelector("#play").style.display = "none";
    }

    /**
     * Comprueba si la tecla presionada es una tecla válida para el juego.
     * @param {Event} event - El evento de teclado.
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
     * Luego, verifica si la nueva posición es diferente de la posición actual. Si lo es, verifica las colisiones en la nueva posición utilizando la función `manejarColisiones`. Esta función verifica si la nueva posición está fuera del tablero de juego o si colisiona con el cuerpo de la serpiente o una manzana. Si ocurre una colisión (es decir, `manejarColisiones` devuelve `false`), establece `juegoTerminado` en `true`.
     * Finalmente, si `juegoTerminado` es `true`, llama a la función `gameOver`, que finaliza el juego y muestra un mensaje de fin de juego. También elimina el escuchador de eventos para el evento de liberación de tecla, muestra un diálogo para recopilar datos del usuario y recarga la página después de que el usuario envíe sus datos.
     */
    function manejarEventoMovimiento(event) {
        if (comprobarKey(event)) {
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

                if (
                    nuevaPos.x !== cabezaSerpiente.posX ||
                    nuevaPos.y !== cabezaSerpiente.posY
                ) {
                    if (!manejarColisiones(cabezaSerpiente, nuevaPos)) {
                        juegoTerminado = true;
                    }
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
