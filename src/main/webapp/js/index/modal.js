window.onsubmit = (event) =>{
    //TODO: comprobar credenciales
    event.preventDefault();
    const form = document.getElementById("inicioSesion");
    const datos = new FormData(form);
    const mensaje = document.getElementById("mensajes");
    const passInput = document.querySelector("#passWd");
    const credenciales = {
        passWd : null,
    }
    for(const [key, value] in datos.entries()){
        switch (key) {
            case "passWd": {
                credenciales.passWd = value;
                break;
            }
        }
    }
    function comprobarCredenciales(obj){
        for(const [key, value] of Object.entries(obj) ){
            if (Object.hasOwnProperty.call(obj, key)){
                switch (key) {
                    case "passWd" : {
                        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
                        return regex.test(value);
                    }
                }
            }
        }
        return false;
    }

    if (comprobarCredenciales(credenciales)){

    }else {
        const msj = document.createElement("span");
        msj.textContent = "Error la contraseña no cumple los requisitos especificados";
        mensaje.appendChild(msj);
        passInput.classList.add("error");
    }
    //Para cambiar el campo contraseña después de que no cumple el regex
    passInput.onfocus = (event =>{
       event.preventDefault();
       if (passInput.classList.contains("error")){
           passInput.classList.remove("error");
           if (mensaje.hasChildNodes()) {
               mensaje.childNodes.forEach(child => {
                   child.remove();
               })
           }
       }
    });
}