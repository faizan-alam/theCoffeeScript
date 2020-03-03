import React, { Component } from 'react';
import { connect } from 'react-redux';






class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: [],
            pending: [],
            completed: []
        }
    }


    render() {
        const Friends = this.props.meetingList;
        console.log(Friends)
        const request = [], pending = [], completed = [];
        Friends.map(data => {
            if (data.completed) {
                completed.push(data)
            }
            else if (data.invited) {
                console.log("Req")
                request.push(data)
            }
            else {
                pending.push(data)
            }
        })
        return (
            <div>
                <div>
                    <h3>
                        Request
                    </h3>
                    <ul>
                        {request.map((data, index) => {
                            return (
                                <li>
                                    {data.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h3>
                        Pending
                    </h3>
                    <ul>
                        {pending.map((data, index) => {
                            return (
                                <li>
                                    {data.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h3>
                        Completed
                    </h3>
                    <ul>
                        {completed.map((data, index) => {
                            return (
                                <li>
                                    {data.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        meetingList: state.meetingList
    }
}

export default connect(mapStateToProps)(List);