const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesControllers } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const { mockAllSalesController, mockAllSalesService, mockSaleControllerSuc, mockSaleService } = require('../mocks/salesMocks');

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

  // it('Busca no banco de dados por id fora do bando de dados', async function () {
  //   sinon.stub(connection, 'execute').resolves([]);
  //   const salesById = await salesModel.getbyId(1);
  //   expect(salesById).to.be.an('undefined');
  // });

  afterEach(function () {
    sinon.restore();
  });
});