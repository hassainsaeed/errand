function assignOrdersTest(chai, expect, hostname, port, ordersMockData) {
  it('expect order_id 1 to be assigned to requester user id 7', (done) => {
    chai.request(`${hostname}:${port}`)
      .put('/api/orders/assign')
      .set('x-access-token', ordersMockData.token)
      .type('json')
      .send(ordersMockData.assign_body)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('assignedOrder', ordersMockData.assign_body.order_id);
        done();
      });
  });

  // TO DO: Add Validation to Order API so that missing params fails the request
  // (Make Test first - TDD)

  // TO DO maybe : Add validation so that assigning an invalid order ID or user id
  // (or invalid order id for that user) or runner id fails the job (Make Test first - TDD)

  // TO DO maybe : dont allow the same order to be assigned again (Make Test first - TDD)
}

module.exports = assignOrdersTest;
