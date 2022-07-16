package org.eloware.resource;

import org.eloware.model.Product;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.smallrye.mutiny.Multi;
import java.net.URI;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;


@Path("/products")
public class ProductResource {

  @Inject
  PgPool client;


  /**
  * Endpoints.
  */
  @GET
  public Multi<Product> getAll() {
    return Product.findAll(client);
  }


  @GET
  @Path("/{id}")
  public Uni<Response> getById(@PathParam("id") Long id) {
    return Product.findById(client, id)
        .onItem()
        .transform(product -> product != null ? Response.ok(product)
            : Response.status(Response.Status.NOT_FOUND))
        .onItem()
        .transform(Response.ResponseBuilder::build);
  }


  @GET
  @Path("/name/{name}")
  public Uni<Response> getByName(@PathParam("name") String name) {
    return Product.existsByName(client, name);

  }



  @POST
  @Blocking
  public Uni<Response> create(Product product) {

    return Product.save(client, product.getName(), product.getValue())
        .onItem()
        .transform(id -> URI.create("/products/" + id))
        .onItem()
        .transform(uri -> Response.created(uri).build());
  }

  @PUT
  @Blocking
  @Path("/{id}")
  public Uni<Response> update(@PathParam("id") Long id, Product product) {

    return Product.update(client, product.getName(), product.getValue(), id)
        .onItem()
        .transform(uri -> Response.ok().build());
  }


  @DELETE
  @Path("/{id}")
  public Uni<Response> delete(@PathParam("id") Long id) {
    return Product.delete(client, id)
        .onItem()
        .transform(deleted -> deleted ? Response.Status.NO_CONTENT
            : Response.Status.NOT_FOUND)
        .onItem()
        .transform(status -> Response.status(status).build());
  }

}
