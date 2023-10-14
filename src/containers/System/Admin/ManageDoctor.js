import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor:'',
            description:''
        }
    }
    componentDidMount = () =>{

    }
    componentDidUpdate = (prevProps,prevState)=> {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
    }
    handleSaveContentMarkdown = () =>{
        console.log("hoidanit check state:",this.state)
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );
      };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
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
                            options={options}
                        />
                    </div>
                    <div className=" content-right form-group col-6">
                        <label htmlFor="">Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange = {(event)=>this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            fsdfa
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
        listUsers:state.admin.users
    };
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux:(id) => dispatch(actions.deleteAUser(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
