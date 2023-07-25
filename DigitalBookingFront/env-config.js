const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://localhost:8080',
  },
  production: {
    API_URL: 'http://ec2-3-139-196-225.us-east-2.compute.amazonaws.com:8080',
  },
};

export default config[env];