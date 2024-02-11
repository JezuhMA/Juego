<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- TODO: implementar varios idiomas  -->
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Juego de la serpiente</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/index/inicioYregistro.css">
</head>
<body>
<div id="stars"></div>
<div class="section">
    <div class="container">
        <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                    <h6 class="mb-0 pb-3"><span>Iniciar Sesión </span><span>Registro</span></h6>
                    <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                    <label for="reg-log"></label>
                    <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                            <div class="card-front">
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        <h4 class="mb-4 pb-3">Inicio Sesion</h4>
                                        <div class="form-group">
                                            <input id="LoginUser" type="text" class="form-style" placeholder="Nombre Usuario">
                                            <i class="input-icon uil uil-user"></i>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input id="LoginPassword" type="password" class="form-style" placeholder="Contraseña">
                                            <i class="input-icon uil uil-lock-alt"></i>
                                        </div>
                                        <a id="login" class="btn mt-4">Iniciar Sesion</a>
                                        <!--TODO hacer password recover--><p class="mb-0 mt-4 text-center"><a href="#" class="link">¿Olvidaste tu contraseña?</a></p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-back">
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        <h4 class="mb-3 pb-3">Sign Up</h4>
                                        <div class="form-group">
                                            <input type="text" class="form-style" id="RegistroNombre" placeholder="Nombre">
                                            <i class="input-icon uil uil-user"></i>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="email" class="form-style" id="RegistroUser" placeholder="Nombre de usuario">
                                            <i class="input-icon uil uil-user"></i>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="email" class="form-style" id="RegistroEmail" placeholder="Email">
                                            <i class="input-icon uil uil-at"></i>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="password" class="form-style" id="RegistroPassword" placeholder="Contraseña">
                                            <i class="input-icon uil uil-lock-alt"></i>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="password" class="form-style" id="PassCoindide" placeholder="Repite contraseña">
                                            <i class="input-icon uil uil-lock-alt"></i>
                                        </div>
                                        <a id="Submit" class="btn mt-4">Registro</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="js/index/login.js"></script>
<script src="js/index/registro.js"></script>
</html>
