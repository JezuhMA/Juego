export default function PowerUps(id, posiciones) {
    const posicionX = posiciones[0];
    const posicionY = posiciones[1];
    const seguimiento = new Map();
    const idSeguimiento = 0;

    function posicionar(){
        for (const iterator of posiciones) {
            if(Object.hasOwnProperty.call(iterator, posiciones)){
                
            }
        }
    }
    function establecerImagen(id) {
        switch (id) {
            case 'Apple':

                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/apple',
                    alt: 'imagen no encontrada',
                }
                break;
            case 'PosinedApple':

                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/poisonedApple',
                    alt: 'imagen no encontrada',
                }
                break;
            case 'Star':
                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/star',
                    alt: 'imagen no encontrada',
                }
                break;
            case 'Portal':
                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/portalEntrada',
                    img: 'imagenes/juego/powerups/portalSalida',
                    alt: 'imagen no encontrada',
                }
                break;


            default:
                return {
                    status: 'Not found',
                    error: 'parametro equivocado a la hora de introducir el id del powerup',
                }
                break;
        }
    }

    function addPowerUP(id) {
        switch (id) {
            case 'Apple':
                seguimiento.set(idSeguimiento, id);
                idSeguimiento++;
                return true;

                break;
            case 'PosinedApple':

                seguimiento.set(idSeguimiento, id);
                idSeguimiento++;
                return true;

                break;
            case 'Star':
                seguimiento.set(idSeguimiento, id);
                idSeguimiento++;
                return true;
                break;
            case 'Portal':

                seguimiento.set(idSeguimiento, id);
                idSeguimiento++;
                return true;
                break;


            default:
                return false;
                break;
        }
    }

    function getSeguimiento(){
        return seguimiento;
    }

    return {
        id: id,
        posicion: posicionar(),
        img: establecerImagen(id),
        addPowerUp: addPowerUP(id),
        getMap : getSeguimiento(),
    };
}