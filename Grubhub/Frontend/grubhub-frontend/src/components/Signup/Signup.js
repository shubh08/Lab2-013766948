import React, {Component} from 'react';
import './signup.css';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
import cookie from 'react-cookies';
class Signup extends Component {


    getDataSignup = (e)=>{

      e.preventDefault();

        return {
            fname:this.props.cust_fname,
            lname:this.props.cust_lname ,
            email: this.props.cust_email,
            pass: this.props.cust_pass,
            type:'customer'
        }
    }

    render(){

        let signUpStatus ;
        let redirectVar = null;
        if (cookie.load('cust_id')) {
          redirectVar = <Redirect to="/customer/home" />
        }

        
        else if(cookie.load('owner_id')){
          redirectVar = <Redirect to= "/restaurant/manage/profile"/>
      }
        else if (this.props.loginStatus==='failure') {
            signUpStatus = <div id='invalidLogin'><h2><font color="red">Email id already exists!</font></h2></div>;
          }
          else if(this.props.loginStatus==='success')
        {  signUpStatus = <div id='invalidLogin'><p><font color="green">Account created successfully. Please login with your username and password!</font></p></div>
        document.getElementById('cust_signup').reset();
      }
     

    
          
        return(
           
             <div>      
               {redirectVar}
               <nav class="navbar navbar-default navbar-fixed-top">
        
        <div class="navbar-header">
          <a class="navbar-brand navbar-left logo" href="/"><p><font color="red"><b>GRUBHUB</b></font></p></a>
        </div>
    </nav>
                <div className='logincontainer'>
                {signUpStatus}
                    <form onSubmit = {(e)=>this.props.signUp(this.getDataSignup(e))} id="cust_signup" >
                    <h2><b>Create your account</b></h2>
                <div className="form-row">
    <div className="form-group col-md-6">
    <label for="cust_fname">First name</label>
      <input type="text" class="form-control" id="cust_fname" name="cust_fname" onChange = {this.props.valueChangeHandler} placeholder="First name" required/>
    </div>

    <div className="form-group col-md-6">
    <label for="cust_lname">Last name</label>
      <input type="text" class="form-control" id="cust_lname" name="cust_lname" onChange = {this.props.valueChangeHandler} placeholder="Last name"  required/>
    </div>
</div>
      <div className="form-group">
          <label for="cust_email">Email address</label>
    <input type="email" className="form-control" id="cust_email" name="cust_email" onChange = {this.props.valueChangeHandler} aria-describedby="emailHelp" placeholder="Enter email" required/>
          </div>      

          <div className="form-group">
          <label for="cust_pass">Password</label>
      <input type="password" className="form-control" id="cust_pass" name="cust_pass" onChange = {this.props.valueChangeHandler} placeholder="Password" required/>
          </div>  
          <button type="submit" className="btn btn-primary">Create your account</button>
          </form>
         
          <br></br>
          <p id='account'><font>Have an account? <a href='login'>Sign in</a></font></p>
          <p class="u-text-center caption"><span>By creating your Grubhub account, you agree to the</span> <a href="/legal/terms-of-use" target="_blank" rel="noopener">Terms of Use</a> <span>and</span> <a href="/legal/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
                </div>
                </div>
        )
    }
}

const mapState = (store) =>{
    return{
        cust_email:store.cust_email,
        cust_pass:store.cust_pass,
       cust_fname:store.cust_fname,
       cust_lname:store.cust_lname,
      loginStatus:store.loginStatus
    }
  }
  


  const mapDispach = (dispach) =>{
  return{
    valueChangeHandler:(e) => dispach(actions.valueMapper(e)),
    signUp:(dataSignup)=>dispach(actions.signUp(dataSignup))
    // decAge:() => dispach({type:'Agedo'})
  }
  }
  
  
  export default connect(mapState,mapDispach) (Signup);
