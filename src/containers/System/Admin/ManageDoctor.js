import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import {toast} from "react-toastify"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:null,
            description:'',
            listDoctors:[]

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

            this.props.saveInforDortor({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId:this.state.selectedDoctor.value

            })

    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor.value)
        );
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
        console.log('hoidanitChanel:',this.state)
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
                            onChange={this.handleChange}
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
                    />
                </div>
                <button
                    onClick={()=>this.handleSaveContentMarkdown()}
                    className='save-content-doctor ml-5'>
                    Lưu thông tin
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
