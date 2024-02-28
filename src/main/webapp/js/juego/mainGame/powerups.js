const tipo = {
    manzana: 3,
}

const puntos = {
    manzana : 2,
}

export function PowerUp(tipoPWUp, posX, posY) {
    return {
        parte: tipo[tipoPWUp],

        posX: posX,

        posY: posY,

        puntuacion: puntos[tipoPWUp],

        getParte: function () {
            return this.parte;
        },

        getPosX: function () {
            return this.posX;
        },

        getPosY: function () {
            return this.posY;
        },

        getPuntos: function () {
            return this.puntuacion;
        },
    }
}