async function registrar() {
    const username = document.getElementById("RegistroUser").value;
    const password = document.getElementById("RegistroPassword").value;
    const email = document.getElementById("RegistroEmail").value;
    const nombre = document.getElementById("RegistroNombre").value;
    const password2 = document.getElementById("PassCoindide").value;
    const url = "/jueguito_war/registro";
    if (password !== password2) {
        return Promise.reject({message: "Las contraseñas no coinciden"});
    }
    const data = {
        name: nombre,
        login: username,
        password: password,
        email: email,
    };

    if (username === "" || password === "" || email === "" || nombre === "") {
        return Promise.reject({message: "No puede haber campos vacíos"});
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();

    if (response.status === 200) {

       if (Object.hasOwnProperty.call(json, "token")) {
           localStorage.setItem("token", json.token);
       }

    }else {
        return Promise.reject(json);
    }
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Submit").addEventListener("click", function(event) {
        event.preventDefault();
        event.target.disabled = true;
        registrar().catch(reason =>  {
            if (reason.message) {
                alert(reason.message);
            } else {
                alert("Error desconocido");
            }
            event.target.disabled = false;
        });

    });
});