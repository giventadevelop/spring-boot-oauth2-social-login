export const environment = {
  production: true,

  API_BASE_URL:
    'http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com',

  OAUTH2_URL: '/oauth2/authorization/',

  REDIRECT_URL: '?redirect_uri=http://localhost:8080/login/oauth2/code/google',

  API_URL: '/api/',
  AUTH_API: '/api/auth/',
  GOOGLE_AUTH_URL:
    'http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/oauth2/authorization/google?redirect_uri=http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/login/oauth2/code/google',
  FACEBOOK_AUTH_URL:
    'http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/oauth2/authorization/facebook?redirect_uri=http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/login/oauth2/code/facebook',
  GITHUB_AUTH_URL:
    'http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/oauth2/authorization/github?redirect_uri=http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/login/oauth2/code/github',

  LINKEDIN_AUTH_URL:
    'http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/oauth2/authorization/linkedin?redirect_uri=http://awsbeanstalk2-env.eba-puiq3awc.us-east-2.elasticbeanstalk.com/login/oauth2/code/google',
};
