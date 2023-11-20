import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { CRUD_ACTIONS, LANGUAGES,CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {createNewClinic,getDetailClinicById} from '../../../services/userSevice';
import {toast} from "react-toastify"
import * as actions from "../../../store/actions";
import _ from "lodash";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imageBase64:'',
            imageBackground:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
            address:'',
            hasOldData:false,
            clinicId:'',

            listClinic:[],
        };
    }
async componentDidMount() {
    let {language} = this.props;
    this.props.getAllRequredDoctorInfor()
}
async componentDidUpdate (prevProps, prevState, snapshot) {

    if(prevProps.language !== this.props.language){
        let {resClinic} = this.props.allRequiredData
        let dataSelectClinic = this.buildDataInputSelect(resClinic,'CLINIC')
        this.setState({
            listClinic:dataSelectClinic
        })
    }
    if(prevProps.allRequiredData !== this.props.allRequiredData){
        let {resClinic} = this.props.allRequiredData
        let dataSelectClinic = this.buildDataInputSelect(resClinic,'CLINIC')
        this.setState({
            listClinic:dataSelectClinic
        })
    }
};
buildDataInputSelect = (inputData,type) =>{
    let result = [];
    if(inputData && inputData.length > 0 ){
        if( type === 'CLINIC'){
            inputData.map((item,index) => {
                let object = {};
                object.label = item.name
                object.value = item.id;
                result.push(object)
            })
        }
    }
    return  result;
}
showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}
handleOnChangeInput=(event,id)=>{
    let copyState = {...this.state}
    copyState[id] = event.target.value
    this.setState({
        ...copyState
    })
}
handleEditorChange = ({ html, text }) => {
    this.setState({
        descriptionHTML:html,
        descriptionMarkdown:text
    })
}
handleOnchangeImage = async (event,id) => {
    let copyState = {...this.state}
    copyState[id] = await CommonUtils.getBase64(event.target.files[0]);
        // let objectUrl = URL.createObjectURL(file)
    this.setState({
        // previewImgUrl:objectUrl,
        ...copyState
    })
}
handleOnchangeSelect = async(event)=>{

    let id = event.target.value
    let res = await getDetailClinicById({
        id:id,
    });
    if (res && res.errCode === 0 ) {
        this.setState({
            clinicId:id,
            name:res.data.name,
            imageBase64:res.data.image,
            imageBackground:res.data.imageBackground,
            descriptionHTML:res.data.descriptionHTML,
            descriptionMarkdown:res.data.descriptionMarkdown,
            address:res.data.address,
            hasOldData:true

        });
    }else{
        this.setState({
            name:'',
            imageBase64:'',
            imageBackground:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
            address:'',
            hasOldData:false
        })
    }
}


handleSaveNewClinic = async() =>{
    let {hasOldData} = this.state;
    this.props.saveInforClinic({
        name:this.state.name,
        imageBase64:this.state.imageBase64,
        imageBackground:this.state.imageBackground,
        descriptionHTML:this.state.descriptionHTML,
        descriptionMarkdown:this.state.descriptionMarkdown,
        address:this.state.address,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT :CRUD_ACTIONS.CREATE,
        clinicId:this.state.clinicId,
    })
    this.setState({
        name:'',
        imageBase64:'',
        imageBackground:'',
        descriptionHTML:'',
        descriptionMarkdown:'',
        address:'',
        clinicId:'',
        hasOldData:false
    })
}
handleDeleteClinic= async(id) => {
   await this.props.deleteClinic(id)
    console.log('id:',id)
}
  render() {
    let {language} = this.props
    let {listClinic,hasOldData} = this.state
        return (

            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label >Tên phòng khám</label>
                        <input className="form-control" type="text" value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Ảnh logo Phòng khám</label>
                        <div className='preview-img-container form-control'>
                            <input id='previewImg'
                                    type="file"
                                    hidden
                                    onChange={(event)=> this.handleOnchangeImage(event,'imageBase64')}
                            />
                            <label className='label-upload' htmlFor="previewImg">
                                Tải ảnh <i className="fas fa-upload px-1"></i>
                            </label>
                            <div className='preview-image'
                                style={{backgroundImage:`url(${this.state.imageBase64})`}}
                                // onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className="col-6 form-group">
                        <label >Địa chỉ phòng khám</label>
                        <input className="form-control" type="text" value={this.state.address}
                                onChange={(event)=>this.handleOnChangeInput(event,'address')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Ảnh nền Phòng khám</label>
                        <div className='preview-img-container form-control'>
                            <input id='previewImgs'
                                    type="file"
                                    hidden
                                    onChange={(event)=> this.handleOnchangeImage(event,'imageBackground')}
                            />
                            <label className='label-upload' htmlFor="previewImgs">
                                Tải ảnh <i className="fas fa-upload px-1"></i>
                            </label>
                            <div className='preview-image'
                                style={{backgroundImage:`url(${this.state.imageBackground})`}}
                                // onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className="select-doctor-province row col-6 form-group ">
                        <select className="form-control col-6 select-doctor-province ml-3"
                            onChange={(event)=>this.handleOnchangeSelect(event)}
                            >
                            {listClinic && listClinic.length > 0
                                &&
                                listClinic.map((item,index)=>{
                                    return(
                                        <option className="select-doctor-province " key={index} value={item.value}
                                        >
                                        {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <div className="button-delete col-1 mt-2 ">
                            <button className="btn-delete "
                                onClick={()=>this.handleDeleteClinic(this.state.clinicId)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-12 form-group">
                        <MdEditor style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            className='col-12'
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            onClick={()=>this.handleSaveNewClinic()}
                            className={hasOldData === true ? 'save-content-doctor ml-4 px-3 py-2':'create-content-doctor ml-4 px-3 py-2 '}
                        >
                            {hasOldData === true
                        ?
                            <span> <FormattedMessage id = "admin.manage-doctor.save"/></span>
                        :
                            <span> <FormattedMessage id = "admin.manage-doctor.create"/></span>
                             }
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allRequiredData: state.admin.allRequiredData,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequredDoctorInfor:() => dispatch(actions.fetchAllRequiredDoctorInfor()),
    saveInforClinic:(data) => dispatch(actions.saveInforClinic(data)),
    deleteClinic:(id) => dispatch(actions.deleteClinic(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
