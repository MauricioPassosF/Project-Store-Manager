const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsControllers } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');
const { mockAllProductsController, mockAllProductsService, mockProductControllerSuc, mockProductService, mockNewProductControllerSuc, mockNewProductService, mockUpdateProductControllerSuc, mockDeleteProductControllerSuc } = require('../mocks/productsMocks');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da products Controllers', function () {
  it('metodo GET - rota /produtos', async function () {
    sinon.stub(productsServices, 'getAll').resolves(mockAllProductsController);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {};

    await productsControllers.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllProductsService);
  });

  it('metodo GET - rota /products/:id - Id Valido', async function () {
    sinon.stub(productsServices, 'getById').resolves(mockProductControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      params: { id: 1 },
    };

    await productsControllers.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProductService);
  });

  it('metodo POST - rota /products/ - nome valido', async function () {
    sinon.stub(productsServices, 'insert').resolves(mockNewProductControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      body: { name: 'Novo produto' },
    };

    await productsControllers.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockNewProductService);
  });

  it('metodo PUT - rota /products/:id - dados validos', async function () {
    sinon.stub(productsServices, 'update').resolves(mockUpdateProductControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      params: { id: 1 },
      body: { name: 'NovoP' },
    };

    await productsControllers.update(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockNewProductService);
  });

  it('metodo DELETE - rota /products/:id - id valido', async function () {
    sinon.stub(productsServices, 'deleteById').resolves(mockDeleteProductControllerSuc);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      params: { id: 1 },
    };

    await productsControllers.deleteById(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('metodo GET - rota /products/search', async function () {
    sinon.stub(productsServices, 'getByName').resolves(mockAllProductsController);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      query: { q: 'tenis' },
    };

    await productsControllers.getByName(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllProductsService);
  });

  afterEach(function () {
    sinon.restore();
  });
});