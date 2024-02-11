package com.example.jueguito.dao;

import com.example.jueguito.database.GestorConexion;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.interfaces.DAO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.sql.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class UsuarioDAO implements DAO<Usuario, Integer> {


    private static final Logger LOGGER = Logger.getLogger(UsuarioDAO.class.getName());
    @Inject
    GestorConexion gestorConexion;

    @Override
    public List<Usuario> getAll() throws SQLException {
        String consulta = "SELECT * FROM USUARIO";
        List<Usuario> usuarios = new ArrayList<>();
        Connection conn = null;
        PreparedStatement ptm = null;
        ResultSet rs = null;

        try {
            conn = gestorConexion.getConnection();
            ptm = conn.prepareStatement(consulta);
            rs = ptm.executeQuery();

            while(rs.next()){
                Usuario nuevo = new Usuario();
                rellenarUser(nuevo, rs);
                usuarios.add(nuevo);
            }
        } catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al recuperar usuarios: ".concat(e.getLocalizedMessage()));
            throw e;
        }finally {
            cerrarConexiones(conn, ptm, rs);
        }
        return usuarios;
    }

    @Override
    public Usuario getById(Integer id) throws SQLException {
        String consulta = "SELECT id, nombre, login, email FROM USUARIO WHERE id = ?";
        Usuario nuevo;
        Connection conn = null;
        PreparedStatement ptm = null;
        ResultSet rs = null;

        try {
            conn = gestorConexion.getConnection();
            ptm = conn.prepareStatement(consulta);
            rs = ptm.executeQuery();

            nuevo = new Usuario();
            rellenarUser(nuevo, rs);

        } catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al recuperar usuario por ID: ".concat(e.getLocalizedMessage()), e);
            throw e;
        }finally {
            cerrarConexiones(conn, ptm, rs);
        }
        return nuevo;
    }

    private void cerrarConexiones(Connection conn, PreparedStatement ptm, ResultSet rs) throws SQLException {
        try { if ( rs != null ) rs.close(); }catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al cerrar ResultSet: ".concat(e.getLocalizedMessage()), e);
            throw e;
        }
        try { if(ptm != null) ptm.close(); }catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al cerrar preparedStatement: ".concat(e.getLocalizedMessage()), e);
            throw e;
        }
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Error al cerrar conexion: ".concat(ex.getLocalizedMessage()), ex);
            throw ex;
        }
    }

    private void rellenarUser(Usuario nuevo, ResultSet rs) throws SQLException {
        nuevo.setId(rs.getInt(1));
        nuevo.setNombre(rs.getString(2));
        nuevo.setLogin(rs.getString(3));
        nuevo.setEmail(rs.getString(4));
    }

    @Override
    public Integer insert(Usuario usuario) throws SQLException {
        String consulta = "INSERT INTO USUARIO(nombre, login, password, email, salt) values (?, ?, ?, ?, ?)";
        if (usuario.getId() != null){
            LOGGER.log(Level.SEVERE,"Error al insertar: este usuario ya existe" );
            throw new SQLException("Error al insertar: este usuario ya existe");
        }

        Connection conn = null;
        PreparedStatement ptm = null;
        ResultSet rs = null;
        int idUsuario = 0;

        try {
            conn = gestorConexion.getConnection();
            conn.setAutoCommit(false);
            ptm = conn.prepareStatement(consulta, Statement.RETURN_GENERATED_KEYS);
            int index = 1;
            ptm.setString(index++ , usuario.getNombre());
            ptm.setString(index++ , usuario.getLogin());
            ptm.setString(index++ , Base64.getEncoder().encodeToString(usuario.getPasswd()));
            ptm.setString(index++ , usuario.getEmail());
            ptm.setString(index , Base64.getEncoder().encodeToString(usuario.getSalt()));
            ptm.executeUpdate();

            rs = ptm.getGeneratedKeys();
            if (rs.next()){
                idUsuario = rs.getInt(1);
            }
            if (idUsuario == 0){
                LOGGER.log(Level.SEVERE, "Error al insertar usuario");
                throw new SQLException("Error al insertar usuario");
            }
            conn.commit();
            return idUsuario;
        }   catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error al insertar usuario: ".concat(e.getLocalizedMessage()), e);
            if(conn != null && !conn.isClosed()){
                conn.rollback();
            }
            throw e;
        } finally {
            cerrarConexiones(conn , ptm , rs);
        }
    }

    @Override
    public int update(Usuario usuario) {
        return 0;
    }

    @Override
    public int delete(Usuario usuario) {
        return 0;
    }

    public Usuario getUserByLoginPass(String login, byte[] passwd) {
        String query = "SELECT id, nombre, login, email FROM USUARIO WHERE login = ? AND password = ?";
        Usuario usuario = null;
        try (
                Connection connection = gestorConexion.getConnection();
                PreparedStatement pst = connection.prepareStatement(query)
        ){
            pst.setString(1, login);
            pst.setString(2, Base64.getEncoder().encodeToString(passwd));
            ResultSet rs = pst.executeQuery();
            while (rs.next()){
                usuario = new Usuario();
                usuario.setId(rs.getInt(1));
                usuario.setNombre(rs.getString(2));
                usuario.setLogin(rs.getString(3));
                usuario.setEmail(rs.getString(4));
            }
            try {
                rs.close();
            }catch (SQLException sqlException){
                throw new SQLException("Error al cerrar ResultSet: ".concat(sqlException.getLocalizedMessage()), sqlException);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error al recuperar usuario por login y contraseña: ".concat(e.getLocalizedMessage()), e);
        }
        return usuario;
    }

    public Map<String,byte[]> getHashSalt(String login) {
        String query = "SELECT password, salt FROM USUARIO WHERE login = ?";
        Map<String, byte[]> map = null;
        try (
                Connection connection = gestorConexion.getConnection();
                PreparedStatement pst = connection.prepareStatement(query)
        ){
            pst.setString(1, login);
            ResultSet rs = pst.executeQuery();
            map = new HashMap<>();
            while (rs.next()){
                map.put("hash", Base64.getDecoder().decode(rs.getString(1)));
                map.put("salt", Base64.getDecoder().decode(rs.getString(2)));
            }
            try {
                rs.close();
            }catch (SQLException sqlException){
                throw new SQLException("Error al cerrar ResultSet: ".concat(sqlException.getLocalizedMessage()), sqlException);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error al recuperar hash y salt por login: ".concat(e.getLocalizedMessage()), e);
        }
        return map;
    }
}
