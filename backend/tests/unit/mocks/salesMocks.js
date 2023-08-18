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

const mockNewSales = { status: 'CREATED',
data: {
  id: 1,
  itemsSold: [{ quantity: 1, productId: 1 }, { quantity: 5, productId: 2 }],
} };

const mockSalesPostResponse = {
  id: 1,
  itemsSold: [{ quantity: 1, productId: 1 }, { quantity: 5, productId: 2 }],
};

const mockNewSaleControllerSuc = { status: 'CREATED',
data: [{ quantity: 10, productId: 1 }, { quantity: 15, productId: 2 }] };

const mockNewSaleService = [{ quantity: 10, productId: 1 }, { quantity: 15, productId: 2 }];

const mockNewSaleModelInsert = [{ insertId: 3 }];

const mockDeleteSalesControllerSuc = { status: 'NO_CONTENT',
data: undefined };

const mockUpdateSalesQuantityService = { quantity: 30,
  saleId: 1,
  productId: 2,
  date: '2023-08-17T20:54:35.000Z' };

const mockUpdateSalesQuantityInfo = { quantity: 30,
  saleId: '1',
  productId: '2',
  };

const mockUpdateSalesQuantityDate = '2023-08-17T20:54:35.000Z';

const mockUpdateSalesQuantityControllerSuc = { status: 'SUCCESSFULL',
data:
  { quantity: 30,
  saleId: 1,
  productId: 2,
  date: '2023-08-17T20:54:35.000Z' },
};

const mockUpdateSalesResponse = { quantity: 30,
  saleId: 1,
  productId: 2,
  date: '2023-08-17T20:54:35.000Z' };

module.exports = {
  mockAllSalesController,
  mockAllSalesService,
  mockAllSalesModel,
  mockSaleModel,
  mockSaleService,
  mockSaleControllerSuc,
  mockNewSaleControllerSuc,
  mockNewSaleService,
  mockNewSaleModelInsert,
  mockDeleteSalesControllerSuc,
  mockUpdateSalesQuantityControllerSuc,
  mockUpdateSalesQuantityService,
  mockUpdateSalesQuantityInfo,
  mockUpdateSalesQuantityDate,
  mockNewSales,
  mockSalesPostResponse,
  mockUpdateSalesResponse,
};
