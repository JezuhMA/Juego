import Snake from './snake.js';
//Constante para definir el numero de enmigos
const enemigos = new Map();
const TAMANO_TABLERO = 20;

const serpi = new Snake(TAMANO_TABLERO);

let intervalId;

//Movimiento de la serpiente
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        serpi.moverSnake(-20, 0);
    }
    if (event.key === 'ArrowUp') {
        serpi.moverSnake(0, 20);
    }
    if (event.key === 'ArrowDown') {
        serpi.moverSnake(0, -20);
    }
    if(event.key === "ArrowRight"){
        serpi.moverSnake(20, 0);
    }
    
    dibujarJuego();
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

            if (serpi.cuerpo.some(segemento => segemento.posicion.x === x && segemento.posicion.y === y)) {
                //const img = document.createElement('img');
                //img.src()
                //pixel.appendChild();
                pixel.style.background = 'green';
            } else {//if(manzana.x === x && manzana.y === y){
                //pixel.style.background = 'red';
            }
            frag.appendChild(pixel);
        }
        
    }
    tablero.appendChild(frag);
    
}

//Animacion de la pantalla
const iniciarAnimacion = () => {
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onload = () => {
    
    dibujarJuego();
    
    intervalId = requestAnimationFrame(iniciarAnimacion);
}