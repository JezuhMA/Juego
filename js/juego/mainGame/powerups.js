//posiciones tiene que ser array con dos coordenadas la primera X la segunda Y
export default function PowerUps(id, posiciones) {

    const seguimiento = new Map();
    let idSeguimiento = 0;

    function posicionar() {
        const posicionamiento = { x: null, y: null };
        for (const prop of posicionamiento) {
            if (Object.hasOwnProperty.call(prop, posicionamiento)) {
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
                };
            case 'PosinedApple':

                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/poisonedApple',
                    alt: 'imagen no encontrada',
                };
            case 'Star':
                return {
                    status: 'OK',
                    img: 'imagenes/juego/powerups/star',
                    alt: 'imagen no encontrada',
                };
            case 'Portal':
                return {
                    status: 'OK',
                    imgEntrada: 'imagenes/juego/powerups/portalEntrada',
                    imgSalida: 'imagenes/juego/powerups/portalSalida',
                    alt: 'imagen no encontrada',
                };
            default:
                return {
                    status: 'Not found',
                    error: 'parametro equivocado a la hora de introducir el id del powerup',
                };
        }
    }

    function addPowerUP(id) {

        const powerUpObj = {
            id: id,
            posicion: posicionar(),
            img: establecerImagen(id),
        };

        switch (id) {
            case 'Apple':
            case 'PosinedApple':
            case 'Star':
            case 'Portal':
                seguimiento.set(idSeguimiento, powerUpObj);
                idSeguimiento++;
                return true;
            default:
                return false;
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