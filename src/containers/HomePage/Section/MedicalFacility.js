import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class MeedicalFacility extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
                <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility "></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                            <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
                        </div>
                        <div className='section-customize'>
                           <div className="bg-image section-medical-facility"></div>
                            <div className='text-content'>Hệ thống thu cúc</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeedicalFacility);
