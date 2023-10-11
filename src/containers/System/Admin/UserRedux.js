import React, { Component } from 'react';
import {    FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from "../../../services/userSevice";
import { LANGUAGES } from '../../../utils/constant';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgUrl:'',
            isOpen: false,
            phone:''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

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
        if(this.props.roleRedux  !== prevProps.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if(this.props.positionRedux  !== prevProps.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){

            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl:objectUrl
            })
        }
    }
    handleOnChangePhoneInput = (value) => {
        this.setState({
        phone: value
        })
      };
    openPreviewImage  = ( ) =>{
        if(!this.state.previewImgUrl)return;
        this.setState({
            isOpen:true
        })
    }
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        console.log('check state component:', this.state)
        return (
            <div className='user-redux-container'>
                <div className="title">
                    User Redux with Warrior Pham
                </div>
                    <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>{isGetGenders === true ? 'Loading genders':''}</div>
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
                                    {/* <input type="number" className="form-control"  placeholder="Phone"/> */}
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Phone number"
                                        value={this.state.phone}
                                        onChange={this.handleOnChangePhoneInput}

                                        />
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
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.position"/></label>
                                    <select  className="form-control">
                                        {positions && positions.length > 0 &&
                                            positions.map((item,index)=>{
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
                                        {roles && roles.length > 0 &&
                                        roles.map((item,index)=>{
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
                                    <label htmlFor="inputAddress2"><FormattedMessage id="manage-user.image"/></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type="file" hidden onChange={(event)=> this.handleOnchangeImage(event)}/>
                                        <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fas fa-upload px-1"></i></label>
                                        <div className='preview-image'
                                            style={{backgroundImage:`url(${this.state.previewImgUrl})`}}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 px-3"><FormattedMessage id="manage-user.save"/></button>
                        </form>
                        </div>
                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(language) =>dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
