
const jwt = require("jsonwebtoken");
const secret = require('../config/jwtConfig');
const Customer = require('../models/Customer');
const signinCust = (req, res, connPool, bcrypt) => {

    const { email, pass, type } = req.body;
    Customer.find({ cust_email: email }, function (err, cust) {

        if (err) throw err
        else {
            console.log('Here success, customer email matched!')
            if (cust.length > 0) {
                bcrypt.compare(pass, cust[0].cust_hash, function (err, status) {
                    if (status) {
                        console.log('Login Success!')
                        res.cookie('cust_id', String(cust[0]._id), { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('cust_email', cust[0]._doc.cust_email, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('cust_fname', cust[0]._doc.cust_fname, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('cust_lname', cust[0]._doc.cust_lname, { maxAge: 900000, httpOnly: false, path: '/' });

                        console.log('Customer id value',typeof String(cust[0]._doc._id))
                        const response = cust[0]._doc;

                        response.type = 'customer';
                        const payload = { ...response };
                        console.log('Response isdfdfdfd', response);
                        console.log('Secret isxfdfdfdfdf', secret.secret);
                        jwt.sign(
                            payload,
                            secret.secret,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                console.log('Token sdsds', token);
                                // res.end(JSON.stringify(response));
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    ...response
                                });
                            }
                        );



                    }

                    else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });

                        res.end(JSON.stringify({ status: "failure" }));
                    }
                });


            }

            else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({ status: "failure" }));
            }
        }

    })
    // connPool.getConnection((error, conn) => {
    //     // encryptPass = hash;
    //     console.log('Inside customer sign in!');
    //     let queryTest = 'select * from  customer_info where cust_email = ?';
    //     console.log(queryTest);
    //     conn.query(queryTest, [email], (error, result) => {
    //         if (error) {
    //             throw error;
    //         }
    //         else {
    //             console.log(result);
    //             if (result.length === 0) {
    //                 console.log('failure')
    //                 res.writeHead(200, {
    //                     'Content-Type': 'application/json'
    //                 });
    //                 console.log('No user with such email')
    //                 res.end(JSON.stringify({ status: "failure" }));
    //             }
    //             else {
    //                 bcrypt.compare(pass, result[0].cust_hash, function (err, status) {
    //                     if (status) {
    //                         console.log('Login Success!')
    //                         res.cookie('cust_id', result[0].cust_id, { maxAge: 900000, httpOnly: false, path: '/' });
    //                         res.cookie('cust_email', result[0].cust_email, { maxAge: 900000, httpOnly: false, path: '/' });
    //                         res.cookie('cust_fname', result[0].cust_fname, { maxAge: 900000, httpOnly: false, path: '/' });
    //                         res.cookie('cust_lname', result[0].cust_lname, { maxAge: 900000, httpOnly: false, path: '/' });

    //                         const response = result[0];

    //                         //req.session.user = user;
    //                         response.type = 'customer';
    //                         const payload = { ...response };
    //                         console.log('Response isdfdfdfd', response);
    //                         console.log('Secret isxfdfdfdfdf', secret.secret);
    //                         jwt.sign(
    //                             payload,
    //                             secret.secret,
    //                             {
    //                                 expiresIn: 31556926 // 1 year in seconds
    //                             },
    //                             (err, token) => {
    //                                 console.log('Token sdsds', token);
    //                                 // res.end(JSON.stringify(response));
    //                                 res.json({
    //                                     success: true,
    //                                     token: "Bearer " + token,
    //                                     data: response
    //                                 });
    //                             }
    //                         );



    //                     }




    //                     else {
    //                         res.writeHead(200, {
    //                             'Content-Type': 'application/json'
    //                         });

    //                         res.end(JSON.stringify({ status: "failure" }));
    //                     }
    //                 });

    //             }
    //         }
    //     })
    //     conn.release();
    // })

}


module.exports = {
    signinCust: signinCust
};