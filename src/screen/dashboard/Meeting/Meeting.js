import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cards, { Card } from '../../../lib/react-swipe-deck';
import circle from '../../../images/circle.png';
import circle1 from '../../../images/circle1.png';
import swal from 'sweetalert2';
import './style.css';

class Meeting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            dot0: true,
            dot1: false,
            dot2: false,
        }
        this.reject = this.reject.bind(this);
    }

    action(person) {
        swal({
            title: 'Do You Want To Heet?',
            text: person.name,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm It!'
        }).then((result) => {
            if (result.value) {
                this.props.confirmMeeting(person);
            }
        })

    }
    reject() {
        this.setState({
            index: 0,
            dot0: true,
            dot1: false,
            dot2: false
        })
    }
    render() {
        const { UserList } = this.props;
        const {
            index,
            dot0,
            dot1,
            dot2
        } = this.state;
        console.log(index);
        console.log(UserList);


        return (
            <div className="meeting-div">
                <h1 >
                    Meeting Screen
               </h1>
                <Cards onEnd={() => console.log('end')}>
                    {UserList.map((item) =>
                        <Card
                            key={item.userId}
                            onSwipeLeft={() => this.reject()}
                            onSwipeRight={() => { this.action(item) }}
                        >
                            <div className="users-div">
                                <img src={item.images[index]} />
                                <div className="dot-div">
                                    {!dot0 && <img src={circle} onClick={() => this.setState({ index: 0, dot0: true, dot1: false, dot2: false })} />}
                                    {dot0 && <img src={circle1} />}
                                    {!dot1 && <img src={circle} onClick={() => this.setState({ index: 1, dot0: false, dot1: true, dot2: false })} />}
                                    {dot1 && <img src={circle1} />}
                                    {!dot2 && <img src={circle} onClick={() => this.setState({ index: 2, dot0: false, dot1: false, dot2: true })} />}
                                    {dot2 && <img src={circle1} />}
                                </div>
                                <h3 style={{ backgroundColor: "white" }} >
                                    Name : {item.name}
                                </h3>
                            </div>
                        </Card>
                    )}
                </Cards>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        UserList: state.UserList
    }
}

export default connect(mapStateToProps)(Meeting);