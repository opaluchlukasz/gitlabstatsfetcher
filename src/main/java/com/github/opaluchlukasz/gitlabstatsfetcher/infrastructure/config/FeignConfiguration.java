package com.github.opaluchlukasz.gitlabstatsfetcher.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import feign.codec.Decoder;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.ResponseEntityDecoder;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;

@Configuration
public class FeignConfiguration {
    @Bean
    public Decoder feignDecoder(ObjectMapper objectMapper) {
        HttpMessageConverter jacksonConverter = new MappingJackson2HttpMessageConverter(objectMapper);
        ObjectFactory<HttpMessageConverters> objectFactory = () -> new HttpMessageConverters(jacksonConverter);
        return new ResponseEntityDecoder(new SpringDecoder(objectFactory));
    }

    @Component
    public static class GitlabClientInterceptor implements RequestInterceptor {
        private static final String AUTHORIZATION_HEADER = "PRIVATE-TOKEN";
        private final String gitlabPrivateToken;

        GitlabClientInterceptor(@Value("${gitlab.private.token}") String gitlabPrivateToken) {
            this.gitlabPrivateToken = gitlabPrivateToken;
        }

        @Override
        public void apply(RequestTemplate requestTemplate) {
             requestTemplate.header(AUTHORIZATION_HEADER, gitlabPrivateToken);
        }
    }
}
