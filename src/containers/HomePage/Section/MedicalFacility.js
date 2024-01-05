import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './MedicalFacility.scss'
import { getAllclinic } from '../../../services/userSevice';
import { withRouter } from 'react-router';
class MeedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllclinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        const { isLoggedIn } = this.props;
        let { dataClinic } = this.state
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body  section-medical-facility">
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0
                                &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customizes section-medical-facility' key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className="bg-images section-medical-facility"
                                                style={{
                                                    backgroundImage: `url(${item.image})`
                                                }}
                                            >
                                            </div>
                                            <div className='text-content'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MeedicalFacility));
