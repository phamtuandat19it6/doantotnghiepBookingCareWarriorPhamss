import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader";
import Header from "../../Header/Header";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from "../Doctor/DoctorInforExtra";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getDetailClinicById,getAllCodeService,} from '../../../services/userSevice'
import _ from "lodash";
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShowDetail:false,
          arrDoctorId:[],
          dataDetailClinic:{},
        };
  }
async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id )
    {
        let id = this.props.match.params.id;
        let res = await getDetailClinicById({
            id:id,
        });

        if (res && res.errCode === 0 ) {
            let data = res.data
            let arrDoctorId = []
            if(data && !_.isEmpty(data)){
                let arr = data.doctorClinic
                if(arr && arr.length > 0){
                    arr.map((item) => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }

            this.setState({
                dataDetailClinic: res.data,
                arrDoctorId:arrDoctorId,
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

showHideDetailPrice= ()=>{
    this.setState({
        isShowDetail:!this.state.isShowDetail
    })
}
  render() {
    let {language} = this.props
    let {arrDoctorId,dataDetailClinic,isShowDetail} = this.state
    console.log('check response:',this.state)
        return (
            <>
            <div className="detail-clinic-container">
                <Header/>
                <HomeHeader/>
                <div className={isShowDetail===false ? 'description-clinic small ':'description-clinic large'}
                    style={{backgroundImage: `url(${ dataDetailClinic && dataDetailClinic.imageBackground ? dataDetailClinic.imageBackground : ""  })`}}
                >
                    <div className= {isShowDetail===false ? "descriptionHTML small  ":'descriptionHTML large'}>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <div  dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML}} >
                            </div>
                        }
                    </div>
                </div>
                <div className="doc-them">
                    <span className="see-more" onClick={()=>this.showHideDetailPrice()} >
                          {isShowDetail===false ?"Đọc thêm":"Ẩn Bớt"}
                    </span>
                </div>
                <div className="detail-clinic-body mt-2">
                    {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item,index)=>{
                        return(
                        <div className="each-doctor" key={index}>
                            <div className="dt-content-left">
                                <div className="profile-doctor">
                                    <ProfileDoctor
                                        doctorId={item}
                                        isShowDescription={true}
                                        isShowLinkDetail = {true}
                                        isShowPrice = {false}
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
