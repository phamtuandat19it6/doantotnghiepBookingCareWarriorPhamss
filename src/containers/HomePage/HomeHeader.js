import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss'
import chuyenkhoa from '../../assets/iconkham-chuyen-khoa.png'
import xetnghiem from '../../assets/161340-iconxet-nghiem-y-hoc.png'
import suckhoetinhthan from '../../assets/161403-iconsuc-khoe-tinh-than.png'
import nhakhoa from '../../assets/161410-iconkham-nha-khoa.png'
import khamtuxa from '../../assets/161817-iconkham-tu-xa.png'
import tongquat from '../../assets/iconkham-tong-quan.png'

class HomeHeader extends Component {

    render() {
        console.log('check props:',this.props)

        // const { isLoggedIn } = this.props;
        // let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

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
                            <div><FormattedMessage id="homeheader.specialty"/></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><FormattedMessage id="homeheader.health-facility"/></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-room"/></div>
                        </div>
                        <div className='child-content'>
                            <div><FormattedMessage id="homeheader.doctor"/></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.select-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><FormattedMessage id="homeheader.fee"/></div>
                            <div className='subs-title'><FormattedMessage id="homeheader.check-health"/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className="fas fa-question-circle"></i><FormattedMessage id="homeheader.support"/>
                        </div>
                        <div className="languge-vi">VN</div>
                        <div className="languge-en">EN</div>
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                <div className="content-up">
                    <div className='title1'> <FormattedMessage id="banner.title1"/></div>
                    <div className='title2'><FormattedMessage id="banner.title2"/></div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder='Tìm chuyên khoa khám bệnh'/>
                     </div>
                </div>
                <div className="content-down">
                    <div className='options'>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${chuyenkhoa})`}}></div>
                            <div className="text-child"><FormattedMessage id="banner.child1"/><br /><FormattedMessage id="banner.child-kham"/></div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${khamtuxa})`}}></div>
                             <div className="text-child"><FormattedMessage id="banner.child2"/><br /><FormattedMessage id="banner.child-kham"/></div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${tongquat})`}}></div>
                             <div className="text-child"><FormattedMessage id="banner.child3"/><br /> <FormattedMessage id="banner.child-kham"/></div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${xetnghiem})`}}></div>
                             <div className="text-child"><FormattedMessage id="banner.child4"/> <br /><FormattedMessage id="banner.child-xetnghiem"/></div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${suckhoetinhthan})`}}></div>
                             <div className="text-child"> <FormattedMessage id="banner.child5"/><br /><FormattedMessage id="banner.child-health"/></div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child" style={{backgroundImage: `url(${nhakhoa})`}}></div>
                             <div className="text-child"> <FormattedMessage id="banner.child6"/><br /><FormattedMessage id="banner.child-kham"/></div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
