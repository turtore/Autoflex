package org.eloware.model;

import org.eloware.exception.InvalidDataException;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.Tuple;
import javax.ws.rs.core.Response;


/**
* Product class.
*/
public class Product {

  private Long id;
  private String name;
  private Integer value;


  /**
  * Constructor.
  */
  public Product() {
  }

  public Product(String name) {
    this.name = name;
  }

  public Product(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public Product(String name, Integer value) {
    this.name = name;
    this.value = value;
  }

  public Product(Long id, String name, Integer value) {
    this.id = id;
    this.name = name;
    this.value = value;
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

  public Integer getValue() {
    return value;
  }

  public void setValue(Integer value) {
    this.value = value;
  }


  /**
  * Reactive Methods.
  */
  public static Multi<Product> findAll(PgPool client) {
    return client
        .query("SELECT product_id, product_name, product_value "
            + "FROM products "
            + "ORDER BY product_value DESC")
        .execute()
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .onItem()
        .transform(Product::from);
  }


  public static Uni<Product> findById(PgPool client, Long id) {
    return client
        .preparedQuery("SELECT product_id, product_name, product_value "
            + "FROM products "
            + "WHERE product_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  public static Uni<Long> save(PgPool client, String name, Integer value ) {
    if (name.trim().equals("") || value <= 0) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("INSERT INTO products (product_name, product_value) "
            + "VALUES ($1, $2) "
            + "RETURNING product_id")
        .execute(Tuple.of(name, value))
        .onItem()
        .transform(p -> p.iterator().next().getLong("product_id"));
  }


  public static Uni<Tuple> update(PgPool client, String name, Integer value, Long id ) {
    if (name.trim().equals("")) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("UPDATE products "
            + "SET product_name = $1, product_value = $2 "
            + "WHERE product_id = $3")
        .execute(Tuple.of(name, value, id))
        .replaceWith(Tuple.of(name, value, id));
  }


  public static Uni<Boolean> delete(PgPool client, Long id) {
    return client
        .preparedQuery("DELETE FROM products "
            + "WHERE product_id= $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.rowCount() == 1);
  }

  /**
   * Util.
   */
  public static Uni<Response> existsByName(PgPool client, String name) {
    return client
        .preparedQuery("SELECT product_id, product_name, product_value "
            + "FROM products "
            + "WHERE product_name = $1")
        .execute(Tuple.of(name))
        .onItem()
        .transform(p -> p.rowCount() > 0)
        .onItem()
        .transform(product -> product != null ? Response.ok(product)
          : Response.status(Response.Status.NOT_FOUND))
        .onItem()
        .transform(Response.ResponseBuilder::build);
  }


  public static Uni<Product> existsById(PgPool client, Long id) {
    return client
        .preparedQuery("SELECT product_id, product_name, product_value "
            + "FROM products "
            + "WHERE product_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  private static Product from(Row row) {
    return new Product(row.getLong("product_id"), row.getString("product_name"),
        row.getInteger("product_value"));
  }


}
