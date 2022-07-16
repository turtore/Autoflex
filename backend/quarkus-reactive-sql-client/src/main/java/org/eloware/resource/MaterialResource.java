package org.eloware.resource;

import org.eloware.model.Material;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import java.net.URI;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;


@Path("/materials")
public class MaterialResource {

  @Inject
  PgPool client;


  /**
  * Endpoints.
  */
  @GET
  public Multi<Material> getAll() {
    return Material.findAll(client);
  }


  @GET
  @Path("/{id}")
  public Uni<Response> getById(@PathParam("id") Long id) {
    return Material.findById(client, id)
        .onItem()
        .transform(product -> product != null ? Response.ok(product)
            : Response.status(Response.Status.NOT_FOUND))
        .onItem()
        .transform(Response.ResponseBuilder::build);
  }


  @GET
  @Path("/name/{name}")
  public Uni<Response> getByName(@PathParam("name") String name) {
    return Material.existsByName(client, name);
  }



  @POST
  @Blocking
  public Uni<Response> create(Material material) {

    return Material.save(client, material.getName(), material.getQuantity())
        .onItem()
        .transform(id -> URI.create("/materials/" + id))
        .onItem()
        .transform(uri -> Response.created(uri).build());
  }

  @PUT
  @Blocking
  @Path("/{id}")
  public Uni<Response> update(@PathParam("id") Long id, Material material) {

    return Material.update(client, material.getName(), material.getQuantity(), id)
        .onItem()
        .transform(uri -> Response.ok().build());
  }


  @DELETE
  @Path("/{id}")
  public Uni<Response> delete(@PathParam("id") Long id) {
    return Material.delete(client, id)
        .onItem()
        .transform(deleted -> deleted ? Response.Status.NO_CONTENT
            : Response.Status.NOT_FOUND)
        .onItem()
        .transform(status -> Response.status(status).build());
  }

}
