// get data from MongoDb handlers
const Good = require('../goodsSchema');

// get all orders by company name
exports.getCompany = async (req, res) => {
  const response = await Good.find(req.query);

  if (!response) {
    throw new Error('No company with that name was found!');
  }

  res.status(201).json({
    status: 'success',
    data: response
  });
};

// get all orders by delivery address
exports.getOrdersByAddress = async (req, res) => {
  const objAddress = req.query.customerAddress.split(',').join(' ');

  const response = await Good.find({ customerAddress: objAddress });

  if (!response) {
    throw new Error('No orders for that address were found!');
  }

  res.status(201).json({
    status: 'success',
    data: response
  });
};
