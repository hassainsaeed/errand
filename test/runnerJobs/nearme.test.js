function runnerJobsNearMeTest(chai, expect, hostname, port, runnerJobsMockData) {
  it('expect active runner jobs returned that delivering near to legit inputted location', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/runnerjobs/nearme')
      .set('x-access-token', runnerJobsMockData.token)
      .query({
        requester_latitude: runnerJobsMockData.create_body.runner_latitude,
        requester_longitude: runnerJobsMockData.create_body.runner_longitude,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('runnerJobsDeliveringToLocation');
        expect(res.body.runnerJobsDeliveringToLocation.length).to.be.above(0);
        expect(res.body.runnerJobsDeliveringToLocation[0]).to.have.property('id');
        expect(res.body.runnerJobsDeliveringToLocation[0]).to.have.property('status', 'ACTIVE');
        expect(res.body.runnerJobsDeliveringToLocation[0]).to.have.property('is_accepting_requests', 1);
        done();
      });
  }).timeout(5000);

  it('expect no active runner jobs returned when inputted location is too far away', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/runnerjobs/nearme')
      .set('x-access-token', runnerJobsMockData.token)
      .query({
        requester_latitude: '60.716917',
        requester_longitude: '-135.0508252',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('runnerJobsDeliveringToLocation');
        expect(res.body.runnerJobsDeliveringToLocation.length).to.equal(0);
        done();
      });
  }).timeout(5000);

  it('expect no active runner jobs returned when inputted location is not reachable via drive', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/runnerjobs/nearme')
      .set('x-access-token', runnerJobsMockData.token)
      .query({
        requester_latitude: '0.000000',
        requester_longitude: '0.000000',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('runnerJobsDeliveringToLocation');
        expect(res.body.runnerJobsDeliveringToLocation.length).to.equal(0);
        done();
      });
  }).timeout(5000);
}

module.exports = runnerJobsNearMeTest;
