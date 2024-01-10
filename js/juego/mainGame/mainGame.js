import Snake from "./snake.js";

const TAMANO_TABLERO = 40;

const movimiento = { x: 0, y: -1 };

const serpi = new Snake(TAMANO_TABLERO);

let seguirPixeles = [];

let intervalId;

//Movimiento de la serpiente
document.addEventListener("keydown", function (event) {
	movimiento.x = 0;
	movimiento.y = 0;
	if (event.key === "ArrowLeft") {
		movimiento.x = -1;
		movimiento.y = 0;
	}
	if (event.key === "ArrowUp") {
		movimiento.x = 0;
		movimiento.y = -1;
	}
	if (event.key === "ArrowDown") {
		movimiento.x = 0;
		movimiento.y = 1;
	}
	if (event.key === "ArrowRight") {
		movimiento.x = 1;
		movimiento.y = 0;
	}
});

function dibujarJuego() {
	const tablero = document.getElementById("tablero");
	const frag = document.createDocumentFragment();

	//Limpiamos si hubiera algo
	while (tablero.firstChild) {
		tablero.firstChild.remove();
	}

	for (let y = 0; y < TAMANO_TABLERO; y++) {
		for (let x = 0; x < TAMANO_TABLERO; x++) {
			const pixel = document.createElement("div");

			pixel.classList.add("pixel");

			pixel.style.left = `${20 * x}px`;
			pixel.style.top = `${20 * y}px`;
			pixel.dataset.x = x;
			pixel.dataset.y = y;

			if (
				serpi.cuerpo.some(
					(segemento) =>
						segemento.posicion.x === x && segemento.posicion.y === y
				)
			) {
				//const img = document.createElement('img');
				//img.src()
				//pixel.appendChild();
				pixel.style.background = "green";
			} else {
				//if(manzana.x === x && manzana.y === y){
				//pixel.style.background = 'red';
			}
			frag.appendChild(pixel);
		}
	}
	tablero.appendChild(frag);
}

function animacionSerpiente() {
	if (!serpi.limitarSnake(movimiento.x, movimiento.y)) {
		return serpi.moverSnake(movimiento.x, movimiento.y);
	}
	return null;
}

function actualizarPixeles(nuevaPosicion, antiguaPosicion) {
    // Borra el pixel en la antigua posición de la cola de la serpiente
    const pixelAntiguo = document.querySelector(`.pixel[data-x="${antiguaPosicion.x}"][data-y="${antiguaPosicion.y}"]`);
	const pixelNuevo = document.querySelector(`.pixel[data-x="${nuevaPosicion.x}"][data-y="${nuevaPosicion.y}"]`);
    pixelAntiguo.style.background = 'black';

    // Dibuja un nuevo pixel en la nueva posición de la cabeza de la serpiente
    
    pixelNuevo.style.background = 'green';
}


let ultimoTiempo = 0;
const FPS = 24; // Los FPS que deseas
const intervalo = 1000 / FPS; // Intervalo de tiempo en ms

function animar(tiempoActual) {
    requestAnimationFrame(animar);
    const deltaTiempo = tiempoActual - ultimoTiempo;

    if (deltaTiempo < intervalo) {
        // Si no ha pasado el intervalo de tiempo, no hacemos nada
        return;
    }

    // Guardamos el tiempo actual para el próximo cuadro
    ultimoTiempo = tiempoActual;

    let posiciones;
    if ((posiciones = animacionSerpiente()) != null) {
        const newPos = posiciones.nuevaPosicion;
        const antPos = posiciones.antiguaPosicion;
        actualizarPixeles(newPos, antPos);
    }else{
		//TODO: game over
	}
}

window.onload = () => {
    dibujarJuego();
    requestAnimationFrame(animar);
};