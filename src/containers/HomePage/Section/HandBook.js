import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils/constant"
import { withRouter } from 'react-router';
import { getAllHandbook } from '../../../services/userSevice';
import Slider from 'react-slick';


class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook()
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }
    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }
    changLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let { dataHandbook } = this.state

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataHandbook && dataHandbook.length > 0
                                &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='section-customize section-handbook' key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className="bg-image section-handbook"
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};



const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
