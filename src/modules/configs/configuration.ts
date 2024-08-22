export default () => ({
  forgotPasswordExpiry:
    parseInt(process.env.FORGOT_PASSWORD_EXPIRY, 10) || 3600,
});
