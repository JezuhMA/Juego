export default function Snake(TAMANO_TABLERO) {
    return  {
        posicion : {x: TAMANO_TABLERO / 2, y: TAMANO_TABLERO / 2},
        cabeza : "imagenes/serpiente/",
        
        moverSnake : function moverSnake (movX , movY) {
            let posicion = movY ? parseFloat(this.snake.style.left) : parseFloat(this.snake.style.bottom);
            if (isNaN(posicion)) posicion = 0;
            const signo = movX ? -1 : 1;
            const movimiento = this.limitarSnake(posicion , signo, movY);
            const direccion = movY ? 'left' : 'bottom';
            this.snake.style[direccion] = `${movimiento}px`;
        },

        limitarSnake : function limitar (posicion , signo, movY) {
            const tamPantalla = movY ? this.pantalla.clientWidth - this.snake.clientWidth : this.pantalla.clientHeight - this.snake.clientHeight;
            const limite = (posicion + 4 * signo);
            return limite <= 0 ? 0 : limite >= tamPantalla ? tamPantalla : limite;
        }

    }
}
