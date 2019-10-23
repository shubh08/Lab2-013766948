const Restaurant = require('../models/Restaurant');
const loadMenu = (req, res, connPool) =>{
    console.log('Inside load Menu Data!!',req.body)
    const{id,sectionname} = req.body;

    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) throw err

        console.log('result data profile', rest[0]._doc)
       
        console.log('Result Section Data', rest[0]._doc.sections)

        let menuArr = [];
        rest[0]._doc.sections.forEach(element => {
            if(element.section_name==sectionname)
            {
                console.log('hererer in the matched section name menu array')
               
                if(element.menu.length>0)
                menuArr = element.menu;
            }
        });

        
        console.log('Data pushed in the menu arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',menuArr)
        //let sectionArr = rest[0]._doc.sections
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            status: "success",
            menuData:menuArr
        }));

    })


//     connPool.getConnection((error,conn)=>{
       
//          let loadMenuQuery = 'select * from menu where section_id=?';
//          console.log(loadMenuQuery);
//          conn.query(loadMenuQuery,[id],(error,result)=>{
//              if(error)
//              {
//                  throw error;
//              }

//              else{
//                 console.log('Load Menu data',result)
               

//                 console.log('Creating Menu object array')
//                 var menuArr = []
//                 result.forEach((menuItem)=>{
//                     menuArr.push(menuItem)
//                 })
//                 console.log('Final Section Array',menuArr)
//                 res.writeHead(200, {
//                                  'Content-Type': 'application/json'
//                              });
                            
//                              if(menuArr.length==0)
//                             {
//                                 res.end(JSON.stringify({status:"success",
//                                 menuData:[]
//                                }));
//                             }
//                             else{
//                                 res.end(JSON.stringify({status:"success",
//                              menuData:menuArr
//                             }));
//                             }
                             
//              }
           
             
//          })  
//          conn.release();
//  })
}


module.exports = {
    loadMenu: loadMenu
  };