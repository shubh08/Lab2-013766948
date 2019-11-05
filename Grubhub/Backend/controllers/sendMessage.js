
const upComingOrder =  require('./upComingOrder'); 
const upComingRestaurantOrder = require('./upComingRestaurantOrder')
const Orders = require('../models/Orders');
const sendMessage = (req, res, connPool) =>{
   console.log('Inside send Message ', req.body)
    const {type,order_id,message,id} = req.body;
    let messagedata = {type:type,message:message}
   
    Orders.update({_id:order_id}, { $push: { messages: messagedata  } }, {upsert: true}, function(err, docs){
    if(err) throw err
    //res.json(docs);
    console.log('here send Message',docs);
    if(type=='Customer')
    upComingOrder.upComingOrder(req,res,connPool)
    else

    upComingRestaurantOrder.upComingRestaurantOrder(req,res,connPool);
       
    });
    

// connPool.getConnection((error,conn)=>{
//     let encryptPass='';
//     let queryAddSection = 'insert into section(section_name,restaurant_id,section_description) values (?, ?, ?)';
//     console.log(queryAddSection);
//     conn.query(queryAddSection,[section_name,id,section_description],(error,resultgetStatus)=>{

//         if(error)
//         {
//             throw error;
//         }

//         else
//         {
//             loadSectionData.loadSectionData(req,res,connPool);
       
//                conn.release();
            
//         }

            
//     })
   
   
   

// })
}

module.exports = {
    sendMessage: sendMessage
  };