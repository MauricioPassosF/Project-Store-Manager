const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { mockAllProductsModel, mockProductModel, mockNewProductModel } = require('../mocks/productsMocks');

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
    expect(product).to.be.an('undefined');
  });

  it('Adicionar novo produto no banco de dados, com nome valido', async function () {
    sinon.stub(connection, 'execute').resolves(mockNewProductModel);
    const newProduct = await productsModel.insert('NovoP');
    expect(newProduct).to.be.an('object');
    expect(newProduct.id).to.be.an('number');
    expect(newProduct.id).to.deep.equal(1);
    expect(newProduct.name).to.be.an('string');
    expect(newProduct.name).to.deep.equal('NovoP');
  });

  it('Atualiza produto no banco de dados, com dados validos', async function () {
    const stubedFunction = sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const updatedProduct = await productsModel.update('NovoP', 3);
    expect(updatedProduct).to.be.an('object');
    expect(updatedProduct.id).to.be.an('number');
    expect(updatedProduct.id).to.deep.equal(3);
    expect(updatedProduct.name).to.be.an('string');
    expect(updatedProduct.name).to.deep.equal('NovoP');
    expect(stubedFunction.callCount).to.equal(1);
  });

  it('Deleta produto do banco de dados, com id valido', async function () {
    const stubedFunction = sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    await productsModel.deleteById(2);
    expect(stubedFunction.callCount).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});