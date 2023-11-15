import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils/constant"
import {getAllSpecialty} from '../../../services/userSevice'
import Slider from 'react-slick';
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSpecialty:[]
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialty()
        if(res && res.errCode === 0){
            console.log('check res:',res)
            this.setState({
                dataSpecialty:res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty =(specialty)=>{
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }
    changLanguage =(language) =>{
        this.props.changeLanguageAppRedux(language)
    }
    render() {
    let {dataSpecialty} = this.state

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.specialty"/>
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-info"/>
                        </button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                        dataSpecialty.map((item,index)=>{
                            return (
                                <div className='section-customize' key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
                                    <div className="bg-image section-specialty"
                                        style={{backgroundImage:`url(${item.image})`}}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
