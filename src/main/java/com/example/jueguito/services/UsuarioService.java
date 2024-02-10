package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.text.ParseException;
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
            for (Map.Entry<String,String[]> values : parametros.entrySet()) {
                String key = values.getKey();
                String value = values.getValue()[0];
                switch (key) {
                    case "nombre":
                        usuario.setNombre(value);
                        break;
                    case "login":
                        usuario.setLogin(value);
                        break;
                    case "password":
                        PasswordVerificationServices passwordVerificationServices = PasswordVerificationServices.getInstace();
                        Map<String, byte[]> map = passwordVerificationServices.hashingPassword(value);
                        usuario.setPasswd(map.get("hash"));
                        usuario.setSalt(map.get("salt"));
                        break;
                    case "email":
                        usuario.setEmail(value);
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
