import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES, } from '../../../utils';
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
    render() {
        let { language } = this.props;
        let allDoctors = this.state.arrDoctors;
            allDoctors = allDoctors.concat(allDoctors).concat(allDoctors)
        return (
                <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className="section-body">
                    <Slider {...this.props.settings}>

                        {allDoctors && allDoctors.length > 0 &&
                        allDoctors.map((item,index)=>{
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = new Buffer(item.image,'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                            return(
                                <div className='section-customize section-outstanding-doctor' key={index}>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
