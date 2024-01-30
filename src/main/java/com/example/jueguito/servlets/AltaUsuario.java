package com.example.jueguito.servlets;

import com.example.jueguito.beans.MensajeBean;
import com.example.jueguito.beans.UsuarioBean;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.services.UsuarioService;
import jakarta.inject.Inject;
import jakarta.servlet.RequestDispatcher;
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
    @Inject
    MensajeBean mensajeBean;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            usuarioService.registrar(request);
            mensajeBean.setMensajeInfo("Usuario registrado con éxito");
        } catch (ParseException e) {
            mensajeBean.setMensajeError("Usuario no creado por la fecha: ".concat(e.getLocalizedMessage()));
        }
        RequestDispatcher dispatcher = request.getRequestDispatcher("/inicioSesion.jsp");
        dispatcher.forward(request, response);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(request.getContextPath().concat("/usuario/formRegistro.jsp"));
    }
}
