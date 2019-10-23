
const loadMenu =  require('./loadMenu'); 
const Restaurant = require('../models/Restaurant');
const updateMenu = (req, res, connPool) =>{
   console.log('Inside update menu ', req.body)
    const {menu_name,updateid,menu_description,menu_image,menu_price,section_name,menu_name_old,id} = req.body;

    Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]}, function(err, user) {
        if (err) throw err;
        console.log('Menuuuuuuuuuuuu',user,'Type',typeof user)
       
  
     

    for (var i in user[0].sections) {
        if ( user[0].sections[i].section_name == section_name) {
            for (var j in user[0].sections[i].menu) {
                if (user[0].sections[i].menu[j].menu_name == menu_name_old) {
                    user[0].sections[i].menu[j] = req.body;
                   break; 
                }
              }
           break; 
        }
      }


    console.log('Section objjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',user[0].sections[i]);
//     let men  = obj[0].menu.filter((elem)=>{
//         return elem.menu_name===menu_name_old
// })


//     men = req.body;
//     obj[0].menu = men

    console.log('Menu to be inserted',user[0].sections[i].menu[j])
   
    Restaurant.findOneAndUpdate(
        {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]},
           { 
               "$set": {
                   "sections":  user[0].sections
               }
           },
           function(err,doc) {
            req.sectionname = section_name; 
            loadMenu.loadMenu(req,res,connPool);
           }
       );
    })
      
    //   });
// connPool.getConnection((error,conn)=>{
   
//     let queryAddSection = 'update menu set menu_name=?,menu_description=?,menu_price=? where menu_id=?';
//     console.log(queryAddSection);
//     conn.query(queryAddSection,[menu_name,menu_description,menu_price,updateid],(error,resultgetStatus)=>{

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
    updateMenu: updateMenu
  };