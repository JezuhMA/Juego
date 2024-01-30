package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class UsuarioService {

    @Inject
    UsuarioDAO usuarioDAO;
    public Usuario registrar(HttpServletRequest request) throws ParseException {
        Usuario usuario = null;
        Map<String, String[]> parametros = request.getParameterMap();
        if (!parametros.isEmpty()){
            usuario = new Usuario();
            String apellidos = "";
            for (Map.Entry<String,String[]> values : parametros.entrySet()) {
                String key = values.getKey();
                String value = values.getValue()[0];
                switch (key) {
                    case "nombre":
                        usuario.setNombre(value);
                        break;
                    case "apellido1":
                        apellidos = apellidos.concat(value);
                        break;
                    case "apellido2":
                        apellidos = apellidos.concat(" ").concat(value);
                        usuario.setApellidos(apellidos);
                        break;
                    case "login":
                        usuario.setLogin(value);
                        break;
                    case "password":
                        usuario.setPasswd(value);
                        break;
                    case "email":
                        usuario.setEmail(value);
                        break;
                    case "fechaNacimiento":
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        Date fechaNacimiento = sdf.parse(value);
                        usuario.setFechaNacimiento(fechaNacimiento);
                        break;
                    case "fechaRegistro":
                        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
                        Date fechaRegistro = sdf2.parse(value);
                        usuario.setFechaRegistro(fechaRegistro);
                        break;
                    default:
                        break;
                }
            }
            try {
                usuario.setId(usuarioDAO.insert(usuario));
            } catch (SQLException sqlException){
                Logger.getLogger(UsuarioService.class.getName())
                        .log(Level.SEVERE, "Error al insertar usuario sin Id recuperada");
            }
        }
        return usuario;
    }

    public Usuario obtenerUsuario(String login, String passwd){
        Usuario usuario = null;
        usuario = usuarioDAO.getUserByLoginPass(login, passwd);
        if (!usuario.esValido()){
            Logger.getLogger(UsuarioService.class.getName()).log(Level.WARNING, "Error Usuario no valido");
        }
        return usuario;
    }
}