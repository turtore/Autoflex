package org.eloware.model;

import java.math.BigDecimal;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.Tuple;

public class Product {

  private Long id;
  private String name;
  private Integer value;


  /**
  * Constructor
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
  * Methods
  */
  public static Multi<Product> findAll(PgPool client) {

    return client
        .query("SELECT id, name, value FROM products ORDER BY name DESC")
        .execute()
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .onItem()
        .transform(Product::from);
  }


  public static Uni<Product> findById(PgPool client, Long id) {
    return client
        .preparedQuery("SELECT id, name, value FROM products WHERE id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  public static Uni<Long> save(PgPool client, String name, Integer value ) {
    return client
        .preparedQuery("INSERT INTO products (name, value) VALUES ($1, $2) RETURNING id")
        .execute(Tuple.of(name, value))
        .onItem()
        .transform(p -> p.iterator().next().getLong("id"));
  }


  public static Uni<Boolean> delete(PgPool client, Long id) {
    return client
        .preparedQuery("DELETE FROM products WHERE id= $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.rowCount() == 1);
  }


  private static Product from(Row row) {
    return new Product(row.getLong("id"), row.getString("name"), row.getInteger("value"));
  }

}
