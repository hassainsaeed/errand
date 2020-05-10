const common = require('../common.js');

const chai = common.chai;
const expect = common.expect;
const authMockUserData = common.authMockUserData;
const hostname = common.hostname;
const port = common.port;

console.log(`${hostname}:${port}`)


  it('should sign up a random user', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signup')
      .type('json')
      .send(authMockUserData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        done();
      })
  });
