import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './login.css';
import * as actions from '../actions/actions'

class Login extends Component {
  getDataSignup = (e) => {
e.preventDefault()
    return {
      email: this.props.cust_email,
      pass: this.props.cust_pass,
      type: 'customer'
    }
  }

  render() {
    let redirectVar = null;

    if (cookie.load('cust_id')) {
      redirectVar = <Redirect to="/customer/home" />
    }

    
    else if(cookie.load('owner_id')){
      redirectVar = <Redirect to= "/restaurant/manage/profile"/>
  }
  

    console.log('Redirected', redirectVar);
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
          <form onSubmit={(e) => this.props.submitLogin(this.getDataSignup(e))}>
            <h3><b>Sign in with your Grubhub account</b></h3>
            <div className="form-group">
              <label for="cust_email">Email address</label>
              <input type="email" className="form-control" id="cust_email" name="cust_email" onChange={this.props.valueChangeHandler} placeholder="Enter email"  required="true"/>
            </div>
            <div className="form-group">
              <label for="cust_pass">Password</label>
              <input type="password" className="form-control" id="cust_pass" name="cust_pass" placeholder="Password" onChange={this.props.valueChangeHandler}   required="true"/>
            </div>
            <button type="submit"  className="btn btn-danger">Sign in</button>
          </form>

         

          <p id='account'><font><a href='signup'><b>Create your account</b></a></font></p>

        </div>
      </div>
    )
  }
}


const mapState = (store) => {
  return {
    cust_email: store.cust_email,
    cust_pass: store.cust_pass,
    loginStatus: store.loginStatus
  }
}

const mapDispach = (dispach) => {
  return {
    valueChangeHandler: (e) => dispach(actions.valueMapper(e)),
    submitLogin: (data) => dispach(actions.login(data))
    
  }
}


export default connect(mapState, mapDispach)(Login);