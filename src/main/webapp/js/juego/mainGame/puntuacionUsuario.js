export function PuntuacionUsuario(puntos) {
    return {

        puntuacion: puntos,

        puntuacionMax: undefined,

        /**
         * Guarda los datos del usuario en el almacenamiento local.
         * @param {string} nombre - El nombre del usuario.
         * @param {number} puntuacion - La puntuación del usuario.
         */
        guardarDatosUsuario: function (nombre, puntuacion) {
            let usuario = {
                nombre: nombre,
                puntuacion: puntuacion,
            };

            let usuarios = localStorage.getItem("usuarios");

            if (!usuarios) {
                usuarios = [usuario];
            } else {
                usuarios = JSON.parse(usuarios);

                usuarios.push(usuario);
            }

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        },

        incrementarPuntuacion: function (puntos){
            this.puntuacion += puntos;
        },

        /**
         * La puntuación máxima se almacena en el almacenamiento local para persistencia.
         *
         * @function
         * @param {number} puntos
         * @name actualizarPuntuacion
         */
        guardaPuntuacionMax: function (puntos) {
            this.puntuacionMax = puntos;
            localStorage.setItem("maxPuntuacion", `${this.puntuacionMax}`);
        },

        /**
         * Obtiene la lista de usuarios almacenados en localStorage.
         * @returns {Array} La lista de usuarios almacenados. Si no hay usuarios almacenados, devuelve un array vacío.
         */
        obtenerDatosUsuarios: function () {
            let usuarios = localStorage.getItem("usuarios");

            if (!usuarios) {
                return [];
            }

            return JSON.parse(usuarios);
        }
    }
}