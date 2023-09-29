import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
class ModalUser extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }


    render() {
        console.log('check child props', this.props);
        console.log('check child open modal', this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => {this.toggle()}}> Create a new user </ModalHeader>
                <ModalBody>
                <div class="container">
                    <div class="row">
                    <form action="/post-crud" method="POST">
                        <div class="form-row">
                        <div class="col-12 mt-3">Create a new user</div>
                        <div class="form-group col-6">
                            <label for="inputEmail4">Email</label>
                            <input type="email" class="form-control" placeholder="Email" name="email"/>
                        </div>
                        <div class="form-group col-6">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" placeholder="Password" name="password"/>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-6">
                            <label for="inputEmail4">First name</label>
                            <input type="text" class="form-control" placeholder="First name" name="firstName"/>
                        </div>
                        <div class="form-group col-6">
                            <label for="inputPassword4">Last name</label>
                            <input type="text" class="form-control" placeholder="Last name" name="lastName"/>
                        </div>
                        </div>
                        <div class="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" name="address" placeholder="1234 Main St"/>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-6">
                            <label for="inputCity">Phone number</label>
                            <input type="text" class="form-control" name="phonenumber"/>
                        </div>
                        <div class="form-group col-3">
                            <label for="inputState">Sex</label>
                            <select name="gender" class="form-control">
                            <option selected value="0">Female</option>
                            <option value="1">Male</option>
                            </select>
                        </div>
                        <div class="form-group col-3">
                            <label for="inputZip">Role</label>
                            <select name="roleId" class="form-control">
                            <option selected value="0">Admin</option>
                            <option value="1">Doctor</option>
                            <option value="2">Patient</option>
                            </select>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary px-3">Sign in</button>
                    </form>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-2" onClick={() => {this.toggle()}}>Do something</Button>{''}
                    <Button color="secondary px-2" onClick={() => {this.toggle()}}>Cancel</Button>
                </ModalFooter>
           </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
