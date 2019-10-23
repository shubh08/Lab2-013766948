const Restaurant = require('../models/Restaurant');
const loadSectionData = (req, res, connPool) => {
    console.log('Inside load section Data!!', req.body)
    const { id } = req.body;

    Restaurant.find({ _id: id }, function (err, rest) {
        if (err) throw err

        console.log('result data profile', rest[0]._doc)
       
        console.log('Result Section Data', rest[0]._doc.sections)
        let sectionArr = rest[0]._doc.sections
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            status: "success",
            sectionData:sectionArr
        }));

    })

    //     connPool.getConnection((error,conn)=>{
    //         // encryptPass = hash;
    //          console.log('Connection Created!');
    //          let loadSectionQuery = 'select * from section where restaurant_id=?';
    //          console.log(loadSectionQuery);

    //         //  conn.query(loadSectionQuery,[id],(error,result)=>{
    //         //      if(error)
    //         //      {
    //         //          throw error;
    //         //      }

    //         //      else{
    //         //         console.log('Load Section data',result)

    //         //         console.log('Creating section object array')
    //         //         var sectionArr = []
    //         //         result.forEach((sectionItem)=>{
    //         //             sectionArr.push(sectionItem)
    //         //         })
    //         //         console.log('Final Section Array',sectionArr)
    //         //         
    //         //      }


    //         //  })  
    //         //  conn.release();
    //  })
}


module.exports = {
    loadSectionData: loadSectionData
};