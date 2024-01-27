package com.example.jueguito;

import com.example.jueguito.database.GestorConexion;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet("/prueba")
public class pruebaConexion extends HttpServlet {

    @Inject
    GestorConexion conn;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Connection con = null;

        try {
            con = conn.getConnection();

            if (con != null){
                Statement st = con.createStatement();
                st.execute(("SELECT NOMBRE FROM USUARIO"));
                st.close();

                resp.getWriter().println("Connexion: OK.");
            }
        } catch (Exception e){
            resp.getWriter().println("Conexion: ERROR. ".concat(e.getMessage()));
        }finally {
            try {
                if (con != null) con.close();
            }catch (SQLException e){
                Logger.getLogger(pruebaConexion.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        resp.getWriter().println("Prueba Finalizada");
    }
}
