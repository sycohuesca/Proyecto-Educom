/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans.service;

import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.PathSegment;
import beans.UsuarioTipoUsuario;
import beans.UsuarioTipoUsuarioPK;

/**
 *
 * @author syco
 */
@Stateless
@Path("usuariotipousuario")
public class UsuarioTipoUsuarioFacadeREST extends AbstractFacade<UsuarioTipoUsuario> {
    @PersistenceContext(unitName = "EduComPU")
    private EntityManager em;

    private UsuarioTipoUsuarioPK getPrimaryKey(PathSegment pathSegment) {
        /*
         * pathSemgent represents a URI path segment and any associated matrix parameters.
         * URI path part is supposed to be in form of 'somePath;idUsuario=idUsuarioValue;idTipoUsuario=idTipoUsuarioValue'.
         * Here 'somePath' is a result of getPath() method invocation and
         * it is ignored in the following code.
         * Matrix parameters are used as field names to build a primary key instance.
         */
        UsuarioTipoUsuarioPK key = new UsuarioTipoUsuarioPK();
        javax.ws.rs.core.MultivaluedMap<String, String> map = pathSegment.getMatrixParameters();
        java.util.List<String> idUsuario = map.get("idUsuario");
        if (idUsuario != null && !idUsuario.isEmpty()) {
            key.setIdUsuario(new java.lang.Integer(idUsuario.get(0)));
        }
        java.util.List<String> idTipoUsuario = map.get("idTipoUsuario");
        if (idTipoUsuario != null && !idTipoUsuario.isEmpty()) {
            key.setIdTipoUsuario(new java.lang.Integer(idTipoUsuario.get(0)));
        }
        return key;
    }

    public UsuarioTipoUsuarioFacadeREST() {
        super(UsuarioTipoUsuario.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(UsuarioTipoUsuario entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") PathSegment id) {
        UsuarioTipoUsuario usuarioTipo = new UsuarioTipoUsuario(getPrimaryKey(id));
        UsuarioTipoUsuarioPK key = getPrimaryKey(id);
        usuarioTipo.setUsuarioTipoUsuarioPK(key);
        super.edit(usuarioTipo);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") PathSegment id) {
       UsuarioTipoUsuarioPK key = getPrimaryKey(id);
        super.remove(super.find(key));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public UsuarioTipoUsuario find(@PathParam("id") PathSegment id) {
        UsuarioTipoUsuarioPK key = getPrimaryKey(id);
        return super.find(key);
    }

    @GET
    @Path("usuario={id}")
    @Produces({"application/xml", "application/json"})
    public List<UsuarioTipoUsuario> getFindAllByUsuario(@PathParam("id") Integer idUsuario) {
        Query sql = em.createNamedQuery("UsuarioTipoUsuario.findByIdUsuario");
        sql.setParameter("idUsuario", idUsuario);
        List<UsuarioTipoUsuario> salida = sql.getResultList();
        if (salida.isEmpty()) {
            return null;
        } else {
            return salida;
        }
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<UsuarioTipoUsuario> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<UsuarioTipoUsuario> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
