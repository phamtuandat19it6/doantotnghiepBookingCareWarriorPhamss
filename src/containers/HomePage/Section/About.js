import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import vtv1 from '../../../assets/about/vtv1.png'


class  About extends Component {
    changLanguage =(language) =>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {


        return (
            <div className='section-about'>
                <div className="section-about-content">
                    <div className="section-about-header">
                        Truyền thông nói về Booking Care
                    </div>
                    <div className="content-left">
                        <iframe width="100%" height="330"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <ul>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-suckhoedoisong'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vtv1' ></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-ictnews'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vnexpress'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vtcnews'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-cnntbyt'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-infonet'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vtv1'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vtcgo'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='truyenthong-bt truyenthong-vtv1'></i></a>
                            </li>

                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)( About);
