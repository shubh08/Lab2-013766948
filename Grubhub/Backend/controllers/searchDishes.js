const Restaurant = require('../models/Restaurant');

const searchDishes = (req, res, connPool) => {
    console.log('Request Body', req.body);
    const { id,searchTerm } = req.body;
    console.log('Search Term is ', searchTerm)
    //   console.log('Customer Cookie Value',req.cookie('cust_id'))


    Restaurant.find({"sections.menu":{$elemMatch:  {menu_name:searchTerm}}}, function (err, rest) {
        if (err) throw err

        console.log('result data profile', rest)

        console.log('Result Section Data', rest)


        if (rest.length==0) {
            res.end(JSON.stringify({
                status: "success",
                searchData: []
            }));
        }
        else {
            res.end(JSON.stringify({
                status: "success",
                searchData: rest
            }));
        }

    })

  
}


module.exports = {
    searchDishes: searchDishes
};