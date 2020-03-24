package com.github.opaluchlukasz.gitlabstatsfetcher.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.time.ZonedDateTime;

import static lombok.AccessLevel.PRIVATE;

@ToString
@RequiredArgsConstructor(access = PRIVATE)
@Builder
@JsonDeserialize(builder = Job.JobBuilder.class)
public class Job {
    public final Long id;
    public final String name;
    public final String ref;
    public final String stage;
    public final String status;
    public final ZonedDateTime startedAt;
    public final ZonedDateTime finishedAt;
    public final Double duration;
    public final Commit commit;

    @JsonPOJOBuilder(withPrefix = "")
    public static class JobBuilder {
        @JsonProperty("started_at")
        public JobBuilder startedAt(ZonedDateTime started) {
            this.startedAt = started;
            return this;
        }

        @JsonProperty("finished_at")
        public JobBuilder finishedAt(ZonedDateTime finished) {
            this.finishedAt = finished;
            return this;
        }
    }
}
