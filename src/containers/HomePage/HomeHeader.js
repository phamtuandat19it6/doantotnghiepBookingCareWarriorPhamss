import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import chuyenkhoa from '../../assets/iconkham-chuyen-khoa.png'
import xetnghiem from '../../assets/161340-iconxet-nghiem-y-hoc.png'
import suckhoetinhthan from '../../assets/161403-iconsuc-khoe-tinh-than.png'
import nhakhoa from '../../assets/161410-iconkham-nha-khoa.png'
import khamtuxa from '../../assets/161817-iconkham-tu-xa.png'
import tongquat from '../../assets/iconkham-tong-quan.png'

class HomeHeader extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo'></div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b>Chuyên khoa</b></div>
                            <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='child-content'>
                            <div><b>cơ sở y tế</b></div>
                            <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Bác sĩ</b></div>
                            <div className='subs-title'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Gói khám</b></div>
                            <div className='subs-title'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                        <i className="fas fa-question-circle"> Hỗ trợ</i>
                        </div>
                        <div className="flag">VN</div>
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                <div className="content-up">
                    <div className='title1'>NỀN TẢNG Y TẾ</div>
                    <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder='Tìm chuyên khoa khám bệnh'/>
                     </div>
                </div>
                <div className="content-down">
                    <div className='options'>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${chuyenkhoa})`}}></div>
                            <div className="text-child">Khám <br /> chuyên khoa</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${khamtuxa})`}}></div>
                             <div className="text-child">Khám <br /> từ xa</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${tongquat})`}}></div>
                             <div className="text-child">Khám <br /> tổng quát</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${xetnghiem})`}}></div>
                             <div className="text-child">Xét nghiệm <br /> y học</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${suckhoetinhthan})`}}></div>
                             <div className="text-child">Sức khỏe <br /> tinh thần</div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${nhakhoa})`}}></div>
                             <div className="text-child">Khám <br /> nha khoa</div>
                        </div>
                    </div>
                </div>
            </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
