export default {
  JWTSECRET: process.env.JWTSECRET || "some secret very hard",
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/api",
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD
  }
};
