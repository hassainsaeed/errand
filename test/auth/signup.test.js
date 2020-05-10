function signUpTest(chai, expect, hostname, port, authMockUserData) {
  it('expect to sign up a new user', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signup')
      .type('json')
      .send(authMockUserData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('expect to not let you sign with the same email twice', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signup')
      .type('json')
      .send(authMockUserData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('errors').property('message', `❌ Something went wrong while trying to create your account: ER_DUP_ENTRY: Duplicate entry '${authMockUserData.email}' for key 'users.email'`);
        done();
      });
  });
}

module.exports = signUpTest;
