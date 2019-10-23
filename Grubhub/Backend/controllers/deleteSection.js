
const loadSectionData =  require('./loadSectionData'); 
const Restaurant = require('../models/Restaurant');
const deleteSection = (req, res, connPool) =>{
   console.log('Inside delete section ', req.body)
    const {section_name,id} = req.body;

  //   Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:sectionName}}}]},{"sections.menu":{$elemMatch:  {menu_name:menu_name_old}}}]}, function(err, user) {
  //     if (err) throw err;
  //     console.log('Menuuuuuuuuuuuu',user,'Type',typeof user)
     

  //     let obj =  user[0].sections.filter((elem)=>{
  //         return elem.section_name===section_name
  // })

  Restaurant.update(
    {'_id':id}, 
    { $pull: { "sections" : { section_name: section_name } } },
    function(err,doc) {
      if(err) throw err;
      loadSectionData.loadSectionData(req,res,connPool);
      }  )
//loadSectionData.loadSectionData(req,res,connPool);
// connPool.getConnection((error,conn)=>{
    
//     let queryDeleteMenu = 'delete from menu where section_id = ?';
//     console.log(queryDeleteMenu);
//     conn.query(queryDeleteMenu,[deleteid],(error,resultgetStatus)=>{

//         if(error)
//         {
//             throw error;
//         }

//         else
//         {
//             let queryDeleteSection = 'delete from section where section_id = ?';
//             console.log(queryDeleteSection);
//             conn.query(queryDeleteSection,[deleteid],(error,resultgetStatus)=>{
        
//                 if(error)
//                 {
//                     throw error;
//                 }
        
//                 else
//                 {
//                     conn.release();
        
//                     loadSectionData.loadSectionData(req,res,connPool);
               
                       
                    
//                 }
        
                
//             })

            
            
//         }

        
//     })
   
   
   

// })
}

module.exports = {
    deleteSection: deleteSection
  };