import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils/constant";
import { FormattedMessage } from 'react-intl';
import {  Modal } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from "../../../../store/actions";
import moment, { unix } from 'moment';
import lacalization from 'moment/locale/vi';
import {postPatientInfor} from '../../../../services/userSevice'
import {toast} from "react-toastify"
import { ToastContainer } from 'react-toastify';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDescription:false,
            fullName:'',
            phoneNumber:'',
            email:'',
            address:'',
            reason:'',
            date:'',
            genders:'',
            selectedGender:'',
            birthday:'',
            doctorId:'',
            timeType:''
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
            let doctorId = this.props.dataTime.doctorId;
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId:doctorId,
                timeType:timeType
            })
        }
    }
    async componentDidUpdate (prevProps, prevState, snapshot) {
        if(this.props.language  !== prevProps.language){
            this.setState({
                genders:this.buildDataInputSelect(this.props.genders)
            })
        }
        if(this.props.genders  !== prevProps.genders){
            this.setState({
                genders:this.buildDataInputSelect(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId:doctorId,
                    timeType:timeType
                })
            }
        }
    };
    buildDataInputSelect = (data) =>{
        let result = [];
        let {language} = this.props;
        if(data && data.length > 0){
             data.map((item,index) => {
                let object = {};
                let labelVi =  `${item.valueVi} `
                let labelEn =  `${item.valueEn} `
                object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return  result;
    }
    showHideDetailPrice= (status)=>{
        this.setState({
            isShowDetail:status
        })
    }
    handleOnchangeInput = (event,id) =>{
        let valueInput = event.target.value
        let copyState = {...this.state}
        copyState[id] = valueInput
        this.setState({
            ...copyState
        })

    }
    handleOnchangeDatePicker = (date) =>{
        this.setState({
            birthday: date[0],
            date:new Date(this.state.birthday).getTime()
        })
    }
    handleChangeSelect=(selectedGender)=>{
        this.setState({
            selectedGender:selectedGender
        })
    }
    handleConfirmBooking = async () =>{
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientInfor({
            fullName:this.state.fullName,
            phoneNumber:this.state.phoneNumber,
            email:this.state.email,
            address:this.state.address,
            reason:this.state.reason,
            date:date,
            selectedGender:this.state.selectedGender.value,
            doctorId:this.state.doctorId,
            timeType: this.state.timeType,
            language:this.props.language,
            timeString:timeString,
            doctorName:doctorName

        })
        if(res && res.errCode===0){
            toast.success('Booking a new appointment succeed!')
            this.props.handleClick()
        }else{
            toast.error('Booking a new appointment error')
        }
    }
    buildTimeBooking =(dataTime)=>{
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.valueVi: dataTime.timeTypeData.valueEn;

            let date = language ===LANGUAGES.VI ?
            unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            : unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`

        }
        return ''
    }
    buildDoctorName = (dataTime) =>{
        let { language } = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGES.VI
            ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }
  render() {
    let {showModal,handleClick,dataTime} = this.props
    let {isShowDescription} = this.state
    let doctorId = ''
    if(dataTime && !_.isEmpty(dataTime)){
        doctorId = dataTime.doctorId
    }
    let {fullName,phoneNumber,email,address,reason,birthday,} = this.state
    console.log('dataTime:',dataTime)
    return (
            <Modal
                isOpen={showModal}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="modal-header-title"><FormattedMessage id="patient.booking-modal.title"/></span>
                        <span onClick={handleClick}><i className="fa fa-times" aria-hidden="true"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={isShowDescription}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.fullName"/></label>
                                <input type="text" className="form-control"
                                    value={fullName}
                                    onChange={(event)=>this.handleOnchangeInput(event,'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.phoneNumber"/></label>
                                <input type="text" className="form-control"
                                    value={phoneNumber}
                                    onChange={(event)=>this.handleOnchangeInput(event,'phoneNumber')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.email"/></label>
                                <input type="text" className="form-control"
                                    value={email}
                                    onChange={(event)=>this.handleOnchangeInput(event,'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.address"/></label>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(event)=>this.handleOnchangeInput(event,'address')}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.reason"/></label>
                                <input type="text" className="form-control"
                                    value={reason}
                                    onChange={(event)=>this.handleOnchangeInput(event,'reason')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                <DatePicker
                                    placeholder={ unix(new Date(+new Date() /1000)).format('DD/MM/YYYY')}
                                     onChange={this.handleOnchangeDatePicker}
                                     className = "form-control"
                                     value= {birthday}
                                     name="birthday"
                                />

                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="patient.booking-modal.gender"/></label>
                                <Select
                                    placeholder  = 'Giới tính'
                                    onChange={this.handleChangeSelect}
                                    value={this.state.selectedGender}
                                    options={this.state.genders}
                                    name="genders"
                                 />

                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button onClick={()=>this.handleConfirmBooking()} className="btn-confirm">Xác nhận</button>
                        <button onClick={handleClick} className="btn-cancle">Hủy</button>
                    </div>
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
