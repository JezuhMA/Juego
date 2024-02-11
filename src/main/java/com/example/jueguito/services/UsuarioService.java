package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import com.google.gson.Gson;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class UsuarioService {

    @Inject
    UsuarioDAO usuarioDAO;
    @Inject
    TokenService tokenService;
    @Inject
    PasswordVerificationServices passwordVerificationServices;

    public Map<String , Object> registrar(HttpServletRequest request) throws  IOException {
        Usuario usuario = null;
        Map<String , Object> mapUser = new HashMap<>();
        String token = null;
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();

        Map<String, String> parametros = gson.fromJson(reader, Map.class);
        if (!parametros.isEmpty()){
            usuario = new Usuario();
            for (Map.Entry<String,String> values : parametros.entrySet()) {
                String key = values.getKey();
                String value = values.getValue();
                switch (key) {
                    case "name":
                        usuario.setNombre(value);
                        break;
                    case "login":
                        usuario.setLogin(value);
                        break;
                    case "password":
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
                throw new IOException("Error al insertar usuario sin Id recuperada");
            } finally {
                if (usuario.esValido()){
                    token = tokenService.generateToken(usuario.getLogin());
                }
                mapUser.put("usuario", usuario);
                mapUser.put("token", token);
            }

        }

        return mapUser;
    }

    public Usuario obtenerUsuario(String login, byte[] passwd){
        Usuario usuario = null;
        usuario = usuarioDAO.getUserByLoginPass(login, passwd);
        if (!usuario.esValido()){
            Logger.getLogger(UsuarioService.class.getName()).log(Level.WARNING, "Error Usuario no valido");
        }
        return usuario;
    }
}
