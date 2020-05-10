function signInTest(chai, expect, hostname, port, authMockUserData) {
  it('expect to sign in a user who has already signed up', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signin')
      .type('json')
      .send({
        email: authMockUserData.email,
        password: authMockUserData.password,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('expect to not sign in a user with the wrong email', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signin')
      .type('json')
      .send({
        email: 'wrong-email@gmail',
        password: authMockUserData.password,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('errors').property('message', '❌ Could not verify email');
        done();
      });
  });

  it('expect to not sign in a user with the wrong password', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/auth/signin')
      .type('json')
      .send({
        email: authMockUserData.email,
        password: 'wrongpassword',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('errors').property('message', '❌ Could not verify password');
        done();
      });
  });
}

module.exports = signInTest;
