package com.github.opaluchlukasz.gitlabstatsfetcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class GitlabstatsfetcherApplication {

	public static void main(String[] args) {
		SpringApplication.run(GitlabstatsfetcherApplication.class, args);
	}
}
