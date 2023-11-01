import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {emitter} from '../../utils/Emitter'
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
            console.log('listen emitter from parent', data)
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address: '',
            })
        })
    }
    componentDidMount() {
        console.log('mounting modal')
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {
        //bad code.modify state
        // this.state[id] = event.target.value;
        // this.state({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state:',this.state)
        // })

        //goodcode
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
                ...copyState
        }, () => {
            console.log('check good state:',this.state)
        });
    }
    checkValidateInput = () => {
    let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++){
            console.log('check inside loop', !this.state[arrInput[i]],arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        console.log(isValid)
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size="lg"
            >
            <ModalHeader toggle={() => {this.toggle()}}> Create a new user </ModalHeader>

            <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='form-row'>
                            <div className='form-group col-6'>
                                <label htmlFor="inputEmail4">Email</label>
                                <input
                                    onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                    type="email"
                                    className='form-control'
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                />
                            </div>
                            <div className='form-group col-6'>
                                <label htmlFor="inputPassword4">Password</label>
                                <input
                                    onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                    type="password" className='form-control' placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-6'>
                                <label htmlFor="inputEmail4">First name</label>
                                <input
                                    onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                    type="text"
                                    className='form-control'
                                    placeholder="First name"
                                    name="firstName"
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='form-group col-6'>
                                <label htmlFor="inputPassword4">Last name</label>
                                <input
                                    onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                    type="text"
                                    className='form-control'
                                    placeholder="Last name"
                                    name="lastName"
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                type="text" className='form-control'
                                name="address"
                                placeholder="1234 Main St"
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-3"
                        onClick={() => { this.handleAddNewUser() }}>
                        Add user
                    </Button>{' '}
                    <Button
                        color="secondary px-3"
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
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
