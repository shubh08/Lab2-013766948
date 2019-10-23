
const Customer = require('../models/Customer');

const registerCust = (req, res, connPool, bcrypt) => {
    const saltRounds = 10;
    const { fname, lname, email, pass } = req.body;
    // create a new user
    var newUser = Customer({
        cust_fname: fname,
        cust_lname: lname,
        cust_email: email,
        cust_hash: pass,
        cust_image: 'default.png'
    });

    Customer.find({ cust_email: email }, function (err, cust) {
        if (err) throw err;
        else {
            console.log('Here success!', cust)
            if (cust.length == 0) {
                bcrypt.hash(pass, saltRounds, function (err, hash) {
                    newUser.cust_hash = hash;
                    newUser.save(function (err) {
                        if (err) throw err;
                        else {
                            let resultsignup = {}
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            resultsignup.status = 'success'
                            res.end(JSON.stringify(resultsignup));
                        }
                    })
                })
            

            
            }

            else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({ status: "failure" }));
            }

        }

    });

    // connPool.getConnection((error,conn)=>{
    //     let encryptPass='';
    //     let queryGetStatus = 'select * from  customer_info where cust_email = ?';
    //     console.log(queryGetStatus);
    //     conn.query(queryGetStatus,[email],(error,resultgetStatus)=>{

    //         if(resultgetStatus.length>0)
    //         {
    //             conn.release();
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             });

    //             res.end(JSON.stringify({status:"failure"}));
    //            return;

    //         }

    //         else{
    //             bcrypt.hash(pass, saltRounds, function(err, hash) {
    //                 encryptPass = hash;
    //                 console.log('encrypt',encryptPass);
    //                 console.log('Type of',typeof encryptPass,encryptPass.length);
    //                 let queryTest = 'insert into customer_info(cust_fname,cust_lname,cust_email,cust_hash,cust_image) values (?, ?, ?, ?,?)';
    //                 //let name = fname+' '+lname
    //                 console.log(queryTest);
    //                 conn.query(queryTest,[fname,lname,email,encryptPass,'default.png'],(error,resultsignup)=>{
    //                     if(error)
    //                     {
    //                         throw error;
    //                     }
    //                     else{
    //                         res.writeHead(200, {
    //                             'Content-Type': 'application/json'
    //                         });
    //                         resultsignup.status='success'
    //                         res.end(JSON.stringify(resultsignup));

    //                     }
    //                 }) 

    //               });
    //                conn.release();
    //         }

    //     })




    // })
}

module.exports = {
    registerCust: registerCust
};