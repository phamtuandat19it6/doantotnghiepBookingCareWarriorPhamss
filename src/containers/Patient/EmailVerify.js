import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Header from "../Header/Header";
import './EmailVerify.scss'
import HomeHeader from "../HomePage/HomeHeader";
import {postVerifyBookingAppointment} from '../../services/userSevice'
class EmailVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify:false,
            errCode:0
        };
  }
async componentDidMount() {
    if (this.props.location && this.props.location.search) {
        const urlParams = new URLSearchParams(this.props.location.search)
        const token = urlParams.get('token')
        const doctorId = urlParams.get('doctorId')
        let res = await postVerifyBookingAppointment({
            token:token,
            doctorId:doctorId
        })
        if (res && res.errCode===0) {
            this.setState({
                statusVerify:true,
                errCode:res.errCode
            })
        }else{
            this.setState({
                statusVerify:true,
                errCode: res && res.errCode ? res.errCode : -1
            })
        }
        console.log('check props:', token ,doctorId)
    }
}
async componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {

    }
};

  render() {
    let {statusVerify} = this.state
        return (
            <>
                <Header />
                <HomeHeader isShowBanner={false} />

                <div className="container">
                    {statusVerify === false
                    ?
                        <div>
                            Loading data...
                        </div>
                    :
                    <div>
                        {this.state.errCode === 0
                        ?
                        <div className="verify-annouce">
                            <span className="Verify-icon">
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </span>
                            <h3 className="verify-title">Verify Succeed !</h3>
                            <span className="verify-text" > You have successfully verify booking.</span>
                        </div>
                        :
                        <div className="verify-annouce">
                        <span className="Verify-icon">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </span>
                        <h3 className="verify-title">Verify Failed !</h3>
                        <span className="verify-text" > Appointment schedule already exists or has not been confirmed.</span>
                    </div>
                        }
                    </div>
                    }
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
