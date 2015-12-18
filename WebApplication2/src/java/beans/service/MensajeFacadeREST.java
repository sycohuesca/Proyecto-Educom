/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans.service;

import beans.Mensaje;
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

/**
 *
 * @author syco
 */
@Stateless
@Path("mensajes")
public class MensajeFacadeREST extends AbstractFacade<Mensaje> {

    @PersistenceContext(unitName = "EduComPU")
    private EntityManager em;

    public MensajeFacadeREST() {
        super(Mensaje.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Mensaje entity) {
        entity.setFechaHora(new Date());
        entity.setModificado(new Date());
        entity.setEstado("Sin modificar");
        entity.setIdMensaje(1);
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Mensaje entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("grupo={id}")
    @Produces({"application/xml", "application/json"})
    public List<Mensaje> getFindAllByGrupo(@PathParam("id") Integer idGrupo) {
        Query sql = em.createNamedQuery("Mensaje.findAllByIdGrupo");
        sql.setParameter("idGrupo", idGrupo);
        List<Mensaje> salida = sql.getResultList();
        if (salida.isEmpty()) {
            return null;
        } else {
            return salida;
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Mensaje find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Mensaje> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Mensaje> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
