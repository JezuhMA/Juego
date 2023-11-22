window.onload = () => {
    //creacion de las primeras 500 estrellas
    const cielo1 = document.getElementById("cielo-1");
    const fragCielo1 = document.createDocumentFragment();
    const cielo2 = document.getElementById("cielo-2");
    const fragCielo2 = document.createDocumentFragment();
    let posX;
    let posY;
    let opacidad;
    for (let i = 0; i < 1000; i++) {
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
    
    cielo1.appendChild(fragCielo1);
    cielo2.appendChild(fragCielo2);
    
}

window.onresize = () => {

    const cielo1 = document.getElementById("cielo-1");
    const fragCielo1 = document.createDocumentFragment();
    const cielo2 = document.getElementById("cielo-2");
    const fragCielo2 = document.createDocumentFragment();
    let posX;
    let posY;
    let opacidad;
    for (let i = 0; i < 1000; i++) {
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
}