import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils/constant";
import { FormattedMessage } from 'react-intl';
import {  Modal } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDescription:false
        };
  }
async componentDidMount() {
    let {language} = this.props;
}
async componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.showModal !== this.props.showModal){
        this.setState({
            showModal:this.props.showModal
        })
    }
};
showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}

  render() {
    let {language,showModal,handleClick,dataTime} = this.props
    let {isShowDescription} = this.state
    let doctorId = ''
    if(dataTime && !_.isEmpty(dataTime)){
        doctorId = dataTime.doctorId
    }
    console.log('doctorId:',doctorId)
        return (
            <Modal
            isOpen={showModal}
            size="lg"
            centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="modal-header-title">Thông tin đặt lịch khám bệnh</span>
                        <span onClick={handleClick}><i className="fa fa-times" aria-hidden="true"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor
                            doctorId={doctorId}
                            isShowDescription={isShowDescription}
                            dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="">Họ tên</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Số điện thoại</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Địa chỉ Email</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Địa chỉ Liên Hệ</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="">Lý do khám</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Đặt cho ai</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="">Giới tính</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button onClick={handleClick} className="btn-confirm">Xác nhận</button>
                        <button onClick={handleClick} className="btn-cancle">Hủy</button>
                    </div>
                </div>
            </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
