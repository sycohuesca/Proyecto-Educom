/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans.service;

import beans.Login;
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
@Path("logins")
public class LoginFacadeREST extends AbstractFacade<Login> {
    @PersistenceContext(unitName = "EduComPU")
    private EntityManager em;

    public LoginFacadeREST() {
        super(Login.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Login entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Login entity) {
        super.edit(entity);
    }
      @PUT
    @Path("usuario={id}/{pasViejo}/{pasNuevo}")
    @Consumes({"application/xml", "application/json"})
    public Login editPassword(@PathParam("id") Integer id, @PathParam("pasViejo") String pasViejo, @PathParam("pasNuevo") String pasNuevo) {
        Login login = this.findByIdUsuario(id);
        if (!login.getPassword().equals(pasViejo)) {
            login = new Login();
        } else {
            login.setPassword(pasNuevo);
            super.edit(login);
        }

        return login;
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
     @GET
    @Path("idUsuario={idUsuario}")
    @Produces({"application/json"})
    public Login findByIdUsuario(@PathParam("idUsuario") Integer idUsuario) {
        Query sql = em.createNamedQuery("Login.findByIdUsuario");
        sql.setParameter("idUsuario", idUsuario);
        List<Login> login = sql.getResultList();
        if (login.isEmpty()) {
            return new Login();
        } else {
            return login.get(0);
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Login find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Login> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Login> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
