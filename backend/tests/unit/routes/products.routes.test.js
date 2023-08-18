const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const { productsServices } = require('../../../src/services');
const { mockNewProductControllerSuc, mockNewProductService } = require('../mocks/productsMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integracao das rotas do products', function () {
  it('Testa validacoes da rota "/" metodo post - name invalido', async function () {   
    const response = await chai.request(app)
    .post('/products');
    expect(response.status).to.deep.equal(400);
    expect(response.body).to.deep.equal({ message: '"name" is required' });
  });

  it('Testa validacoes da rota "/" metodo post - dados', async function () {   
    sinon.stub(productsServices, 'insert').resolves(mockNewProductControllerSuc);

    const response = await chai.request(app)
    .post('/products')
    .send({ name: 'NovoP' });
    expect(response.status).to.deep.equal(201);
    expect(response.body).to.deep.equal(mockNewProductService);
  });
});
