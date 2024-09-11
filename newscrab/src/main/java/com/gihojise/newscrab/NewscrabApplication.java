package com.gihojise.newscrab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NewscrabApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewscrabApplication.class, args);
	}

}
