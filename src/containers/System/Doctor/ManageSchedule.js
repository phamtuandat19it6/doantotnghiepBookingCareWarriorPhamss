import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from '../../../services/userSevice';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import {dateFormat} from '../../../utils/constant';
import { saveBulkScheduleDoctor} from '../../../services/userSevice';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            currentDate:'',
            rangeTime: [],
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate = (prevProps,prevState)=> {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
           let data = this.props.allScheduleTime;
           if(data && data.length > 0){
            // data = data.map(item => {
            //     item.isSelected = false;
            //     return item;
            // })
            data = data.map(item => ({...item,isSelected:false}))
           }
            this.setState({
                rangeTime:data
            })
        }
    }
    buildDataInputSelect = (inputData) =>{
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 ){
            inputData.map((item,index) => {

                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = ` ${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return  result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor:selectedOption });

      };

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime:rangeTime
            })
        }
    }
    handleSaveSchedule= async()=>{
        let {rangeTime,selectedDoctor,currentDate} =this.state;
        let result =[];
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid select doctor!')
            return;
        }
        if(!currentDate){
            toast.error('Invalid Date!');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0 ){
            let selectedTime = rangeTime.filter(item=>item.isSelected===true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }else{
                toast.error('Invalid selected time!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule:result,
            doctorId:selectedDoctor.value,
            formatedDate:formatedDate,

        })
        if(res && res.errCode === 0){
            toast.success('Create Schedule Succeed!');
        }else{
            toast.error('Error save bulk Schedule Doctor error!');
            console.log('Save bulk Schedule Doctor error',res)
        }
        console.log('check res:saveBulkScheduleDoctor',res)
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate:date[0]
        })
    }

    render() {
        let {rangeTime } = this.state;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id = "manage-schedule.title"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id = "manage-schedule.choose-doctor"/>
                            </label>
                            <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                        </div>
                        <div className="col-5 form-group">
                            <label htmlFor=""><FormattedMessage id = "manage-schedule.choose-date"/></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className = "form-control"
                                value= {this.state.currentDate}
                                minDate ={yesterday}
                                />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-11 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item,index)=>{
                                    return(
                                        <button
                                            className={item.isSelected===true
                                                ? 'btn btn-schedule  px-3 active'
                                                :'btn btn-schedule  px-3'}
                                            key = {index}
                                            onClick={()=>this.handleClickBtnTime(item)}
                                        >
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button
                            className='btn btn-primary btn-save-schedule px-3 '
                            onClick={()=> this.handleSaveSchedule()}
                            >
                                <FormattedMessage id = "manage-schedule.save"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux:() => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime:() => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
