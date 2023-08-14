const codesHTTP = {
  SUCCESSFULL: 200,
};

const mapStatusHTTP = (status) => codesHTTP[status] || 500;

module.exports = {
  mapStatusHTTP,
};
