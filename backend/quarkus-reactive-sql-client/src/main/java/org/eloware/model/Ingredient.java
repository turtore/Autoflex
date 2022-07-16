package org.eloware.model;

import org.eloware.exception.InvalidDataException;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.Tuple;


/**
 * Product class.
 */
public class Ingredient {

  private Integer id;
  private Integer quantity;
  private Integer productId;
  private Integer materialId;

  /**
   * Constructor.
   */
  public Ingredient() {
  }

  public Ingredient(Integer id, Integer quantity, Integer productId, Integer materialId) {
    this.id = id;
    this.quantity = quantity;
    this.productId = productId;
    this.materialId = materialId;
  }

  public Ingredient(Integer quantity, Integer productId, Integer materialId) {
    this.quantity = quantity;
    this.productId = productId;
    this.materialId = materialId;
  }

  /**
  * Getter and Setter.
  */
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  public Integer getMaterialId() {
    return materialId;
  }

  public void setMaterialId(Integer materialId) {
    this.materialId = materialId;
  }


  /**
   * Reactive Methods.
   */
  public static Multi<Ingredient> findAll(PgPool client) {
    return client
        .query("SELECT ingredient_id, ingredient_quantity, product_id, material_id "
            + "FROM ingredients "
            + "ORDER BY ingredient_quantity DESC")
        .execute()
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .onItem()
        .transform(Ingredient::from);
  }


  public static Uni<Ingredient> findById(PgPool client, Integer id) {
    return client
        .preparedQuery("SELECT ingredient_id, ingredient_quantity, product_id, material_id "
            + "FROM ingredients "
            + "WHERE ingredient_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.iterator().hasNext() ? from(p.iterator().next()) : null);
  }


  public static Multi<Ingredient> findByProduct(PgPool client, Integer id) {
    return client
        .preparedQuery("SELECT ingredient_id, ingredient_quantity, product_id, material_id "
            + "FROM ingredients "
            + "WHERE product_id = $1")
        .execute(Tuple.of(id))
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .onItem()
        .transform(Ingredient::from);
  }

  public static Uni<Integer> save
      (PgPool client, Integer quantity, Integer productId, Integer materialId ) {
    if (quantity <= 0) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("INSERT INTO ingredients (ingredient_quantity, product_id, material_id) "
            + "VALUES ($1, $2, $3) "
            + "RETURNING ingredient_id")
        .execute(Tuple.of(quantity, productId, materialId))
        .onItem()
        .transform(p -> p.iterator().next().getInteger("ingredient_id"));
  }


  public static Uni<Tuple> update(PgPool client, Integer quantity, Integer id ) {
    if (quantity <= 0) {
      throw new InvalidDataException();
    }

    return client
        .preparedQuery("UPDATE ingredients "
            + "SET ingredient_quantity = $1"
            + "WHERE product_id = $2")
        .execute(Tuple.of(quantity, id))
        .replaceWith(Tuple.of(quantity, id));
  }


  public static Uni<Boolean> delete(PgPool client, Integer id) {
    return client
        .preparedQuery("DELETE FROM ingredients "
            + "WHERE ingredient_id= $1")
        .execute(Tuple.of(id))
        .onItem()
        .transform(p -> p.rowCount() == 1);
  }


  /**
  * Util.
  */
  private static Ingredient from(Row row) {
    return new Ingredient(row.getInteger("ingredient_id"), row.getInteger("ingredient_quantity"),
        row.getInteger("product_id"),row.getInteger("material_id"));
  }


}
