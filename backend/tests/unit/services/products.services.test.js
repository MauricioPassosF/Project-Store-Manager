const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { mockAllProductsService } = require('../mocks/productsMocks');

describe('Testes da products Service', function () {
  it('Seleciona os dados corretos do model', async function () {
    sinon.stub(productsModel, 'getAll').resolves(mockAllProductsService);
    const responseService = await productsServices.getAll();
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('SUCCESSFULL');
    expect(data).to.be.an('array');
  });

  afterEach(function () {
    sinon.restore();
  });
});