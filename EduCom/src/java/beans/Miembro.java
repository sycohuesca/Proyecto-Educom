/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author syco
 */
@Entity
@Table(name = "miembro")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Miembro.findAll", query = "SELECT m FROM Miembro m"),
    @NamedQuery(name = "Miembro.findByIdUsuario", query = "SELECT m FROM Miembro m WHERE m.miembroPK.idUsuario = :idUsuario"),
    @NamedQuery(name = "Miembro.findByIdGrupo", query = "SELECT m FROM Miembro m WHERE m.miembroPK.idGrupo = :idGrupo"),
    @NamedQuery(name = "Miembro.findByFechaHora", query = "SELECT m FROM Miembro m WHERE m.fechaHora = :fechaHora"),
    @NamedQuery(name = "Miembro.findByResponsable", query = "SELECT m FROM Miembro m WHERE m.responsable = :responsable")})
public class Miembro implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected MiembroPK miembroPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_HORA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaHora;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RESPONSABLE")
    private boolean responsable;
    @JoinColumn(name = "ID_GRUPO", referencedColumnName = "ID_GRUPO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Grupo grupo;
    @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID_USUARIO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Usuario usuario;

    public Miembro() {
    }

    public Miembro(MiembroPK miembroPK) {
        this.miembroPK = miembroPK;
    }

    public Miembro(MiembroPK miembroPK, Date fechaHora, boolean responsable) {
        this.miembroPK = miembroPK;
        this.fechaHora = fechaHora;
        this.responsable = responsable;
    }

    public Miembro(int idUsuario, int idGrupo) {
        this.miembroPK = new MiembroPK(idUsuario, idGrupo);
    }

    public MiembroPK getMiembroPK() {
        return miembroPK;
    }

    public void setMiembroPK(MiembroPK miembroPK) {
        this.miembroPK = miembroPK;
    }

    public Date getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(Date fechaHora) {
        this.fechaHora = fechaHora;
    }

    public boolean getResponsable() {
        return responsable;
    }

    public void setResponsable(boolean responsable) {
        this.responsable = responsable;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (miembroPK != null ? miembroPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Miembro)) {
            return false;
        }
        Miembro other = (Miembro) object;
        if ((this.miembroPK == null && other.miembroPK != null) || (this.miembroPK != null && !this.miembroPK.equals(other.miembroPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "beans.Miembro[ miembroPK=" + miembroPK + " ]";
    }
    
}
