const mockAllSalesController = { status: 'SUCCESSFULL',
data: [
  { date: '2022-09-09T04:54:29.000Z', saleId: 1, productId: 1, quantity: 2 },
  { date: '2021-10-10T04:54:29.000Z', saleId: 2, productId: 2, quantity: 3 },
  { date: '2021-10-11T04:54:29.000Z', saleId: 2, productId: 3, quantity: 4 },
  { date: '2021-11-09T04:54:29.000Z', saleId: 3, productId: 1, quantity: 5 },
] };

const mockAllSalesService = [
  { date: '2022-09-09T04:54:29.000Z', saleId: 1, productId: 1, quantity: 2 },
  { date: '2021-10-10T04:54:29.000Z', saleId: 2, productId: 2, quantity: 3 },
  { date: '2021-10-11T04:54:29.000Z', saleId: 2, productId: 3, quantity: 4 },
  { date: '2021-11-09T04:54:29.000Z', saleId: 3, productId: 1, quantity: 5 },
];

const mockAllSalesModel = [
  [
    { date: '2022-09-09T04:54:29.000Z', saleId: 1, productId: 1, quantity: 2 },
    { date: '2021-10-10T04:54:29.000Z', saleId: 2, productId: 2, quantity: 3 },
    { date: '2021-10-11T04:54:29.000Z', saleId: 2, productId: 3, quantity: 4 },
    { date: '2021-11-09T04:54:29.000Z', saleId: 3, productId: 1, quantity: 5 },
  ],
];

const mockSaleControllerSuc = { status: 'SUCCESSFULL',
data: [
  { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
] };

const mockSaleService = [
  { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
];

const mockSaleModel = [
  [{ date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 }],
];

module.exports = {
  mockAllSalesController,
  mockAllSalesService,
  mockAllSalesModel,
  mockSaleModel,
  mockSaleService,
  mockSaleControllerSuc,
};
