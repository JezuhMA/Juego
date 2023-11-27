const NUM_ESTRELLAS = 100;
const INTERVALO = 1000 / 60;

const estrellas = [];
let intervalId;

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

        estrellas.push(estrella);
    }
}

const posicionNave = () => {
    const divJuego = document.querySelector('.juego');
    const nave = document.getElementById('nave');
    const anchura = (divJuego.clientWidth / 2) - nave.clientWidth / 2;

    nave.style.left = `${anchura}px`;
}

window.onload = () => {
    
    const cielo1 = document.getElementById("cielo-1");
    const cielo2 = document.getElementById("cielo-2");
    const fragCielo1 = document.createDocumentFragment();
    const fragCielo2 = document.createDocumentFragment();
    posicionNave();

    crearEstrellas(cielo1, fragCielo1, fragCielo2);

    cielo1.appendChild(fragCielo1);
    cielo2.appendChild(fragCielo2);

    intervalId = setInterval(() => {
        moverEstrellas(cielo1);
        moverDisparo();
    }, INTERVALO);
}

window.onresize = () => {
    clearInterval(intervalId);

    const cielo1 = document.getElementById("cielo-1");
    const cielo2 = document.getElementById("cielo-2");
    const fragCielo1 = document.createDocumentFragment();
    const fragCielo2 = document.createDocumentFragment();
    posicionNave();

    crearEstrellas(cielo1, fragCielo1, fragCielo2);

    cielo1.replaceChildren(fragCielo1);
    cielo2.replaceChildren(fragCielo2);

    intervalId = setInterval(() => moverEstrellas(cielo1), INTERVALO);
}

const moverEstrellas = (cielo) => {
    estrellas.forEach((estrella) => {
        let top = parseFloat(estrella.style.top);
        if(isNaN(top)) top = Math.random() * - 200;
        if(top > cielo.clientHeight){
            top = Math.random() * - 200;
            estrella.style.left = `${Math.random() * cielo.clientWidth} px`
        }
        estrella.style.top = `${top + 2}px`;
    });
}

const moverDisparo = () => {
    const disparos = document.querySelectorAll('.disparo');
    if (disparos[0] != null || disparos[0] != undefined){
        disparos.forEach((disparo) =>{
            let bottom = parseFloat(disparo.style.bottom);
            if(isNaN(bottom)) bottom = 0;
            disparo.style.bottom = `${bottom + 2}px`;
        })
    }
}

