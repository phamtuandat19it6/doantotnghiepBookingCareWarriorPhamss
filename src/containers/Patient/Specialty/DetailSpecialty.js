import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader";
import Header from "../../Header/Header";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from "../Doctor/DoctorInforExtra";
import ProfileDoctor from "../Doctor/ProfileDoctor";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          arrDoctorId:[37,38,39]
        };
  }
async componentDidMount() {
    let {language} = this.props;
}
async componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language){

    }
};
showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}
  render() {
    let {language} = this.props
    let {arrDoctorId} = this.state
        return (
            <>
            <div className="detail-specialty-container">
                <Header/>
                <HomeHeader/>
                <div className="detail-specialty-body">
                    <div className="description-specialty"></div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item,index)=>{
                        return(
                        <div className="each-doctor" key={index}>
                            <div className="dt-content-left">
                                <div className="profile-doctor">
                                    <ProfileDoctor
                                        doctorId={item}
                                        isShowDescription={true}
                                        // dataTime={dataTime}
                                    />
                                </div>
                            </div>
                            <div className="dt-content-right">
                                <div  className="doctor-schedule">
                                    <DoctorSchedule
                                        doctorIdFromParent={item}
                                    />
                                </div>
                                <div className="doctor-extra-infor">
                                    <DoctorInforExtra
                                        doctorIdFromParent={item}
                                    />
                                </div>
                            </div>
                        </div>

                        )
                    })
                    }
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
