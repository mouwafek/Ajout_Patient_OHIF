import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import './SignIn.css';

class SignIn extends Component {
  constructor() {
    super();
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {},
      
    };
  }
  /*componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/studylist");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/studylist");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
*/
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
   
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData)

    this.setState({
      email:'',
      password:''
    })
    
    window.location = '/patients';
  };
  render() {
    return (
      <div>
        <form className="box" onSubmit={this.onSubmit} noValidate>
          <h1>Sign In</h1>
          <input 
            type="text" 
            placeholder="Email..."
            required
            id="email"
            name="email"
            onChange={this.onChange}
            value={this.state.email} 
          />
          
          <input 
            type="password" 
            placeholder="Password..."
            required
            id="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password} 
          />
          <br />
          <br />
          <input className="sign-in" type="submit" value="Log in" />
          <br />
          
          <Link to="/signup" variant="body2">
          <input
            className="dont-have"
            type="submit"
            value="DON'T HAVE AN ACCOUNT ?"
          />
          </Link>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(SignIn);