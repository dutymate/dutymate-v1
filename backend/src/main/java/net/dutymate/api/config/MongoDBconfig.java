package net.dutymate.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "net.dutymate.api.wardSchedules.repository")
public class MongoDBconfig {
}
