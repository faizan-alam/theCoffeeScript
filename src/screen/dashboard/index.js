import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import AppDashboard from '../../components/Dashboard';
import Meeting from './Meeting/Meeting';
import DatePicker from './DateTime/DateTime';
import swal from 'sweetalert2';
import { UserList, fixMeeting, getToken, getMeetingList } from '../../config/firebase';
import { checkUser } from '../../config/localUser';
import Location from './Meeting Location/Location';
import List from '../../components/List/List';
import SideBar from '../../components/appBarSetPro/index';
import Dialog from '../../components/Material List/index';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meet: false,
            location: false,
            person: {},
            dashboard: true,
            date: false,
            time: null,
            place: {}
        }
        UserList();
        if (!localStorage.getItem('currentUser')) {
            this.props.history.replace('/')
        }
        checkUser();
        this.confirmMeeting = this.confirmMeeting.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.confirmLocation = this.confirmLocation.bind(this);
        this.confirmTime = this.confirmTime.bind(this);
        this.setMeeting = this.setMeeting.bind(this);
    }
    setMeeting() {
        const { meet } = this.state;
        this.setState({ meet: !meet, dashboard: false })
    }
    setLocation() {
        this.setState({ location: true })
    }
    confirmMeeting(person) {
        this.setState({ person, location: true, meet: false });
    }
    confirmLocation(place) {
        this.setState({ place, location: false, date: true });
    }
    confirmTime(time) {
        const { person } = this.state;
        this.setState({ time });
        console.log(time, this.state);
        swal({
            title: 'Do You Want To Fix The Meeting?',
            text: person.name,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm It'
        }).then((result) => {
            if (result.value) {
                console.log(result);
                fixMeeting(this.props.currentUser, this.state);
                this.setState({ dashboard: true, meet: false, location: false, date: false });
            } else {

            }
        })
    }
    componentDidMount() {
        getToken();
        getMeetingList(this.props.currentUser);
    }
    render() {
        const { meetingList } = this.props;
        const { name } = this.props.currentUser
        const { meet, location, dashboard, date } = this.state;

        return (
            <div>
                {/* <Header /> */}
                <SideBar user={this.props.currentUser} />
                <Dialog/>
                <div>
                    {meet && <Meeting confirmMeeting={this.confirmMeeting} />}
                    {dashboard &&
                        <div>
                            <AppDashboard setMeeting={this.setMeeting} />
                        </div>}
                    {location && <Location confirmLocation={this.confirmLocation} />}
                    {date && <DatePicker confirmTime={this.confirmTime} />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        UserList: state.UserList,
        meetingList: state.meetingList
    }
}

export default connect(mapStateToProps)(Dashboard);