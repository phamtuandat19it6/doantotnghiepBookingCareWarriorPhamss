import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorInforExtra.scss";
import { LANGUAGES } from "../../../utils";
import {getExtraDoctorById} from '../../../services/userSevice';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
class DoctorInforExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowDetail:false,
        extraInfor:{}
    };
  }
  async componentDidMount() {
    let {language} = this.props;

  }
  async componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language){

    }
    if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){
      let res = await getExtraDoctorById(this.props.doctorIdFromParent)
      if(res && res.errCode === 0){
        this.setState({
          extraInfor:res.data
        })
      }
    }
  };




showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}
  render() {
    let {language} = this.props
    let {isShowDetail,extraInfor} = this.state


    console.log("this state:",this.state)
        return (
            <div className="doctor-infor-extra-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id ="patient.extra-infor-doctor.text-address"/>:</div>
                    <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : '' }</div>
                    <div className="name-address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : '' }</div>
                </div>
                <div className="content-down">
                    {isShowDetail===false &&
                    <>
                    <div>
                       <span className="text-price"><FormattedMessage id ="patient.extra-infor-doctor.price"/>:</span>
                       {extraInfor && extraInfor.priceData &&
                         <span className="booking-price">
                          <NumericFormat
                              className="numberic"
                              value={language === LANGUAGES.VI ? extraInfor.priceData.valueVi :extraInfor.priceData.valueEn}
                              suffix=""
                              thousandSeparator=","
                              displayType="text"
                            />
                           {language === LANGUAGES.VI ?<sup>đ </sup>: `$ ` }
                          </span>
                        }

                       <span className="see-more"
                       onClick={()=>this.showHideDetailPrice(true)}
                       >
                       <FormattedMessage id ="patient.extra-infor-doctor.detail"/>
                        </span>
                    </div>
                    </>
                    }
                    {isShowDetail === true &&
                    <>
                    <div className="bookingcare-price" ><FormattedMessage id ="patient.extra-infor-doctor.price"/>:</div>
                    <div className="price-note" >
                        <div className="price-detail row">
                            <span className="text-price" ><FormattedMessage id ="patient.extra-infor-doctor.price"/></span>
                            {extraInfor && extraInfor.priceData &&
                              <span className="booking-price">
                                <NumericFormat
                                    className="numberic"
                                    value={language === LANGUAGES.VI ? extraInfor.priceData.valueVi :extraInfor.priceData.valueEn}
                                    suffix=""
                                    thousandSeparator=","
                                    displayType="text"
                                  />
                                 {language === LANGUAGES.VI ?<sup>đ </sup>: `$ ` }
                                </span>
                            }
                        </div>
                        <div>
                        {extraInfor && extraInfor.note ? extraInfor.note : '' }
                        </div>
                    </div>

                    {extraInfor && extraInfor.paymentData &&
                    <div className="note" >
                   <FormattedMessage id ="patient.extra-infor-doctor.payment"/>
                    {language === LANGUAGES.VI ? extraInfor.paymentData.valueVi : extraInfor.paymentData.valueEn }
                    </div>
                    }

                    <span className="hide-price"
                     onClick={()=>this.showHideDetailPrice(false)}
                    >
                    <FormattedMessage id ="patient.extra-infor-doctor.hide-price"/>
                    </span>
                    </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInforExtra);
