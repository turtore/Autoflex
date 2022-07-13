package org.eloware.resource;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ProductResourceTest {

  @Test
  void getAll() {
    given()
        .when().get("/products")
        .then()
        .statusCode(200)
        .body("$.size()", is(3),
            "[0]name", is("product1"));
  }

  @Test
  void getById() {
  }

  @Test
  void create() {
  }

  @Test
  void delete() {
  }
}