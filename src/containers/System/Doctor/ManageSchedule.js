import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from '../../../services/userSevice';
import DatePicker from '../../../components/Input/DatePicker';
import monent from 'moment';
class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            listDoctors:[],
            selectedDoctor:{},
            currentDate:'',
            rangeTime: []
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
            this.setState({
                rangeTime:this.props.allScheduleTime
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


    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate:date[0]
        })
    }

    render() {
        console.log('hoi dan it check state:',this.state)
        let {rangeTime } = this.state;
        let {language} = this.props;
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
                                minDate ={new Date()}
                                />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-11 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item,index)=>{
                                    return(
                                        <button className='btn btn-schedule btn-save-schedule px-3  ' key = {index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn }
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button className='btn btn-primary px-2 my-4' >
                                <FormattedMessage id = "manage-schedule.choose-date"/>
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
