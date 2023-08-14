const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { mockAllProductsModel } = require('../mocks/productsMocks');

describe('Testes da products Model', function () {
  it('Seleciona todos os dados do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves(mockAllProductsModel);
    const data = await productsModel.getAll();
    const product = data[0];
    expect(data).to.be.an('array');
    expect(product).to.be.an('object');
    expect(product.id).to.be.an('number');
  });

  afterEach(function () {
    sinon.restore();
  });
});