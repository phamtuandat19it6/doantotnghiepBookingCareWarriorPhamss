import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword:false
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
           username:event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }
    handleLogin = () => {
        console.log('username:'+this.state.username)
        console.log('password:'+this.state.password)
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })
    }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <div className="custom-input-username">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) =>  this.handleOnchangeUsername(event)}
                                />
                            </div>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? 'text':'password'}
                                    className="form-control"
                                    placeholder='Enter your password'
                                    value={this.state.passowrd}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                />
                                <span onClick={()=>{this.handleShowHidePassword()}}>
                                <i class={this.state.isShowPassword ? 'far fa-eye':'fas fa-eye-slash'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 form-group-login">
                            <button className='btn-login'onClick={()=>this.handleLogin()} >Login</button>
                        </div>
                        <div className="col-12 form-group-forget">
                            <span className='forget-password'>Forgot Your Password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-orther-login">Or Login with</span>
                        </div>
                        <div className="col-12 social-login">
                            <i class="fab fa-facebook-f facebook"></i>
                            <i class="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
