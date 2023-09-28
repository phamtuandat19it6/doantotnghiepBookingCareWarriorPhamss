import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userSevice';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })


    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('loging succeeds');
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
             }
        }
    }

    handleShowHidePassword = () => {

        this.setState({
            showPassword: !this.state.showPassword
        })
        console.log(this.state.showPassword);
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
                                    onChange={(e) => this.handleOnChangeUserName(e)}
                                />
                            </div>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.showPassword    ? 'text':'password'}
                                    className="form-control"
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                />
                               <span onClick={() => this.handleShowHidePassword()}>
                                <i class={this.state.showPassword  ? 'far fa-eye':'fas fa-eye-slash'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 form-group-login">
                            <button className='btn-login'
                              onClick={() => this.handleLogin()}
                            >Login</button>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfor)=> dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
