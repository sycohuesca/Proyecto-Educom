/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author syco
 */
@Entity
@Table(name = "usuario")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Usuario.findAll", query = "SELECT u FROM Usuario u"),
    @NamedQuery(name = "Usuario.findAllByCentro", query = "SELECT u FROM Usuario u WHERE u.idCentro.idCentro = :idCentro"),
    @NamedQuery(name = "Usuario.findByIdUsuario", query = "SELECT u FROM Usuario u WHERE u.idUsuario = :idUsuario"),
    @NamedQuery(name = "Usuario.findByNombre", query = "SELECT u FROM Usuario u WHERE u.nombre = :nombre")})
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_USUARIO")
    private Integer idUsuario;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "NOMBRE")
    private String nombre;
    @ManyToMany(mappedBy = "usuarioCollection")
    private Collection<TipoUsuario> tipoUsuarioCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUsuarioSuperadministrador")
    private Collection<Grupo> grupoCollection;
    @JoinColumn(name = "ID_CENTRO", referencedColumnName = "ID_CENTRO")
    @ManyToOne(optional = false)
    private Centro idCentro;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "autor")
    private Collection<Mensaje> mensajeCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUsuario")
    private Collection<Login> loginCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
    private Collection<Miembro> miembroCollection;

    public Usuario() {
    }

    public Usuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Usuario(Integer idUsuario, String nombre) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @XmlTransient
    public Collection<TipoUsuario> getTipoUsuarioCollection() {
        return tipoUsuarioCollection;
    }

    public void setTipoUsuarioCollection(Collection<TipoUsuario> tipoUsuarioCollection) {
        this.tipoUsuarioCollection = tipoUsuarioCollection;
    }

    @XmlTransient
    public Collection<Grupo> getGrupoCollection() {
        return grupoCollection;
    }

    public void setGrupoCollection(Collection<Grupo> grupoCollection) {
        this.grupoCollection = grupoCollection;
    }

    public Centro getIdCentro() {
        return idCentro;
    }

    public void setIdCentro(Centro idCentro) {
        this.idCentro = idCentro;
    }

    @XmlTransient
    public Collection<Mensaje> getMensajeCollection() {
        return mensajeCollection;
    }

    public void setMensajeCollection(Collection<Mensaje> mensajeCollection) {
        this.mensajeCollection = mensajeCollection;
    }

    @XmlTransient
    public Collection<Login> getLoginCollection() {
        return loginCollection;
    }

    public void setLoginCollection(Collection<Login> loginCollection) {
        this.loginCollection = loginCollection;
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
        hash += (idUsuario != null ? idUsuario.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Usuario)) {
            return false;
        }
        Usuario other = (Usuario) object;
        if ((this.idUsuario == null && other.idUsuario != null) || (this.idUsuario != null && !this.idUsuario.equals(other.idUsuario))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "beans.Usuario[ idUsuario=" + idUsuario + " ]";
    }

}
