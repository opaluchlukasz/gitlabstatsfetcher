package com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collection;
import java.util.List;

import static java.util.concurrent.TimeUnit.SECONDS;
import static java.util.stream.Collectors.toList;

@EnableCaching
@Configuration
public class CacheConfig {
    public static final String JOBS = "jobs";
    private static final int CACHE_ENTRY_TTL = 3200;

    private static final Collection<String> CACHE_NAMES = List.of(JOBS);

    @Bean
    CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(CACHE_NAMES.stream().map(this::buildCache).collect(toList()));
        return cacheManager;
    }

    private CaffeineCache buildCache(String name) {
        Caffeine<Object, Object> caffeineBuilder = Caffeine.newBuilder().expireAfterWrite(CACHE_ENTRY_TTL, SECONDS);
        return new CaffeineCache(name, caffeineBuilder.build());
    }
}
