function createOrdersTest(chai, expect, hostname, port, ordersMockData) {
  it('expect a new order to be created for user_id 7', (done) => {
    chai.request(`${hostname}:${port}`)
      .post('/api/orders')
      .set('x-access-token', ordersMockData.token)
      .type('json')
      .send(ordersMockData.create_body)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('createdOrder');
        expect(res.body).to.have.property('createdOrder').to.have.property('requester_user_id', ordersMockData.create_body.user_id);
        expect(res.body).to.have.property('createdOrder').to.have.property('list', ordersMockData.create_body.list);
        expect(res.body).to.have.property('createdOrder').to.have.property('requester_latitude', ordersMockData.create_body.requester_latitude);
        expect(res.body).to.have.property('createdOrder').to.have.property('requester_longitude', ordersMockData.create_body.requester_longitude);
        expect(res.body).to.have.property('createdOrder').to.have.property('status', 'PENDING');
        expect(res.body).to.have.property('createdOrder').to.have.property('runner_job_id', null);
        expect(res.body).to.have.property('createdOrder').to.have.property('runner_user_id', null);
        done();
      });
  });

  // TO DO: Add Validation to Order API so that missing params fails the request
  // (Make Test first - TDD)

  // TO DO maybe : Add validation to the Order API so that invalid user ID or
  // invalid cooridinates fails request (Make Test first - TDD)
}

module.exports = createOrdersTest;
