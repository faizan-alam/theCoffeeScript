import React, { Component } from 'react';
import { connect } from 'react-redux';



class DashBoard extends Component {


    render() {
        const { name } = this.props.currentUser;

        return (
            <div className="loginDiv">
                <h1>
                    {name}
                </h1>
                <button
                    className="btn loginBtn"
                    onClick={() => this.props.setMeeting()}
                >
                    Set Meeting
                </button>
                <h3>
                    You Have not Set Any Meeting Yet
               </h3>
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

export default connect(mapStateToProps)(DashBoard);