import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import { LANGUAGES } from "../../../utils/constant"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

class Specialty extends Component {
    changLanguage =(language) =>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let settings =  {
            dots:false,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidesToScroll:1
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>2</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>3</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>4</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>5</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>6</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>7</h3>
                        </div>
                    </Slider>
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
