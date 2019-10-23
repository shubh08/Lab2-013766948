

const Restaurant = require('../models/Restaurant');
const loadSectionData =  require('./loadSectionData'); 




const updateSection = (req, res, connPool) =>{
   console.log('Inside update section ', req.body)
    const {section_name,updateid,section_description,id,section_name_old} = req.body;


    let section = {section_name:section_name,section_description:section_description}
    // Restaurant.update({_id:id}, { $push: { sections: section  } }, {upsert: true}, function(err, docs){
    // res.json(docs);
    // console.log('here in the  update method',docs);
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    // res.end(JSON.stringify({ status: docs }));
    // });
    Restaurant.find({$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name_old}}}]}, function(err, user) {
        if (err) throw err;
      
        // change the users location
        console.log('USer',user)
       let obj =  user[0].sections.filter((elem)=>{
                return elem.section_name===section_name_old
        })
       // obj = section;
        console.log('Section here and menu',obj,'Section',section)
        if(obj.menu===undefined)
        {
            section.menu = []
        }

        else{
            section.menu = obj.menu;
        }
       
        Restaurant.findOneAndUpdate(
           {$and:[{"_id":id},{"sections":{$elemMatch:  {section_name:section_name_old}}}]},
               { 
                   "$set": {
                       "sections.$": section
                   }
               },
               function(err,doc) {
                loadSectionData.loadSectionData(req,res,connPool);
               }
           );
      });
   

    // Restaurant.findOneAndUpdate(
    //     { "_id": id, "sections.section_name": section_name_old },
    //     { 
    //         "$set": {
    //             "sections.$": section
    //         }
    //     },
    //     function(err,doc) {
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    // res.end(JSON.stringify({ status: doc }));
    //     }
    // );

    // Restaurant.findOneAndUpdate(
    //     { "_id": id, "sections._id": updateid },
    //     { 
    //         "$set": {
    //             "sections.$": section
    //         }
    //     },
    //     function(err,doc) {
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });

    // res.end(JSON.stringify({ status: doc }));
    //     }
    // );
// connPool.getConnection((error,conn)=>{
//     let encryptPass='';
//     let queryAddSection = 'update section set section_name=?,section_description=? where section_id=?';
//     console.log(queryAddSection);
//     conn.query(queryAddSection,[section_name,section_description,updateid],(error,resultgetStatus)=>{

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
    updateSection: updateSection
  };