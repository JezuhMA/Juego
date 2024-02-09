package com.example.jueguito.servlets;

import java.io.*;

import com.example.jueguito.beans.MensajeBean;
import com.example.jueguito.beans.UsuarioBean;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.services.UsuarioService;
import jakarta.inject.Inject;
import jakarta.servlet.RequestDispatcher;
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
        Usuario usuario;
        String status = request.getParameter("status");
        if (status.equals("OK")) {
            usuario = recuperarUser(request);
            if(usuario.esValido()){
                usuarioBean.copiar(usuario);
                redirigirJuego(request,response);
            }else {
                mensajeBean.setMensajeAviso("Credenciales no validas");
                redirigirInicio(request, response);
            }
        } else {
            mensajeBean.setMensajeAviso("Error al iniciar sesion");
            redirigirInicio(request, response);
        }
    }

    private void redirigirInicio(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/inicioSesion.jsp").forward(request, response);
    }

    private Usuario recuperarUser(HttpServletRequest request) {
        String login = request.getParameter("login");
        String passwd = request.getParameter("passWd");
        if ( (login != null && !login.isBlank()) && (passwd != null && !passwd.isBlank()) ) {
            return usuarioService.obtenerUsuario(login, passwd);
        }else {
            throw new RuntimeException("Error al obtener los parametros");
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request,response);
    }

    private void redirigirJuego(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/juego.html");
        requestDispatcher.forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        processRequest(req, resp);
    }

}