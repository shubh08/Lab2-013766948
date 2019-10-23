const loadOwnerProfile =  require('./loadOwnerProfile');
const Restaurant = require('../models/Restaurant');
const saveImagetoOwner = (req, res, connPool) =>{
  
    const {image,id} = req.body;

connPool.getConnection((error,conn)=>{
    
    let queryGetStatus = 'update restaurant_owner_Details set owner_image=? where owner_id=?';
    console.log(queryGetStatus);
    Restaurant.findOneAndUpdate(
        {"_id":id},
            { 
                "$set": {
                    "owner_image":image
                }
            },
            function(err,doc) {
        if(err) throw err
        loadOwnerProfile.loadOwnerProfile(req,res,connPool);
    }
        );
    // conn.query(queryGetStatus,[image,id],(error,resultgetStatus)=>{

    //     if(error)
    //     {
    //         throw error;
    //     }

    //     else
    //     {
    //         loadOwnerProfile.loadOwnerProfile(req,res,connPool);
       
    //            conn.release();
            
    //     }

    // })
   
   
   

})
}

module.exports = {
    saveImagetoOwner: saveImagetoOwner
  };