<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serpiente</title>
  <link rel="stylesheet" href="css/estilosDialogs.css"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>
<div>
    <c:if test="${mensajeBean != null}">
        <c:if test="${mensajeBean.mensaje != null}">
            <h1 class="${mensajeBean.estilo}">${mensajeBean.mensaje}</h1>
        </c:if>
    </c:if>
</div>
<!--Cuadro de Dialogo para un formulario-->
<div class="modalDialog">
    <form method="POST" id="inicioSesion" action="login"> <!--Para hacer login-->
      <fieldset>
        <legend>Iniciar Sesion</legend>
        <!--No tiene cuenta-->
        <p>¿Es tu primera vez? <a href="usuario/registro" id="registro" class="enlace">Registrate</a></p>
        <label for="email">Login*</label>
        <input type="text" id="email" name="login" placeholder="Nombre Usuario"/>
        <label for="passWd">Contraseña*</label> <div id="mensajes"></div>
        <input type="password" id="passWd" name="passWd" placeholder="Contraseña"/>
        <span id="passOlvidada" class="enlace">¿Olvidaste la contraseña?</span><br>
        <label>
          <input type="hidden" name="status" value="OK">
        </label>
        <button>Iniciar Sesion</button> <!--Aceptar-->
      </fieldset>
    </form>
</div>
<script src="js/index/modal.js" ></script>
</body>
</html>