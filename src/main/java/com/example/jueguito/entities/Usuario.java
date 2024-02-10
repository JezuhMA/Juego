package com.example.jueguito.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

public class Usuario implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L; // version de la entidad

    private Integer id;
    private String nombre;

    private String login;
    private byte[] passwd;
    private String email;
    private Date fechaRegistro;

    private byte[] salt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public byte[] getPasswd() {
        return passwd;
    }

    public void setPasswd(byte[] passwd) {
        this.passwd = passwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public boolean esValido() {
        return (this.getId() != null && this.getId() > 0) &&
                (this.getNombre() != null && !this.getNombre().isBlank());
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
}
