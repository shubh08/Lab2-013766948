
const loadMenu =  require('./loadMenu'); 
const Restaurant = require('../models/Restaurant');
const deleteMenu = (req, res, connPool) =>{
   console.log('Inside delete Menu ', req.body)
    const {section_name,id,menu_name} = req.body;

    Restaurant.update(
        {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}}]}, 
        { $pull: { "sections.$.menu" : { menu_name: menu_name } } },
        function(err,doc) {
          if(err) throw err;
    req.sectionname = section_name;

    loadMenu.loadMenu(req,res,connPool);
          }  )

// connPool.getConnection((error,conn)=>{
    
//     let queryDeleteMenu = 'delete from menu where menu_id = ?';
//     console.log(queryDeleteMenu);
//     conn.query(queryDeleteMenu,[deleteid],(error,resultgetStatus)=>{
//         if(error)
//         {
//             throw error;
//         }
//         else
//         {
//                     conn.release();
        
//                     loadMenu.loadMenu(req,res,connPool);
               
//         }

        
//     })
   
// })
}

module.exports = {
    deleteMenu: deleteMenu
  };