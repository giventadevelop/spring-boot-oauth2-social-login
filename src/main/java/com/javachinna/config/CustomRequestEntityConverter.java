package com.javachinna.config;
import com.javachinna.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequestEntityConverter;
import org.springframework.util.MultiValueMap;

public class CustomRequestEntityConverter implements Converter<OAuth2AuthorizationCodeGrantRequest, RequestEntity<?>> {
    private static final Logger logger = LoggerFactory.getLogger(CustomRequestEntityConverter.class);

  private OAuth2AuthorizationCodeGrantRequestEntityConverter defaultConverter;

  public CustomRequestEntityConverter() {
      defaultConverter = new OAuth2AuthorizationCodeGrantRequestEntityConverter();
  }

  @Override
  public RequestEntity<?> convert(OAuth2AuthorizationCodeGrantRequest req) {
      RequestEntity<?> entity = defaultConverter.convert(req);
      MultiValueMap<String, String> params =  (MultiValueMap<String, String>) entity.getBody();
      String url = params.getFirst("redirect_uri");
      if(url.contains("facebook")|| url.contains("github")){
          url = url.replace("http", "https");

          if(url.contains("github")){
              logger.info("The redirect - url contains github: "+ url);
              logger.debug("The redirect  - url contains github: "+ url);
          }
      }
      params.set("redirect_uri", url);
      logger.info("Callback Request Parameters: "+params.toSingleValueMap().toString());
      logger.debug("Callback Request Parameters: "+params.toSingleValueMap().toString());
      logger.debug("The redirect_uri after OAuth2_ReqEntity_Converter is : "+url);
      return new RequestEntity<>(params, entity.getHeaders(), 
        entity.getMethod(), entity.getUrl());
  }

}