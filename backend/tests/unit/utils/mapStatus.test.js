const { expect } = require('chai');
const { mapStatusHTTP } = require('../../../src/utils/statusByHTTP');

describe('Testes das funcoes utilitarias', function () {
  it('Testa o funcionamento de um status inexistente', async function () {
    expect(mapStatusHTTP('erro')).to.deep.equal(500);
  });
});