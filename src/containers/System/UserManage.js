import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userSevice'
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser:false,
        }
    }
    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
           isOpenModalUser:true,
       })
    }
    toggleUserModal = () => {
        this.setState({
           isOpenModalUser:!this.state.isOpenModalUser,
       })
    }
    /**Life cycle
     * Run component:
     * 1. Run construct -> init state
     * 2. Did mount( set state)
     * 3. Render
     */



    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    test={'avc'}
                />
                <div className="title text-center">Manage users with Warrior Pham</div>
                <div className='mx-1'>
                    <button className="btn btn-primary px-3"
                        onClick={()=>this.handleAddNewUser()}
                    ><i className="fas fa-plus px-1"></i> Add new users</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address </th>
                            <th>actions </th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit"><i className="fas fa-pencil-alt"></i> </button>
                                        <button className="btn-delete"><i className="fas fa-trash"></i> </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
