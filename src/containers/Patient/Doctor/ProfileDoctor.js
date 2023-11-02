import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import {getProfileDoctorById} from '../../../services/userSevice';
import { NumericFormat } from 'react-number-format';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile:{}
        };
    }
    async componentDidMount() {
        let {language} = this.props;
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

    render() {
        let {language} = this.props
        let {dataProfile} = this.state
        let nameVi = "",
            nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
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
                                {dataProfile && dataProfile.Markdown &&  dataProfile.Markdown.description && (
                                    <span>{dataProfile.Markdown.description}</span>
                                )}
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
