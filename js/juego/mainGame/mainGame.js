const NUM_ESTRELLAS = 400;

let intervalId;

/*
const crearEstrellas = (cielo1, fragCielo1, fragCielo2) => {
    let posX, posY, opacidad;
    for (let i = 0; i < NUM_ESTRELLAS; i++) {
        posX = Math.random() * cielo1.clientWidth;
        posY = Math.random() * cielo1.clientHeight;
        opacidad = Math.random();

        const estrella = document.createElement("div");
        estrella.style.left = `${posX}px`;
        estrella.style.top = `${posY}px`;
        estrella.style.opacity = opacidad;

        if (i % 2 == 0) {
            estrella.classList.add("estrella");
            fragCielo1.appendChild(estrella);
        } else {
            estrella.classList.add("estrellaDos");
            fragCielo2.appendChild(estrella);
        }
    }
}
*/
const posicionNave = () => {
    const divJuego = document.querySelector('.juego');
    const nave = document.getElementById('nave');
    const anchura = (divJuego.clientWidth / 2) - nave.clientWidth / 2;

    nave.style.left = `${anchura}px`;
}

const iniciarAnimacion = () => {
    moverDisparo();
    intervalId = requestAnimationFrame(iniciarAnimacion);
}

window.onload = () => {
    
    posicionNave();
    
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
