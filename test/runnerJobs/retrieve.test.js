function retrieveRunnerJobsTest(chai, expect, hostname, port, runnerJobsMockData) {
  it('expect a list of runner jobs', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/runnerjobs')
      .set('x-access-token', runnerJobsMockData.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('runnerJobs');
        expect(res.body.runnerJobs.length).to.be.above(0);
        expect(res.body.runnerJobs[0]).to.have.property('id');
        expect(res.body.runnerJobs[0]).to.have.property('runners_user_id');
        expect(res.body.runnerJobs[0]).to.have.property('status');
        expect(res.body.runnerJobs[0]).to.have.property('is_accepting_requests');
        expect(res.body.runnerJobs[0]).to.have.property('store_name');
        expect(res.body.runnerJobs[0]).to.have.property('runner_latitude');
        expect(res.body.runnerJobs[0]).to.have.property('runner_longitude');
        expect(res.body.runnerJobs[0]).to.have.property('radius');
        done();
      });
  });
}

module.exports = retrieveRunnerJobsTest;
