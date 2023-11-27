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
    nave.style.left = `${posicion + (4*signo)}px`;
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

