// Dependencies: comprobarUsuario.js

function login() {
    const username = document.getElementById("LoginUser").value;
    const password = document.getElementById("LoginPassword").value;
    const url = "/jueguito_war/login";
    comprobarUsuario(username, password);
    const data = {
        username: username,
        password: password
    };
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener("click", function(event) {
        event.preventDefault();
        event.target.disabled = true;
        login();
        event.target.disabled = false;
    });
});