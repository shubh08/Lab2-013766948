
const Customer = require('../models/Customer');
const loadCustProfile = (req, res, connPool) => {
    const { id } = req.body;
    //   console.log('Customer Cookie Value',req.cookie('cust_id'))
    connPool.getConnection((error, conn) => {
        // encryptPass = hash;

        console.log('Inside customer load data!');
        Customer.find({ _id: id }, function (err, cust) {
            if (err) throw err

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            console.log('result data profile', cust[0]._doc)
            res.end(JSON.stringify({
                status: "success",
                ...cust[0]._doc
            }));

        })
        //  let loadProfileQuery = 'select * from  customer_info where cust_id = ?';
        //  console.log(loadProfileQuery);
        //  conn.query(loadProfileQuery,[id],(error,result)=>{
        //      if(error)
        //      {
        //          throw error;
        //      }

        //      else{
        //         res.writeHead(200, {
        //                          'Content-Type': 'application/json'
        //                      });
        //                      console.log('result data profile',result[0])
        //                      res.end(JSON.stringify({status:"success",
        //                      ...result[0]
        //                     }));
        //      }


        //  })  
        //  conn.release();
    })
}


module.exports = {
    loadCustProfile: loadCustProfile
};