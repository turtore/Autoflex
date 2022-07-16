package org.eloware.resource;

import org.eloware.model.Ingredient;
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
import io.smallrye.common.annotation.Blocking;


@Path("/ingredients")
public class IngredientResource {

  @Inject
  PgPool client;


  /**
  * Endpoints.
  */
  @GET
  public Multi<Ingredient> getAll() {
    return Ingredient.findAll(client);
  }


  @GET
  @Path("/{id}")
  public Uni<Response> getById(@PathParam("id") Integer id) {
    return Ingredient.findById(client, id)
        .onItem()
        .transform(product -> product != null ? Response.ok(product)
            : Response.status(Response.Status.NOT_FOUND))
        .onItem()
        .transform(Response.ResponseBuilder::build);
  }

  @GET
  @Path("/{id}/product")
  public Multi<Ingredient> findByProduct(@PathParam("id") Integer id) {
    return Ingredient.findByProduct(client, id);

  }


  @POST
  @Blocking
  public Uni<Response> create(Ingredient ingredient) {

    return Ingredient.save(client, ingredient.getQuantity(),
            ingredient.getProductId(), ingredient.getMaterialId())
        .onItem()
        .transform(id -> URI.create("/ingredients/" + id))
        .onItem()
        .transform(uri -> Response.created(uri).build());
  }


  @PUT
  @Blocking
  @Path("/{id}")
  public Uni<Response> update(@PathParam("id") Integer id, Ingredient ingredient) {

    return Ingredient.update(client, ingredient.getQuantity(), id)
        .onItem()
        .transform(uri -> Response.ok().build());
  }


  @DELETE
  @Path("/{id}")
  public Uni<Response> delete(@PathParam("id") Integer id) {
    return Ingredient.delete(client, id)
        .onItem()
        .transform(deleted -> deleted ? Response.Status.NO_CONTENT
            : Response.Status.NOT_FOUND)
        .onItem()
        .transform(status -> Response.status(status).build());
  }

}
