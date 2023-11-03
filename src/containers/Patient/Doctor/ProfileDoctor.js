import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import {getProfileDoctorById} from '../../../services/userSevice';
import { NumericFormat } from 'react-number-format';
import moment, { unix } from 'moment';
import lacalization from 'moment/locale/vi';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile:{}
        };
    }
    async componentDidMount() {
        let res = await this.getProfileDoctor(this.props.doctorId)
        console.log('res',res)
        this.setState({
            dataProfile:res
        })

    }
    async componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language){

        }
    };
    getProfileDoctor =async (id)=>{
        let result = {}
        if(id){
          let  res = await getProfileDoctorById(id)
          if(res && res.errCode===0){
            result = res.data;
          }
        }
        return result
    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let {language,isShowDescription,dataTime} = this.props
        let {dataProfile} = this.state
        let nameVi = "",
            nameEn = "",
            lableTime ='',
            lableDate ='';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${' '}${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn},${' '}${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        if(dataTime){
            lableTime = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi: dataTime.timeTypeData.valueEn
            lableDate= language === LANGUAGES.VI
                ? unix(new Date(+dataTime.date/1000)).format('dddd - DD/MM/YYYY')

                : unix(new Date(+dataTime.date/1000)).locale('en').format('ddd - DD/MM/YYYY');

        }
            return (
                <div className="profile-doctor-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : "" })`
                            }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="down">
                                    {dataProfile &&
                                    dataProfile.Markdown &&
                                    dataProfile.Markdown.description &&
                                    isShowDescription === true && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                    <div>{lableTime} {this.capitalizeFirstLetter(lableDate)}</div>
                                    <div>Miễn phí đặt lịch</div>
                            </div>
                        </div>
                    </div>
                    <div className="pice">
                        <span className="text-price">
                            <FormattedMessage id ="patient.extra-infor-doctor.text-price"/>
                        </span>
                    {dataProfile && dataProfile.Doctor_Infor &&
                        <span className="booking-price">
                            <NumericFormat
                                className="numberic"
                                value={language === LANGUAGES.VI ? dataProfile.Doctor_Infor.priceData.valueVi :dataProfile.Doctor_Infor.priceData.valueEn}
                                suffix=""
                                thousandSeparator=","
                                displayType="text"
                            />
                            {language === LANGUAGES.VI ? 'VND' : ` $ ` }
                        </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
