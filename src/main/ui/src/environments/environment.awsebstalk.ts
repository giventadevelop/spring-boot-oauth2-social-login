export const environment = {
  production: true,

  API_BASE_URL: 'https://www.adwiise.com',

  OAUTH2_URL: '/oauth2/authorization/',

  REDIRECT_URL: '?redirect_uri=http://localhost:8080/login/oauth2/code/google',

  API_URL: '/api/',
  AUTH_API: '/api/auth/',
  GOOGLE_AUTH_URL:
    'https://www.adwiise.com/oauth2/authorization/google?redirect_uri=https://www.adwiise.com/login/oauth2/code/google',
  FACEBOOK_AUTH_URL:
    'https://www.adwiise.com/oauth2/authorization/facebook?redirect_uri=https://www.adwiise.com/login/oauth2/code/facebook',
  GITHUB_AUTH_URL: 'https://www.adwiise.com/oauth2/authorization/github',

  LINKEDIN_AUTH_URL:
    'https://www.adwiise.com/oauth2/authorization/linkedin?redirect_uri=https://www.adwiise.com/login/oauth2/code/google',
};
