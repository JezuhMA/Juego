export default function Snake(TAMANO_TABLERO) {
    
    let cabeza = { img: "imagenes/serpiente/", posicion : {x: TAMANO_TABLERO / 2, y: TAMANO_TABLERO / 2}};
    let abdomen = { img: "imagenes/serpiente/", posicion : {x: TAMANO_TABLERO / 2, y: TAMANO_TABLERO / 2 - 1}};

    return  {
        cabeza: cabeza,
        abdomen: abdomen,
        cuerpo : [cabeza,abdomen],
        //TODO modificar esta funcion para Mejorar el movimiento
        moverSnake : function moverSnake (movX , movY) {
            const nuevaParte = this.cuerpo[this.cuerpo.length - 1];
            //Movimiento del resto del cuerpo
            for (let i = 1; i < this.cuerpo.length; i++) {
                this.cuerpo[i].posicion.x = this.cuerpo[i - 1].posicion.x;
                this.cuerpo[i].posicion.y = this.cuerpo[i - 1].posicion.y;
                
            }
            //Movimiento de la cabeza
            this.cuerpo[0].posicion.x += movX;
            this.cuerpo[0].posicion.y += movY;
        },

        //limitarSnake devolverá true si alguna parte de la serpiente está fuera del tablero, y false si toda la serpiente está dentro del tablero.
        limitarSnake : function limitar (movX , movY) {
                const segmento = this.cuerpo[0];
                return (segmento.posicion.x + movX < 0 ||  segmento.posicion.x + movX > TAMANO_TABLERO - 1 ||
                        segmento.posicion.y + movY < 0 || segmento.posicion.y + movY > TAMANO_TABLERO - 1);
        }

    }
}
