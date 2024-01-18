package com.example.jueguito.DAO;

import com.example.jueguito.databases.GestorConexion;
import com.example.jueguito.entities.Usuario;
import com.example.jueguito.interfaces.DAO;
import jakarta.inject.Inject;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UsuarioDAO implements DAO<Usuario, Integer> {

    private static final Logger LOGGER = Logger.getLogger(UsuarioDAO.class.getName());
    @Inject
    GestorConexion gestorConexion;

    @Override
    public List<Usuario> getAll() throws SQLException {
        String consulta = "SELECT * FROM JUEGO_SERPIENTE.USUARIO";
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
        String consulta = "SELECT * FROM JUEGO_SERPIENTE.USUARIO WHERE id = ?";
        Usuario nuevo = null;
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
        try { rs.close(); }catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al cerrar ResultSet: ".concat(e.getLocalizedMessage()), e);
            throw e;
        }
        try { ptm.close(); }catch (SQLException e){
            LOGGER.log(Level.SEVERE, "Error al cerrar preparedStatement: ".concat(e.getLocalizedMessage()), e);
            throw e;
        }
        try {
            conn.commit();
            conn.close();
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Error al cerrar conexion: ".concat(ex.getLocalizedMessage()), ex);
            throw ex;
        }
    }

    private void rellenarUser(Usuario nuevo, ResultSet rs) throws SQLException {
        nuevo.setId(rs.getInt(1));
        nuevo.setNombre(rs.getString(2));
        nuevo.setApellidos(rs.getString(3));
        nuevo.setFechaNacimiento(rs.getDate(4));
        nuevo.setLogin(rs.getString(5));
        nuevo.setPasswd(rs.getString(6));
        nuevo.setEmail(rs.getString(7));
        nuevo.setFechaRegistro(rs.getDate(8));
    }

    @Override
    public Integer insert(Usuario usuario) throws SQLException {
        String consulta = "INSERT INTO JUEGO_SERPIENTE.USUARIO(nombre, apellidos, sexo, fecha_nacimiento, dni, login, password, email) values (?, ?, ?, ?, ?, ?, ?, ?);";
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
            ptm.setString(index++, usuario.getApellidos());
            if (usuario.getFechaNacimiento() != null){
                ptm.setDate(index++ ,  new Date(usuario.getFechaNacimiento().getTime()));
            }else{
                ptm.setNull(index++ , java.sql.Types.DATE);}
            ptm.setString(index++ , usuario.getLogin());
            ptm.setString(index++ , usuario.getPasswd());
            ptm.setString(index++ , usuario.getEmail());
            ptm.executeUpdate();

            rs = ptm.getGeneratedKeys();
            if (rs.next()){
                idUsuario = rs.getInt(1);
            }
            if (idUsuario == 0){
                LOGGER.log(Level.SEVERE, "Error al insertar usuario");
                throw new SQLException("Error al insertar usuario");
            }

        }   catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error al insertar usuario: ".concat(e.getLocalizedMessage()), e);
            if(conn != null && !conn.isClosed()){
                conn.rollback();
            }
            throw e;
        } finally {
            cerrarConexiones(conn , ptm , rs);
        }
        return null;
    }

    @Override
    public int update(Usuario usuario) throws SQLException {
        return 0;
    }

    @Override
    public int delete(Usuario usuario) throws SQLException {
        return 0;
    }
}
