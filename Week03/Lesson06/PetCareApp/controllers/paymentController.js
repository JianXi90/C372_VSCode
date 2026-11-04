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
  function preparePayment(req, res) {
    const serviceId = req.params.serviceId;
    const service = services.get(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'Service not found'
      });
    }

    return res.json({
      serviceId: Number(serviceId),
      serviceName: service.serviceName,
      amount: service.amount,
      currency: 'sgd',
      status: 'READY_FOR_PAYMENT'
    });
  }

  async function createMockPayment(req, res) {
    const serviceId = req.params.serviceId;
    const service = services.get(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'Service not found'
      });
    }

    const allowedStatuses = [
      'APPROVED',
      'PENDING',
      'DECLINED'
    ];

    const testStatus = req.body?.testStatus;

    if (!allowedStatuses.includes(testStatus)) {
      return res.status(400).json({
        error: 'Invalid or missing testStatus'
      });
    }

    const paymentRequest = {
      amount: service.amount,
      currency: 'sgd',
      merchantReference: 'SERVICE-' + serviceId,
      description: service.serviceName,
      testStatus: testStatus
    };

    const providerResult =
      await MockProvider.createPayment(paymentRequest);

    const bookingStatusByPayment = {
      APPROVED: 'CONFIRMED',
      PENDING: 'AWAITING_PAYMENT',
      DECLINED: 'PAYMENT_FAILED'
    };

    return res.status(200).json({
      serviceId: Number(serviceId),
      serviceName: service.serviceName,
      amount: service.amount,
      providerPaymentId: providerResult.providerPaymentId,
      merchantReference: providerResult.merchantReference,
      paymentStatus: providerResult.status,
      bookingStatus: bookingStatusByPayment[providerResult.status]
    });
  }

  module.exports = {
    preparePayment,
    createMockPayment
  };
  module.exports = { preparePayment, createMockPayment };
