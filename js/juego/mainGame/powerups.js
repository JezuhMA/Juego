//posiciones tiene que ser array con dos coordenadas la primera X la segunda Y
export default function PowerUps(id, posiciones) {

    const seguimiento = new Map();
    const idSeguimiento = 0;

    function posicionar() {
        const posicionamiento = { x: null, y: null };
        for (const prop of posicionamiento) {
            if (Object.hasOwnProperty.call(iterator, posicionamiento)) {
                for (const coorde of posiciones) {
                    posicionamiento[prop] = coorde;
                }
            }
        }
        return posicionamiento;
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

    function getSeguimiento() {
        return seguimiento;
    }

    return {
        id: id,
        posicion: posicionar(),
        img: establecerImagen(id),
        addPowerUp: addPowerUP(id),
        getMap: getSeguimiento(),
    };
}