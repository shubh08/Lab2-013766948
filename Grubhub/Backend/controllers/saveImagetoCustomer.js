const loadCustProfile =  require('./loadCustomerProfile');
const Customer = require('../models/Customer');
const saveImagetoCustomer = (req, res, connPool) =>{
  
    const {image,id} = req.body;

    
    Customer.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "cust_image":image
                }
            },
            function(err,doc) {
        if(err) throw err
        loadCustProfile.loadCustProfile(req,res,connPool);
    }
        );

}

module.exports = {
    saveImagetoCustomer: saveImagetoCustomer
  };