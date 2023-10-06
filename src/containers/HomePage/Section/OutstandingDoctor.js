import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class OutstandingDoctor extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
                <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
                        </div>
                        <div className='section-customize doctor'>
                            <div className='outer-bg'>
                                <div className="bg-image section-outstanding-doctor"></div>
                            </div>
                                 <div>Khám nam học, Bệnh viện Nam học và Hiếm Muộn Hà Nội</div>
                                 <div>Nam học</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
