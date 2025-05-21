export default () => ({
  // port: parseInt(process.env.PORT, 10) || 3000,
  DATABASE: {
    USER_URL: process.env.MONGO_URL_USER,
    ORDER_URL: process.env.MONGO_URL_ORDER,
  },
  // auth: {
  //   secret: process.env.KEY,
  // },
  // email: {
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   password: process.env.MAIL_PASSWORD,
  //   admin_email_from: process.env.DEFAULT_MAIL_FROM,
  //   app_name: process.env.APP_NAME,
  // },
});
