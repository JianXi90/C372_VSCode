const services = require('../data/mockServices');

function preparePayment(req, res) {
  const serviceId = Number(req.params.serviceId);
  const service = services.get(req.params.serviceId);

  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  return res.json({
    serviceId,
    serviceName: service.serviceName,
    amount: service.amount,
    currency: 'sgd',
    status: 'READY_FOR_PAYMENT'
  });
}

module.exports = { preparePayment };
