package com.github.opaluchlukasz.gitlabstatsfetcher.domain;

import com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure.GitlabClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
public class JobFetcher {
    private static final int PER_PAGE = 100;
    private static final long MAX_SIZE = 2_000L;

    private final GitlabClient gitlabClient;

    public List<Job> fetchJobsFor(String projectId) {
        return Stream.iterate(1, n -> n + 1)
                .map(n -> gitlabClient.jobs(projectId, n, PER_PAGE))
                .takeWhile(page -> page.size() != 0)
                .flatMap(Collection::stream)
                .filter(job -> job.startedAt != null)
                .limit(MAX_SIZE)
                .sorted(comparing(job -> job.startedAt))
                .collect(toList());
    }
}
