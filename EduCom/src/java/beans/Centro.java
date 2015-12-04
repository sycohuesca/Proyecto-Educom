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
@Table(name = "centro")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Centro.findAll", query = "SELECT c FROM Centro c"),
    @NamedQuery(name = "Centro.findByIdCentro", query = "SELECT c FROM Centro c WHERE c.idCentro = :idCentro"),
    @NamedQuery(name = "Centro.findByNombre", query = "SELECT c FROM Centro c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "Centro.findByDescripcion", query = "SELECT c FROM Centro c WHERE c.descripcion = :descripcion"),
    @NamedQuery(name = "Centro.findByDireccion", query = "SELECT c FROM Centro c WHERE c.direccion = :direccion")})
public class Centro implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID_CENTRO")
    private Integer idCentro;
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
    @Size(min = 1, max = 256)
    @Column(name = "DIRECCION")
    private String direccion;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idCentro")
    private Collection<Usuario> usuarioCollection;

    public Centro() {
    }

    public Centro(Integer idCentro) {
        this.idCentro = idCentro;
    }

    public Centro(Integer idCentro, String nombre, String descripcion, String direccion) {
        this.idCentro = idCentro;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
    }

    public Integer getIdCentro() {
        return idCentro;
    }

    public void setIdCentro(Integer idCentro) {
        this.idCentro = idCentro;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @XmlTransient
    public Collection<Usuario> getUsuarioCollection() {
        return usuarioCollection;
    }

    public void setUsuarioCollection(Collection<Usuario> usuarioCollection) {
        this.usuarioCollection = usuarioCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idCentro != null ? idCentro.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Centro)) {
            return false;
        }
        Centro other = (Centro) object;
        if ((this.idCentro == null && other.idCentro != null) || (this.idCentro != null && !this.idCentro.equals(other.idCentro))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "beans.Centro[ idCentro=" + idCentro + " ]";
    }
    
}
