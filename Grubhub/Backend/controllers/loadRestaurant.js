const Restaurant = require('../models/Restaurant');
const loadRestaurant = (req, res, connPool) =>{
    console.log('Inside load restaurant ')
    const{id} = req.body;
    console.log('Req body',req.body)

    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) throw err

        console.log('result data profile', rest[0]._doc)
       
        console.log('Result Section Data', rest[0]._doc.sections)

        let menuArr = [];
        rest[0]._doc.sections.forEach(element => {
            
                console.log('hererer in the matched section name menu array',element)
                if(element.menu.length>0)
                {
                    element.menu.forEach(elem=>{
                        
                        menuArr.push(elem);
                    })

                   
                }
            
        });

        
        console.log('Data pushed in the menu arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',menuArr)
        //let sectionArr = rest[0]._doc.sections
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
       
        res.end(JSON.stringify({status:"success",
        restaurantData:menuArr
       }));

    })
//     connPool.getConnection((error,conn)=>{
//         // encryptPass = hash;
//          console.log('Inside load owner profile!');
//          let loadRestaurant = 'select m.menu_id,m.menu_name,m.menu_price,m.menu_image,m.menu_description,s.section_id,s.section_name from menu m, restaurant r, section s where r.restaurant_id=s.restaurant_id and s.section_id = m.section_id and r.restaurant_id=?';
//          console.log(loadRestaurant);
//          conn.query(loadRestaurant,[id],(error,result)=>{
//              if(error) 
//              {
//                  throw error;
//              }

//              else{
//                 console.log('Load Restaurant data',result)

//                 console.log('Creating Restaurant object array')
//                 var restaurantArr = []
//                 result.forEach((restaurantItem)=>{
//                     restaurantArr.push(restaurantItem)
//                 })
//                 console.log('Final Load Restaurant Array',restaurantArr)
//                 res.writeHead(200, {
//                                  'Content-Type': 'application/json'
//                              });
                            
//                              res.end(JSON.stringify({status:"success",
//                              restaurantData:restaurantArr
//                             }));
//              }
           
             
//          })  
//          conn.release();
//  })
}


module.exports = {
    loadRestaurant: loadRestaurant
  };