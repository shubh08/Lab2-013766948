const upComingOrder = (req, res, connPool) =>{
    console.log('Inside load Upcoming order for Customer Data!!',req.body)
    const{id} = req.body;
    let resultOrder = {}
    connPool.getConnection((error,conn)=>{
       
         let loadPastOrderQuery = `select * from orders where cust_id=?`;
         console.log(loadPastOrderQuery);
         conn.query(loadPastOrderQuery,[id],(error,result)=>{
             if(error)
             {
                 throw error;
             }

             else{
                 let orderid = [];
                 let orderTotal = {}
                 result.forEach(element => {
                     orderid.push(element.order_id)
                     orderTotal.order_id = element.order_total
                 });
                 let orderidArray = [orderid]
                let getOrderDetails = 'select  o.order_id,o.status,o.order_total,oi.item_name,oi.item_price,oi.item_quantity,o.order_total,oi.restaurant_name from orders o,orders_items oi where  o.order_id=oi.order_id and  o.order_id in (?) order by o.order_id';
                console.log(getOrderDetails);
            
                console.log('Final Items array',orderid)
                if(orderid.length>0){
                conn.query(getOrderDetails,[orderid],(error,resultgetStatus)=>{ 
    
                    if(error)
                    {
                        throw error
                    }
    
                    else{
                        let finalll = []
                        let orderidd = resultgetStatus[0].order_id;
                        let restname =  resultgetStatus[0].restaurant_name;
                        let arr = {restname:resultgetStatus[0].restaurant_name,orderid:resultgetStatus[0].order_id,order_total:resultgetStatus[0].order_total,status:resultgetStatus[0].status}
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
                             arr= {restname:orderItem.restaurant_name,orderid:orderItem.order_id,order_total:orderItem.order_total,status:orderItem.status}
                             arr.items=[]
                             arr.items.push({item_name:orderItem.item_name,item_price:orderItem.item_price,item_quantity:orderItem.item_quantity})
                             orderidd=orderItem.order_id
                            }

                        })

                        finalll.push(arr)

                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });

            
                        res.end(JSON.stringify({status:"success",dataOrder:finalll}));
                    }
    
                 })}
           
                 else{
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

        
                    res.end(JSON.stringify({status:"success",dataOrder:[]}));

                 }
              
                             
             }
           
             
         })  
         conn.release();
 })
}


module.exports = {
    upComingOrder: upComingOrder
  };