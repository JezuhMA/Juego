// Dependencies: comprobarUsuario.js

async function login() {
    const username = document.getElementById("LoginUser").value;
    const password = document.getElementById("LoginPassword").value;
    const url = "/jueguito_war/login";
    const data = {
        username: username,
        password: password
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.status === 200) {
        if (json.status === "OK") {
            location.href = "/jueguito_war/juego.html";
        } else {
            return Promise.reject(json);
        }
    }
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener("click", function(event) {
        event.preventDefault();
        event.target.disabled = true;
        login().catch(reason =>  {
            if (reason.message) {
                alert(reason.message);
            } else {
                alert("Error desconocido");
            }
            event.target.disabled = false;
        });

    });
});