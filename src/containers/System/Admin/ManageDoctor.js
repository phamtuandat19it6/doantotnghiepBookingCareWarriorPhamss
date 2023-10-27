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
            console.log('alldoctor',this.props.allDoctors)
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.allRequiredData !== this.props.allRequiredData){
            let {resPrice,resPayment,resProvince} = this.props.allRequiredData
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            console.log("check list:",dataSelectPrice,dataSelectPayment,dataSelectProvince)
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
            inputData.map((item,index) => {

                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USERS' ? ` ${item.firstName} ${item.lastName}` : item.valueEn
                object.label = language === LANGUAGES.VI ? labelVi:labelEn;
                object.value = item.id;
                result.push(object)
            })
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT :CRUD_ACTIONS.CREATE

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
        console.log(`Option selected:`, res)
      };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container col-12'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id = "admin.manage-doctor.title"/>
                </div>
                <div className='more-infor col-12 row'>
                    <div className="content-left form-group col-4">
                        <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.select-doctor"/></label>
                        <Select
                             placeholder  = "Chọn bác sĩ"
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className=" content-right form-group col-6">
                        <label htmlFor=""><FormattedMessage id = "admin.manage-doctor.introduce"/></label>
                        <textarea className='form-control' rows="3"
                            onChange = {(event)=>this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>


                </div>
                <div className="col-10 more-infor-extra row">
                        <div className="col-4 form-group">
                            <label htmlFor="">Chọn giá:</label>
                            <Select
                             placeholder  = "Chọn giá"
                            value={this.state.selectPrice}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Phương thức thanh toán:</label>
                            <Select
                             placeholder  = "Phương thức thanh toán"
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Chọn tỉnh thành:</label>
                            <Select
                             placeholder  = "Chọn tỉnh thành"
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Tên phòng khám:</label>
                            <input type="text" className='form-control' />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Địa chỉ phòng khám:</label>
                            <input type="text" className='form-control' />
                        </div>
                        <div className="col-4 form-group">
                            <label htmlFor="">Ghi chú:</label>
                            <input type="text" className='form-control' />
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
