import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
class HeaderSystem extends Component {
    handleChangeLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        const { processLogout } = this.props;
        let language = this.props.language
        return (
                    <div className="header-container">
                        {/* thanh navigator */}
                        <div className="header-tabs-container">
                            <Navigator menus={adminMenu} />
                        </div>

                        <div className='languages'>
                            <div className={language === LANGUAGES.VI ?'language-vi active': 'language-vi' }><span onClick={()=>
                                this.handleChangeLanguage(LANGUAGES.VI)}>VN</span><div className="flag"></div>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() =>
                                this.handleChangeLanguage(LANGUAGES.EN)}>EN</span><div className="flag"></div>
                            </div>

                                {/* nút logout */}
                            <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>

                        </div>
                    </div>

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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux:(language) =>dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSystem);
