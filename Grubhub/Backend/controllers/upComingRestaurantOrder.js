const upComingRestaurantOrder = (req, res, connPool) => {
    console.log('Inside load Upcoming order Data for restaurant!!', req.body)
    const { id } = req.body;
    let resultOrder = {}
    connPool.getConnection((error, conn) => {

        let loadPastOrderQuery = `select * from orders where restaurant_id=(select restaurant_id from restaurant where owner_id=?)`;
        console.log(loadPastOrderQuery);
        conn.query(loadPastOrderQuery, [id], (error, resultOrder) => {
            if (error) {
                throw error;
            }

            else {
           
                 let orderid = [];
                 resultOrder.forEach(element => {
                     orderid.push(element.order_id)
                 });
                 let orderidArray = [orderid]
                let getOrderDetails = 'select  c.cust_fname,c.cust_lname,c.cust_address,o.order_id,o.status,oi.item_name,oi.item_price,oi.item_quantity,oi.order_total from customer_info c,orders o,orders_items oi where  o.cust_id=c.cust_id and o.order_id=oi.order_id and c.cust_id in (select o.cust_id from orders o where o.order_id in (?)) and o.order_id in (?) order by o.order_id ';
                console.log(getOrderDetails);
            
                console.log('Final Items array',orderid)
                if(orderid.length>0){
                conn.query(getOrderDetails,[orderid,orderid],(error,resultgetStatus)=>{ 
    
                    if(error)
                    {
                        throw error
                    }
    
                    else{
                        let finalll = []
                        let orderidd = resultgetStatus[0].order_id;
                        let arr = {orderid:resultgetStatus[0].order_id,cust_fname:resultgetStatus[0].cust_fname,cust_lname:resultgetStatus[0].cust_lname,status:resultgetStatus[0].status,order_total:resultgetStatus[0].order_total,cust_address:resultgetStatus[0].cust_address}
                        arr.items=[]
                        resultgetStatus.forEach((orderItem)=>{
                            console.log('item is',orderItem)
                            if(orderItem.order_id===orderidd)
                            {
                                console.log('matched')
                                arr.items.push({item_name:orderItem.item_name,item_price:orderItem.item_price,item_quantity:orderItem.item_quantity})

                            }

                            else{
                                console.log('heree not matched',orderItem)
                                finalll.push(arr);
                                arr= {}
                             arr= {restname:orderItem.restaurant_name,orderid:orderItem.order_id,cust_fname:orderItem.cust_fname,cust_lname:orderItem.cust_lname,status:orderItem.status,order_total:orderItem.order_total,cust_address:orderItem.cust_address}
                             arr.items=[]
                             arr.items.push({item_name:orderItem.item_name,item_price:orderItem.item_price,item_quantity:orderItem.item_quantity})
                             orderidd=orderItem.order_id
                            }

                        })

                        finalll.push(arr)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });

            
                        res.end(JSON.stringify({status:"success",upComingRestaurantOrder:finalll}));
                    }
    
                 })
                }
             else{
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

    
                res.end(JSON.stringify({status:"success",upComingRestaurantOrder:[]}));

             }
            }


        })
        conn.release();
    })
}




module.exports = {
    upComingRestaurantOrder: upComingRestaurantOrder
};