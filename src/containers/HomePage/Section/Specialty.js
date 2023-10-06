import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils/constant"

import Slider from 'react-slick';


class Specialty extends Component {
    changLanguage =(language) =>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {


        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                            <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-specialty"></div>
                            <div className='text-content'>Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
