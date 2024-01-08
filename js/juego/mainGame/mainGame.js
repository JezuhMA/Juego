import Snake from './snake.js';
//Constante para definir el numero de enmigos
const enemigos = new Map();

const serpi = new Snake();

let intervalId;

//Movimiento de la serpiente
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        serpi.moverSnake(true, true);
    }
    if (event.key === 'ArrowUp') {
        serpi.moverSnake(false, false);
    }
    if (event.key === 'ArrowDown') {
        serpi.moverSnake(true, false);
    }
    if(event.key === "ArrowRight"){
        serpi.moverSnake(false, true);
    }
    if(event.key === " "){
        disparar();
    }
});

function dibujarJuego(){
    const tablero = document.getElementById("tablero");
    const frag = document.createDocumentFragment();

    //Limpiamos si hubiera algo
    while (tablero.firstChild) {
        tablero.firstChild.remove();
    }

    for (let x = 0; x < TAMANO_TABLERO; x++) {
        for (let y = 0; y < TAMANO_TABLERO; y++) {
            const pixel = document.createElement('div');
            
            pixel.classList.add('pixel');

            pixel.style.left = `${20 * x}px`;
            pixel.style.top = `${20 * y}px`;

            if (serpi.cuerpo.some(segemento => segemento.x === x && segemento.y === y)) {
                
            } else {
                
            }
        }
        
    }
    
}

const posicionSnake = () => {
    const anchura = (serpi.pantalla.clientWidth / 2) - serpi.snake.clientWidth / 2;

    serpi.snake.style.left = `${anchura}px`;
}
//Animacion de la pantalla
const iniciarAnimacion = () => {
    moverDisparo();
    crearEnemigos();
    
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onload = () => {
    
    dibujarJuego();
    
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

//Enemigos
function agregarEnemigo(enemigo) {
    let clave = 1;
    if (!enemigos.has(clave)) {
        enemigos.set(clave, enemigo);
        return true;
    }
    return false;
}

function crearEnemigos(){
    const enemigo = document.createElement("div");
    if (agregarEnemigo(enemigo)) {
        const frag = document.createDocumentFragment();
        const div = serpi.pantalla;
        enemigo.classList.add("enemigo");
        enemigo.style.top = `${Math.random()*div.clientHeight}px`;
        enemigo.style.left = `${Math.random()*div.clientWidth}px`;
        frag.appendChild(enemigo);
        div.appendChild(frag);
    }
}
