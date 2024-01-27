<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
  <div id="" class="">
    <c:if test="${not empty mensajeBean.mensaje}">
      <h2 class="${mensajeBean.estilo}">${mensajeBean.mensaje}</h2>
    </c:if>
  </div>
    <form method="POST" id="inicioSesion" action="login"> <!--Para hacer login-->
      <fieldset>
        <legend>Iniciar Sesion</legend>
        <!--No tiene cuenta-->
        <p>¿Es tu primera vez? <a href="${pageContext.request.contextPath}/usuario/registro" class="enlace">Registrate</a></p>
        <label for="email">Nombre de Usuario</label>
        <input type="text" id="email" name="login" placeholder="Nombre de Usuario"/>
        <label for="passWd">Contraseña</label>
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