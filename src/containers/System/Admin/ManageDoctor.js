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
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:null,
            description:'',
            listDoctors:[],
            hasOldData:false

        }
    }
    componentDidMount = () =>{
       this.props.fetchAllDoctorsRedux()
    }
    componentDidUpdate = (prevProps,prevState)=> {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
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
    render() {
        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container col-12'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctors
                </div>
                <div className='more-infor col-12 row'>
                    <div className="content-left form-group col-4">
                        <label htmlFor="">Chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className=" content-right form-group col-6">
                        <label htmlFor="">Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange = {(event)=>this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
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
                    {hasOldData === true ?
                        <span> Lưu thông tin </span> : <span> Tạo thông tin</span>
                    }
                </button>
             </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors:state.admin.allDoctors
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux:() => dispatch(actions.fetchAllDoctors()),
        saveInforDortor:(data) => dispatch(actions.saveInforDortor(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
