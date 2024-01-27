package com.example.jueguito.servlets;

import com.example.jueguito.beans.UsuarioBean;
import jakarta.inject.Inject;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(urlPatterns = "/cerrarSesion")
public class CerrarSesion extends HttpServlet {

    @Inject
    UsuarioBean usuarioBean;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getSession().invalidate();
        usuarioBean.descartar();
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/inicioSesion.jsp");
        requestDispatcher.forward(req, resp);
    }

}
