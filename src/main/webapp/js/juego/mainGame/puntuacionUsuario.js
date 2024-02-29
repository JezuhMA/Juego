export function PuntuacionUsuario() {
    return {

        puntuacion: 0,

        /**
         * Guarda los datos del usuario en el almacenamiento local.
         * @param {string} nombre - El nombre del usuario.
         */
        guardarDatosUsuario: function (nombre) {
            let usuario = {
                nombre: nombre,
                puntuacion: this.puntuacion,
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
            localStorage.setItem("maxPuntuacion", `${puntos}`);
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
        },

        getPuntuacionMax : function () {
            return localStorage.getItem("maxPuntuacion");
        }
    }
}