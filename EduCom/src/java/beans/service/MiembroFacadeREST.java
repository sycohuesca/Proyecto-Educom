/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans.service;

import beans.Miembro;
import beans.MiembroPK;
import java.util.Date;
import java.util.List;
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

/**
 *
 * @author syco
 */
@Stateless
@Path("miembros")
public class MiembroFacadeREST extends AbstractFacade<Miembro> {
    @PersistenceContext(unitName = "EduComPU")
    private EntityManager em;

    private MiembroPK getPrimaryKey(PathSegment pathSegment) {
        /*
         * pathSemgent represents a URI path segment and any associated matrix parameters.
         * URI path part is supposed to be in form of 'somePath;idUsuario=idUsuarioValue;idGrupo=idGrupoValue'.
         * Here 'somePath' is a result of getPath() method invocation and
         * it is ignored in the following code.
         * Matrix parameters are used as field names to build a primary key instance.
         */
        beans.MiembroPK key = new beans.MiembroPK();
        javax.ws.rs.core.MultivaluedMap<String, String> map = pathSegment.getMatrixParameters();
        java.util.List<String> idUsuario = map.get("idUsuario");
        if (idUsuario != null && !idUsuario.isEmpty()) {
            key.setIdUsuario(new java.lang.Integer(idUsuario.get(0)));
        }
        java.util.List<String> idGrupo = map.get("idGrupo");
        if (idGrupo != null && !idGrupo.isEmpty()) {
            key.setIdGrupo(new java.lang.Integer(idGrupo.get(0)));
        }
        return key;
    }

    public MiembroFacadeREST() {
        super(Miembro.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Miembro entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") PathSegment id, Miembro entity) {
        beans.MiembroPK key=getPrimaryKey(id);
        entity.setMiembroPK(key);
        entity.setFechaHora(new Date());
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") PathSegment id) {
        beans.MiembroPK key = getPrimaryKey(id);
        super.remove(super.find(key));
    }
    
      @GET
    @Path("usuario={id}")
    @Produces({"application/xml", "application/json"})
    public List<Miembro> getFindAllByUsuario(@PathParam("id") Integer idUsuario) {
        Query sql = em.createNamedQuery("Miembro.findByIdUsuario");
        sql.setParameter("idUsuario", idUsuario);
        List<Miembro> salida = sql.getResultList();
        if (salida.isEmpty()) {
            return null;
        } else {
            return salida;
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Miembro find(@PathParam("id") PathSegment id) {
        beans.MiembroPK key = getPrimaryKey(id);
        return super.find(key);
    }

    @GET
    @Override
    @Produces({"application/json"})
    public List<Miembro> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Miembro> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
