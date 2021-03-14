package com.javachinna.security.oauth2.user;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {

	public GithubOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return ((Integer) attributes.get("id")).toString();
	}

	@Override
	public String getName() {

		if (attributes.get("name")!=null) {
			return (String) attributes.get("name");
		}else if (attributes.get("login")!=null){
			return (String) attributes.get("login");
		}

		return null;
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getImageUrl() {
		return (String) attributes.get("avatar_url");
	}
}