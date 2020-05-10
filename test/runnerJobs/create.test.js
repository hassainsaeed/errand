function createRunnerJobsTest(chai, expect, hostname, port, runnerJobsMockData) {
  it('expect a new runner job to be created for user_id 2', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/runnerjobs')
      .set('x-access-token', runnerJobsMockData.token)
      .type('json')
      .send(runnerJobsMockData.create_body)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('runnerJob');
        expect(res.body).to.have.property('runnerJob').to.have.property('runners_user_id', runnerJobsMockData.create_body.user_id);
        expect(res.body).to.have.property('runnerJob').to.have.property('store_name', runnerJobsMockData.create_body.store_name);
        expect(res.body).to.have.property('runnerJob').to.have.property('runner_latitude', runnerJobsMockData.create_body.runner_latitude);
        expect(res.body).to.have.property('runnerJob').to.have.property('runner_longitude', runnerJobsMockData.create_body.runner_longitude);
        expect(res.body).to.have.property('runnerJob').to.have.property('radius', runnerJobsMockData.create_body.radius);
        expect(res.body).to.have.property('runnerJob').to.have.property('status', 'ACTIVE');
        expect(res.body).to.have.property('runnerJob').to.have.property('is_accepting_requests', true);
        done();
      });
  });

  // TO DO: Add Validation to RunnerJobs API so that missing params fails the request
  // (Make Test first - TDD)

  // TO DO maybe : Add validation to the RunnerJobs API so that invalid user ID
  // or invalid cooridinates fails request (Make Test first - TDD)

  // TO DO: Add validation so user cannot create a new runner job if they already
  // have an open one (important) (Make Test first - TDD)
}

module.exports = createRunnerJobsTest;
