export function Snake(){
    return {
        //VARIABLE
        cuerpo: [],
        //CONSTANTE
        partes: {
            CABEZA_SERPIENTE : 1,
            CUERPO : 2,
        },

        cons: function(cabeza, posInX, posInY){
            this.cuerpo = [this.crearSegmento(cabeza, posInX, posInY)];
        },

        crearSegmento: function (nuevaParte, nPosX, nPosY){
          return {
              parte: this.partes[nuevaParte],
              posX: nPosX,
              posY: nPosY,
          }
        },

        addSegmento: function (objSegmento) {
            this.getCuerpo().push(objSegmento);
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

        getCabeza: function () {
            return this.cuerpo[0];
        },

        getCuerpo: function () {
            return this.cuerpo;
        },
    }
}