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
import {getDetailSpecialtyById,getAllCodeService,} from '../../../services/userSevice'
import _ from "lodash";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShowDetail:false,
          arrDoctorId:[],
          dataDetailSpecialty:{},
          listProvince:[],
          dataSpecialty:[]
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

        if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
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
            let dataProvince = resProvince.data
            if(dataProvince && dataProvince.length > 0){
                dataProvince.unshift({
                    createdAt:null,
                    keyMap:"ALL",
                    type:"PROVINCE",
                    valueEn:"ALL",
                    valueVi:"Toàn Quốc",
                })
            }
            this.setState({
                dataDetailSpecialty: res.data,
                arrDoctorId:arrDoctorId,
                listProvince:dataProvince ? dataProvince : []
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
handleOnchangeSelect = async(event)=>{
    if (this.props.match && this.props.match.params && this.props.match.params.id )
    {
        let id = this.props.match.params.id;
        let location = event.target.value
        let res = await getDetailSpecialtyById({
            id:id,
            location:location
        });
        let resProvince = await getAllCodeService('PROVINCE')

        if (res && res.errCode === 0 ) {
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
            let dataProvince = resProvince.data
            if(dataProvince && dataProvince.length > 0){
                dataProvince.unshift({
                    createdAt:null,
                    keyMap:"ALL",
                    type:"PROVINCE",
                    valueEn:"ALL",
                    valueVi:"Toàn Quốc",
                })
            }
            this.setState({
                dataDetailSpecialty: res.data,
                arrDoctorId:arrDoctorId,
            });
        }
    }
}
showHideDetailPrice= ()=>{
    this.setState({
        isShowDetail:!this.state.isShowDetail
    })
}
  render() {
    let {language} = this.props
    let {arrDoctorId,dataDetailSpecialty,listProvince,isShowDetail} = this.state
    console.log('check response:',this.state)
        return (
            <>
            <div className="detail-specialty-container">
                <Header/>
                <HomeHeader/>
                <div className={isShowDetail===false ? 'description-specialty small ':'description-specialty large'}
                    style={{backgroundImage: `url(${ dataDetailSpecialty && dataDetailSpecialty.image ? dataDetailSpecialty.image : ""  })`}}
                >
                    <div className= {isShowDetail===false ? "descriptionHTML small  ":'descriptionHTML large'}>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div  dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML}} >
                            </div>
                        }
                    </div>
                </div>
                <div className="doc-them">
                    <span className="see-more" onClick={()=>this.showHideDetailPrice()} >
                          {isShowDetail===false ?"Đọc thêm":"Ẩn Bớt"}
                    </span>
                </div>
                <div className="detail-specialty-body mt-2">

                    <div className="select-doctor-province ">
                        <select className="form-control col-1 select-doctor-province  "
                            onChange={(event)=>this.handleOnchangeSelect(event)}
                        >
                            {listProvince && listProvince.length > 0
                            &&
                            listProvince.map((item,index)=>{
                                return(
                                    <option className="select-doctor-province" key={index} value={item.keyMap}>
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
