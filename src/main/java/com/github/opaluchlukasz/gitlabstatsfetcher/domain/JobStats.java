package com.github.opaluchlukasz.gitlabstatsfetcher.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

import static java.util.Comparator.comparingDouble;
import static lombok.AccessLevel.PRIVATE;

@ToString
@RequiredArgsConstructor(access = PRIVATE)
@Builder
@JsonDeserialize(builder = JobStats.CommitBuilder.class)
public class JobStats {
    public final Double averageDuration;
    public final Job maxDurationJob;
    public final Job minDurationJob;

    public JobStats(List<Job> jobs) {
        maxDurationJob = jobs.stream().max(comparingDouble(job -> job.duration)).orElse(null);
        minDurationJob = jobs.stream().min(comparingDouble(job -> job.duration)).orElse(null);
        averageDuration = jobs.stream().mapToDouble(job -> job.duration).average().orElse(0.0);
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class CommitBuilder { }
}
