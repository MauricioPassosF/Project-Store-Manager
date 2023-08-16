const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockAllSalesService, mockSaleService, mockNewSaleService } = require('../mocks/salesMocks');
const { mockProductService } = require('../mocks/productsMocks');

describe('Testes da sales Service', function () {
  it('Seleciona os dados corretos do model', async function () {
    sinon.stub(salesModel, 'getAll').resolves(mockAllSalesService);
    const responseService = await salesServices.getAll();
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('SUCCESSFULL');
    expect(data).to.be.an('array');
  });

  it('Seleciona do banco de dados, filtrados por id valido', async function () {
    sinon.stub(salesModel, 'getById').resolves(mockSaleService);
    const responseService = await salesServices.getById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('SUCCESSFULL');
    expect(data).to.be.an('array');
  });

  it('Seleciona do banco de dados, filtrados por id invalido', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);
    const responseService = await salesServices.getById(40);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.equal('Sale not found');
  });

  it('Tenta adicionar novo produto no banco de dados, com dados validos', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(3);
    sinon.stub(salesModel, 'insertProductSale').resolves(undefined);
    sinon.stub(productsModel, 'getById').resolves([mockProductService]);
    const responseService = await salesServices.insert([
      { quantity: 10, productId: 1 },
      { quantity: 15, productId: 2 },
    ]);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data.id).to.deep.equal(3);
    expect(data.itemsSold).to.deep.equal(mockNewSaleService);
  });

  it('Tenta adicionar novo produto no banco de dados, com quantity invalido', async function () {
    const responseService = await salesServices.insert([
      { quantity: 10, productId: 1 },
      { quantity: 0, productId: 2 },
    ]);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('UNPROCESSABLE');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('Tenta adicionar novo produto no banco de dados, com id invalido', async function () {
    sinon.stub(productsModel, 'getById')
    .onFirstCall()
    .resolves(undefined)
    .onSecondCall()
    .resolves([mockProductService]);
    const responseService = await salesServices.insert([
      { quantity: 10, productId: 1 },
      { quantity: 15, productId: 2 },
    ]);
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
