document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moverIzquierda();
    }
    if(event.key === "ArrowRight"){
        moverDerecha();
    }
});

function moverIzquierda(){
    const nave = document.getElementById('nave');
    let posicion = parseFloat(nave.style.left);
    if (isNaN(posicion)) posicion = 0;
    nave.style.left = `${posicion - 4}px`;
}

function moverDerecha(){
    const nave = document.getElementById('nave');
    let posicion = parseFloat(nave.style.left);
    if (isNaN(posicion)) posicion = 0;
    nave.style.left = `${posicion + 4}px`;
}