import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES, } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomePage from '../HomePage';
import { withRouter } from 'react-router';
class OutstandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors:[]
        }
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor =(doctor)=>{
       this.props.history.push(`/detail-doctor/${doctor.id}`)
        console.log('hoidanit channel view infor:',doctor)

    }
    render() {
        let { language } = this.props;
        let allDoctors = this.state.arrDoctors;
        return (
                <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={"homepage.outstanding-doctor"}/></span>
                        <button className='btn-section'><FormattedMessage id={'homepage.more-info'}/></button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>

                        {allDoctors && allDoctors.length > 0 &&
                        allDoctors.map((item,index)=>{
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = new Buffer(item.image,'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.valueVi}. ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.valueEn}. ${item.firstName} ${item.lastName}`
                            return(
                                <div className='section-customize section-outstanding-doctor' key={index} onClick={()=> this.handleViewDetailDoctor(item)}>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor"
                                            style={{backgroundImage:`url(${imageBase64})`}}
                                        ></div>
                                    </div>
                                    <div className='text-content'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                    <div className='text-content'>Nam học</div>
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
        language:state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors:() => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
