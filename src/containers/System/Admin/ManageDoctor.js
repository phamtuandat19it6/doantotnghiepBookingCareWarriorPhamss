import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {toast} from "react-toastify"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getDetailInforDoctor} from '../../../services/userSevice'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save doctor infor mardown
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:null,
            description:'',
            listDoctors:[],
            hasOldData:false,

            //sav doctor infor Tabel
            listPrice:[],
            listPayment:[],
            listProvince:[],
            selectPrice:'',
            selectPayment:'',
            selectProvince:'',
            nameClinic:'',
            addressClinic:'',
            note:''


        }
    }
    componentDidMount = () =>{
       this.props.fetchAllDoctorsRedux();
       this.props.getAllRequredDoctorInfor();
    }
    componentDidUpdate = (prevProps,prevState)=> {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.allRequiredData !== this.props.allRequiredData){
            let {resPrice,resPayment,resProvince} = this.props.allRequiredData
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE')
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors:dataSelect,
            })
        }
        if(prevProps.language !== this.props.language){
            let {resPrice,resPayment,resProvince} = this.props.allRequiredData
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE')
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince
            })
        }



    }
    buildDataInputSelect = (inputData,type) =>{
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0 ){
            if(type === 'USERS'){
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi =  `${item.lastName} ${item.firstName}`
                    let labelEn =  `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type === 'PRICE'){
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi =  `${item.valueVi} `
                    let labelEn =  `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi =  `${item.valueVi} `
                    let labelEn =  `${item.valueEn} `
                    object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }
        return  result;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
    }

    handleSaveContentMarkdown = () =>{
        let {hasOldData} = this.state;
        this.props.saveInforDortor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId:this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT :CRUD_ACTIONS.CREATE,

            selectPrice:this.state.selectPrice.value,
            selectPayment:this.state.selectPayment.value,
            selectProvince:this.state.selectProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note

        })

    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown;
            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.description,
                hasOldData:true
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown:'',
                description: '',
                hasOldData:false
            })
        }
      };
    handleChangeSelectDoctorInfor = async (selectedOption , name) => {
        let stateName = name.name
        let copyState = {...this.state}
        copyState[stateName] = selectedOption
        console.log(selectedOption)
        this.setState({
            ...copyState
        })
    }
    handleOnChangeText = (event,nameId) => {
        let copyState = {...this.state}
            copyState[nameId] = event.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let {hasOldData,selectedDoctor,selectedOption} = this.state;
        let{language} = this.props;
        console.log('check state:', this.state)
        return (
            <div className='manage-doctor-container col-12'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id = "admin.manage-doctor.title"/>
                </div>
                <div className='more-infor col-12 row'>
                    <div className="content-left form-group col-4">
                        <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.select-doctor"/></label>
                        <Select
                            placeholder  = {<FormattedMessage id = "admin.manage-doctor.select-doctor"/>}
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className=" content-right form-group col-6">
                        <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.introduce"/></label>
                        <textarea className='form-control' rows="3"
                            onChange = {(event)=>this.handleOnChangeText(event, 'description' )}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="col-10 more-infor-extra row">
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.price"/></label>
                            <Select
                            placeholder  = {<FormattedMessage id = "admin.manage-doctor.price"/>}
                            value={selectedOption}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            name="selectPrice"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.payment"/></label>
                            <Select
                            placeholder  = {<FormattedMessage id = "admin.manage-doctor.payment"/>}
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            name="selectPayment"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.province"/></label>
                            <Select
                            placeholder  = {<FormattedMessage id = "admin.manage-doctor.province"/>}
                            value={selectedOption}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            name="selectProvince"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.nameClinic"/></label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder = {language===LANGUAGES.VI ? "Tên phòng khám": " Name's clinic" }
                                onChange = {(event)=>this.handleOnChangeText(event, 'nameClinic' )}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.addressClinic"/></label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder = {language===LANGUAGES.VI ? "Địa chỉ phòng khám": " Address's clinic" }
                                onChange = {(event)=>this.handleOnChangeText(event, 'addressClinic' )}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.note"/></label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder = {language===LANGUAGES.VI ? "Ghi chú": "Note" }
                                onChange = {(event)=>this.handleOnChangeText(event, 'note' )}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        className='col-11'
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={()=>this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor ml-5 px-3 py-1':'create-content-doctor ml-5 px-3 py-1'}>
                    {hasOldData === true
                        ?
                            <span> <FormattedMessage id = "admin.manage-doctor.save"/> </span>
                        :
                            <span> <FormattedMessage id = "admin.manage-doctor.create"/></span>
                    }
                </button>
             </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors:state.admin.allDoctors,
        allRequiredData: state.admin.allRequiredData,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux:() => dispatch(actions.fetchAllDoctors()),
        getAllRequredDoctorInfor:() => dispatch(actions.fetchAllRequiredDoctorInfor()),
        saveInforDortor:(data) => dispatch(actions.saveInforDortor(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
