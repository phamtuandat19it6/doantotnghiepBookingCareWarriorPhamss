import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import {createNewSpecialty} from '../../../services/userSevice';
import {toast} from "react-toastify"
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imageBase64:'',
            descriptionHTML:'',
            descriptionMarkdown:''
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
handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if(file){
        let base64 = await CommonUtils.getBase64(file);
        // let objectUrl = URL.createObjectURL(file)
        this.setState({
            // previewImgUrl:objectUrl,
            imageBase64:base64
        })
    }
}
handleNewSaveSpecialty = async() =>{
    let res = await createNewSpecialty(this.state);
    if(res && res.errCode === 0){
        toast.success('Add new specialty succeed!')
    }else{
        toast.error('Add new specialty Failed!')
        console.log('check res:',res)
    }
}
  render() {
    let {language} = this.props
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label >Tên chuyên khoa</label>
                        <input className="form-control" type="text" value={this.state.name}
                                onChange={(event)=>this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Ảnh chuyên khoa</label>
                        <input className="form-control-file" type="file"
                            onChange={(event)=>this.handleOnchangeImage(event)}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            className='col-12'
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty "
                                onClick={()=>this.handleNewSaveSpecialty()}
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
