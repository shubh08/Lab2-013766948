import React, { Component } from 'react';
import '../LoadRestaurant/LoadRestaurant.css'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';


class MenuView extends Component {

    constructor() {

        super();

        this.state = {
            restaurantid: "",
            rest_name: "",
            orderData:[],
            total:0,
            reDirect:null
        }

    }

    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    createFinalView = (restdata) =>{

        let map1 = new Map(); 
        let itemarr=[];
        restdata.forEach((element)=>{

            if(map1.has(element.section_name.toUpperCase()))
            {
                console.log('herer now')
               let arr =  map1.get(element.section_name.toUpperCase());
               arr.push(element)
                map1.set(element.section_name.toUpperCase(),arr);
            }

            else{
                console.log('herere first ')
                itemarr = []
                itemarr.push(element)
                map1.set(element.section_name.toUpperCase(),itemarr)
                console.log('Map value is ',map1)
            }

        })

        console.log('Final Map is',map1)
       let finalHtmlView = this.createHtml(map1)


       return finalHtmlView

    }

    createHtml=(map)=>{
        let menuMap = []
        for (var [key, value] of map) {
            console.log(key + ' = ' + value);
            let menuMap2 = []
            menuMap2 = value.map((value) => {
                
                return <div class="columnCard"><div class="card">
                     <img src={'http://3.17.152.109:3001/' + value.menu_image} style={{ height: "100px", width: "100px" }}></img>
                    <h3>{value.menu_name}</h3>
                    <p>{value.menu_description}</p>
                    <p>${value.menu_price}</p>
                    
                   
                </div> </div>
            })
            menuMap.push(<div><h3>{key} Menu: <br/></h3><div class="rowCard">{menuMap2} 
            </div>
            <br/><hr/>
              </div>)

          }
          console.log('Finalllll viewwww',menuMap)
return menuMap
    }


    viewSection = (data) => {

        let reDirect = <Redirect to={{
            pathname: '/customer/loadRestaurant',
            state: {
                restaurantid: data.restaurant_id,
            }
        }}
        />

        this.setState({
            reDirect: reDirect
        })



    }

    redirectHome = ()=>{
console.log('Herer in the redirectHomeeeee')
        let reDirect = <Redirect to={{
            pathname: '/customer/home'            
        }}
        />

        this.setState({
            reDirect: reDirect
        })


    }


    componentWillMount() {

let rest_name = cookie.load('rest_name')
  let restaurantid = cookie.load('owner_id')
  this.setState({
    rest_name:rest_name
  })
        this.props.loadRestaurant({ id: restaurantid });

    }

    

    render() {
        
        let currentOrders = null
        let total = 0;


        
        let redirectVar = null
        if (!cookie.load('owner_id')) {

            redirectVar = <Redirect to="/" />
        }


       
        
        let menuFinalView  = this.createFinalView(this.props.restaurantData);
        console.log('Final HTML Vieweeee',menuFinalView)

        return (<div>
            {redirectVar}
            <div class="section">

           <div align="center"> <h1 align="center"><i>{this.state.rest_name}</i></h1>  <Link to="/restaurant/manageSection"><u>Manage Restaurant</u></Link></div>

            {menuFinalView}
            {currentOrders}
            
        </div>
        </div>)


    }




}


const mapState = (store) => {
    console.log('Load Restaurant Props', store)
    return {

        restaurantData: store.restaurantData,
        loginStatus: store.loginStatus,
        objLogin: store.objLogin,
        updateSuccess: store.updateSuccess,
        orderSuccess:store.orderSuccess
    }
}



const mapDispach = (dispach) => {
    return {
        loadProfileData: (data) => dispach(actions.loadProfileData(data)),
        order: (data) => dispach(actions.order(data)),  
        loadRestaurant: (data) => dispach(actions.loadRestaurant(data))
        // decAge:() => dispach({type:'Agedo'})
    }
}


export default connect(mapState, mapDispach)(MenuView);
