package org.eloware.resource;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import io.quarkus.test.junit.QuarkusTest;

import io.restassured.http.ContentType;
import org.eloware.model.Product;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;


@QuarkusTest
@Tag("integration")
@TestMethodOrder(OrderAnnotation.class)
class ProductResourceTest {

  @Test
  @DisplayName("1 - Should get a list of all products")
  @Order(1)
  void getAllTest() {

    given()
        .when().get("/products")
        .then()
        .statusCode(200);
  }

  @Test
  @DisplayName("2 - Should get the correct product by id")
  @Order(2)
  void getByIdTest() {

    given()
        .when().get("/products/2")
        .then()
        .statusCode(200)
        .body("name", is("product2"));

    given()
        .when().get("/products/999")
        .then()
        .statusCode(404);
  }

  @Test
  @DisplayName("3 - Should receive a error when register a duplicated product")
  @Order(3)
  void create() {
    Product productTest = new Product("product1", 10);

    given()
        .when()
        .body(productTest)
        .contentType(ContentType.JSON)
        .post("/products/")
        .then()
        .statusCode(500);
  }

  @Test
  @DisplayName("4 - Should get notfound when asked to delete a product that doesnt exists")
  @Order(4)
  void delete() {

    given()
        .when()
        .delete("/products/999")
        .then()
        .statusCode(404);
  }

  @Test
  @DisplayName("5 - Should update a product")
  @Order(5)
  void update() {
    Product productTest = new Product("product1", 10);

    given()
        .when()
        .body(productTest)
        .contentType(ContentType.JSON)
        .put("/products/1")
        .then()
        .statusCode(200);
  }

}