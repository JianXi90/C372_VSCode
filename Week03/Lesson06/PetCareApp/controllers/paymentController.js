const services = require('../data/mockServices');
const MockProvider = require('../services/mockPaymentProvider');

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

async function createMockPayment(req, res) {
  const serviceId = Number(req.params.serviceId);

  // Validate testStatus
  const allowedStatuses = ['APPROVED', 'PENDING', 'DECLINED'];

  if (!req.body?.testStatus ||
      !allowedStatuses.includes(req.body.testStatus)) {
    return res.status(400).json({
      error: 'Invalid or missing testStatus'
    });
  }

  // Find service
  const service = services.find(item => item.id === serviceId);

  if (!service) {
    return res.status(404).json({
      error: 'Service not found'
    });
  }

  const paymentRequest = {
    amount: service.price,
    currency: 'sgd',
    merchantReference: 'SERVICE-' + service.id,
    description: service.name,
    testStatus: req.body.testStatus
  };

  const providerResult = await MockProvider.createPayment(paymentRequest);

  const bookingStatusByPayment = {
    APPROVED: 'CONFIRMED',
    PENDING: 'AWAITING_PAYMENT',
    DECLINED: 'PAYMENT_FAILED'
  };

  return res.status(200).json({
    serviceId: service.id,
    providerPaymentId: providerResult.providerPaymentId,
    merchantReference: providerResult.merchantReference,
    paymentStatus: providerResult.status,
    bookingStatus: bookingStatusByPayment[providerResult.status]
  });
}

module.exports = { preparePayment, createMockPayment };
