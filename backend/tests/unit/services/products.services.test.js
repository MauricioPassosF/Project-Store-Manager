const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { mockAllProductsService, mockProductService, mockNewProductService } = require('../mocks/productsMocks');

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

  it('Tenta adicionar novo produto no banco de dados, com nome valido', async function () {
    sinon.stub(productsModel, 'insert').resolves(mockNewProductService);
    const responseService = await productsServices.insert('NovoP');
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data.name).to.equal('NovoP');
  });

  it('Tenta adicionar novo produto no banco de dados, com nome invalido', async function () {
    const responseService = await productsServices.insert('Novo');
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('UNPROCESSABLE');
    expect(data).to.be.an('object');
    expect(data.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('Tenta alterar produto no banco de dados, com dados validos', async function () {
    sinon.stub(productsModel, 'update').resolves(mockNewProductService);
    sinon.stub(productsModel, 'getById').resolves([mockProductService]);
    const responseService = await productsServices.update('NovoP', 1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('SUCCESSFULL');
    expect(data).to.be.an('object');
    expect(data.name).to.deep.equal('NovoP');
    expect(data.id).to.deep.equal(1);
  });

  it('Tenta alterar produto no banco de dados, com nome invalido', async function () {
    const responseService = await productsServices.update('Novo', 1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('UNPROCESSABLE');
    expect(data).to.be.an('object');
    expect(data.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('Tenta alterar produto no banco de dados, com id invalido', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const responseService = await productsServices.update('NovoP', 1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('Product not found');
  });

  it('Tenta deletar produto do banco de dados, com id valido', async function () {
    sinon.stub(productsModel, 'getById').resolves([mockProductService]);
    const spyedFunction = sinon.spy(productsModel, 'deleteById');
    const responseService = await productsServices.deleteById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('NO_CONTENT');
    expect(data).to.be.an('undefined');
    expect(spyedFunction.callCount).to.equal(1);
  });

  it('Tenta deletar produto do banco de dados, com id invalido', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const responseService = await productsServices.deleteById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});