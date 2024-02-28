package com.example.jueguito.servlets;

import com.example.jueguito.beans.UsuarioBean;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.services.PasswordVerificationServices;
import com.example.jueguito.services.TokenService;
import com.example.jueguito.services.UsuarioService;
import com.google.gson.Gson;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/login")
public class Login extends HttpServlet {

    @Inject
    UsuarioBean usuarioBean;
    @Inject
    UsuarioService usuarioService;
    @Inject
    TokenService tokenService;
    @Inject
    PasswordVerificationServices pwds;

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getContentType() == null && request.getParameterMap().isEmpty()) {
            response.sendRedirect(getServletContext().getContextPath().concat("/inicioSesion.jsp"));
            return;
        }
        Gson gson = new Gson();

        // Leer el cuerpo de la solicitud
        BufferedReader reader = request.getReader();
        Map<String, String> parameter;
        parameter = gson.fromJson(reader, Map.class);

        // Obtener los parámetros de la solicitud
        String login = parameter.get("username");
        String passwd = parameter.get("password");
        String token;

        Usuario usuario;

        try {

            if (login == null || login.isBlank()) {
                sendLoginError( response, "El campo login no puede estar vacio");
                return;
            }

            if (passwd == null || passwd.isBlank()) {
                sendLoginError( response, "El campo contraseña no puede estar vacio");
                return;
            }

            Map<String, byte[]> map = pwds.getHashPasswordAndSalt(login);

            if (map == null || map.isEmpty()) {
                sendLoginError( response, "Usuario no encontrado");
                return;
            }

            byte[] hash = map.get("hash");
            byte[] salt = map.get("salt");

            if(pwds.verificatePassword(passwd, salt, hash)){
                usuario = usuarioService.obtenerUsuario(login, hash);
                if (usuario != null) {
                    usuarioBean.copiar(usuario);
                    token = tokenService.generateToken(login);
                    if (token == null || token.isBlank() || token.isEmpty()) {
                        sendLoginError(response, "Error al generar el token");
                    }
                    redirigirJuego(response, token);
                }else {
                    sendLoginError( response, "Usuario o contraseña incorrectos");
                }
            }else{
                sendLoginError( response, "Contraseña incorrecta");
            }

        } catch (Exception e) {
            sendLoginError( response, "Error al logear usuario: ".concat(e.getLocalizedMessage()));
        }
    }

    private void sendLoginError( HttpServletResponse response , String error) throws  IOException {
        Map<String, String> respuesta = new HashMap<>();

        respuesta.put("status", "error");
        respuesta.put("message", error);


        // Convertir el objeto de respuesta a JSON
        String jsonRespuesta = new Gson().toJson(respuesta);

        // Enviar la respuesta
        response.setContentType("application/json");

        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonRespuesta);
    }


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request,response);
    }

    private void redirigirJuego( HttpServletResponse response, String token) throws IOException {
        Map<String, String> respuesta = new HashMap<>();

        respuesta.put("status", "OK");
        respuesta.put("message", "Usuario logeado correctamente");
        respuesta.put("url", getServletContext().getContextPath().concat("/juego.html"));
        respuesta.put("token", token);


        // Convertir el objeto de respuesta a JSON
        String jsonRespuesta = new Gson().toJson(respuesta);

        // Enviar la respuesta
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonRespuesta);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        processRequest(req, resp);
    }

}