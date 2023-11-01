import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorInforExtra.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from 'react-intl';
class DoctorInforExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
  }
async componentDidMount() {
    let {language} = this.props;
}
async componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language){

    }
};
showHideDetailPrice= (status)=>{
    this.setState({
        isShowDetail:status
    })
}
  render() {
    let {language} = this.props
        return (
            <div> </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorInforExtra);
