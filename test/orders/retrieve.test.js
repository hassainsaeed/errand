function retrieveOrdersTest(chai, expect, hostname, port, ordersMockData) {
  it('expect to retrieve a list of two real orders with ids of 2,3 passed in', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/orders')
      .set('x-access-token', ordersMockData.token)
      .query({ ids: ordersMockData.ids })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('returnedOrders');
        expect(res.body.returnedOrders.length).to.equal(2);
        expect(res.body.returnedOrders[0]).to.have.property('id', parseInt(ordersMockData.ids[0], 10));
        expect(res.body.returnedOrders[1]).to.have.property('id', parseInt(ordersMockData.ids[2], 10));
        done();
      });
  });

  it('expect to retrieve an empty list of no real orders with id of 9999 passed in', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/orders')
      .set('x-access-token', ordersMockData.token)
      .query({ ids: '9999' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('returnedOrders');
        expect(res.body.returnedOrders.length).to.equal(0);
        done();
      });
  });

  it('expect to throw an error if no ids are passed in', (done) => {
    chai.request(`${hostname}:${port}`)
      .get('/api/orders')
      .set('x-access-token', ordersMockData.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('errors').property('message', 'Cannot read property \'split\' of undefined');
        done();
      });
  });
}

module.exports = retrieveOrdersTest;
