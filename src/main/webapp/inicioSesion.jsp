<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serpiente</title>
  <link rel="stylesheet" href="css/estilosDialogs.css"/>
</head>
<body>
<!--Cuadro de Dialogo para un formulario-->
<div class="modalDialog">
    <form method="GET" id="inicioSesion" action="ServletInicio"> <!--Para hacer login-->
      <fieldset>
        <legend>Iniciar Sesion</legend>
        <!--No tiene cuenta-->
        <p>¿Es tu primera vez? <a href="ServletInicio" id="registro" class="enlace">Registrate</a></p>
        <label for="email">Email*</label>
        <input type="text" id="email" name="email" placeholder="Email"/>
        <label for="passWd">Contraseña*</label>
        <input type="password" id="passWd" name="passWd" placeholder="Contraseña"/>
        <span id="passOlvidada" class="enlace">¿Olvidaste la contraseña?</span><br>
        <label>
          <input type="hidden" name="inicio" value="OK">
        </label>
        <button>Iniciar Sesion</button> <!--Aceptar-->
      </fieldset>
    </form>
</div>
<script src="js/index/modal.js" ></script>
</body>
</html>