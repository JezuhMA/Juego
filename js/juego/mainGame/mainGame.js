import Snake from "./snake.js";

const TAMANO_TABLERO = 40;

const movimiento = { x: 0, y: -1 };

const serpi = new Snake(TAMANO_TABLERO);

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
		serpi.moverSnake(movimiento.x, movimiento.y);
		return true;
	}
	return false;
}

function animar() {
	if (animacionSerpiente()) {
		dibujarJuego();
	}

	requestAnimationFrame(animar);
}

window.onload = () => {
	dibujarJuego();
	intervalId = requestAnimationFrame(animar);
};
