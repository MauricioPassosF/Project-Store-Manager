const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { mockAllSalesModel, mockSaleModel, mockNewSaleModelInsert, mockUpdateSalesQuantityInfo } = require('../mocks/salesMocks');

const { expect } = chai;

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

  it('Inseri dados corretamente na tabela sales_products do banco de dados', async function () {
    const stubedFunction = sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const saleData = { productId: 2, quantity: 10 };
    await salesModel.insertProductSale(saleData, 1);
    expect(stubedFunction.callCount).to.equal(1);
  });

  it('Inseri dados corretamente na tabela sales do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves(mockNewSaleModelInsert);
    const dbResponse = await salesModel.insertSales();
    expect(dbResponse).to.be.deep.equal(3);
  });

  it('Deleta venda do banco de dados, com id valido', async function () {
    const stubedFunction = sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    await salesModel.deleteById(2);
    expect(stubedFunction.callCount).to.equal(1);
  });

  it('Atualiza dados de quantidade de uma venda no banco de dados, com dados validos', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const modelResponse = await salesModel.updateQuantity(mockUpdateSalesQuantityInfo);
    expect(modelResponse).to.deep.equal(1);
  });

  it('Seleciona a data do banco de dados por saleId', async function () {
    sinon.stub(connection, 'execute').resolves([[{ date: '2023-08-17T20:54:35.000Z' }]]);
    const modelResponse = await salesModel.getSaleDate(1);
    expect(modelResponse).to.be.an('string');
    expect(modelResponse).to.deep.equal('2023-08-17T20:54:35.000Z');
  });

  afterEach(function () {
    sinon.restore();
  });
});