const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { mockAllSalesModel, mockSaleModel } = require('../mocks/salesMocks');

describe('Testes da sales Model', function () {
  it('Seleciona todos os dados do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves(mockAllSalesModel);
    const sales = await salesModel.getAll();
    const firstSale = sales[0];
    expect(sales).to.be.an('array');
    expect(firstSale).to.be.an('object');
    expect(firstSale.date).to.be.an('string');
    expect(firstSale.saleId).to.be.an('number');
    expect(firstSale.productId).to.be.an('number');
    expect(firstSale.quantity).to.be.an('number');
  });

  it('Seleciona todos os dados do banco de dados por id', async function () {
    sinon.stub(connection, 'execute').resolves(mockSaleModel);
    const salesById = await salesModel.getById(1);
    const firstSale = salesById[0];
    expect(firstSale).to.be.an('object');
    expect(firstSale.date).to.be.an('string');
    expect(firstSale.productId).to.be.an('number');
    expect(firstSale.quantity).to.be.an('number');
  });

  it('Busca no banco de dados por id fora do bando de dados', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const salesById = await salesModel.getById(1);
    expect(salesById).to.be.an('undefined');
  });

  afterEach(function () {
    sinon.restore();
  });
});