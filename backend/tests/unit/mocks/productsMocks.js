const mockAllProductsController = { status: 'SUCCESSFULL',
data: [
  { id: 1, name: 'Raquete de tenis' },
  { id: 2, name: 'Bola de tenis' },
  { id: 3, name: 'Meias' },
] };

const mockAllProductsService = [
  { id: 1, name: 'Raquete de tenis' },
  { id: 2, name: 'Bola de tenis' },
  { id: 3, name: 'Meias' },
];

const mockAllProductsModel = [[
  { id: 1, name: 'Raquete de tenis' },
  { id: 2, name: 'Bola de tenis' },
  { id: 3, name: 'Meias' },
]];

const mockProductControllerSuc = { status: 'SUCCESSFULL',
data: [
  { id: 1, name: 'Raquete de ping-pong' },
] };

const mockProductService = [
  { id: 1, name: 'Raquete de ping-pong' },
];

const mockProductModel = [[{ id: 1, name: 'Raquete de ping-pong' }]];

const mockNewProductControllerSuc = { status: 'CREATED',
data: { id: 1, name: 'NovoP' } };

const mockNewProductService = { id: 1, name: 'NovoP' };

const mockNewProductModel = [{ insertId: 1 }];

const mockUpdateProductControllerSuc = { status: 'SUCCESSFULL',
data: { id: 1, name: 'NovoP' } };

const mockDeleteProductControllerSuc = { status: 'NO_CONTENT',
data: undefined };

module.exports = {
  mockAllProductsController,
  mockAllProductsService,
  mockAllProductsModel,
  mockProductModel,
  mockProductService,
  mockProductControllerSuc,
  mockNewProductControllerSuc,
  mockNewProductService,
  mockNewProductModel,
  mockUpdateProductControllerSuc,
  mockDeleteProductControllerSuc,
};