/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author syco
 */
@Entity
@Table(name = "grupo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Grupo.findAll", query = "SELECT g FROM Grupo g"),
    @NamedQuery(name = "Grupo.findByIdGrupo", query = "SELECT g FROM Grupo g WHERE g.idGrupo = :idGrupo"),
    @NamedQuery(name = "Grupo.findByNombre", query = "SELECT g FROM Grupo g WHERE g.nombre = :nombre"),
    @NamedQuery(name = "Grupo.findByDescripcion", query = "SELECT g FROM Grupo g WHERE g.descripcion = :descripcion"),
    @NamedQuery(name = "Grupo.findByFechaHoraCreacion", query = "SELECT g FROM Grupo g WHERE g.fechaHoraCreacion = :fechaHoraCreacion"),
    @NamedQuery(name = "Grupo.findByPrivado", query = "SELECT g FROM Grupo g WHERE g.privado = :privado")})
public class Grupo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_GRUPO")
    private Integer idGrupo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "NOMBRE")
    private String nombre;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_HORA_CREACION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaHoraCreacion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "PRIVADO")
    private boolean privado;
    @JoinColumn(name = "ID_USUARIO_SUPERADMINISTRADOR", referencedColumnName = "ID_USUARIO")
    @ManyToOne(optional = false)
    private Usuario idUsuarioSuperadministrador;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idGrupo")
    private Collection<Mensaje> mensajeCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "grupo")
    private Collection<Miembro> miembroCollection;

    public Grupo() {
    }

    public Grupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }

    public Grupo(Integer idGrupo, String nombre, String descripcion, Date fechaHoraCreacion, boolean privado) {
        this.idGrupo = idGrupo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaHoraCreacion = fechaHoraCreacion;
        this.privado = privado;
    }

    public Integer getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaHoraCreacion() {
        return fechaHoraCreacion;
    }

    public void setFechaHoraCreacion(Date fechaHoraCreacion) {
        this.fechaHoraCreacion = fechaHoraCreacion;
    }

    public boolean getPrivado() {
        return privado;
    }

    public void setPrivado(boolean privado) {
        this.privado = privado;
    }

    public Usuario getIdUsuarioSuperadministrador() {
        return idUsuarioSuperadministrador;
    }

    public void setIdUsuarioSuperadministrador(Usuario idUsuarioSuperadministrador) {
        this.idUsuarioSuperadministrador = idUsuarioSuperadministrador;
    }

    @XmlTransient
    public Collection<Mensaje> getMensajeCollection() {
        return mensajeCollection;
    }

    public void setMensajeCollection(Collection<Mensaje> mensajeCollection) {
        this.mensajeCollection = mensajeCollection;
    }

    @XmlTransient
    public Collection<Miembro> getMiembroCollection() {
        return miembroCollection;
    }

    public void setMiembroCollection(Collection<Miembro> miembroCollection) {
        this.miembroCollection = miembroCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idGrupo != null ? idGrupo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Grupo)) {
            return false;
        }
        Grupo other = (Grupo) object;
        if ((this.idGrupo == null && other.idGrupo != null) || (this.idGrupo != null && !this.idGrupo.equals(other.idGrupo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "beans.Grupo[ idGrupo=" + idGrupo + " ]";
    }
    
}
