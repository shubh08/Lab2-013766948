
const jwt = require("jsonwebtoken");
const secret = require('../config/jwtConfig');
const Restaurant = require('../models/Restaurant');
const signinOwn = (req, res, connPool, bcrypt) =>{
    const{email,pass} = req.body;
    Restaurant.find({ owner_email: email }, function (err, owner) {

        if (err) throw err
        else {
            console.log('Here success, owner email matched!')
            if (owner.length > 0) {
                bcrypt.compare(pass, owner[0].owner_hash, function (err, status) {
                    if (status) {
                        console.log('Login Success!')
                        res.cookie('owner_id', String(owner[0]._doc._id), { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('owner_email', owner[0].owner_email, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('owner_fname', owner[0].owner_fname, { maxAge: 900000, httpOnly: false, path: '/' });
                        res.cookie('owner_lname', owner[0].owner_lname, { maxAge: 900000, httpOnly: false, path: '/' });

                        // owner.toArray(function(err, results){
                        //     console.log('owneromer signinvalue',results)
                        // })
                        console.log('owner id value',String(owner[0]._doc._id))
                        const response = owner[0]._doc;

                        response.type = 'owner';
                        const payload = { ...response };
                        console.log('Response is', response);
                        console.log('Secret is', secret.secret);
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
                                    type:'owner',
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
}

module.exports = {
    signinOwn: signinOwn
  };