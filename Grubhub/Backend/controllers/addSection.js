
const loadSectionData =  require('./loadSectionData'); 
const Restaurant = require('../models/Restaurant');
const addSection = (req, res, connPool) =>{
   console.log('Inside add section ', req.body)
    const {section_name,id,section_description} = req.body;
    let section = {section_name:section_name,section_description:section_description,menu:[]}
   
    Restaurant.update({_id:id}, { $push: { sections: section  } }, {upsert: true}, function(err, docs){
    if(err) throw err
    //res.json(docs);
    console.log('here in the  add section  method',docs);
    loadSectionData.loadSectionData(req,res,connPool);
       
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
    addSection: addSection
  };