
const loadMenu =  require('./loadMenu'); 


const Restaurant = require('../models/Restaurant');
const addMenu = (req, res, connPool) =>{
console.log('Inside add Menu ', req.body)
const  {menu_name,id,menu_description,menu_price,menu_image,section_name} = req.body;
req.body.menu_image = 'default.png'

Restaurant.update({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}}]}, { $push: {  "sections.$.menu": req.body  } }, {upsert: true}, function(err, docs){
    
    if(err) throw err;
    
    console.log('here in the add menu method',docs);
    req.body.sectionname = req.body.section_name
    loadMenu.loadMenu(req,res,connPool);
   
    });


// connPool.getConnection((error,conn)=>{
//     let encryptPass='';
//     let queryAddSection = 'insert into menu(menu_name,menu_description,menu_price,menu_image,section_id) values (?, ?, ?,?,?)';
//     console.log(queryAddSection);
//     conn.query(queryAddSection,[menu_name,menu_description,menu_price,'default.png',id],(error,resultgetStatus)=>{

//         if(error)
//         {
//             throw error;
//         }

//         else
//         {
//             loadMenu.loadMenu(req,res,connPool);
       
//                conn.release();
            
//         }

        
//     })
   
   
   

// })
}

module.exports = {
    addMenu: addMenu
  };