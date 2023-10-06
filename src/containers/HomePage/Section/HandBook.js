import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils/constant"

import Slider from 'react-slick';


class HandBook extends Component {
    changLanguage =(language) =>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {


        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nan</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                            <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                           <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                           <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                           <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                            <div className="bg-image section-handbook"></div>
                            <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                           <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                        <div className='section-customize section-handbook'>
                           <div className="bg-image section-handbook"></div>
                           <div className='text-content'>7 địa chỉ khám tốt nhất thành phố HCM ( phần 2 )</div>
                        </div>
                    </Slider>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
