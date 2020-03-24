package com.github.opaluchlukasz.gitlabstatsfetcher.api.rest;

import com.github.opaluchlukasz.gitlabstatsfetcher.domain.Job;
import com.github.opaluchlukasz.gitlabstatsfetcher.domain.JobFetcher;
import com.github.opaluchlukasz.gitlabstatsfetcher.domain.JobStats;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/v1/projects/{projectId}")
@Validated
@RequiredArgsConstructor
public class JobsResource {
    private final JobFetcher jobFetcher;

    @RequestMapping(path = "/jobs", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<Job> jobs(@PathVariable(value = "projectId") String projectId) {
        return jobFetcher.fetchJobsFor(projectId);
    }

    @RequestMapping(path = "/job-stats", method = GET, produces = APPLICATION_JSON_VALUE)
    public JobStats jobStats(@PathVariable(value = "projectId") String projectId) {
        return new JobStats(jobFetcher.fetchJobsFor(projectId));
    }
}
