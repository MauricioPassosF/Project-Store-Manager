const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { mockAllSalesService, mockSaleService } = require('../mocks/salesMocks');

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

  afterEach(function () {
    sinon.restore();
  });
});