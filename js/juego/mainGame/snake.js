export default function Snake(posiciones) {

    function posicionar(posX, posY) {
        const posicionamiento = { x: posiciones[0], y: posiciones[1] };
        if (posX != undefined || posX != null) posicionamiento.x += posX;
        if (posY != undefined || posY != null) posicionamiento.y += posY;
        return posicionamiento;
    }
    let cabeza = { img: "imagenes/serpiente/", posicion: posicionar() };
    let abdomen = { img: "imagenes/serpiente/", posicion: posicionar(null, -1) };

    //TODO: Hacer el cuerpo dinamico y cambiar la posicion de origen segun el tablero
    return {
        cabeza: cabeza,
        abdomen: abdomen,
        cuerpo: [cabeza, abdomen],

        moverSnake: function (movX, movY) {
            // Crear una copia del último segmento de la serpiente
            let nuevoSegmento = Object.assign({}, this.cuerpo[this.cuerpo.length - 1]);

            // Mover cada segmento de la serpiente a la posición del segmento anterior
            this.moverSegmentos();

            // Mover la cabeza de la serpiente
            this.cuerpo[0].posicion.x += movX;
            this.cuerpo[0].posicion.y += movY;
            //TODO: comprobar que no se agrergue un nuevo segmento para el tema de identificar la serpiente con la antiguaposicion
            return { nuevaPosicion: this.cuerpo[0].posicion, antiguaPosicion: nuevoSegmento.posicion };
        },

        moverSegmentos: function () {
            for (let i = this.cuerpo.length - 1; i > 0; i--) {
                this.cuerpo[i].posicion = Object.assign({}, this.cuerpo[i - 1].posicion);
            }
        },

        //limitarSnake devolverá true si alguna parte de la serpiente está fuera del tablero, y false si toda la serpiente está dentro del tablero.
        limitarSnake: function (movX, movY) {
            const segmento = this.cuerpo[0];
            return (segmento.posicion.x + movX < 0 || segmento.posicion.x + movX > 20 - 1 ||
                segmento.posicion.y + movY < 0 || segmento.posicion.y + movY > 20 - 1);
        }

    }
}