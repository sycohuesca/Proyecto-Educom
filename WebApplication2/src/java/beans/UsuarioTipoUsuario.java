/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author syco
 */
@Entity
@Table(name = "usuario_tipo_usuario")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UsuarioTipoUsuario.findAll", query = "SELECT u FROM UsuarioTipoUsuario u"),
    @NamedQuery(name = "UsuarioTipoUsuario.findByIdUsuario", query = "SELECT u FROM UsuarioTipoUsuario u WHERE u.usuarioTipoUsuarioPK.idUsuario = :idUsuario"),
    @NamedQuery(name = "UsuarioTipoUsuario.findByIdTipoUsuario", query = "SELECT u FROM UsuarioTipoUsuario u WHERE u.usuarioTipoUsuarioPK.idTipoUsuario = :idTipoUsuario")})
public class UsuarioTipoUsuario implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected UsuarioTipoUsuarioPK usuarioTipoUsuarioPK;
    @JoinColumn(name = "ID_TIPO_USUARIO", referencedColumnName = "ID_TIPO_USUARIO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private TipoUsuario tipoUsuario;
    @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID_USUARIO", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Usuario usuario;

    public UsuarioTipoUsuario() {
    }

    public UsuarioTipoUsuario(UsuarioTipoUsuarioPK usuarioTipoUsuarioPK) {
        this.usuarioTipoUsuarioPK = usuarioTipoUsuarioPK;
    }

    public UsuarioTipoUsuario(int idUsuario, int idTipoUsuario) {
        this.usuarioTipoUsuarioPK = new UsuarioTipoUsuarioPK(idUsuario, idTipoUsuario);
    }

    public UsuarioTipoUsuarioPK getUsuarioTipoUsuarioPK() {
        return usuarioTipoUsuarioPK;
    }

    public void setUsuarioTipoUsuarioPK(UsuarioTipoUsuarioPK usuarioTipoUsuarioPK) {
        this.usuarioTipoUsuarioPK = usuarioTipoUsuarioPK;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
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
        hash += (usuarioTipoUsuarioPK != null ? usuarioTipoUsuarioPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof UsuarioTipoUsuario)) {
            return false;
        }
        UsuarioTipoUsuario other = (UsuarioTipoUsuario) object;
        if ((this.usuarioTipoUsuarioPK == null && other.usuarioTipoUsuarioPK != null) || (this.usuarioTipoUsuarioPK != null && !this.usuarioTipoUsuarioPK.equals(other.usuarioTipoUsuarioPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ws.UsuarioTipoUsuario[ usuarioTipoUsuarioPK=" + usuarioTipoUsuarioPK + " ]";
    }

}
