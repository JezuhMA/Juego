const estrellas = [];
const fragCielo1 = document.createDocumentFragment();
const fragCielo2 = document.createDocumentFragment();
let intervalId;

window.onload = () => {
    const cielo1 = document.getElementById("cielo-1");
    const cielo2 = document.getElementById("cielo-2");

    let posX;
    let posY;
    let opacidad;
    for (let i = 0; i < 200; i++) {
        posX = Math.random() * cielo1.clientWidth;
        console.log(cielo1.clientWidth)
        posY = Math.random() * cielo1.clientHeight;
        opacidad = Math.random();

        //creacion estrella
        const estrella = document.createElement("div");
        estrella.style.left = `${posX}px`;
        estrella.style.top = `${posY}px`;
        estrella.style.opacity = opacidad;
        i%2 == 0 ?
        estrella.classList.add("estrella"):
        estrella.classList.add("estrellaDos");
        
        i%2 == 0 ?
        fragCielo1.appendChild(estrella):
        fragCielo2.appendChild(estrella);

        estrellas.push(estrella);
    }
    
    cielo1.appendChild(fragCielo1);
    cielo2.appendChild(fragCielo2);

    intervalId = setInterval(() => moverEstrellas(cielo1), 1000 / 60); // 60 veces por segundo
}

window.onresize = () => {
    clearInterval(intervalId);

    const cielo1 = document.getElementById("cielo-1");
    const cielo2 = document.getElementById("cielo-2");

    let posX;
    let posY;
    let opacidad;
    for (let i = 0; i < 200; i++) {
        posX = Math.random() * cielo1.clientWidth;
        posY = Math.random() * cielo1.clientHeight;
        opacidad = Math.random();

        //creacion estrella
        const estrella = document.createElement("div");
        estrella.style.left = `${posX}px`;
        estrella.style.top = `${posY}px`;
        estrella.style.opacity = opacidad;
        i%2 == 0 ?
        estrella.classList.add("estrella"):
        estrella.classList.add("estrellaDos");
        
        i%2 == 0 ?
        fragCielo1.appendChild(estrella):
        fragCielo2.appendChild(estrella);
    }

    cielo1.replaceChildren(fragCielo1);
    cielo2.replaceChildren(fragCielo2);

    intervalId = setInterval(() => moverEstrellas(cielo1), 1000 / 60); // 60 veces por segundo

}


const moverEstrellas = (cielo) => {
    estrellas.forEach((estrella) => {
        let top = parseFloat(estrella.style.top);
        if(isNaN(top)) top = Math.random() * - 200;
        if(top > cielo.clientHeight){
            top = Math.random() * - 200;
            estrella.style.left = `${Math.random() * cielo.clientWidth} px`
        }
        estrella.style.top = `${top + 1 }px`;
    });
}

