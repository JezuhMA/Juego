package com.example.jueguito.servlets;

import com.example.jueguito.beans.UsuarioBean;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.services.UsuarioService;
import com.google.gson.Gson;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = "/registro")
public class AltaUsuario extends HttpServlet {
    @Inject
    UsuarioService usuarioService;
    @Inject
    UsuarioBean usuarioBean;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws  IOException {
        try {
            String token;
            Map<String, Object> map = usuarioService.registrar(request);
            usuarioBean.copiar((Usuario) map.get("usuario"));
            token = (String) map.get("token");
            sendOK(response, token);

        } catch (IOException e){
            sendError(response, "Error al registrar usuario: ".concat(e.getLocalizedMessage()));
        }
    }

    private void sendOK(HttpServletResponse response, String token) throws IOException {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("message", "Usuario registrado con éxito");

        if (token != null) {
            respuesta.put("token", token);
        }

        String jsonRespuesta = new Gson().toJson(respuesta);

        response.setStatus(200);
        response.setContentType("application/json");
        response.getWriter().write(jsonRespuesta);
    }

    private void sendError(HttpServletResponse response, String message) throws IOException {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("error", message);

        String jsonRespuesta = new Gson().toJson(respuesta);

        response.setStatus(400);
        response.setContentType("application/json");
        response.getWriter().write(jsonRespuesta);
    }

}
