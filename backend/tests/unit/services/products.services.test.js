const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { mockAllProductsService, mockProductService } = require('../mocks/productsMocks');

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

  it('Seleciona do banco de dados, filtrados por id valido', async function () {
    sinon.stub(productsModel, 'getById').resolves(mockProductService);
    const responseService = await productsServices.getById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('SUCCESSFULL');
    expect(data).to.be.an('array');
  });

  it('Seleciona do banco de dados, filtrados por id invalido', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const responseService = await productsServices.getById(40);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});