const loadMenu =  require('./loadMenu'); 
const Restaurant = require('../models/Restaurant');
const saveImagetoMenu = (req, res, connPool) =>{
  
    console.log('Menu to be pushed!!!',req.body)
    const {image,id,section_name,menu_name_old} = req.body;

    Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]}, function(err, user) {
        if (err) throw err;
        console.log('Menuuuuuuuuuuuu',user,'Type',typeof user)
       
        for (var i in user[0].sections) {
            if ( user[0].sections[i].section_name == section_name) {
                for (var j in user[0].sections[i].menu) {
                    if (user[0].sections[i].menu[j].menu_name == menu_name_old) {
                        user[0].sections[i].menu[j].menu_image = image;
                       break; 
                    }
                  }
               break; 
            }
          }
    
    
        console.log('Section objjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',user[0].sections[i]);

        console.log('Menu to be inserted',user[0].sections[i].menu[j])
   
   
    Restaurant.findOneAndUpdate(
        {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name}}},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]},
           { 
               "$set": {
                "sections":  user[0].sections
               }
           },
           function(err,doc) {
        req.body.sectionname = section_name
       loadMenu.loadMenu(req,res,connPool);
           }
       );
    })

}

module.exports = {
    saveImagetoMenu: saveImagetoMenu
  };