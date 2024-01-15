package com.example.jueguito;

import java.io.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "ServletInicio", urlPatterns = "/ServletInicio")
public class HelloServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws  IOException {
        if (request.getContentType() == null && request.getParameterMap().isEmpty()) {
            response.sendRedirect("inicioSesion.jsp");
            return;
        }
        String status = request.getParameter("inicio");
        if (status.equals("OK")) {
            if(comprobarCredenciales(request)){
                redirigirJuego(request,response);
            }else {
                redirigirRegistro(response);
            }
        } else {
            redirigirRegistro(response);
        }
    }

    private boolean comprobarCredenciales(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        String passwd = (String) request.getAttribute("passWd");
        boolean passValida = comprobarPassWd(passwd);
        boolean emailValido = comprobarEmail(email);
       //Ambas credenciales deben ser ciertas
        return passValida && emailValido;
    }
//TODO: enlazar con DB
    private boolean comprobarEmail(String email) {
        return true;
    }

    private boolean comprobarPassWd(String passwd) {
        return true;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request,response);
    }

    private void redirigirRegistro( HttpServletResponse response) throws IOException {
        response.sendRedirect("registro.html");
    }

    private void redirigirJuego(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect("juego.html");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
        processRequest(req, resp);
    }

    public void destroy() {
    }
}