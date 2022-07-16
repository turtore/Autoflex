package org.eloware.model;

import org.eloware.exception.InvalidDataException;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.Tuple;
import javax.ws.rs.core.Response;


/**
* Material class.
*/
public class Material {

  private Long id;
  private String name;
  private Integer quantity;


  /**
  * Constructor.
  */
  public Material() {
  }

  public Material(String name) {
    this.name = name;
  }

  public Material(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public Material(String name, Integer quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  public Material(Long id, String name, Integer quantity) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }


  /**
  * Getter and Setter
  */
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }


  /**
  * Reactive Methods.
  */
  public static Multi<Material> findAll(PgPool client) {
    return client
        .query("SELECT material_id, material_name, material_quantity "
            + "FROM materials "
            + "ORDER BY material_name")
        .execute()
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .onItem()
        .transform(Material::from);
  }


  public static Uni<Material> findById(PgPool client, Long id) {
    return client
        .preparedQuery("SELECT material_id, material_name, material_quantity "
            + "FROM materials "
            + "WHERE material_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  public static Uni<Long> save(PgPool client, String name, Integer quantity ) {
    if (name.trim().equals("") || quantity <= 0) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("INSERT INTO materials (material_name, material_quantity) "
            + "VALUES ($1, $2) "
            + "RETURNING material_id")
        .execute(Tuple.of(name, quantity))
        .onItem()
        .transform(p -> p.iterator().next().getLong("material_id"));
  }


  public static Uni<Tuple> update(PgPool client, String name, Integer quantity, Long id ) {
    if (name.trim().equals("")) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("UPDATE materials "
            + "SET material_name = $1, material_quantity = $2 "
            + "WHERE material_id = $3")
        .execute(Tuple.of(name, quantity, id))
        .replaceWith(Tuple.of(name, quantity, id));
  }


  public static Uni<Boolean> delete(PgPool client, Long id) {
    return client
        .preparedQuery("DELETE FROM materials "
            + "WHERE material_id= $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.rowCount() == 1);
  }


  /**
   * Util.
   */
  public static Uni<Response> existsByName(PgPool client, String name) {
    return client
        .preparedQuery("SELECT material_id, material_name, material_quantity "
            + "FROM materials "
            + "WHERE material_name = $1")
        .execute(Tuple.of(name))
        .onItem()
        .transform(p -> p.rowCount() > 0)
        .onItem()
        .transform(product -> product != null ? Response.ok(product)
          : Response.status(Response.Status.NOT_FOUND))
        .onItem()
        .transform(Response.ResponseBuilder::build);
  }


  public static Uni<Material> existsById(PgPool client, Long id) {
    return client
        .preparedQuery("SELECT material_id, material_name, material_quantity "
            + "FROM materials "
            + "WHERE material_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  private static Material from(Row row) {
    return new Material(row.getLong("material_id"), row.getString("material_name"),
        row.getInteger("material_quantity"));
  }


}
