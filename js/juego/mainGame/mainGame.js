//Constante para definir el numero de enmigos
const enemigos = new Map();

let limit;

let juego;

let intervalId;

//Movimiento y disparo de la nave
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moverNave(true, true);
    }
    if (event.key === 'ArrowUp') {
        moverNave(false, false);
    }
    if (event.key === 'ArrowDown') {
        moverNave(true, false);
    }
    if(event.key === "ArrowRight"){
        moverNave(false, true);
    }
    if(event.key === " "){
        disparar();
    }
});

function moverNave(movX , movY){
    const nave = document.getElementById('nave');
    let posicion = movY ? parseFloat(nave.style.left) : parseFloat(nave.style.bottom);
    if (isNaN(posicion)) posicion = 0;
    const signo = movX ? -1 : 1;
    const movimiento = limitarNave(nave, posicion , signo, movY);
    const direccion = movY ? 'left' : 'bottom';
    nave.style[direccion] = `${movimiento}px`;
}

function limitarNave(nave, posicion , signo, movY){
    const pantalla = document.querySelector('.juego');
    const tamPantalla = movY ? pantalla.clientWidth - nave.clientWidth : pantalla.clientHeight - nave.clientHeight;
    const limite = (posicion + 4 * signo);
    return limite <= 0 ? 0 : limite >= tamPantalla ? tamPantalla : limite;
}

function disparar(){
    const disparo = document.createElement('div');
    const nave = document.getElementById('nave');
    const posicion = parseFloat(nave.style.left);
    disparo.classList.add('disparo');
    const centrar = (parseFloat(nave.clientWidth) / 2) - 1.5;
    disparo.style.bottom = `${nave.clientHeight - 5}px`
    disparo.style.left = `${centrar + posicion}px`;
    nave.appendChild(disparo);
}

const posicionNave = () => {
    const divJuego = document.querySelector('.juego');
    const nave = document.getElementById('nave');
    const anchura = (divJuego.clientWidth / 2) - nave.clientWidth / 2;

    nave.style.left = `${anchura}px`;
}
//Animacion de la pantalla
const iniciarAnimacion = () => {
    moverDisparo();
    crearEnemigos();
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onload = () => {
    
    posicionNave();
    juego = document.querySelector('.juego');
    limit = juego.clientHeight;
    
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onresize = () => {
    
    cancelAnimationFrame(intervalId);

    posicionNave();

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
    const juego = document.querySelector('.juego');
    const limit = juego.clientHeight;
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
        const div = document.querySelector("#enemigos");
        enemigo.classList.add("enemigo");
        enemigo.style.top = `${Math.random()*div.clientHeight}px`;
        enemigo.style.left = `${Math.random()*div.clientWidth}px`;
        frag.appendChild(enemigo);
        div.appendChild(frag);
    }
}

function limiteInferior(newTop){
    const fuera = limit < newTop - 34;
    return fuera;
}