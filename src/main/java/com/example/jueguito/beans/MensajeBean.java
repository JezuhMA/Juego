package com.example.jueguito.beans;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;
import java.io.Serial;
import java.io.Serializable;

@Named("mensajeBean")
@RequestScoped
public class MensajeBean implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private String mensaje;
    private String estilo;
    public enum Estilo{
        AVISO("avisoMensaje"),
        ERROR("errorMensaje"),
        INFO("infoMensaje");
        private final String estilo;

        Estilo(String estilo) {
            this.estilo = estilo;
        }

        public String getEstilo() {
            return estilo;
        }
    }
    public void setMensajeInfo(String mensaje){
        this.mensaje = mensaje;
        this.estilo = Estilo.INFO.getEstilo();
    }
    public void setMensajeError(String mensaje){
        this.mensaje = mensaje;
        this.estilo = Estilo.ERROR.getEstilo();
    }
    public void setMensajeAviso(String mensaje){
        this.mensaje = mensaje;
        this.estilo = Estilo.AVISO.getEstilo();
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getEstilo() {
        return estilo;
    }
}
