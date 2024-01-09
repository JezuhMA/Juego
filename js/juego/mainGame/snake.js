export default function Snake(TAMANO_TABLERO) {
    
    let cabeza = { img: "imagenes/serpiente/", posicion : {x: TAMANO_TABLERO / 2, y: TAMANO_TABLERO / 2}};
    let abdomen = { img: "imagenes/serpiente/", posicion : {x: TAMANO_TABLERO / 2, y: TAMANO_TABLERO / 2 - 1}};

    return  {
        cabeza: cabeza,
        abdomen: abdomen,
        cuerpo : [cabeza,abdomen],
        //TODO modificar esta funcion para Mejorar el movimiento
        moverSnake : function moverSnake (movX , movY) {
            this.cuerpo.forEach(segmento => {
                segmento.posicion.x += movX;
                segmento.posicion.y += movY;
            });
        },

        //limitarSnake devolverá true si alguna parte de la serpiente está fuera del tablero, y false si toda la serpiente está dentro del tablero.
        limitarSnake : function limitar () {
            return this.cuerpo.some(segmento => {
                return (segmento.posicion.x < 0 ||  segmento.posicion.x > TAMANO_TABLERO ||
                        segmento.posicion.y < 0 || segmento.posicion.y > TAMANO_TABLERO);
            });
        }

    }
}
