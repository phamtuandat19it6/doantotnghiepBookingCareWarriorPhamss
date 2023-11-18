import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import {createNewClinic} from '../../../services/userSevice';
import {toast} from "react-toastify"
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
            address:''
        };
  }
async componentDidMount() {
    let {language} = this.props;
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

handleSaveNewClinic = async() =>{
    let res = await createNewClinic(this.state);
    if(res && res.errCode === 0){
        toast.success('Add new clinic succeed!')
        this.setState({
            name:'',
            address:'',
            imageBase64:'',
            imageBackground:'',
            descriptionHTML:'',
            descriptionMarkdown:'',

        })
    }else{
        toast.error('Add new clinic Failed!')
    }
}
  render() {
    let {language} = this.props
    console.log('state:',this.state)
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
                        <input className="form-control-file" type="file"
                            onChange={(event)=>this.handleOnchangeImage(event,'imageBase64')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Địa chỉ phòng khám</label>
                        <input className="form-control" type="text" value={this.state.address}
                                onChange={(event)=>this.handleOnChangeInput(event,'address')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Ảnh nền Phòng khám</label>
                        <input className="form-control-file" type="file"
                            onChange={(event)=>this.handleOnchangeImage(event,'imageBackground')}
                        />
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
                        <button className="btn-save-specialty "
                                onClick={()=>this.handleSaveNewClinic()}
                        >
                            Save
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
