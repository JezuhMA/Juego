package com.example.jueguito.servlets;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

import com.example.jueguito.beans.MensajeBean;
import com.example.jueguito.beans.UsuarioBean;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.services.PasswordVerificationServices;
import com.example.jueguito.services.UsuarioService;
import com.google.gson.Gson;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/login")
public class Login extends HttpServlet {

    @Inject
    UsuarioBean usuarioBean;
    @Inject
    UsuarioService usuarioService;
    @Inject
    MensajeBean mensajeBean;
    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
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
        String login = (String) parameter.get("username");
        String passwd = (String) parameter.get("password");
        Usuario usuario;
        PasswordVerificationServices pwds = PasswordVerificationServices.getInstace();
        try {

            if (login == null || login.isBlank()) {

                sendLoginError(request, response, "El campo login no puede estar vacio");
                return;
            }

            if (passwd == null || passwd.isBlank()) {
                sendLoginError(request, response, "El campo contraseña no puede estar vacio");
                return;
            }

            Map<String, byte[]> map = pwds.getHashPasswordAndSalt(login);
            byte[] hash = map.get("hash");
            byte[] salt = map.get("salt");
            if(pwds.verificatePassword(passwd, hash, salt)){
                usuario = usuarioService.obtenerUsuario(login, passwd);
                if (usuario != null) {
                    usuarioBean.copiar(usuario);
                    redirigirJuego(response);
                }else {
                    sendLoginError(request, response, "Usuario o contraseña incorrectos");
                }
            }

        } catch (Exception e) {
            sendLoginError(request, response, "Error al obtener los parametros");
        }

    }

    private void sendLoginError(HttpServletRequest request, HttpServletResponse response , String error) throws  IOException {
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


    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request,response);
    }

    private void redirigirJuego( HttpServletResponse response) throws IOException {
        Map<String, String> respuesta = new HashMap<>();

        respuesta.put("status", "OK");
        respuesta.put("message", "Usuario logeado correctamente");


        // Convertir el objeto de respuesta a JSON
        String jsonRespuesta = new Gson().toJson(respuesta);

        // Enviar la respuesta
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonRespuesta);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        processRequest(req, resp);
    }

}