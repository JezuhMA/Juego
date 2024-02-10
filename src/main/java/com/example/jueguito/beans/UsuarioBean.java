package com.example.jueguito.beans;

import com.example.jueguito.entities.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serial;

@Named("usuarioBean")
@SessionScoped
public class UsuarioBean extends Usuario {


    @Serial
    private static final long serialVersionUID = 1L;

    public void descartar(){
        this.setId(null);
    }

    public void copiar(Usuario user){
        this.setId(user.getId());
        this.setNombre(user.getNombre());
        this.setLogin(user.getLogin());
        this.setEmail(user.getEmail());
        this.setFechaRegistro(user.getFechaRegistro());
    }
}
