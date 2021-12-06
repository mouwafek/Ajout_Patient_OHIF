import React, { Component } from 'react';
import { NavLink,Link } from "react-router-dom";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import './SignUp.css';

class SignUp extends Component {
  constructor() {
    super();
    
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nom:'',
      prenom:'',
      email:'',
      password:'',
      tel:0,
      formErrors:{
        nom:'',
        prenom:'',
        email:"",
        password:'',
        tel:0
      },
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    /*if (this.props.auth.isAuthenticated) {
      this.props.history.push("/studylist");
    }*/
  }
  mponentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  
  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    })
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeTel(e) {   
    this.setState({
      tel: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      tel: this.state.tel,
    };
    console.log(newUser)
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div>
        <form className="box" noValidate onSubmit={this.onSubmit}>
          <h1>Sign Up</h1>
          <input 
            type="text" 
            placeholder="First Name..."
            id="firstName"
            value={ this.state.nom}
            onChange={this.onChangeNom} 
          />
          <br />
          <input 
            type="text" 
            placeholder="Last Name..." 
            id="lastName"
            value={this.state.prenom}                
            onChange={this.onChangePrenom} 
            />
          <br />
          <input 
            type="text" 
            placeholder="Email..." 
            id="email"
            value={ this.state.email}             
            onChange={this.onChangeEmail} 
          />
          <br />
          <input 
            type="password" 
            placeholder="Password..."            
            id="password"
            value={ this.state.password}
            onChange={this.onChangePassword} 
          />
          <br />
          <input 
            type="text" 
            placeholder="Télephone..."            
            id="tel"
            value={ this.state.tel}
            onChange={this.onChangeTel} 
          />
          <br />
          <input className="sign-up" type="submit" value="Sign up" />
          <br />
          <Link to="/" variant="body2">
            <input
              className="have-account"
              type="submit"
              value="HAVE AN ACCOUNT ? SIGN IN"
            />
          </Link>
          <br />
          <a href="/https://www.google.com" variant="body2">
          <input
            className="google"
            type="submit"
            value="Continue with Google"
          />
          </a>
          <br />
          <NavLink to="/https://www.facebook.com" variant="body2">
          <input
            className="facebook"
            type="submit"
            value="Continue with Facebook"
          />
          </NavLink>
        </form>
      </div>
    );
  }
}





SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));