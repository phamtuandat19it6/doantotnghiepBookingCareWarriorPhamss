import React, { Component } from 'react';
import {    FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from "../../../services/userSevice";
import { LANGUAGES } from '../../../utils/constant';
import * as actions from "../../../store/actions"
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr:[]
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
    //     try {
    //         let res = await getAllCodeService('gender')
    //         if(res && res.errCode == 0){
    //             this.setState({
    //                 genderArr: res.data
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        //render => didupdate
        // hiện tại (this)  và quá khứ(previous)
        //[]    [3]
        //[3] [3]
        if(this.props.genderRedux  !== prevProps.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('check prop from redux:', this.props.genderRedux)
        return (
            <div className='user-redux-container'>
                <div className="title">
                    User Redux with Warrior Pham
                </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>

                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email"/></label>
                                    <input type="email" className="form-control"  placeholder="Email"/>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password"/></label>
                                    <input type="password" className="form-control"  placeholder="Password"/>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.first-name"/></label>
                                    <input type="email" className="form-control"  placeholder="FirstName"/>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.last-name"/></label>
                                    <input type="text" className="form-control"  placeholder="LastName"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.phone-number"/></label>
                                    <input type="number" className="form-control"  placeholder="Phone"/>
                                </div>
                                <div className="form-group col-md-9">
                                    <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address"/></label>
                                    <input type="text" className="form-control"  placeholder="1234 Main St"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.gender"/></label>
                                    <select  className="form-control" >
                                        {genders && genders.length > 0 &&
                                        genders.map((item,index)=> {
                                            return(
                                                    <option key={index} >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                 )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.role"/></label>
                                    <select  className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.position"/></label>
                                    <select  className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.image"/></label>
                                    <input type="text"  className="form-control" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 px-3"><FormattedMessage id="manage-user.save"/></button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) =>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
