import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorInforExtra.scss";
import { LANGUAGES } from "../../../utils";
import {getScheduleDoctorByDate} from '../../../services/userSevice';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowDetail:false
    };
  }
  async componentDidMount() {
    let {language} = this.props;

  }
  async componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language){

    }
    if(prevProps.doctorIdFromParent !== this.props.doctorIdFromParent){

    }
  };




showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}
  render() {
    let {language} = this.props
    let {isShowDetail} = this.state
        return (
            <div className="doctor-infor-extra-container">
                <div className="content-up">
                    <div className="text-address">Địa chỉ khám</div>
                    <div className="name-clinic">Phòng Khám chuyên Khoa da liễu</div>
                    <div className="name-address">259 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetail===false &&
                    <>
                    <div>
                       <span className="text-price">Giá khám:</span>
                        <span className="booking-price">250.000<sup>đ</sup></span>.
                       <span className="see-more"
                       onClick={()=>this.showHideDetailPrice(true)}
                       >
                        Xem chi tiết
                        </span>
                    </div>
                    </>
                    }
                    {isShowDetail === true &&
                    <>
                    <div className="bookingcare-price" >Giá Khám: .</div>
                    <div className="price-note" >
                        <div className="price-detail row">
                            <span>Giá khám</span>
                            <span className="booking-price">250.000<sup>đ</sup></span>
                        </div>
                        <div>
                        Được ưu tiên khi đặt qua BookingCare. Giá khám cho người nước ngoài là 30 USD
                        </div>
                    </div>
                    <div className="note" >
                        Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                    </div>
                    <span className="hide-price"
                     onClick={()=>this.showHideDetailPrice(false)}
                    >
                    Ẩn bảng giá
                    </span>
                    </>
                    }


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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
