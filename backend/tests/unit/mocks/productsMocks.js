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

module.exports = {
  mockAllProductsController,
  mockAllProductsService,
  mockAllProductsModel,
};