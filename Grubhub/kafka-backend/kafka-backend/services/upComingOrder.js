const Orders = require('../models/Orders');


function handle_request(msg, callback){
    console.log('Inside load Upcoming order for Customer Data!!',msg)
    const{id} = msg;
    let resultOrder = {}

    Orders.find({ cust_id: id }, function (err, rest) {
        if (err) {
            console.log('error-->');
            callback(err,"Error");
        }


        console.log('result upcoming order data', rest)
        console.log('result data profile', rest)
        callback(null, rest);

    })

  
  };
  
  exports.handle_request = handle_request;


