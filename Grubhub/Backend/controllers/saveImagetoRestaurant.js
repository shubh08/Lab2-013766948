const loadOwnerProfile =  require('./loadOwnerProfile');
const Restaurant = require('../models/Restaurant');
const saveImagetoRestaurant = (req, res, connPool) =>{
  
    const {image,id} = req.body;

    console.log('Inside restaurant image update',req.body)
connPool.getConnection((error,conn)=>{
    
    let queryGetStatus = 'update restaurant set rest_image=? where restaurant_id=?';
    console.log(queryGetStatus);
    Restaurant.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "rest_image":image
                }
            },
            function(err,doc) {
        if(err) throw err
        loadOwnerProfile.loadOwnerProfile(req,res,connPool);
    }
        );
   
   
   

})
}

module.exports = {
    saveImagetoRestaurant: saveImagetoRestaurant
  };