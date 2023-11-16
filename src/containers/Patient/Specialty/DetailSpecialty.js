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
import {getDetailSpecialtyById,getAllCodeService} from '../../../services/userSevice'
import _ from "lodash";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          arrDoctorId:[],
          dataDetailSpecialty:{},
          listProvince:[]
        };
  }
async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id )
    {
        let id = this.props.match.params.id;

        let res = await getDetailSpecialtyById({
            id:id,
            location:'ALL'
        });
        let resProvince = await getAllCodeService('PROVINCE')

        if (res && res.errCode === 0 && resProvince && resProvince.errCode ===0) {
            let data = res.data
            let arrDoctorId = []
            if(data && !_.isEmpty(data)){
                let arr = data.doctorSpecialty
                if(arr && arr.length > 0){
                    arr.map((item) => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            this.setState({
                dataDetailSpecialty: res.data,
                arrDoctorId:arrDoctorId,
                listProvince:resProvince.data
            });
        }
    }
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
handleOnchangeSelect =(event)=>{
    console.log('check value:',event.target.value)
}

  render() {
    let {language} = this.props
    let {arrDoctorId,dataDetailSpecialty,listProvince} = this.state
    console.log('check response:',this.state)
        return (
            <>
            <div className="detail-specialty-container">
                <Header/>
                <HomeHeader/>
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div  dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML}} >
                            </div>
                        }
                    </div>
                    <div className="select-doctor-province">
                        <select className="form-control col-1 "
                                onChange={(event)=>this.handleOnchangeSelect(event)}
                        >
                            <option value="ALL">Toàn quốc</option>
                            {listProvince && listProvince.length > 0
                            &&
                            listProvince.map((item,index)=>{
                                return(
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
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
