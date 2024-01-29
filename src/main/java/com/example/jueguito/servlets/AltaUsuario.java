package com.example.jueguito.servlets;

import com.example.jueguito.services.UsuarioService;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.ParseException;

@WebServlet(urlPatterns = "/usuario/registro")
public class AltaUsuario extends HttpServlet {
    @Inject
    UsuarioService usuarioService;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            usuarioService.registrar(request);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(request.getContextPath().concat("/usuario/formRegistro.jsp"));
    }
}
