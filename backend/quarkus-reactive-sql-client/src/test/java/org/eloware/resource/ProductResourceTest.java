package org.eloware.resource;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

@QuarkusTest
@QuarkusTestResource(TestContainerDatabase.class)
class ProductResourceTest {

  @Test
  void getAll() {
    given()
        .when().get("/products")
        .then()
        .statusCode(200)
        .body("$.size()", is(4));
  }

  @Test
  void getById() {
    given()
        .when().get("/products/2")
        .then()
        .statusCode(200)
        .body("name", is("product2"));
  }

  @Test
  void create() {
  }

  @Test
  void delete() {
  }
}