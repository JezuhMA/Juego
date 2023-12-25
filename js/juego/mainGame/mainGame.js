import Snake from './snake.js';
//Constante para definir el numero de enmigos
const enemigos = new Map();

const serpi = new Snake();

let limit;

let intervalId;

//Movimiento y disparo de la nave
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

function disparar(){
    //TODO: transformar funcion
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
    
    posicionSnake();
    limit = serpi.pantalla.clientHeight;
    
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onresize = () => {
    
    cancelAnimationFrame(intervalId);

    posicionSnake();

    intervalId = requestAnimationFrame(iniciarAnimacion);
}

const moverDisparo = () => {
    const disparos = document.querySelectorAll('.disparo');
    if (disparos[0] != null || disparos[0] != undefined){
        disparos.forEach((disparo) =>{
            let bottom = parseFloat(disparo.style.bottom);
            if(isNaN(bottom)) bottom = 0;
            disparo.style.bottom = `${bottom + 2}px`;
            if(limiteSuperior(disparo)) disparo.remove();
        })
    }
}

const limiteSuperior = (disparo) => {
    const fuera = limit < parseFloat(disparo.style.bottom) - 4;
    return fuera;
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
