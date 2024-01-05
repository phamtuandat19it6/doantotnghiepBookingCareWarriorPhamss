import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHandbook.scss";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewHandbook, getDetailHandbookById } from '../../../services/userSevice';
import { toast } from "react-toastify"
import * as actions from "../../../store/actions";
import _ from "lodash";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            hasOldData: false,
            handbookId: '',
            listHandbook: [],
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        this.props.getAllRequredDoctorInfor()
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {
            let { resHandbook } = this.props.allRequiredData
            let dataSelectHandbook = this.buildDataInputSelect(resHandbook, 'HANDBOOK')
            this.setState({
                listHandbook: dataSelectHandbook
            })
        }
        if (prevProps.allRequiredData !== this.props.allRequiredData) {
            let { resHandbook } = this.props.allRequiredData
            let dataSelectHandbook = this.buildDataInputSelect(resHandbook, 'HANDBOOK')
            this.setState({
                listHandbook: dataSelectHandbook
            })
        }
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'HANDBOOK') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnchangeImage = async (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = await CommonUtils.getBase64(event.target.files[0]);
        // let objectUrl = URL.createObjectURL(file)
        this.setState({
            // previewImgUrl:objectUrl,
            ...copyState
        })
    }
    handleOnchangeSelect = async (event) => {

        let id = event.target.value
        let res = await getDetailHandbookById({
            id: id,
        });
        if (res && res.errCode === 0) {
            this.setState({
                handbookId: id,
                name: res.data.name,
                imageBase64: res.data.image,
                descriptionHTML: res.data.descriptionHTML,
                descriptionMarkdown: res.data.descriptionMarkdown,
                address: res.data.address,
                hasOldData: true

            });
        } else {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                hasOldData: false
            })
        }
    }


    handleSaveNewHandbook = async () => {
        let { hasOldData } = this.state;
        this.props.saveInforHandbook({
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            handbookId: this.state.handbookId,
        })
        this.setState({
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            handbookId: '',
            hasOldData: false
        })
    }
    handleDeleteHandbook = async (id) => {
        await this.props.deleteHandbook(id)
        console.log('id:', id)
    }
    render() {
        let { language } = this.props
        let { listHandbook, hasOldData } = this.state
        return (

            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý cẩm nang</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label >Tên cẩm nang</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label >Ảnh logo cẩm nang</label>
                        <div className='preview-img-container form-control'>
                            <input id='previewImg'
                                type="file"
                                hidden
                                onChange={(event) => this.handleOnchangeImage(event, 'imageBase64')}
                            />
                            <label className='label-upload' htmlFor="previewImg">
                                Tải ảnh <i className="fas fa-upload px-1"></i>
                            </label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.imageBase64})` }}
                            // onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className="select-doctor-province row col-6 form-group ">
                        <select className="form-control col-6 select-doctor-province ml-3"
                            onChange={(event) => this.handleOnchangeSelect(event)}
                        >
                            {listHandbook && listHandbook.length > 0
                                &&
                                listHandbook.map((item, index) => {
                                    return (
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
                                onClick={() => this.handleDeleteHandbook(this.state.handbookId)}
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
                            onClick={() => this.handleSaveNewHandbook()}
                            className={hasOldData === true ? 'save-content-doctor ml-4 px-3 py-2' : 'create-content-doctor ml-4 px-3 py-2 '}
                        >
                            {hasOldData === true
                                ?
                                <span> <FormattedMessage id="admin.manage-doctor.save" /></span>
                                :
                                <span> <FormattedMessage id="admin.manage-doctor.create" /></span>
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
        getAllRequredDoctorInfor: () => dispatch(actions.fetchAllRequiredDoctorInfor()),
        saveInforHandbook: (data) => dispatch(actions.saveInforHandbook(data)),
        deleteHandbook: (id) => dispatch(actions.deleteHandbook(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
