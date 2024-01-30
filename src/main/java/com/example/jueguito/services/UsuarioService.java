package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;

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
            Collection<String[]> parametro = parametros.values();
            for (String[] values : parametro) {
                String key = values[0];
                String value = values[1];
                switch (key) {
                    case "nombre":
                        usuario.setNombre(value);
                        break;
                    case "apellidos":
                        usuario.setApellidos(value);
                        break;
                    case "login":
                        usuario.setLogin(value);
                        break;
                    case "passwd":
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
