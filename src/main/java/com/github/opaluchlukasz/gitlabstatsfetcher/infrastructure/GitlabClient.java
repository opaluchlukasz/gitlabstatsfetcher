package com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure;

import com.github.opaluchlukasz.gitlabstatsfetcher.domain.Job;
import com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure.config.FeignConfiguration;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

import static com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure.config.CacheConfig.JOBS;

@FeignClient(value = "gitlab", configuration = FeignConfiguration.class)
public interface GitlabClient {

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/api/v4/projects/{projectId}/jobs?per_page={perPage}&page={page}",
            consumes = "application/json")
    @Cacheable(cacheNames = JOBS)
    List<Job> jobs(@PathVariable("projectId") String projectId,
                   @PathVariable("page") Integer page,
                   @PathVariable("perPage") Integer perPage);
}
