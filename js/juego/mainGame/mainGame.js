//Constante para definir el numero de enmigos
const NUM_ENEMIGOS = 1;

const enemigos = new Map();

let limit;

let juego;

let intervalId;

//Movimiento y disparo de la nave
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moverNave(true);
    }
    if(event.key === "ArrowRight"){
        moverNave(false);
    }
    if(event.key === " "){
        disparar();
    }
});

function moverNave(izqder){
    const nave = document.getElementById('nave');
    let posicion = parseFloat(nave.style.left);
    if (isNaN(posicion)) posicion = 0;
    const signo = izqder ? -1 : 1;
    const movimiento = limitarNave(nave, posicion , signo);
    nave.style.left = `${movimiento}px`;  
}

function limitarNave(nave, posicion , signo){
    const pantalla = document.querySelector('.juego');
    const tamPantalla = pantalla.clientWidth - nave.clientWidth;
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
    moverEnemigos();
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
    let clave = `${enemigo.style.left},${enemigo.style.top}`;
    if (!enemigos.has(clave)) {
        enemigos.set(clave, enemigo);
        return true;
    }
    return false;
}

function crearEnemigos(){
    const frag = document.createDocumentFragment();
    const div = document.querySelector("#enemigos");
    for (let i = 0; i < NUM_ENEMIGOS; i++) {
        const enemigo = document.createElement("div");
        enemigo.classList.add("enemigo");
        enemigo.style.top = `${Math.random()*-100}px`;
        enemigo.style.left = `${Math.random()*div.clientWidth}px`;

        if (agregarEnemigo(enemigo)) {
            frag.appendChild(enemigo);
        }
    }
    div.appendChild(frag);
}




function moverEnemigos() {
    let enemigos = Array.from(document.getElementsByClassName('enemigo'));
    if (enemigos[0] != null || enemigos[0] != undefined){
        enemigos.forEach((enemigo) =>{
            let top = parseFloat(enemigo.style.top);
            if(isNaN(top)) top = 0;
            let newTop = top + 2;
            if(limiteInferior(newTop)) {
                enemigo.remove();
            } else {
                enemigo.style.top = `${newTop}px`;
            }
        })
    }
}

function limiteInferior(newTop){
    const fuera = limit < newTop - 34;
    return fuera;
}