describe('Errand E2E Tests', () => {
  let app;

  beforeEach(async () => {
    app = await require('./server.js')
  })

  describe('Auth - Sign Up Test', () => {
    require('./auth/signup.test.js')
  })

  afterEach(async () => {
    await app.close;
  })


});
