import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import UserInfo from './Info/info';
import Picture from './Picture/picture';
import Drinks from './Drink/drinks';
import Map from './Map/map';
import './style.css';
import { saveProfile } from '../../config/firebase';





class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            userInfo: {
            }
        }
        this.SubmitInfo = this.SubmitInfo.bind(this);
        if (!this.props.currentUser.userId) {
            this.props.history.replace('/')
        }
    }
    SubmitInfo(data) {
        const { step, userInfo } = this.state;
        let { currentUser } = this.props;
        this.setState({ userInfo: { ...userInfo, ...data }, step: step + 1 });
        currentUser = { ...currentUser, ...userInfo, ...data }
        console.log(data);
        if (data.completed) {
            saveProfile(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.props.history.replace('/dashboard')
        }

    }
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(location => {
            this.props.dispatch({ type: 'Location', location: location })
        });
    }
    render() {
        const { step } = this.state;
        // console.log(this.props);

        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div>
                        {step == 1 && <UserInfo SubmitInfo={this.SubmitInfo} />}
                        {step == 2 && <Picture SubmitInfo={this.SubmitInfo} userId={this.props.currentUser} />}
                        {step == 3 && <Drinks SubmitInfo={this.SubmitInfo} />}
                        {step == 4 && <Map SubmitInfo={this.SubmitInfo} />}
                        {step == 5 && <h1>Completed</h1>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentUser: state.currentUser,
        geoLocation: state.geoLocation
    }
}


export default connect(mapStateToProps)(Login)