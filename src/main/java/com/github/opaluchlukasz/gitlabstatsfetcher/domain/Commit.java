package com.github.opaluchlukasz.gitlabstatsfetcher.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import static lombok.AccessLevel.PRIVATE;

@ToString
@RequiredArgsConstructor(access = PRIVATE)
@Builder
@JsonDeserialize(builder = Commit.CommitBuilder.class)
public class Commit {
    public final String message;

    @JsonPOJOBuilder(withPrefix = "")
    public static class CommitBuilder { }
}
