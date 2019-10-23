

const order = (req, res, connPool) =>{ 
   console.log('Inside order Items section ', req.body)
    const {cust_id,restaurant_id,status,orderItems,rest_name,order_total} = req.body;

connPool.getConnection((error,conn)=>{
    console.log('here for insert order')
    let queryInsertOrder = 'insert into orders(cust_id,restaurant_id,status,restaurant_name,order_total) values (?,?,?,?,?)';
    console.log(queryInsertOrder);
    conn.query(queryInsertOrder,[cust_id,restaurant_id,status,rest_name,order_total],(error,resultgetStatus)=>{

        if(error)
        {
            throw error;
        }

        else
        {
            console.log('Owner Details created');
            let order_id = resultgetStatus.insertId;  
            let queryInsertOrderItems = 'insert into orders_items(order_id,item_name,item_price,item_quantity,restaurant_name,order_total) values ?';
            console.log(queryInsertOrderItems);
           let finalObjectItems= orderItems.map(order => {
             
                let arr = []
                arr.push(order_id)  
                arr.push(order.menu_name)
                arr.push(order.menu_price)
                arr.push(order.quantity)
                arr.push(rest_name)
                arr.push(order_total)
                return arr
               
                

            });
            console.log('Final Items array',finalObjectItems)
            conn.query(queryInsertOrderItems,[finalObjectItems],(error,resultgetStatus)=>{ 

                if(error)
                {
                    throw error
                }

                else{
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
        
                    res.end(JSON.stringify({status:"success"}));
                }

             })
            
            
        }

        
    })
   
   
   conn.release()

})
}

module.exports = {
    order: order
  };