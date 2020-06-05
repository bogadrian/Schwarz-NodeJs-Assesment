//END-POINTS handlers

// get data from MongoDb handlers
const Good = require('../goodsSchema');

// get all orders by company name end-point
exports.getCompany = async (req, res) => {
  try {
    // check if the company name is made from more than 1 word (has been passed joined by a virgule in url)
    const objCompany = req.query.companyName.split(',').join(' ');

    const response = await Good.find({ companyName: objCompany });
    if (!response) {
      throw new Error('No company with that name was found!');
    }
    res.status(201).json({
      status: 'success',
      data: response
    });
  } catch (err) {
    console.log(err);
  }
};

// get all orders by delivery address end-point
exports.getOrdersByAddress = async (req, res) => {
  try {
    // check if the delivery address is made from more than 1 word (has been passed joined by a virgule in url)
    const objAddress = req.query.customerAddress.split(',').join(' ');

    const response = await Good.find({ customerAddress: objAddress });

    if (!response) {
      throw new Error('No orders for that address were found!');
    }
    res.status(201).json({
      status: 'success',
      data: response
    });
  } catch (err) {
    console.log(err);
  }
};

// get an order by ordeId and delete it end-point
exports.deleteOrder = async (req, res) => {
  try {
    const response = await Good.findOneAndDelete(req.query);

    if (!response) {
      throw new Error('No order with that orderId was found!');
    }
    res.status(201).json({
      status: 'success',
      data: 'order deleted!'
    });
  } catch (err) {
    console.log(err);
  }
};
// display how often an item has been orderd in descending order end-point
exports.sortByOrder = async (req, res) => {
  try {
    //using MongoDb aggregation pipeline to group the items by their name, sum the number of times their were sold (the number of lines in which they appear in db-file.txt) and then sort them in descending order
    const ordersFiltred = await Good.aggregate([
      {
        $group: {
          _id: { orderdItem: '$orderdItem' },
          numberOrdersPerItem: { $sum: 1 }
        }
      },
      {
        $sort: { numberOrdersPerItem: -1 }
      }
    ]);

    res.status(201).json({
      status: 'success',
      data: ordersFiltred
    });
  } catch (err) {
    console.log(err);
  }
};
