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

module.exports = {
  mockAllProductsController,
  mockAllProductsService,
  mockAllProductsModel,
  mockProductModel,
  mockProductService,
  mockProductControllerSuc,
};