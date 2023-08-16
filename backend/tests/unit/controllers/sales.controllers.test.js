const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesControllers } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const { mockAllSalesController, mockAllSalesService, mockSaleControllerSuc, mockSaleService, mockNewSaleControllerSuc, mockNewSaleService } = require('../mocks/salesMocks');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da sales Controllers', function () {
  it('metodo GET - rota /sales', async function () {
    sinon.stub(salesServices, 'getAll').resolves(mockAllSalesController);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {};

    await salesControllers.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllSalesService);
  });

  it('metodo GET - rota /sales/:id - Id Valido', async function () {
    sinon.stub(salesServices, 'getById').resolves(mockSaleControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      params: { id: 1 },
    };

    await salesControllers.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSaleService);
  });

  it('metodo POST - rota /sales/ - dados validos', async function () {
    sinon.stub(salesServices, 'insert').resolves(mockNewSaleControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      body: [{ quantity: 10, productId: 2 }, { quantity: 15, productId: 2 }],
    };

    await salesControllers.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockNewSaleService);
  });

  afterEach(function () {
    sinon.restore();
  });
});