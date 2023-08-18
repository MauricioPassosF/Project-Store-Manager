const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const { salesServices } = require('../../../src/services');
const { mockNewSales, mockSalesPostResponse, mockUpdateSalesQuantityControllerSuc, mockUpdateSalesResponse } = require('../mocks/salesMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao das rotas do sales', function () {
  it('Testa validacoes da rota "/" metodo post - productId invalido', async function () {   
    const response = await chai.request(app)
    .post('/sales')
    .send([
      { quantity: 1 },
    ]);
    expect(response.status).to.deep.equal(400);
    expect(response.body).to.deep.equal({ message: '"productId" is required' });
  });

  it('Testa validacoes da rota "/" metodo post - quantity invalido', async function () {   
    const response = await chai.request(app)
    .post('/sales')
    .send([
      { productId: 1 },
    ]);
    expect(response.status).to.deep.equal(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Testa validacoes da rota "/" metodo post - quantity 0', async function () {   
    const response = await chai.request(app)
    .post('/sales')
    .send([
      { productId: 1,
      quantity: 0 },
    ]);
    expect(response.status).to.deep.equal(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });

  it('Testa validacoes da rota "/" metodo post - valores validos', async function () {
    sinon.stub(salesServices, 'insert').resolves(mockNewSales);
    
    const response = await chai.request(app)
    .post('/sales')
    .send([
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);
    expect(response.status).to.deep.equal(201);
    expect(response.body).to.deep.equal(mockSalesPostResponse);
  });

  it('Testa validacoes da rota "/" metodo put - valores validos', async function () {
    sinon.stub(salesServices, 'updateQuantity').resolves(mockUpdateSalesQuantityControllerSuc);
    
    const response = await chai.request(app)
    .put('/sales/1/products/2/quantity')
    .send({ quantity: 30 });

    expect(response.status).to.deep.equal(200);
    expect(response.body).to.deep.equal(mockUpdateSalesResponse);
  });

  it('Testa validacoes da rota "/" metodo put - quantity invalido', async function () {    
    const response = await chai.request(app)
    .put('/sales/1/products/2/quantity');

    expect(response.status).to.deep.equal(400);
    expect(response.body).to.deep.equal({ message: '"quantity" is required' });
  });
});