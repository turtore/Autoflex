package org.eloware.resource;

import java.util.Map;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import org.testcontainers.containers.PostgreSQLContainer;

public class TestContainerDatabase implements QuarkusTestResourceLifecycleManager {
  public static final  PostgreSQLContainer<?> DATABASE = new PostgreSQLContainer<>
  @Override
  public Map<String, String> start() {
    DATABASE.start
    return null;
  }

  @Override
  public void stop() {

  }

}
