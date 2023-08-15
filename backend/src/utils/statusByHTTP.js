const codesHTTP = {
  SUCCESSFULL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
};

const mapStatusHTTP = (status) => codesHTTP[status] || 500;

module.exports = {
  mapStatusHTTP,
};
