package com.example.jueguito.repos;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import jakarta.inject.Inject;

import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UsuarioRepo {

    @Inject
    UsuarioDAO usuarioDAO;
    private List<Usuario> usuarios;

    private final Object obj = new Object();
    public List<Usuario> getUsuarios(){
        if (usuarios != null){
            synchronized (obj){
                try {
                    usuarios = usuarioDAO.getAll();
                } catch (SQLException sqlException){
                    usuarios = null;
                    Logger.getLogger(UsuarioRepo.class.getName()).log(Level.SEVERE,
                            "Error al recuperar usuarios: "
                                    .concat(sqlException.getLocalizedMessage()), sqlException);
                }
            }
        }
        return usuarios;
    }
}