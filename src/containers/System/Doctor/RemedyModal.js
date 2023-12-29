import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { LANGUAGES,CommonUtils } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import {  Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import {toast} from "react-toastify"
import { ToastContainer } from 'react-toastify';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            imgBase64:''
        };
    }
    async componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email:this.props.dataModal.email
            })
        }
    }
    async componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email:this.props.dataModal.email
            })
        }
    }
handleOnChangeEmail = (event) =>{
    this.setState({
        email:event.target.value
    })
}
handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if(file){
        let base64 = await CommonUtils.getBase64(file);
        this.setState({
            imgBase64:base64
        })
    }
}
handleSendRemedy=()=>{
    this.props.sendRemedy(this.state)
}
  render() {
    let {isOpenModal,closeRemedyModal,sendRemedy,dataModal} = this.props
    return (
            <Modal
                isOpen={isOpenModal}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="modal-header-title">Gửi Đơn Thuốc Khám Bệnh</span>
                        <span onClick={closeRemedyModal}><i className="fa fa-times" aria-hidden="true"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email Bệnh Nhân:</label>
                                <input type="email" className="form-control" value={this.state.email}
                                    onChange={(event)=>this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn File Đơn Thuốc:</label>
                                <input type="file" className="form-control-file"
                                    onChange={(event)=>this.handleOnchangeImage(event)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button onClick={()=>this.handleSendRemedy()} className="btn-confirm">Gửi</button>
                        <button onClick={closeRemedyModal} className="btn-cancle">Hủy</button>
                    </div>
                </div>
        </Modal>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
