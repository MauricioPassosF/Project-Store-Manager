const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { mockAllProductsModel, mockProductModel } = require('../mocks/productsMocks');

describe('Testes da products Model', function () {
  it('Seleciona todos os dados do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves(mockAllProductsModel);
    const data = await productsModel.getAll();
    const product = data[0];
    expect(data).to.be.an('array');
    expect(product).to.be.an('object');
    expect(product.id).to.be.an('number');
  });

  it('Seleciona todos os dados do banco de dados por id', async function () {
    sinon.stub(connection, 'execute').resolves(mockProductModel);
    const product = await productsModel.getById(1);
    expect(product).to.be.an('object');
    expect(product.id).to.be.an('number');
    expect(product.id).to.equal(1);
    expect(product.name).to.be.an('string');
  });

  it('Busca no banco de dados por id fora do bando de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const product = await productsModel.getById(1);
    console.log(product);
    expect(product).to.be.an('undefined');
  });

  afterEach(function () {
    sinon.restore();
  });
});