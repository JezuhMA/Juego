package com.example.jueguito.database;


import jakarta.enterprise.context.ApplicationScoped;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class GestorConexion {

    private static final Logger LOGGER = Logger.getLogger(GestorConexion.class.getName());

    private DataSource dataSource;

    public void initDS(){
        try {
            Context initContext = new InitialContext();
            Context envContext = (Context) initContext.lookup("java:/comp/env");
            dataSource = (DataSource) envContext.lookup("jdbc/derbyjuegoSerpiente");
        }catch (NamingException e){
            LOGGER.log(Level.SEVERE, "Error al obtener DataSource: ".concat(e.getMessage()));
            throw new RuntimeException("Error al obtener el DataSource");
        }
    }

    public Connection getConnection() throws SQLException {
        Connection connection;
        try{
            connection = dataSource.getConnection();
            connection.setSchema("JUEGO_SERPIENTE");
            connection.setAutoCommit(true);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "No se ha podido obtener conexion: ".concat(e.getMessage()));
            throw e;
        }
        return connection;
    }

}
