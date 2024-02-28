const partes =  {
        cabeza : 1,
        cuerpo : 2,
    }

export function Snake(cuerpoInit, posX, posY){
    return {
        //VARIABLE
        cuerpo: [{
            parte: partes[cuerpoInit],
            posX: posX,
            posY: posY,
        }],

        crearSegmento: function (nuevaParte){
           this.getCuerpo().push({
              parte: partes[nuevaParte],
              posX: 0,
              posY: 0,
          });
        },

        moverSerpiente: function (nuevaPos) {
            const cabeza = this.getCabeza();
            const cuerpoSerpiente = this.getCuerpo();

            for (let i = cuerpoSerpiente.length - 1; i > 0; i--) {
                cuerpoSerpiente[i].posX = cuerpoSerpiente[i - 1].posX;
                cuerpoSerpiente[i].posY = cuerpoSerpiente[i - 1].posY;
            }
            cabeza.posX += nuevaPos.x;
            cabeza.posY += nuevaPos.y;
        },
        /*
            Devuelve verdadero si choca con los bordes del tablero
         */
        chocaBorde: function (direccion, TABLERO_X) {
            const nuevaPos = structuredClone(this.getCabeza());
            nuevaPos.posX += direccion.x;
            nuevaPos.posY += direccion.y;
            return nuevaPos.posX < 0 ||
                nuevaPos.posX >= TABLERO_X ||
                nuevaPos.posY < 0 ||
                nuevaPos.posY >= TABLERO_X
        },

        chocaObj: function (direccion, obj) {
            const nuevaPos = structuredClone(this.getCabeza());
            nuevaPos.posX += direccion.x;
            nuevaPos.posY += direccion.y;
            return nuevaPos.posX === obj.posX &&
                nuevaPos.posY === obj.posY
        },

        seCome: function (direccion) {
            const nuevaPos = structuredClone(this.getCabeza());
            nuevaPos.posX += direccion.x;
            nuevaPos.posY += direccion.y;
            return this.getCuerpo().some(trozo => trozo.posX === nuevaPos.posX && trozo.posY === nuevaPos.posY);
        },

        mantieneDir: function (direccionActual, nuevaDireccion){
            return direccionActual.x === -nuevaDireccion.x &&
            direccionActual.y === -nuevaDireccion.y
        },

        getCabeza: function () {
            return this.cuerpo[0];
        },

        getCuerpo: function () {
            return this.cuerpo;
        },
    }
}