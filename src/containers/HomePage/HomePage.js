import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MeedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';

import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    render() {
        // const { isLoggedIn } = this.props;
        // let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';
        let settings =  {
            dots:false,
            infinite:true,
            speed:500,
            slidesToShow:4,
            slidesToScroll:1,

        };
        let settingsHandBook =  {
            dots:false,
            infinite:true,
            speed:500,
            slidesToShow:2,
            slidesToScroll:1,

        };

        return (
            <div>
                <HomeHeader />
                <Specialty settings= {settings}/>
                <OutstandingDoctor settings={settings}/>
                <MeedicalFacility settings={settings}/>
                <HandBook settings={settingsHandBook}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
