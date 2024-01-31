<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Jesus
  Date: 28/01/2024
  Time: 8:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Registro</title>
    </head>
    <body>
        <form method="post" action="${pageContext.request.contextPath}/usuario/registro">
            <fieldset>
                <legend>Registro</legend>
                <label>Nombre
                    <input type="text" name="nombre">
                </label>
                <label>Apellido 1º
                    <input type="text" name="apellido1">
                </label>
                <label>Apellido 2º
                    <input type="text" name="apellido2">
                </label>
                <label for="login">Nombre de Usuario
                    <input id="login" name="login" type="text"/>
                </label>
                <label>Email
                    <input type="email" name="email"/>
                </label>
                <label>Contraseña
                    <input type="password" name="password" id="pass">
                </label>
                <label>Repite Contraseña
                    <input type="password" name="repPassword" id="repPass">
                </label>
                <label>Fecha Nacimiento
                    <input type="date" name="fechaNacimiento">
                </label>
                <button type="submit">Enviar</button>
            </fieldset>
        </form>
        <script src="${pageContext.request.contextPath}/js/index/registro.js"></script>
    </body>
</html>
