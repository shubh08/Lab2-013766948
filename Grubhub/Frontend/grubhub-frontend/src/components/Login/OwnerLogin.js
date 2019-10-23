import React, { Component } from 'react';
import './login.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import * as actions from '../actions/actions'


class OwnerLogin extends Component {
    getDataSignup = (e) => {
e.preventDefault()
        return {
            email: this.props.owner_email,
            pass: this.props.owner_pass,
            type: 'owner'
        }
    }

    render() {
        let redirectVar = null;

        if(cookie.load('owner_id')){
            redirectVar = <Redirect to= "/restaurant/manage/profile"/>
        }
        
        else if (cookie.load('cust_id')) {
            redirectVar = <Redirect to="/customer/home" />
          }


        else if (this.props.loginStatus === 'success') {
            redirectVar = <Redirect to="/restaurant/manage/profile" />
        }
        return (
            <div >
                {redirectVar}
                <nav class="navbar navbar-default navbar-fixed-top">

                    <div class="navbar-header">
                        <a class="navbar-brand navbar-left logo" href="/"><p><font color="red"><b>GRUBHUB</b></font></p></a>
                    </div>

                </nav>
                <div className='logincontainer'>
                    {this.props.loginStatus === 'failure' && <div id='invalidLogin'><p><font color="red">Hey Stranger! We don't recognize that login. Spell check your info and try again!</font></p></div>}
                    <form   onSubmit={(e) => this.props.submitLogin(this.getDataSignup(e))}  >
                        <h3><b>Sign in with your Grubhub account</b></h3>
                        <div className="form-group">
                            <label for="owner_email">Email address</label>
                            <input type="email" className="form-control" id="owner_email" name="owner_email" onChange={this.props.valueChangeHandler} placeholder="Enter email"  required="true"/>
                        </div>
                        <div className="form-group">
                            <label for="owner_pass">Password</label>
                            <input type="password" className="form-control" id="owner_pass" name="owner_pass" onChange={this.props.valueChangeHandler} placeholder="Password" required="true"/>
                        </div>
                        <button type="submit"className="btn btn-danger">Sign in</button>
                    </form >
                   
                    
                    <p id='account'><font><a href='signup'><b>Create your account</b></a></font></p>

                </div>
            </div>
        )
    }
}




const mapState = (store) => {
    return {
        owner_email: store.owner_email,
        owner_pass: store.owner_pass,
        loginStatus: store.loginStatus
    }
}

const mapDispach = (dispach) => {
    return {
        valueChangeHandler: (e) => dispach(actions.valueMapper(e)),
        submitLogin: (data) => dispach(actions.login(data))
        // decAge:() => dispach({type:'Agedo'})
    }
}


export default connect(mapState, mapDispach)(OwnerLogin);
