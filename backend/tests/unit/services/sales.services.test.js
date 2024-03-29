const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockAllSalesService, mockSaleService, mockNewSaleService, mockUpdateSalesQuantityInfo, mockUpdateSalesQuantityDate, mockUpdateSalesQuantityService } = require('../mocks/salesMocks');
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

  it('Tenta adicionar nova venda no banco de dados, com dados validos', async function () {
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

  it('Tenta adicionar nova venda no banco de dados, com quantity invalido', async function () {
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

  it('Tenta adicionar novo venda no banco de dados, com id invalido', async function () {
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

  it('Tenta deletar venda do banco de dados, com id valido', async function () {
    sinon.stub(salesModel, 'getById').resolves(mockSaleService);
    const stubedFunction = sinon.stub(salesModel, 'deleteById').resolves(undefined);
    const responseService = await salesServices.deleteById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.equal('NO_CONTENT');
    expect(data).to.be.an('undefined');
    expect(stubedFunction.callCount).to.equal(1);
  });

  it('Tenta deletar venda do banco de dados, com id invalido', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);
    const responseService = await salesServices.deleteById(1);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('Sale not found');
  });

  it('Tenta atualizar quantidade de produto no banco de dados, com dados validos', async function () {
    sinon.stub(salesModel, 'getById').resolves(mockSaleService);
    sinon.stub(salesModel, 'updateQuantity').resolves(1);
    sinon.stub(salesModel, 'getSaleDate').resolves(mockUpdateSalesQuantityDate);
    const responseService = await salesServices.updateQuantity(mockUpdateSalesQuantityInfo);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('SUCCESSFULL');
    expect(data).to.be.an('object');
    expect(data).to.deep.equal(mockUpdateSalesQuantityService);
  });

  it('Tenta atualizar quantidade de produto no banco de dados, com quantidade invalida', async function () {
    const responseService = await salesServices.updateQuantity(
      { quantity: 0,
      saleId: '1',
      productId: '2',
      },
    );
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('UNPROCESSABLE');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('Tenta atualizar quantidade de produto no banco de dados, com saleId invalida', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);
    const responseService = await salesServices.updateQuantity(mockUpdateSalesQuantityInfo);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('Sale not found');
  });

  it('Tenta atualizar quantidade de produto no banco de dados, com productId invalida', async function () {
    sinon.stub(salesModel, 'getById').resolves(mockSaleService);
    sinon.stub(salesModel, 'updateQuantity').resolves(0);
    const responseService = await salesServices.updateQuantity(mockUpdateSalesQuantityInfo);
    const { status, data } = responseService;
    expect(responseService).to.be.an('object');
    expect(status).to.be.an('string');
    expect(status).to.deep.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.deep.equal('Product not found in sale');
  });

  afterEach(function () {
    sinon.restore();
  });
});
