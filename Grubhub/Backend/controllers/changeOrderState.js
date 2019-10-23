
const upComingRestaurantOrder =  require('./upComingRestaurantOrder'); 
const Orders = require('../models/Orders');
const changeOrderState = (req, res, connPool) =>{
   console.log('Inside update order state ', req.body)
    const {status,order_id} = req.body;
    Orders.findOneAndUpdate(
        {"_id":order_id},
            { 
                "$set": {
                    "status": status
                }
            },
            function(err,doc) {
                upComingRestaurantOrder.upComingRestaurantOrder(req,res,connPool);
            }
        );

// connPool.getConnection((error,conn)=>{
   
//     let queryAddSection = 'update orders set status=? where order_id=?';
//     console.log(queryAddSection);
//     conn.query(queryAddSection,[status,order_id],(error,resultgetStatus)=>{

//         if(error)
//         {
//             throw error;
//         }

//         else
//         {
//             conn.release();
//             upComingRestaurantOrder.upComingRestaurantOrder(req,res,connPool);
       
               
            
//         }

        
//     })
   
   
   

// })
}

module.exports = {
    changeOrderState: changeOrderState
  };