// Read the file containg the data, write the data to local MongoDb

// import n-readlines package to read the file line by line
const lineByLine = require('n-readlines');

// import "path" node module to grant access to theextern folder
const path = require('path');

// grab the file from the extern folder
const file = path.resolve(__dirname, '../../extern/db.txt');

//n-readlines instanciation
const liner = new lineByLine(file);

// access to the Model
const Good = require('../goodsSchema');

// the function read file
exports.readFile = async (req, res, next) => {
  try {
    // get each line from the file
    let line;
    while ((line = liner.next())) {
      // check if the file is empty, if it does stop here
      if (file.length > 0) {
        // trasform each line from buffer to string
        const resp = line.toString('utf8');

        // get each element in the line
        const id = resp.split(',')[0];
        const company = resp.split(',')[1];
        const address = resp.split(',')[2];
        const product = resp.split(',')[3];

        // create an object for each line with the data as expected by Model
        const item = {
          orderId: id,
          companyName: company,
          customerAddress: address,
          orderdItem: product
        };

        // check if the item already exists in database
        const existingOrderId = await Good.findOne({ orderId: id });

        // if there is no item with the orderId in database, create a new one
        if (!existingOrderId) {
          const newGood = await Good.insertMany(item);

          // if no item is created return an error
          if (!newGood) {
            return res.status(404).json({
              status: 'fail',
              message: 'No good was created'
            });
          }
        }
      }
    }

    // answer with a succes status ( no data sent back here because makes no sense to send any )
    res.status(201).json({
      status: 'success'
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'Servere did not responded!'
    });
  }
};
